# from flask import Blueprint, request, jsonify
# from models import db, Menu

# menu_routes = Blueprint('menu_routes', __name__)

# @menu_routes.route('/menu', methods=['GET'])
# def get_menu():
#     items = Menu.query.all()
#     return jsonify([{
#         "id": item.id,
#         "name": item.name,
#         "price": item.price,
#         "image_url": item.image_url,
#         "category": item.category
#     } for item in items])


from flask import Blueprint, jsonify
from models.models import menu_items

menu_bp = Blueprint('menu_bp', __name__)

@menu_bp.route('/', methods=['GET'])
@menu_bp.route('', methods=['GET'])
def get_menu():
    return jsonify(menu_items)
