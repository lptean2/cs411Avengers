from __future__ import absolute_import
from __future__ import print_function
import pymysql
import json
import os


db_host = os.environ.get('FLASK_DB_HOST') or 'localhost'
db_user = os.environ.get('FLASK_DB_USER') or 'avengers1_flask'
db_pw = os.environ.get('FLASK_DB_PW') or 'password123'
db_name = os.environ.get('FLASK_DB_NAME') or 'avengers1_cpi_sh'

# Hack for the VMs where the user is setup with no password:
# Check for the VM user (python) and the default password
if ( db_user == 'python' and db_pw == 'password123'):
    db_pw = ''

db = pymysql.connect(db_host,db_user,db_pw,db_name )
#db = MySQLdb.connect("localhost","python","","cpidata" )

class DbBase:
    def __init__(self, dict={}):
        for key in dict:
            setattr(self,key,dict[key])


    @classmethod
    def loadByID(cls,id):
        records = cls.loadByFields([
            {'name' : 'ID', 'value' : id}
        ])
        if (len(records) != 1 ):
            return records

        return records[0]


    # Fields is an array of dicts with name/value/op(optional, default is '=')
    # That go in the WHERE clause: WHERE name op value
    @classmethod
    def loadByFields(cls,fields=[],opts={}):
        cursor = db.cursor()
        # Loop over the incoming fields
        binds = [];
        where_clauses = cls.selectWheres();
        for field in fields:
            binds.append( str(field['value']) )
            if field['name'] not in opts:
                op = field.get('op','=')
            else:
                op = opts[field['name']]
            where_clauses.append(field['name'] + ' ' + op + ' %s')

        # Build the select
        select_fields = ', '.join(cls.selectFields())
        select_sql = "SELECT " + select_fields + \
            " FROM " + cls.selectTables();

        if (len(where_clauses)):
            select_sql += ' WHERE ' + ' AND '.join(where_clauses)

        print('Running sql: ' + select_sql)
        print('binds: ' + ','.join(binds))

        cursor.execute(
            select_sql,
            binds
            )
        records = cursor.fetchall()
        # Build objects from the DB records
        object_array = []
        for record in records:
            instance = cls()
            for i, field in enumerate(cls.selectFields()):
                setattr(instance,field,record[i])
            instance.setupAfterLoad()
            object_array.append(instance)
        return object_array


    def save(self,opts={}):
        inserts = []
        insert_values =[]
        insert_binds =[]
        updates = []
        update_binds = []


        for field in self.fields():
            inserts.append(field)
            insert_binds.append(str(getattr(self,field,'')))
            insert_values.append('%s')

            if (field not in self.primaryKey()):
                updates.append(field + '=%s')
                update_binds.append(str(getattr(self,field,'')))


        update_statement = 'INSERT INTO ' + self.tableName() + \
            ' (' + ','.join(inserts) + ')' + \
            ' VALUES (' + ','.join(insert_values) + ')' + \
            ' ON DUPLICATE KEY UPDATE  ' + ','.join(updates)

        print('Running sql: ' + update_statement)
        print('binds: ' + ','.join(insert_binds + update_binds))

        cursor = db.cursor()
        cursor.execute(
            update_statement,
            insert_binds + update_binds
            )

        # If it is a new row, lastrowid will be populated, if not, use the Item
        new_id = cursor.lastrowid
        db.commit()

        # If we are creating the DB row, load into an object
        if (opts.get('return_self')):
            if (new_id):
                return self.loadByID(new_id)

            return self.reload()


    def reload(self):
        pks = []

        for key in self.primaryKey():
            print(key)
            pks.append({ 'name' : key, 'value' : getattr(self,key) })

        records = self.loadByFields(pks)
        return records[0]


    def delete(self):
        self.cascadeDelete();

        delete_wheres = []
        delete_values = []

        for field in self.primaryKey():
            delete_wheres.append( field + ' = %s' )
            delete_values.append( str(getattr(self, field)) )

        delete_statement = 'DELETE FROM ' + self.tableName() + \
            ' WHERE ' + ' AND '.join(delete_wheres)

        print('Running sql: ' + delete_statement)
        print('binds: ' + ','.join(delete_values))

        cursor = db.cursor()
        cursor.execute(
            delete_statement,
            delete_values
            )

        db.commit();

        return True

    def toDict(self, cols = []):
        obj = {}
        fields = None
        if len(cols):
            fields = cols
        else:
            fields = self.selectFields()

        for field in fields:
            if getattr(self,field) :
                obj[field] = getattr(self,field)

        return obj


    def toJSON(self):
        return json.dumps(self, default=lambda o: o.__dict__,
            sort_keys=True, indent=4)




    @staticmethod
    def fields():
        pass

    @staticmethod
    def tableName():
        pass

    # Tables in the FROM clause. Used for joins.
    @classmethod
    def selectTables(cls):
        return cls.tableName()

    # Clauses in the WHERE clause. Used for joins.
    @classmethod
    def selectWheres(cls):
        return []

    # Columns in the SELECT clause. Used for joins.
    # TODO : map add 'tableName.' before each field
    @classmethod
    def selectFields(cls):
        return cls.fields()


    @staticmethod
    def primaryKeys():
        pass

    def cascadeDelete(self):
        pass

    def setupAfterLoad(self):
        pass
