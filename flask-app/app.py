from flask import Flask
import lib.api_handler
from flask_restful import reqparse
from flask_mysqldb import MYSQL


#@app.route("/")
# def hello():
#     return "Hello, World!

=======
application = Flask(__name__)


@application.route("/")
def hello():
    return "Hello, World!"

@application.route('/item/<item_id>', methods=['GET'])
def getItem(item_id):
    return lib.api_handler.getItem(item_id)

<<<<<<< Updated upstream

@app.route('/items', methods=['GET'])
=======
@application.route('/items', methods=['GET'])
>>>>>>> Stashed changes
def getItems():
    curr = MYSQL.connection.cursor()
    curr.execute("select * from Item")
    fetchdata = curr.fetchall()
    curr.close()
    return fetchdata


@application.route('/region/<region_id>', methods=['GET'])
def getRegion(region_id):
    return lib.api_handler.getRegion(region_id)

<<<<<<< Updated upstream

@app.route('/basket/<basket_id>', methods=['GET'])
=======
@application.route('/basket/<basket_id>', methods=['GET'])
>>>>>>> Stashed changes
def getBasket(basket_id):
    return lib.api_handler.getBasket(basket_id)


    # parser = reqparse.RequestParser()
    # parser.add_argument('key1')
    # args = parser.parse_args()

    #return args['key1']
    #return get();

#application.run()
