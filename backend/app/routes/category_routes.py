from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.db import get_db
from app.schemas.category_schema import (
    CategoryCreate,
    CategoryUpdate
)
from app.services import category_service

router = APIRouter(
    prefix="/api/categories",
    tags=["Categories"]
)


@router.get("/")
def get_categories(db: Session = Depends(get_db)):
    return category_service.get_all_categories(db)


@router.get("/{category_id}")
def get_category(
    category_id: str,
    db: Session = Depends(get_db)
):
    category = category_service.get_category_by_id(
        db,
        category_id
    )

    if not category:
        raise HTTPException(
            status_code=404,
            detail="Category not found"
        )

    return category


@router.post("/")
def create_category(
    category: CategoryCreate,
    db: Session = Depends(get_db)
):
    return category_service.create_category(
        db,
        category.model_dump()
    )


@router.put("/{category_id}")
def update_category(
    category_id: str,
    category: CategoryUpdate,
    db: Session = Depends(get_db)
):
    updated = category_service.update_category(
        db,
        category_id,
        category.model_dump()
    )

    if not updated:
        raise HTTPException(
            status_code=404,
            detail="Category not found"
        )

    return updated


@router.delete("/{category_id}")
def delete_category(
    category_id: str,
    db: Session = Depends(get_db)
):
    deleted = category_service.delete_category(
        db,
        category_id
    )

    if not deleted:
        raise HTTPException(
            status_code=404,
            detail="Category not found"
        )

    return {
        "message": "Category deleted successfully"
    }