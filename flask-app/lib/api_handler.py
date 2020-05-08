from __future__ import absolute_import
from lib.dbo.DbObjects import Item, Region, Basket, BasketItems, Price, BasketSeriesView, ItemSeriesView
from flask import abort
import lib.trends
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


def getSeries(args):
    print (args);
    error = _validateSeriesArgs(args)

    if (error):
        return {'error':error}, 422


    if (args.get('BasketID')):
        return _getBasketSeries(args)


    return _getItemsSeries(args)


def _validateSeriesArgs(args):
    if (not args.get('BasketID')  and not args.get('ItemID')):
        return "BasketID or ItemID required"

    if (not args.get('RegionID')):
        return "RegionID required"


def _getBasketSeries(args):
    basket = Basket.loadByID(args.get('BasketID'))
    region_id = args.get('RegionID')
    region = Region.loadByID(region_id)

    if (not basket):
        abort(422, "Basket Not Found")

    if (not region):
        abort(422, "Region Not Found")

    series = basket.getSeries(region_id)
    series_dict = [];
    for price in series:
        series_dict.append({'date':price[0], 'price':price[1]})

    return json.dumps(series_dict,sort_keys=True, indent=4)


def _getItemsSeries(args):
    request  = []

    parameter = {}
    if 'ItemID' in args:
        parameter['ItemID'] = args['ItemID']
    if 'RegionID' in args:
        parameter['RegionID'] = args['RegionID']

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
        return json.dumps(output,sort_keys=True, indent=4)
    abort(404)


def getTrends(args):
    print (args);
    error = _validateTrendsArgs(args)

    if (error):
        return {'error':error}, 422

    terms = []

    if (args.get('BasketID')):
        items = BasketItems.loadByFields([
            {'name':'BasketID', 'value': args.get('BasketID')}
        ])

        for item in items:
            terms.append(item.SearchTerm)

    else:
        item = Item.loadByID(args.get('ItemID'))
        terms = [item.SearchTerm]

    return lib.trends.getTrendData(terms)



def _validateTrendsArgs(args):
    if (not args.get('BasketID')  and not args.get('ItemID')):
        return "BasketID or ItemID required"



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

    abort(404,"Basket Not Found")


def deleteBasket(id):
        basket = Basket.loadByID(id)
        if (basket):
            return json.dumps(basket.delete())

        abort(404,"Basket Not Found")


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
    basket_obj = basket_obj.reload()

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


def getBasketMetadata(basket_id, region_id):
    results = BasketSeriesView.loadByFields([{'name': 'BasketID', 'value' : basket_id}], {'RegionID': region_id})
    if results:
        return results[0].toJSON()


def getItemMetadata(item_id, region_id):
    results = ItemSeriesView.loadByFields([{'name': 'ItemID', 'value' : item_id}], {'RegionID': region_id})
    if results:
        return results[0].toJSON()
