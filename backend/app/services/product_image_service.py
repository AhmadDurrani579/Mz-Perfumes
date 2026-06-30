# app/services/product_image_service.py

from sqlalchemy.orm import Session
from sqlalchemy import text


def get_images_by_product(db: Session, product_id: str):
    result = db.execute(text("""
        SELECT *
        FROM product_images
        WHERE product_id = :product_id
        ORDER BY is_primary DESC, sort_order ASC
    """), {"product_id": product_id})

    return list(result.mappings().all())


def create_product_image(db: Session, image_data: dict):
    # max 4 images per product
    count = db.execute(text("""
        SELECT COUNT(*) AS total
        FROM product_images
        WHERE product_id = :product_id
    """), {"product_id": image_data["product_id"]}).mappings().first()

    if count["total"] >= 4:
        raise ValueError("Maximum 4 images allowed per product")

    if image_data.get("is_primary"):
        db.execute(text("""
            UPDATE product_images
            SET is_primary = FALSE
            WHERE product_id = :product_id
        """), {"product_id": image_data["product_id"]})

    result = db.execute(text("""
        INSERT INTO product_images (
            product_id,
            image_url,
            sort_order,
            is_primary
        )
        VALUES (
            :product_id,
            :image_url,
            :sort_order,
            :is_primary
        )
        RETURNING *
    """), image_data)

    db.commit()
    return result.mappings().first()


def update_product_image(db: Session, image_id: str, image_data: dict):
    image_data["image_id"] = image_id

    existing = db.execute(text("""
        SELECT product_id
        FROM product_images
        WHERE id = :image_id
    """), {"image_id": image_id}).mappings().first()

    if not existing:
        return None

    if image_data.get("is_primary"):
        db.execute(text("""
            UPDATE product_images
            SET is_primary = FALSE
            WHERE product_id = :product_id
        """), {"product_id": existing["product_id"]})

    result = db.execute(text("""
        UPDATE product_images
        SET
            image_url = :image_url,
            sort_order = :sort_order,
            is_primary = :is_primary
        WHERE id = :image_id
        RETURNING *
    """), image_data)

    db.commit()
    return result.mappings().first()


def delete_product_image(db: Session, image_id: str):
    result = db.execute(text("""
        DELETE FROM product_images
        WHERE id = :image_id
        RETURNING id
    """), {"image_id": image_id})

    db.commit()
    return result.first()