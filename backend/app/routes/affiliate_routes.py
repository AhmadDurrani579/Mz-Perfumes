from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.db import get_db
from app.schemas.affiliate_schema import AffiliateCreate, AffiliateUpdate
from app.services import affiliate_service

router = APIRouter(prefix="/api/affiliates", tags=["Affiliates"])


@router.get("/")
def get_affiliates(db: Session = Depends(get_db)):
    return affiliate_service.get_all_affiliates(db)


@router.get("/{affiliate_id}")
def get_affiliate(affiliate_id: str, db: Session = Depends(get_db)):
    affiliate = affiliate_service.get_affiliate_by_id(db, affiliate_id)

    if not affiliate:
        raise HTTPException(status_code=404, detail="Affiliate not found")

    return affiliate


@router.post("/")
def create_affiliate(affiliate: AffiliateCreate, db: Session = Depends(get_db)):
    return affiliate_service.create_affiliate(db, affiliate.model_dump())


@router.put("/{affiliate_id}")
def update_affiliate(
    affiliate_id: str,
    affiliate: AffiliateUpdate,
    db: Session = Depends(get_db)
):
    updated = affiliate_service.update_affiliate(
        db,
        affiliate_id,
        affiliate.model_dump()
    )

    if not updated:
        raise HTTPException(status_code=404, detail="Affiliate not found")

    return updated


@router.delete("/{affiliate_id}")
def delete_affiliate(affiliate_id: str, db: Session = Depends(get_db)):
    deleted = affiliate_service.delete_affiliate(db, affiliate_id)

    if not deleted:
        raise HTTPException(status_code=404, detail="Affiliate not found")

    return {"message": "Affiliate deleted successfully"}