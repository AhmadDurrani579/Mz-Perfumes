from typing import Optional
from decimal import Decimal
from datetime import datetime
from pydantic import BaseModel


class PromotionCreate(BaseModel):
    title: str
    description: Optional[str] = None

    discount_type: str
    discount_value: Decimal

    apply_to_all: bool = True
    promotion_scope: str = "all_products"

    brand_id: Optional[str] = None
    product_id: Optional[str] = None

    banner_image_url: Optional[str] = None

    is_active: bool = True
    start_date: datetime
    end_date: datetime


class PromotionUpdate(BaseModel):
    title: str
    description: Optional[str] = None

    discount_type: str
    discount_value: Decimal

    apply_to_all: bool = True
    promotion_scope: str = "all_products"

    brand_id: Optional[str] = None
    product_id: Optional[str] = None

    banner_image_url: Optional[str] = None

    is_active: bool = True
    start_date: datetime
    end_date: datetime