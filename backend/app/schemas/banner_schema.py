from typing import Optional
from datetime import datetime
from pydantic import BaseModel


class BannerCreate(BaseModel):
    title: str
    subtitle: Optional[str] = None
    image_url: str
    redirect_url: Optional[str] = None
    is_active: bool = True
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None


class BannerUpdate(BaseModel):
    title: str
    subtitle: Optional[str] = None
    image_url: str
    redirect_url: Optional[str] = None
    is_active: bool = True
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None