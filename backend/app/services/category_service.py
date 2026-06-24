from sqlalchemy.orm import Session
from sqlalchemy import text


def get_all_categories(db: Session):
    result = db.execute(
        text("SELECT * FROM categories ORDER BY created_at DESC")
    )
    return list(result.mappings().all())


def get_category_by_id(db: Session, category_id: str):
    result = db.execute(
        text("SELECT * FROM categories WHERE id = :category_id"),
        {"category_id": category_id}
    )
    return result.mappings().first()


def create_category(db: Session, category_data: dict):
    query = text("""
        INSERT INTO categories (
            name, slug, description, is_active
        )
        VALUES (
            :name, :slug, :description, :is_active
        )
        RETURNING *
    """)

    result = db.execute(query, category_data)
    db.commit()

    return result.mappings().first()


def update_category(
    db: Session,
    category_id: str,
    category_data: dict
):
    category_data["category_id"] = category_id

    query = text("""
        UPDATE categories
        SET
            name = :name,
            slug = :slug,
            description = :description,
            is_active = :is_active
        WHERE id = :category_id
        RETURNING *
    """)

    result = db.execute(query, category_data)
    db.commit()

    return result.mappings().first()


def delete_category(db: Session, category_id: str):
    result = db.execute(
        text(
            "DELETE FROM categories "
            "WHERE id = :category_id RETURNING id"
        ),
        {"category_id": category_id}
    )

    db.commit()
    return result.first()