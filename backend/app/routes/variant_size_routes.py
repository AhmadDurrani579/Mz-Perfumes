# app/routes/variant_size_routes.py

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.db import get_db 
from app.schemas.variant_size_schema import VariantSizeCreate, VariantSizeUpdate
from app.services import variant_size_service

router = APIRouter(
    prefix="/api/sizes",
    tags=["Variant Sizes"]
)


@router.get("/")
def get_all_variant_sizes(db: Session = Depends(get_db)):
    return variant_size_service.get_all_variant_sizes(db)


@router.get("/{size_id}")
def get_variant_size_by_id(size_id: str, db: Session = Depends(get_db)):
    size = variant_size_service.get_variant_size_by_id(db, size_id)

    if not size:
        raise HTTPException(status_code=404, detail="Variant size not found")

    return size


@router.post("/")
def create_variant_size(size: VariantSizeCreate, db: Session = Depends(get_db)):
    return variant_size_service.create_variant_size(db, size.model_dump())


@router.put("/{size_id}")
def update_variant_size(
    size_id: str,
    size: VariantSizeUpdate,
    db: Session = Depends(get_db)
):
    updated = variant_size_service.update_variant_size(
        db,
        size_id,
        size.model_dump()
    )

    if not updated:
        raise HTTPException(status_code=404, detail="Variant size not found")

    return updated


@router.delete("/{size_id}")
def delete_variant_size(size_id: str, db: Session = Depends(get_db)):
    deleted = variant_size_service.delete_variant_size(db, size_id)

    if not deleted:
        raise HTTPException(status_code=404, detail="Variant size not found")

    return {"message": "Variant size deleted successfully"}