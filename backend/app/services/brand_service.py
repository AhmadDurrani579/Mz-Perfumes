from sqlalchemy.orm import Session
from sqlalchemy import text


def get_all_brands(db: Session):
    result = db.execute(text("SELECT * FROM brands ORDER BY created_at DESC"))
    return list(result.mappings().all())


def get_brand_by_id(db: Session, brand_id: str):
    result = db.execute(
        text("SELECT * FROM brands WHERE id = :brand_id"),
        {"brand_id": brand_id}
    )
    return result.mappings().first()


def create_brand(db: Session, brand_data: dict):
    query = text("""
        INSERT INTO brands (
            name, slug, logo_url, description, is_active
        )
        VALUES (
            :name, :slug, :logo_url, :description, :is_active
        )
        RETURNING *
    """)

    result = db.execute(query, brand_data)
    db.commit()
    return result.mappings().first()


def update_brand(db: Session, brand_id: str, brand_data: dict):
    brand_data["brand_id"] = brand_id

    query = text("""
        UPDATE brands
        SET
            name = :name,
            slug = :slug,
            logo_url = :logo_url,
            description = :description,
            is_active = :is_active
        WHERE id = :brand_id
        RETURNING *
    """)

    result = db.execute(query, brand_data)
    db.commit()
    return result.mappings().first()


def delete_brand(db: Session, brand_id: str):
    result = db.execute(
        text("DELETE FROM brands WHERE id = :brand_id RETURNING id"),
        {"brand_id": brand_id}
    )

    db.commit()
    return result.first()