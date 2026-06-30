# app/schemas/product_variant_schema.py

from pydantic import BaseModel
from typing import Optional


class ProductVariantCreate(BaseModel):
    product_id: str
    variant_size_id: str
    stock_quantity: int = 0
    is_active: bool = True


class ProductVariantUpdate(BaseModel):
    stock_quantity: int = 0
    is_active: bool = True