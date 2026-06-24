from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.db import get_db
from app.schemas.order_schema import OrderCreate, OrderUpdate
from app.services import order_service

router = APIRouter(prefix="/api/orders", tags=["Orders"])


@router.get("/")
def get_orders(db: Session = Depends(get_db)):
    return order_service.get_all_orders(db)


@router.get("/{order_id}")
def get_order(order_id: str, db: Session = Depends(get_db)):
    order = order_service.get_order_by_id(db, order_id)

    if not order:
        raise HTTPException(status_code=404, detail="Order not found")

    return order


@router.post("/")
def create_order(order: OrderCreate, db: Session = Depends(get_db)):
    return order_service.create_order(db, order.model_dump())


@router.put("/{order_id}")
def update_order(
    order_id: str,
    order: OrderUpdate,
    db: Session = Depends(get_db)
):
    updated = order_service.update_order(
        db,
        order_id,
        order.model_dump()
    )

    if not updated:
        raise HTTPException(status_code=404, detail="Order not found")

    return updated


@router.delete("/{order_id}")
def delete_order(order_id: str, db: Session = Depends(get_db)):
    deleted = order_service.delete_order(db, order_id)

    if not deleted:
        raise HTTPException(status_code=404, detail="Order not found")

    return {"message": "Order deleted successfully"}