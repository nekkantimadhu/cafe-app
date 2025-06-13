# from flask_sqlalchemy import SQLAlchemy


# db = SQLAlchemy()

# class Menu(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(100))
#     description = db.Column(db.Text)
#     price = db.Column(db.Float)
#     image_url = db.Column(db.String(255))
#     category = db.Column(db.String(50))
#     is_available = db.Column(db.Boolean, default=True)

# class Order(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     table_no = db.Column(db.String(10))
#     status = db.Column(db.String(50), default="Pending")
#     total_amount = db.Column(db.Float)

# class OrderItem(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     order_id = db.Column(db.Integer, db.ForeignKey('order.id'))
#     menu_id = db.Column(db.Integer, db.ForeignKey('menu.id'))
#     quantity = db.Column(db.Integer)
#     price = db.Column(db.Float)

# class Payment(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     order_id = db.Column(db.Integer, db.ForeignKey('order.id'))
#     amount = db.Column(db.Float)
#     method = db.Column(db.String(50))
#     status = db.Column(db.String(50))


# models/models.py

# Sample data
menu_items = [
    {'id': 1, 'name': 'Masala Dosa', 'category': 'South Indian', 'price': 80},
    {'id': 2, 'name': 'Butter Naan', 'category': 'North Indian', 'price': 35},
    {'id': 3, 'name': 'Cold Coffee', 'category': 'Beverages', 'price': 60}
]

orders = []
payments = []
