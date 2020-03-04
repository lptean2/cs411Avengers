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
