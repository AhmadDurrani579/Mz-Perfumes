# app/services/product_variant_service.py

from sqlalchemy.orm import Session
from sqlalchemy import text


def get_all_product_variants(db: Session):
    result = db.execute(text("""
        SELECT
            pv.product_id,
            pv.variant_size_id,
            pv.stock_quantity,
            pv.is_active,
            p.name AS product_name,
            vs.label AS size_label,
            vs.price
        FROM product_variants pv
        JOIN products p ON p.id = pv.product_id
        JOIN variant_sizes vs ON vs.id = pv.variant_size_id
        ORDER BY p.name, vs.size_ml
    """))
    return list(result.mappings().all())


def get_product_variants(db: Session, product_id: str):
    result = db.execute(text("""
        SELECT
            pv.product_id,
            pv.variant_size_id,
            pv.stock_quantity,
            pv.is_active,
            vs.label,
            vs.size_ml,
            vs.price
        FROM product_variants pv
        JOIN variant_sizes vs ON vs.id = pv.variant_size_id
        WHERE pv.product_id = :product_id
        ORDER BY vs.size_ml
    """), {"product_id": product_id})

    return list(result.mappings().all())


def create_product_variant(db: Session, data: dict):
    result = db.execute(text("""
        INSERT INTO product_variants (
            product_id,
            variant_size_id,
            stock_quantity,
            is_active
        )
        VALUES (
            :product_id,
            :variant_size_id,
            :stock_quantity,
            :is_active
        )
        RETURNING *
    """), data)

    db.commit()
    return result.mappings().first()


def update_product_variant(db: Session, product_id: str, variant_size_id: str, data: dict):
    data["product_id"] = product_id
    data["variant_size_id"] = variant_size_id

    result = db.execute(text("""
        UPDATE product_variants
        SET
            stock_quantity = :stock_quantity,
            is_active = :is_active
        WHERE product_id = :product_id
          AND variant_size_id = :variant_size_id
        RETURNING *
    """), data)

    db.commit()
    return result.mappings().first()


def delete_product_variant(db: Session, product_id: str, variant_size_id: str):
    result = db.execute(text("""
        DELETE FROM product_variants
        WHERE product_id = :product_id
          AND variant_size_id = :variant_size_id
        RETURNING *
    """), {
        "product_id": product_id,
        "variant_size_id": variant_size_id
    })

    db.commit()
    return result.mappings().first()