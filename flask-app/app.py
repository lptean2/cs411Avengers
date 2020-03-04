from flask import Flask
import lib.api_handler
from flask_restful import reqparse

app = Flask(__name__)


# @app.route("/")
# def hello():
#     return "Hello, World!"

@app.route('/item/<item_id>', methods=['GET'])
def getItem(item_id):
    return lib.api_handler.getItem(item_id)

@app.route('/items', methods=['GET'])
def getItems():
    return lib.api_handler.getItems()

@app.route('/region/<region_id>', methods=['GET'])
def getRegion(region_id):
    return lib.api_handler.getRegion(region_id)

@app.route('/basket/<basket_id>', methods=['GET'])
def getBasket(basket_id):
    return lib.api_handler.getBasket(basket_id)


    # parser = reqparse.RequestParser()
    # parser.add_argument('key1')
    # args = parser.parse_args()

    #return args['key1']
    #return get();

#app.run()
