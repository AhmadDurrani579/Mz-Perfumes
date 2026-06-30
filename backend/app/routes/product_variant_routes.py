# app/routes/product_variant_routes.py

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.product_variant_schema import ProductVariantCreate, ProductVariantUpdate
from app.services import product_variant_service

router = APIRouter(
    prefix="/api/product-variants",
    tags=["Product Variants"]
)


@router.get("/")
def get_all_product_variants(db: Session = Depends(get_db)):
    return product_variant_service.get_all_product_variants(db)


@router.get("/product/{product_id}")
def get_product_variants(product_id: str, db: Session = Depends(get_db)):
    return product_variant_service.get_product_variants(db, product_id)


@router.post("/")
def create_product_variant(
    variant: ProductVariantCreate,
    db: Session = Depends(get_db)
):
    return product_variant_service.create_product_variant(db, variant.model_dump())


@router.put("/{product_id}/{variant_size_id}")
def update_product_variant(
    product_id: str,
    variant_size_id: str,
    variant: ProductVariantUpdate,
    db: Session = Depends(get_db)
):
    updated = product_variant_service.update_product_variant(
        db,
        product_id,
        variant_size_id,
        variant.model_dump()
    )

    if not updated:
        raise HTTPException(status_code=404, detail="Product variant not found")

    return updated


@router.delete("/{product_id}/{variant_size_id}")
def delete_product_variant(
    product_id: str,
    variant_size_id: str,
    db: Session = Depends(get_db)
):
    deleted = product_variant_service.delete_product_variant(
        db,
        product_id,
        variant_size_id
    )

    if not deleted:
        raise HTTPException(status_code=404, detail="Product variant not found")

    return {"message": "Product variant deleted successfully"}