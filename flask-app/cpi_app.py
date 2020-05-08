from __future__ import absolute_import
from flask import Flask
import lib.api_handler
from flask_restful import reqparse
from flask import request

application = Flask(__name__)

@application.route("/")
def hello():
    return "Hello, World!"


@application.route('/item/<item_id>', methods=['GET'])
def getItem(item_id):
    return lib.api_handler.getItem(item_id)


@application.route('/items', methods=['GET'])
def getItems():
    parser = reqparse.RequestParser()
    parser.add_argument('search')
    args = parser.parse_args()
    return lib.api_handler.getItems(args)

@application.route('/searchItem/<name>', methods=['GET'])
def searchItem(name):
    return lib.api_handler.getResultItem(name)


@application.route('/region/<region_id>', methods=['GET'])
def getRegion(region_id):
    return lib.api_handler.getRegion(region_id)


@application.route('/series', methods=['GET'])
def getSeries():
    return lib.api_handler.getSeries(request.args)

@application.route('/trends', methods=['GET'])
def getTrends():
    return lib.api_handler.getTrends(request.args)


@application.route('/basket/<basket_id>', methods=['GET'])
def getBasket(basket_id):
    return lib.api_handler.getBasket(basket_id)


@application.route('/basket/<basket_id>', methods=['DELETE'])
def deleteBasket(basket_id):
    return lib.api_handler.deleteBasket(basket_id)


@application.route('/baskets', methods=['GET'])
def getBaskets():
    return lib.api_handler.getBaskets(request.args)


@application.route('/basket', methods=['PUT'])
def putBasket():
    return lib.api_handler.putBasket(request.json)


@application.route('/metadata/basket/<basket_id>/<region_id>', methods=['GET'])
def getBasketMetadata(basket_id,region_id):
    return lib.api_handler.getBasketMetadata(basket_id,region_id)


@application.route('/metadata/item/<item_id>/<region_id>', methods=['GET'])
def getItemMetadata(item_id,region_id):
    return lib.api_handler.getItemMetadata(item_id,region_id)
