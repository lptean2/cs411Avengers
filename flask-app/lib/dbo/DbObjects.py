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


class DbBasket(DbBase):
    @staticmethod
    def fields():
        return ['ID','Name']

    @staticmethod
    def tableName():
        return 'Basket'

    @staticmethod
    def primaryKey():
        return ['ID']


class Basket(DbBasket):
    @classmethod
    def loadByFields(cls,fields={},opts={}):
        baskets = super(Basket, self).loadByFields(cls,fields,opts)

        for basket in baskets:
            basket.loadBasketItems()

        return baskets

    def loadBasketItems(self):
        items = BasketItems.loadByFields({'BasketID' : self.ID})

        items_list = []
        for item in items:
            items_list.append(item.toJSON)

        setattr(self,'Items',items_list)
