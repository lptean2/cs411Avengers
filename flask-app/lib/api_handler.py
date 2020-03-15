from lib.dbo.DbObjects import Item, Region, Basket, BasketItems
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
        return_array.append(item.toDict())

    return json.dumps(return_array)


def getRegion(id):
    region = Region.loadByID(id)
    if (region):
        return region.toJSON()

    abort(404)


def getBasket(id):
    basket = Basket.loadByID(id)
    if (basket):
        basket.loadItems()
        return basket.toJSON()

    abort(404)


def putBasket(basket):
    basket_obj = None
    if (basket.get('ID')):
        basket_obj = saveBasket(basket)
    else:
        basket_obj = createBasket(basket)

    updateBasketItems(basket_obj, basket.get('Items',[]))
    basket_obj.loadItems()
    return basket_obj.toJSON()


def saveBasket(basket):
    db_basket = Basket.loadByID(basket['ID'])
    db_basket.Name = basket['Name']
    updated_basket = db_basket.save()
    return updated_basket


def createBasket(basket):
    obj_basket = Basket({'Name':basket['Name']})
    updated_basket = obj_basket.save()
    return updated_basket


# Should some of this logic go into the Basket object?
def updateBasketItems(basket, items):
    current_items = BasketItems.loadByFields({'BasketID' : basket.ID})

    for item in current_items:
        item.delete()

    for item in items:
        new_item = BasketItems({'BasketID' : basket.ID, 'ItemID' : item['ID'], 'Quantity' : item['Quantity']})
        new_item.save()
