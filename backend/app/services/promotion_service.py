from sqlalchemy.orm import Session
from sqlalchemy import text


def clean_promotion_data(promotion_data: dict):
    scope = str(promotion_data.get("promotion_scope") or "").strip().lower()

    if promotion_data.get("brand_id") == "":
        promotion_data["brand_id"] = None

    if promotion_data.get("product_id") == "":
        promotion_data["product_id"] = None

    if scope == "all_products":
        promotion_data["apply_to_all"] = True
        promotion_data["brand_id"] = None
        promotion_data["product_id"] = None

    elif scope == "brand":
        promotion_data["apply_to_all"] = False
        promotion_data["product_id"] = None

    elif scope == "product":
        promotion_data["apply_to_all"] = False

    return promotion_data

def get_all_promotions(db: Session):
    result = db.execute(
        text("SELECT * FROM promotions ORDER BY created_at DESC")
    )
    return list(result.mappings().all())


def get_promotion_by_id(db: Session, promotion_id: str):
    result = db.execute(
        text("SELECT * FROM promotions WHERE id = :promotion_id"),
        {"promotion_id": promotion_id}
    )
    return result.mappings().first()


def create_promotion(db: Session, promotion_data: dict):
    promotion_data = clean_promotion_data(promotion_data)

    query = text("""
        INSERT INTO promotions (
            title,
            description,
            discount_type,
            discount_value,
            apply_to_all,
            promotion_scope,
            brand_id,
            product_id,
            banner_image_url,
            is_active,
            start_date,
            end_date
        )
        VALUES (
            :title,
            :description,
            :discount_type,
            :discount_value,
            :apply_to_all,
            :promotion_scope,
            :brand_id,
            :product_id,
            :banner_image_url,
            :is_active,
            :start_date,
            :end_date
        )
        RETURNING *
    """)

    result = db.execute(query, promotion_data)
    db.commit()
    return result.mappings().first()


def update_promotion(db: Session, promotion_id: str, promotion_data: dict):
    promotion_data = clean_promotion_data(promotion_data)
    promotion_data["promotion_id"] = promotion_id

    query = text("""
        UPDATE promotions
        SET
            title = :title,
            description = :description,
            discount_type = :discount_type,
            discount_value = :discount_value,
            apply_to_all = :apply_to_all,
            promotion_scope = :promotion_scope,
            brand_id = :brand_id,
            product_id = :product_id,
            banner_image_url = :banner_image_url,
            is_active = :is_active,
            start_date = :start_date,
            end_date = :end_date
        WHERE id = :promotion_id
        RETURNING *
    """)

    result = db.execute(query, promotion_data)
    db.commit()
    return result.mappings().first()


def delete_promotion(db: Session, promotion_id: str):
    result = db.execute(
        text("DELETE FROM promotions WHERE id = :promotion_id RETURNING id"),
        {"promotion_id": promotion_id}
    )

    db.commit()
    return result.first()


def get_active_promotions(db: Session):
    result = db.execute(
        text("""
            SELECT *
            FROM promotions
            WHERE
                is_active = TRUE
                AND start_date <= CURRENT_TIMESTAMP
                AND end_date >= CURRENT_TIMESTAMP
            ORDER BY created_at DESC
        """)
    )

    return list(result.mappings().all())