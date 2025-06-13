# from flask import Blueprint, request, jsonify
# from models import db, Order, OrderItem, Menu

# order_routes = Blueprint('order_routes', __name__)

# @order_routes.route('/order', methods=['POST'])
# def place_order():
#     data = request.json
#     order = Order(table_no=data['table_no'], total_amount=data['total_amount'])
#     db.session.add(order)
#     db.session.commit()
#     for item in data['items']:
#         order_item = OrderItem(order_id=order.id, menu_id=item['menu_id'], quantity=item['quantity'], price=item['price'])
#         db.session.add(order_item)
#     db.session.commit()
#     return jsonify({"order_id": order.id})

from flask import Blueprint, request, jsonify
from models.models import orders

order_bp = Blueprint('order_bp', __name__)

@order_bp.route('/place', methods=['POST'])
def place_order():
    data = request.json
    orders.append(data)
    return jsonify({'message': 'Order placed successfully', 'order': data}), 201

@order_bp.route('/status/<int:table_id>', methods=['GET'])
def get_order_status(table_id):
    order = next((o for o in orders if o['table_id'] == table_id), None)
    if order:
        return jsonify(order)
    return jsonify({'message': 'No order found'}), 404
