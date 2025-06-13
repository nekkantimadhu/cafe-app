# from flask import Blueprint, request, jsonify
# from models import db, Payment

# payment_routes = Blueprint('payment_routes', __name__)

# @payment_routes.route('/pay', methods=['POST'])
# def pay():
#     data = request.json
#     payment = Payment(order_id=data['order_id'], amount=data['amount'], method=data['method'], status='Paid')
#     db.session.add(payment)
#     db.session.commit()
#     return jsonify({"message": "Payment successful"})

from flask import Blueprint, request, jsonify
from models.models import payments

payment_bp = Blueprint('payment_bp', __name__)

@payment_bp.route('/pay', methods=['POST'])
def pay():
    data = request.json
    payments.append(data)
    return jsonify({'message': 'Payment successful', 'details': data})
