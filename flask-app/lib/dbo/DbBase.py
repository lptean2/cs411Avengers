import MySQLdb
import json

db = MySQLdb.connect("localhost","avengers1_flask","password123","avengers1_cpi_sh" )

class DbBase:
    def __init__(self, dict={}):
        for key in dict:
            setattr(self,key,dict[key])


    @classmethod
    def loadByID(cls,id):
        records = cls.loadByFields({'ID' : id})
        if (len(records) != 1 ):
            return

        return records[0]


    @classmethod
    def loadByFields(cls,fields={},opts={}):

        cursor = db.cursor()

        # Loop over the incoming fields
        binds = [];
        where_clauses = [];
        for field_name in fields:
            binds.append( str(fields[field_name]) )
            where_clauses.append(field_name + '=%s')

        # Build the select
        select_fields = ', ' . join(cls.fields())
        select_sql = "SELECT " + select_fields + \
            " FROM " + cls.tableName();

        if (len(where_clauses)):
            select_sql += " WHERE " + " AND ".join(where_clauses)

        print "Running sql: " + select_sql
        print "binds: " + ",".join(binds)

        cursor.execute(
            select_sql,
            binds
            )
        records = cursor.fetchall()

        # Build objects from the DB records
        object_array = [];
        for record in records:
            instance = cls()
            for i, field in enumerate(cls.fields()):
                setattr(instance,field,record[i])
            object_array.append(instance)

        return object_array


    def save(self):
        inserts = []
        insert_values =[]
        insert_binds =[]
        updates = []
        update_binds = []


        for field in self.fields():
            inserts.append(field)
            insert_binds.append(str(getattr(self,field,'')))
            insert_values.append("%s")

            if (field not in self.primaryKey()):
                updates.append(field + "=%s")
                update_binds.append(str(getattr(self,field,'')))


        update_statement = 'INSERT INTO ' + self.tableName() + \
            " (" + ",".join(inserts) + ")" + \
            " VALUES (" + ",".join(insert_values) + ")" + \
            " ON DUPLICATE KEY UPDATE  " + ",".join(updates)

        print "Running sql: " + update_statement
        print "binds: " + ",".join(insert_binds + update_binds)

        cursor = db.cursor()
        cursor.execute(
            update_statement,
            insert_binds + update_binds
            )

        db.commit()


    def asDict(self):
        obj = {}
        for field in self.fields():
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

    @staticmethod
    def primaryKeys():
        pass
