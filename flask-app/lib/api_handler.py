from __future__ import absolute_import
from lib.dbo.DbObjects import Item, Region, Basket, BasketItems
from lib.dbo.DbObjects import Item, Region, Basket, BasketItems, Price
from flask import abort
import json

def getItem(id):
    item = Item.loadByID(id)
    if (item):
        return item.toJSON()

    abort(404)

def getResultItem(name):
    results = Item.loadByFields([{'name': 'Name', 'value' : '%'+name+'%'}], {'Name': 'Like'})
    output = []
    if results:
        for result in results:
            output.append(result.toDict())
        return json.dumps(output)
    abort(404)


def getSeries(parameter):
    request  = []
    for key, value in parameter.items():
        local = {}
        local['name'] = key
        local['value'] = value
        request.append(local)
    prices = Price.loadByFields(request)
    output = []
    if prices:
        for price in prices:
            output.append(price.toDict(['PriceDate', 'Price']))
        return json.dumps(output)
    abort(404)


def getItems(args):
    items = Item.loadByFields()
    return_array = []

    for item in items:
        return_array.append(item.toDict())

    return json.dumps(return_array,sort_keys=True, indent=4)


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


def deleteBasket(id):
        basket = Basket.loadByID(id)
        if (basket):
            return json.dumps(basket.delete())

        abort(404)


def getBaskets(args):
    fields = []
    if args.get('search'):
        fields.append(
            {'name' : 'Name', 'value' : '%' + args['search'] + '%', 'op' : 'like'}
        )

    baskets = Basket.loadByFields(fields)
    return_array = []

    for basket in baskets:
        return_array.append(basket.toDict())

    return json.dumps(return_array,sort_keys=True, indent=4)



def putBasket(basket):
    basket_obj = None
    if (basket.get('ID')):
        basket_obj = saveBasket(basket)
    else:
        basket_obj = createBasket(basket)

    basket_obj.setItems(basket.get('Items',[]))
    return basket_obj.toJSON()


def saveBasket(basket):
    db_basket = Basket.loadByID(basket['ID'])
    db_basket.Name = basket['Name']
    updated_basket = db_basket.save({'return_self':1})
    return updated_basket


def createBasket(basket):
    obj_basket = Basket({'Name':basket['Name']})
    updated_basket = obj_basket.save({'return_self':1})
    return updated_basket
