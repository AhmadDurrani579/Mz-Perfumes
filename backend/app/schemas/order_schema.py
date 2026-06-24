from typing import Optional
from decimal import Decimal
from pydantic import BaseModel


class OrderCreate(BaseModel):
    customer_name: str
    customer_phone: str
    customer_email: Optional[str] = None

    product_id: Optional[str] = None
    affiliate_id: Optional[str] = None

    quantity: int = 1
    size: Optional[str] = None
    total_amount: Optional[Decimal] = None

    payment_status: str = "pending"
    delivery_status: str = "new"

    address: Optional[str] = None
    city: Optional[str] = None
    notes: Optional[str] = None


class OrderUpdate(BaseModel):
    customer_name: str
    customer_phone: str
    customer_email: Optional[str] = None

    product_id: Optional[str] = None
    affiliate_id: Optional[str] = None

    quantity: int = 1
    size: Optional[str] = None
    total_amount: Optional[Decimal] = None

    payment_status: str = "pending"
    delivery_status: str = "new"

    address: Optional[str] = None
    city: Optional[str] = None
    notes: Optional[str] = None