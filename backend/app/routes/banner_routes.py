from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.db import get_db
from app.schemas.banner_schema import BannerCreate, BannerUpdate
from app.services import banner_service

router = APIRouter(prefix="/api/banners", tags=["Banners"])


@router.get("/")
def get_banners(db: Session = Depends(get_db)):
    return banner_service.get_all_banners(db)


@router.get("/{banner_id}")
def get_banner(banner_id: str, db: Session = Depends(get_db)):
    banner = banner_service.get_banner_by_id(db, banner_id)

    if not banner:
        raise HTTPException(status_code=404, detail="Banner not found")

    return banner


@router.post("/")
def create_banner(banner: BannerCreate, db: Session = Depends(get_db)):
    return banner_service.create_banner(db, banner.model_dump())


@router.put("/{banner_id}")
def update_banner(
    banner_id: str,
    banner: BannerUpdate,
    db: Session = Depends(get_db)
):
    updated = banner_service.update_banner(
        db,
        banner_id,
        banner.model_dump()
    )

    if not updated:
        raise HTTPException(status_code=404, detail="Banner not found")

    return updated


@router.delete("/{banner_id}")
def delete_banner(banner_id: str, db: Session = Depends(get_db)):
    deleted = banner_service.delete_banner(db, banner_id)

    if not deleted:
        raise HTTPException(status_code=404, detail="Banner not found")

    return {"message": "Banner deleted successfully"}