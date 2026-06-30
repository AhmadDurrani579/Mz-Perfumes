from sqlalchemy.orm import Session
from sqlalchemy import text


def get_all_products(db: Session):
    result = db.execute(text("""
        SELECT *
        FROM products
        ORDER BY created_at DESC
    """))
    return list(result.mappings().all())


def get_product_by_id(db: Session, product_id: str):
    result = db.execute(
        text("SELECT * FROM products WHERE id = :product_id"),
        {"product_id": product_id}
    )
    return result.mappings().first()


def create_product(db: Session, product_data: dict):
    variant_size_id = product_data.pop("variant_size_id", None)
    stock_quantity = product_data.pop("stock_quantity", 0)

    query = text("""
        INSERT INTO products (
            category_id, brand_id, branch_id,
            name, slug, description,
            gender, product_type,
            main_image_url, is_featured, is_active
        )
        VALUES (
            :category_id, :brand_id, :branch_id,
            :name, :slug, :description,
            :gender, :product_type,
            :main_image_url, :is_featured, :is_active
        )
        RETURNING *
    """)

    result = db.execute(query, product_data)
    product = result.mappings().first()

    if variant_size_id:
        db.execute(text("""
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
                TRUE
            )
        """), {
            "product_id": product["id"],
            "variant_size_id": variant_size_id,
            "stock_quantity": stock_quantity,
        })

    db.commit()
    return product


def update_product(db: Session, product_id: str, product_data: dict):
    variant_size_id = product_data.pop("variant_size_id", None)
    stock_quantity = product_data.pop("stock_quantity", 0)

    product_data["product_id"] = product_id

    query = text("""
        UPDATE products
        SET
            category_id = :category_id,
            brand_id = :brand_id,
            branch_id = :branch_id,
            name = :name,
            slug = :slug,
            description = :description,
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
    product = result.mappings().first()

    if variant_size_id:
        db.execute(text("""
            DELETE FROM product_variants
            WHERE product_id = :product_id
        """), {"product_id": product_id})

        db.execute(text("""
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
                TRUE
            )
        """), {
            "product_id": product_id,
            "variant_size_id": variant_size_id,
            "stock_quantity": stock_quantity,
        })

    db.commit()
    return product


def delete_product(db: Session, product_id: str):
    result = db.execute(
        text("DELETE FROM products WHERE id = :product_id RETURNING id"),
        {"product_id": product_id}
    )

    db.commit()
    return result.first()


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
            AND start_date::date <= CURRENT_DATE
            AND end_date::date >= CURRENT_DATE
        ORDER BY created_at DESC
    """))

    promotions = list(promotions_result.mappings().all())
    store_products = []

    for product in products:
        product_dict = dict(product)

        variant_result = db.execute(text("""
            SELECT
                pv.variant_size_id,
                pv.stock_quantity,
                pv.is_active,
                vs.label,
                vs.size_ml,
                vs.price
            FROM product_variants pv
            JOIN variant_sizes vs
                ON vs.id = pv.variant_size_id
            WHERE
                pv.product_id = :product_id
                AND pv.is_active = TRUE
                AND vs.is_active = TRUE
            LIMIT 1
        """), {"product_id": product_dict["id"]})

        variant = variant_result.mappings().first()

        actual_price = float(variant["price"]) if variant else 0
        final_price = actual_price

        discount_label = None
        discount_value = 0
        promotion_applied = False
        matched_promotion = None

        for promo in promotions:
            scope = str(promo.get("promotion_scope") or "").strip().lower()

            if scope == "product" and str(promo.get("product_id")) == str(product_dict.get("id")):
                matched_promotion = promo
                break

            if scope == "brand" and str(promo.get("brand_id")) == str(product_dict.get("brand_id")):
                matched_promotion = promo
                break

            if scope == "all_products":
                matched_promotion = promo
                break

        if matched_promotion:
            promotion_applied = True
            discount_type = str(matched_promotion.get("discount_type") or "").strip().lower()
            discount_value = float(matched_promotion.get("discount_value") or 0)

            if discount_type == "percentage":
                final_price = actual_price - (actual_price * discount_value / 100)
                discount_label = f"{discount_value:g}% OFF"

            elif discount_type == "fixed":
                final_price = max(actual_price - discount_value, 0)
                discount_label = f"PKR {discount_value:g} OFF"

        product_dict["variant_size_id"] = variant["variant_size_id"] if variant else None
        product_dict["size"] = variant["label"] if variant else None
        product_dict["size_ml"] = variant["size_ml"] if variant else None
        product_dict["stock_quantity"] = variant["stock_quantity"] if variant else 0

        product_dict["actual_price"] = round(actual_price, 2)
        product_dict["final_price"] = round(final_price, 2)
        product_dict["promotion_applied"] = promotion_applied
        product_dict["discount_value"] = discount_value
        product_dict["discount_label"] = discount_label

        store_products.append(product_dict)

    return store_products