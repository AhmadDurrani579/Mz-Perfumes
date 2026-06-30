# app/routes/product_image_routes.py

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.schemas.product_image_schema import ProductImageCreate, ProductImageUpdate
from app.services import product_image_service
from app.database.db import get_db

router = APIRouter(
    prefix="/api/product-images",
    tags=["Product Images"]
)


@router.get("/product/{product_id}")
def get_images_by_product(product_id: str, db: Session = Depends(get_db)):
    return product_image_service.get_images_by_product(db, product_id)


@router.post("/")
def create_product_image(
    image: ProductImageCreate,
    db: Session = Depends(get_db)
):
    try:
        return product_image_service.create_product_image(db, image.model_dump())
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.put("/{image_id}")
def update_product_image(
    image_id: str,
    image: ProductImageUpdate,
    db: Session = Depends(get_db)
):
    updated = product_image_service.update_product_image(
        db,
        image_id,
        image.model_dump()
    )

    if not updated:
        raise HTTPException(status_code=404, detail="Product image not found")

    return updated


@router.delete("/{image_id}")
def delete_product_image(image_id: str, db: Session = Depends(get_db)):
    deleted = product_image_service.delete_product_image(db, image_id)

    if not deleted:
        raise HTTPException(status_code=404, detail="Product image not found")

    return {"message": "Product image deleted successfully"}