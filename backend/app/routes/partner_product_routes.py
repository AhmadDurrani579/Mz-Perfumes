from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.db import get_db
from app.schemas.partner_product_schema import (
    PartnerProductCreate,
    PartnerProductUpdate
)
from app.services import partner_product_service

router = APIRouter(prefix="/api/partner-products", tags=["Partner Products"])


@router.get("/")
def get_partner_products(db: Session = Depends(get_db)):
    return partner_product_service.get_all_partner_products(db)


@router.get("/{partner_product_id}")
def get_partner_product(partner_product_id: str, db: Session = Depends(get_db)):
    product = partner_product_service.get_partner_product_by_id(db, partner_product_id)

    if not product:
        raise HTTPException(status_code=404, detail="Partner product not found")

    return product


@router.post("/")
def create_partner_product(product: PartnerProductCreate, db: Session = Depends(get_db)):
    return partner_product_service.create_partner_product(db, product.model_dump())


@router.put("/{partner_product_id}")
def update_partner_product(
    partner_product_id: str,
    product: PartnerProductUpdate,
    db: Session = Depends(get_db)
):
    updated = partner_product_service.update_partner_product(
        db,
        partner_product_id,
        product.model_dump()
    )

    if not updated:
        raise HTTPException(status_code=404, detail="Partner product not found")

    return updated


@router.delete("/{partner_product_id}")
def delete_partner_product(partner_product_id: str, db: Session = Depends(get_db)):
    deleted = partner_product_service.delete_partner_product(db, partner_product_id)

    if not deleted:
        raise HTTPException(status_code=404, detail="Partner product not found")

    return {"message": "Partner product deleted successfully"}