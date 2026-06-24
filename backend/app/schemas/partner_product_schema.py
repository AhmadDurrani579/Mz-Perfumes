from typing import Optional
from decimal import Decimal
from pydantic import BaseModel


class PartnerProductCreate(BaseModel):
    partner_brand_id: str

    name: str
    description: Optional[str] = None

    actual_price: Optional[Decimal] = None
    discount_price: Optional[Decimal] = None

    size: Optional[str] = None
    main_image_url: Optional[str] = None

    is_featured: bool = False
    is_active: bool = True


class PartnerProductUpdate(BaseModel):
    partner_brand_id: str

    name: str
    description: Optional[str] = None

    actual_price: Optional[Decimal] = None
    discount_price: Optional[Decimal] = None

    size: Optional[str] = None
    main_image_url: Optional[str] = None

    is_featured: bool = False
    is_active: bool = True