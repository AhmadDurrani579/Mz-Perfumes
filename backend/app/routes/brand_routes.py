from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.db import get_db
from app.schemas.brand_schema import BrandCreate, BrandUpdate
from app.services import brand_service

router = APIRouter(prefix="/api/brands", tags=["Brands"])


@router.get("/")
def get_brands(db: Session = Depends(get_db)):
    return brand_service.get_all_brands(db)


@router.get("/{brand_id}")
def get_brand(brand_id: str, db: Session = Depends(get_db)):
    brand = brand_service.get_brand_by_id(db, brand_id)

    if not brand:
        raise HTTPException(status_code=404, detail="Brand not found")

    return brand


@router.post("/")
def create_brand(brand: BrandCreate, db: Session = Depends(get_db)):
    return brand_service.create_brand(db, brand.model_dump())


@router.put("/{brand_id}")
def update_brand(
    brand_id: str,
    brand: BrandUpdate,
    db: Session = Depends(get_db)
):
    updated = brand_service.update_brand(
        db,
        brand_id,
        brand.model_dump()
    )

    if not updated:
        raise HTTPException(status_code=404, detail="Brand not found")

    return updated


@router.delete("/{brand_id}")
def delete_brand(brand_id: str, db: Session = Depends(get_db)):
    deleted = brand_service.delete_brand(db, brand_id)

    if not deleted:
        raise HTTPException(status_code=404, detail="Brand not found")

    return {"message": "Brand deleted successfully"}