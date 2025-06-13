from flask import Flask
from flask_cors import CORS
from routes.menu_routes import menu_bp
from routes.order_routes import order_bp
from routes.payment_routes import payment_bp
# from routes.auth_routes import auth_bp  # Optional

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}},  supports_credentials=True)  # Enable CORS globally

# Register Blueprints
app.register_blueprint(menu_bp, url_prefix='/menu')
app.register_blueprint(order_bp, url_prefix='/order')
app.register_blueprint(payment_bp, url_prefix='/payment')
# app.register_blueprint(auth_bp, url_prefix='/auth')

@app.route('/')
def home():
    return {'message': 'Cafe API is running'}

if __name__ == '__main__':
    app.run(debug=True, port=5000)
