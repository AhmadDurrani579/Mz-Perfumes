from sqlalchemy.orm import Session
from sqlalchemy import text


def generate_product_code(db: Session, partner_brand_id: str):
    result = db.execute(
        text("""
            SELECT COUNT(*)
            FROM partner_products
            WHERE partner_brand_id = :partner_brand_id
        """),
        {"partner_brand_id": partner_brand_id}
    )

    count = result.scalar() or 0
    return f"PP{count + 1:03d}"


def get_all_partner_products(db: Session):
    result = db.execute(
        text("SELECT * FROM partner_products ORDER BY created_at DESC")
    )
    return list(result.mappings().all())


def get_partner_product_by_id(db: Session, partner_product_id: str):
    result = db.execute(
        text("SELECT * FROM partner_products WHERE id = :partner_product_id"),
        {"partner_product_id": partner_product_id}
    )
    return result.mappings().first()


def create_partner_product(db: Session, partner_product_data: dict):
    partner_product_data["product_code"] = generate_product_code(
        db,
        partner_product_data["partner_brand_id"]
    )

    query = text("""
        INSERT INTO partner_products (
            partner_brand_id,
            product_code,
            name,
            description,
            actual_price,
            discount_price,
            size,
            main_image_url,
            is_featured,
            is_active
        )
        VALUES (
            :partner_brand_id,
            :product_code,
            :name,
            :description,
            :actual_price,
            :discount_price,
            :size,
            :main_image_url,
            :is_featured,
            :is_active
        )
        RETURNING *
    """)

    result = db.execute(query, partner_product_data)
    db.commit()
    return result.mappings().first()


def update_partner_product(
    db: Session,
    partner_product_id: str,
    partner_product_data: dict
):
    partner_product_data["partner_product_id"] = partner_product_id

    query = text("""
        UPDATE partner_products
        SET
            partner_brand_id = :partner_brand_id,
            name = :name,
            description = :description,
            actual_price = :actual_price,
            discount_price = :discount_price,
            size = :size,
            main_image_url = :main_image_url,
            is_featured = :is_featured,
            is_active = :is_active
        WHERE id = :partner_product_id
        RETURNING *
    """)

    result = db.execute(query, partner_product_data)
    db.commit()
    return result.mappings().first()


def delete_partner_product(db: Session, partner_product_id: str):
    result = db.execute(
        text("""
            DELETE FROM partner_products
            WHERE id = :partner_product_id
            RETURNING id
        """),
        {"partner_product_id": partner_product_id}
    )

    db.commit()
    return result.first()