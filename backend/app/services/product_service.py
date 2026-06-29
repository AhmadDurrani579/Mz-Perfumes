from sqlalchemy.orm import Session
from sqlalchemy import text


def calculate_discounted_price(product_data: dict):
    actual_price = float(product_data["actual_price"])
    discount_percentage = float(product_data.get("discount_percentage") or 0)

    return actual_price - (actual_price * discount_percentage / 100)


def get_all_products(db: Session):
    result = db.execute(text("SELECT * FROM products ORDER BY created_at DESC"))
    return list(result.mappings().all())


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