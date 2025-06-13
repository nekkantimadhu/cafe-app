# controllers/order_controller.py

def validate_order(order):
    return 'table_id' in order and 'items' in order
