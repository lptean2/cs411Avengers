from lib.dbo.DbObjects import Item, Region, Basket
from flask import abort
import json

def getItem(id):
    item = Item.loadByID(id)
    if (item):
        return item.toJSON()

    abort(404)


def getItems():
    items = Item.loadByFields()
    return_array = []

    for item in items:
        return_array.append(item.asDict())

    return json.dumps(return_array)


def getRegion(id):
    region = Region.loadByID(id)
    if (region):
        return region.toJSON()

    abort(404)


def getBasket(id):
    basket = Basket.loadByID(id)
    if (basket):
        return basket.toJSON()

    abort(404)
