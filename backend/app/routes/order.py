from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.database import SessionLocal

from app.models.order import Order
from app.models.order_item import OrderItem
from app.models.product import Product
from app.models.customer import Customer

from app.schemas.order import OrderCreate

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/orders")
def create_order(
    order: OrderCreate,
    db: Session = Depends(get_db)
):

    customer = db.query(Customer).filter(
        Customer.id == order.customer_id
    ).first()

    if not customer:
        raise HTTPException(
            status_code=404,
            detail="Customer not found"
        )

    product = db.query(Product).filter(
        Product.id == order.product_id
    ).first()

    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    if product.stock_quantity < order.quantity:
        raise HTTPException(
            status_code=400,
            detail="Insufficient stock"
        )

    total_amount = product.price * order.quantity

    product.stock_quantity -= order.quantity

    new_order = Order(
        customer_id=order.customer_id,
        total_amount=total_amount
    )

    db.add(new_order)
    db.commit()
    db.refresh(new_order)

    order_item = OrderItem(
        order_id=new_order.id,
        product_id=product.id,
        quantity=order.quantity,
        unit_price=product.price
    )

    db.add(order_item)
    db.commit()

    return {
        "order_id": new_order.id,
        "product_id": product.id,
        "quantity": order.quantity,
        "total_amount": total_amount,
        "remaining_stock": product.stock_quantity
    }
@router.get("/orders")
def get_orders(
    db: Session = Depends(get_db)
):
    return db.query(Order).all()
@router.get("/orders/{order_id}")
def get_order(
    order_id: int,
    db: Session = Depends(get_db)
):

    order = db.query(Order).filter(
        Order.id == order_id
    ).first()

    if not order:
        raise HTTPException(
            status_code=404,
            detail="Order not found"
        )

    return order
@router.delete("/orders/{order_id}")
def delete_order(
    order_id: int,
    db: Session = Depends(get_db)
):

    order = db.query(Order).filter(
        Order.id == order_id
    ).first()

    if not order:
        raise HTTPException(
            status_code=404,
            detail="Order not found"
        )

    order_items = db.query(OrderItem).filter(
        OrderItem.order_id == order_id
    ).all()

    for item in order_items:

        product = db.query(Product).filter(
            Product.id == item.product_id
        ).first()

        if product:
            product.stock_quantity += item.quantity

        db.delete(item)

    db.delete(order)

    db.commit()

    return {
        "message": "Order deleted successfully"
    }