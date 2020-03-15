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
    return lib.api_handler.getItems()


@application.route('/region/<region_id>', methods=['GET'])
def getRegion(region_id):
    return lib.api_handler.getRegion(region_id)


@application.route('/basket/<basket_id>', methods=['GET'])
def getBasket(basket_id):
    return lib.api_handler.getBasket(basket_id)


@application.route('/baskets', methods=['GET'])
def getBaskets():
    return lib.api_handler.getBaskets()


@application.route('/basket', methods=['PUT'])
def putBasket():
    print request
    print request.get_json()
    return lib.api_handler.putBasket(request.json)


    # parser = reqparse.RequestParser()
    # parser.add_argument('key1')
    # args = parser.parse_args()

    #return args['key1']
    #return get();

#application.run()
