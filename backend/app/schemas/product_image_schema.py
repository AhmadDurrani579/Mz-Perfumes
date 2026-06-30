# app/schemas/product_image_schema.py

from pydantic import BaseModel


class ProductImageCreate(BaseModel):
    product_id: str
    image_url: str
    sort_order: int = 1
    is_primary: bool = False


class ProductImageUpdate(BaseModel):
    image_url: str
    sort_order: int = 1
    is_primary: bool = False