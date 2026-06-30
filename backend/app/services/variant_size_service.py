# app/services/variant_size_service.py

from sqlalchemy.orm import Session
from sqlalchemy import text


def get_all_variant_sizes(db: Session):
    result = db.execute(text("""
        SELECT *
        FROM variant_sizes
        ORDER BY size_ml ASC
    """))
    return list(result.mappings().all())


def get_variant_size_by_id(db: Session, size_id: str):
    result = db.execute(
        text("SELECT * FROM variant_sizes WHERE id = :size_id"),
        {"size_id": size_id}
    )
    return result.mappings().first()


def create_variant_size(db: Session, size_data: dict):
    result = db.execute(text("""
        INSERT INTO variant_sizes (
            label,
            size_ml,
            price,
            is_active
        )
        VALUES (
            :label,
            :size_ml,
            :price,
            :is_active
        )
        RETURNING *
    """), size_data)

    db.commit()
    return result.mappings().first()


def update_variant_size(db: Session, size_id: str, size_data: dict):
    size_data["size_id"] = size_id

    result = db.execute(text("""
        UPDATE variant_sizes
        SET
            label = :label,
            size_ml = :size_ml,
            price = :price,
            is_active = :is_active
        WHERE id = :size_id
        RETURNING *
    """), size_data)

    db.commit()
    return result.mappings().first()


def delete_variant_size(db: Session, size_id: str):
    result = db.execute(
        text("DELETE FROM variant_sizes WHERE id = :size_id RETURNING id"),
        {"size_id": size_id}
    )

    db.commit()
    return result.first()