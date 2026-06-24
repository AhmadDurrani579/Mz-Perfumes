from typing import Optional
from pydantic import BaseModel, EmailStr


class AffiliateCreate(BaseModel):
    full_name: str
    phone_number: str
    email: EmailStr

    instagram_username: Optional[str] = None
    tiktok_username: Optional[str] = None

    city: Optional[str] = None
    reason: Optional[str] = None

    status: str = "pending"
    is_active: bool = True


class AffiliateUpdate(BaseModel):
    full_name: str
    phone_number: str
    email: EmailStr

    instagram_username: Optional[str] = None
    tiktok_username: Optional[str] = None

    city: Optional[str] = None
    reason: Optional[str] = None

    status: str = "pending"
    is_active: bool = True