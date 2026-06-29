from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.db import get_db
from app.schemas.product_schema import ProductCreate, ProductUpdate
from app.services import product_service

router = APIRouter(prefix="/api/products", tags=["Products"])


@router.get("/")
def get_products(db: Session = Depends(get_db)):
    return product_service.get_all_products(db)


@router.get("/{product_id}")
def get_product(product_id: str, db: Session = Depends(get_db)):
    product = product_service.get_product_by_id(db, product_id)

    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    return product


@router.post("/")
def create_product(product: ProductCreate, db: Session = Depends(get_db)):
    return product_service.create_product(db, product.model_dump())

@router.delete("/{product_id}")
def delete_product(product_id: str, db: Session = Depends(get_db)):
    deleted = product_service.delete_product(db, product_id)

    if not deleted:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    return {
        "message": "Product deleted successfully"
    }

from app.schemas.product_schema import ProductCreate, ProductUpdate

@router.get("/store/products")
def get_store_products(db: Session = Depends(get_db)):
    return product_service.get_store_products(db)

@router.put("/{product_id}")
def update_product(
    product_id: str,
    product: ProductUpdate,
    db: Session = Depends(get_db)
):
    updated = product_service.update_product(
        db,
        product_id,
        product.model_dump()
    )

    if not updated:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    return updated