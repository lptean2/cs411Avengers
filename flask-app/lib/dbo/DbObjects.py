from __future__ import absolute_import
import json
from lib.dbo.DbBase import DbBase


class Item(DbBase):
    @staticmethod
    def fields():
        return ['ID','Name']

    @staticmethod
    def tableName():
        return 'Item'

    @staticmethod
    def primaryKey():
        return ['ID']


class Region(DbBase):
    @staticmethod
    def fields():
        return ['ID','Name','ParentRegion']

    @staticmethod
    def tableName():
        return 'Region'

    @staticmethod
    def primaryKey():
        return ['ID']


class Price(DbBase):
    @staticmethod
    def fields():
        return ['ItemID','RegionID','PriceDate','Price']

    @staticmethod
    def tableName():
        return 'Price'

    @staticmethod
    def primaryKey():
        return ['ItemID','RegionID','PriceDate']


class BasketItems(DbBase):
    @staticmethod
    def fields():
        return ['BasketID','ItemID','Quantity']

    @staticmethod
    def tableName():
        return 'BasketItems'

    @staticmethod
    def primaryKey():
        return ['BasketID','ItemID']

    @classmethod
    def selectTables(cls):
        return 'BasketItems , Item '

    @classmethod
    def selectWheres(cls):
        return ['BasketItems.ItemID = Item.ID']

    @classmethod
    def selectFields(cls):
        fields = cls.fields()
        fields.append('Name')
        return fields


class Series(DbBase):
    @staticmethod
    def fields():
        return ['ItemID','RegionID','StartDate','EndDate','MaxPrice','MaxDate','MinPrice','MinDate']

    @staticmethod
    def tableName():
        return 'BasketItems'

    @staticmethod
    def primaryKey():
        return ['ItemID','RegionID']

class Basket(DbBase):
    @staticmethod
    def fields():
        return ['ID','Name']

    @staticmethod
    def tableName():
        return 'Basket'

    @staticmethod
    def primaryKey():
        return ['ID']

    def loadItems(self):
        item_list = []
        items = BasketItems.loadByFields([
            {'name':'BasketID', 'value': self.ID}
        ])

        for item in items:
            item_dict = {}
            for attr in ['ItemID','Quantity','Name']:
                item_dict[attr] = getattr(item,attr)

            item_list.append( item_dict )
            #item_list.append( item.toDict() )

        self.Items = item_list

    def setupAfterLoad(self):
        self.loadItems()


    def setItems(self, items):
        current_items = BasketItems.loadByFields([
            {'name':'BasketID', 'value': self.ID}
        ])

        for item in current_items:
            item.delete()

        for item in items:
            new_item = BasketItems({'BasketID' : self.ID, 'ItemID' : item['ID'], 'Quantity' : item['Quantity']})
            new_item.save()


    def cascadeDelete(self):
        basket_items = BasketItems.loadByFields([
            {'name':'BasketID', 'value': self.ID}
        ])

        for item in basket_items:
            item.delete();


    def getSeries(self, region_id):
        query = """SELECT
            	P.PriceDate, sum( BI.Quantity * P.Price)
            FROM
            	Price P,
            	BasketItems BI
            WHERE
            	P.RegionID = %s AND
            	BI.BasketID = %s AND
            	BI.ItemID = P.ItemID
            GROUP BY P.PriceDate
            ORDER BY P.PriceDate
            """

        binds = [str(region_id),str(self.ID)]

        return self.runSQL(query, binds)
