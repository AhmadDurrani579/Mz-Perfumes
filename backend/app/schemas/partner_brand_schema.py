from typing import Optional
from decimal import Decimal
from pydantic import BaseModel


class PartnerBrandCreate(BaseModel):
    brand_name: str
    contact_person: Optional[str] = None

    phone_number: Optional[str] = None
    email: Optional[str] = None

    website_url: Optional[str] = None
    logo_url: Optional[str] = None

    commission_percentage: Optional[Decimal] = None

    status: str = "pending"

    notes: Optional[str] = None

    is_active: bool = True


class PartnerBrandUpdate(BaseModel):
    brand_name: str
    contact_person: Optional[str] = None

    phone_number: Optional[str] = None
    email: Optional[str] = None

    website_url: Optional[str] = None
    logo_url: Optional[str] = None

    commission_percentage: Optional[Decimal] = None

    status: str = "pending"

    notes: Optional[str] = None

    is_active: bool = True