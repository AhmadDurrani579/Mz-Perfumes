from sqlalchemy.orm import Session
from sqlalchemy import text


def calculate_discounted_price(product_data: dict):
    actual_price = float(product_data["actual_price"])
    discount_percentage = float(product_data.get("discount_percentage") or 0)

    return actual_price - (actual_price * discount_percentage / 100)


def get_all_products(db: Session):
    result = db.execute(text("SELECT * FROM products ORDER BY created_at DESC"))
    return list(result.mappings().all())

def get_store_products(db: Session):
    products_result = db.execute(text("""
        SELECT *
        FROM products
        WHERE is_active = TRUE
        ORDER BY created_at DESC
    """))

    products = list(products_result.mappings().all())

    promotions_result = db.execute(text("""
        SELECT *
        FROM promotions
        WHERE
            is_active = TRUE
            AND start_date <= CURRENT_TIMESTAMP
            AND end_date >= CURRENT_TIMESTAMP
        ORDER BY created_at DESC
    """))

    promotions = list(promotions_result.mappings().all())

    store_products = []

    for product in products:
        product_dict = dict(product)

        actual_price = float(product_dict.get("actual_price") or 0)
        final_price = float(
            product_dict.get("discounted_price") or actual_price
        )

        discount_label = None
        promotion_applied = False

        matched_promotion = None

        for promo in promotions:
            if promo["promotion_scope"] == "product" and promo["product_id"] == product_dict["id"]:
                matched_promotion = promo
                break

            if promo["promotion_scope"] == "brand" and promo["brand_id"] == product_dict["brand_id"]:
                matched_promotion = promo
                break

            if promo["promotion_scope"] == "all_products":
                matched_promotion = promo
                break

        if matched_promotion:
            promotion_applied = True

            discount_type = matched_promotion["discount_type"]
            discount_value = float(matched_promotion["discount_value"] or 0)

            if discount_type == "percentage":
                final_price = actual_price - (actual_price * discount_value / 100)
                discount_label = f"{discount_value:g}% OFF"

            elif discount_type == "fixed":
                final_price = max(actual_price - discount_value, 0)
                discount_label = f"PKR {discount_value:g} OFF"

        product_dict["final_price"] = round(final_price, 2)
        product_dict["promotion_applied"] = promotion_applied
        product_dict["discount_label"] = discount_label

        store_products.append(product_dict)

    return store_products
        

def get_product_by_id(db: Session, product_id: str):
    result = db.execute(
        text("SELECT * FROM products WHERE id = :product_id"),
        {"product_id": product_id}
    )
    return result.mappings().first()


def create_product(db: Session, product_data: dict):
    product_data["discounted_price"] = calculate_discounted_price(product_data)

    query = text("""
        INSERT INTO products (
            category_id, brand_id, branch_id,
            name, slug, description,
            actual_price, discount_percentage, discounted_price, stock_quantity,
            size, gender, product_type,
            main_image_url, is_featured, is_active
        )
        VALUES (
            :category_id, :brand_id, :branch_id,
            :name, :slug, :description,
            :actual_price, :discount_percentage, :discounted_price, :stock_quantity,
            :size, :gender, :product_type,
            :main_image_url, :is_featured, :is_active
        )
        RETURNING *
    """)

    result = db.execute(query, product_data)
    db.commit()
    return result.mappings().first()


def update_product(db: Session, product_id: str, product_data: dict):
    product_data["product_id"] = product_id
    product_data["discounted_price"] = calculate_discounted_price(product_data)

    query = text("""
        UPDATE products
        SET
            category_id = :category_id,
            brand_id = :brand_id,
            branch_id = :branch_id,
            name = :name,
            slug = :slug,
            description = :description,
            actual_price = :actual_price,
            discount_percentage = :discount_percentage,
            discounted_price = :discounted_price,
            stock_quantity = :stock_quantity,
            size = :size,
            gender = :gender,
            product_type = :product_type,
            main_image_url = :main_image_url,
            is_featured = :is_featured,
            is_active = :is_active,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = :product_id
        RETURNING *
    """)

    result = db.execute(query, product_data)
    db.commit()
    return result.mappings().first()


def delete_product(db: Session, product_id: str):
    result = db.execute(
        text("DELETE FROM products WHERE id = :product_id RETURNING id"),
        {"product_id": product_id}
    )

    db.commit()
    return result.first()