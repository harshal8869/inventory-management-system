from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base
from app.database import engine

from app.models.product import Product

from app.routes.product import router as product_router
from app.models.customer import Customer
from app.routes.customer import router as customer_router
from app.models.order import Order
from app.routes.order import router as order_router
from app.models.order_item import OrderItem
from app.routes.dashboard import router as dashboard_router

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Inventory Management API"
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(product_router)
app.include_router(customer_router)
app.include_router(order_router)
app.include_router(dashboard_router)

@app.get("/")
def home():
    return {
        "message": "Inventory System Running Successfully"
    }