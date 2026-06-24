from sqlalchemy.orm import Session
from sqlalchemy import text


def get_all_orders(db: Session):
    result = db.execute(
        text("SELECT * FROM orders ORDER BY created_at DESC")
    )
    return list(result.mappings().all())


def get_order_by_id(db: Session, order_id: str):
    result = db.execute(
        text("SELECT * FROM orders WHERE id = :order_id"),
        {"order_id": order_id}
    )
    return result.mappings().first()


def create_order(db: Session, order_data: dict):
    query = text("""
        INSERT INTO orders (
            customer_name,
            customer_phone,
            customer_email,
            product_id,
            affiliate_id,
            quantity,
            size,
            total_amount,
            payment_status,
            delivery_status,
            address,
            city,
            notes
        )
        VALUES (
            :customer_name,
            :customer_phone,
            :customer_email,
            :product_id,
            :affiliate_id,
            :quantity,
            :size,
            :total_amount,
            :payment_status,
            :delivery_status,
            :address,
            :city,
            :notes
        )
        RETURNING *
    """)

    result = db.execute(query, order_data)
    db.commit()
    return result.mappings().first()


def update_order(db: Session, order_id: str, order_data: dict):
    order_data["order_id"] = order_id

    query = text("""
        UPDATE orders
        SET
            customer_name = :customer_name,
            customer_phone = :customer_phone,
            customer_email = :customer_email,
            product_id = :product_id,
            affiliate_id = :affiliate_id,
            quantity = :quantity,
            size = :size,
            total_amount = :total_amount,
            payment_status = :payment_status,
            delivery_status = :delivery_status,
            address = :address,
            city = :city,
            notes = :notes
        WHERE id = :order_id
        RETURNING *
    """)

    result = db.execute(query, order_data)
    db.commit()
    return result.mappings().first()


def delete_order(db: Session, order_id: str):
    result = db.execute(
        text("DELETE FROM orders WHERE id = :order_id RETURNING id"),
        {"order_id": order_id}
    )

    db.commit()
    return result.first()