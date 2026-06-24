from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.db import get_db
from app.schemas.partner_brand_schema import (
    PartnerBrandCreate,
    PartnerBrandUpdate
)
from app.services import partner_brand_service

router = APIRouter(prefix="/api/partner-brands", tags=["Partner Brands"])


@router.get("/")
def get_partner_brands(db: Session = Depends(get_db)):
    return partner_brand_service.get_all_partner_brands(db)


@router.get("/{partner_brand_id}")
def get_partner_brand(
    partner_brand_id: str,
    db: Session = Depends(get_db)
):
    partner_brand = partner_brand_service.get_partner_brand_by_id(
        db,
        partner_brand_id
    )

    if not partner_brand:
        raise HTTPException(status_code=404, detail="Partner brand not found")

    return partner_brand


@router.post("/")
def create_partner_brand(
    partner_brand: PartnerBrandCreate,
    db: Session = Depends(get_db)
):
    return partner_brand_service.create_partner_brand(
        db,
        partner_brand.model_dump()
    )


@router.put("/{partner_brand_id}")
def update_partner_brand(
    partner_brand_id: str,
    partner_brand: PartnerBrandUpdate,
    db: Session = Depends(get_db)
):
    updated = partner_brand_service.update_partner_brand(
        db,
        partner_brand_id,
        partner_brand.model_dump()
    )

    if not updated:
        raise HTTPException(status_code=404, detail="Partner brand not found")

    return updated


@router.delete("/{partner_brand_id}")
def delete_partner_brand(
    partner_brand_id: str,
    db: Session = Depends(get_db)
):
    deleted = partner_brand_service.delete_partner_brand(
        db,
        partner_brand_id
    )

    if not deleted:
        raise HTTPException(status_code=404, detail="Partner brand not found")

    return {"message": "Partner brand deleted successfully"}