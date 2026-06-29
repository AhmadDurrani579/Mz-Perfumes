# app/routes/store_routes.py

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.db import get_db
from app.services import product_service

router = APIRouter(prefix="/api/store", tags=["Store"])

@router.get("/products")
def get_store_products(db: Session = Depends(get_db)):
    return product_service.get_store_products(db)