# app/schemas/variant_size_schema.py

from typing import Optional
from pydantic import BaseModel
from decimal import Decimal


class VariantSizeCreate(BaseModel):
    label: str
    size_ml: Optional[Decimal] = None
    price: Decimal
    is_active: bool = True


class VariantSizeUpdate(VariantSizeCreate):
    pass