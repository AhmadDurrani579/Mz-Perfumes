from typing import Optional
from pydantic import BaseModel


class BranchCreate(BaseModel):
    brand_id: str

    name: str
    slug: str
    description: Optional[str] = None

    address: Optional[str] = None
    city: Optional[str] = None
    province: Optional[str] = None

    phone_number: Optional[str] = None
    whatsapp_number: Optional[str] = None
    email: Optional[str] = None

    is_active: bool = True


class BranchUpdate(BaseModel):
    brand_id: str

    name: str
    slug: str
    description: Optional[str] = None

    address: Optional[str] = None
    city: Optional[str] = None
    province: Optional[str] = None

    phone_number: Optional[str] = None
    whatsapp_number: Optional[str] = None
    email: Optional[str] = None

    is_active: bool = True