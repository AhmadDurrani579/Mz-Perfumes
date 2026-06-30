from typing import Optional
from pydantic import BaseModel
from decimal import Decimal


class ProductCreate(BaseModel):
    category_id: Optional[str] = None
    brand_id: Optional[str] = None
    branch_id: Optional[str] = None

    name: str
    slug: str
    description: Optional[str] = None


    stock_quantity: int = 0

    gender: Optional[str] = None
    product_type: Optional[str] = None

    variant_size_id: Optional[str] = None
    stock_quantity: int = 0

    main_image_url: Optional[str] = None
    is_featured: bool = False
    is_active: bool = True


class ProductUpdate(ProductCreate):
    pass