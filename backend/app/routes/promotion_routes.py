from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.db import get_db
from app.schemas.promotion_schema import PromotionCreate, PromotionUpdate
from app.services import promotion_service

router = APIRouter(prefix="/api/promotions", tags=["Promotions"])


@router.get("/")
def get_promotions(db: Session = Depends(get_db)):
    return promotion_service.get_all_promotions(db)

@router.get("/active/list")
def get_active_promotions(
    db: Session = Depends(get_db)
):
    return promotion_service.get_active_promotions(db)

@router.get("/{promotion_id}")
def get_promotion(promotion_id: str, db: Session = Depends(get_db)):
    promotion = promotion_service.get_promotion_by_id(db, promotion_id)

    if not promotion:
        raise HTTPException(status_code=404, detail="Promotion not found")

    return promotion


@router.post("/")
def create_promotion(promotion: PromotionCreate, db: Session = Depends(get_db)):
    return promotion_service.create_promotion(db, promotion.model_dump())


@router.put("/{promotion_id}")
def update_promotion(
    promotion_id: str,
    promotion: PromotionUpdate,
    db: Session = Depends(get_db)
):
    updated = promotion_service.update_promotion(
        db,
        promotion_id,
        promotion.model_dump()
    )

    if not updated:
        raise HTTPException(status_code=404, detail="Promotion not found")

    return updated


@router.delete("/{promotion_id}")
def delete_promotion(promotion_id: str, db: Session = Depends(get_db)):
    deleted = promotion_service.delete_promotion(db, promotion_id)

    if not deleted:
        raise HTTPException(status_code=404, detail="Promotion not found")

    return {"message": "Promotion deleted successfully"}

