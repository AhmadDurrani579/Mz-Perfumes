from sqlalchemy.orm import Session
from sqlalchemy import text


def get_all_banners(db: Session):
    result = db.execute(
        text("SELECT * FROM banners ORDER BY created_at DESC")
    )
    return list(result.mappings().all())


def get_banner_by_id(db: Session, banner_id: str):
    result = db.execute(
        text("SELECT * FROM banners WHERE id = :banner_id"),
        {"banner_id": banner_id}
    )
    return result.mappings().first()


def create_banner(db: Session, banner_data: dict):
    query = text("""
        INSERT INTO banners (
            title,
            subtitle,
            image_url,
            redirect_url,
            is_active,
            start_date,
            end_date
        )
        VALUES (
            :title,
            :subtitle,
            :image_url,
            :redirect_url,
            :is_active,
            :start_date,
            :end_date
        )
        RETURNING *
    """)

    result = db.execute(query, banner_data)
    db.commit()
    return result.mappings().first()


def update_banner(db: Session, banner_id: str, banner_data: dict):
    banner_data["banner_id"] = banner_id

    query = text("""
        UPDATE banners
        SET
            title = :title,
            subtitle = :subtitle,
            image_url = :image_url,
            redirect_url = :redirect_url,
            is_active = :is_active,
            start_date = :start_date,
            end_date = :end_date
        WHERE id = :banner_id
        RETURNING *
    """)

    result = db.execute(query, banner_data)
    db.commit()
    return result.mappings().first()


def delete_banner(db: Session, banner_id: str):
    result = db.execute(
        text("DELETE FROM banners WHERE id = :banner_id RETURNING id"),
        {"banner_id": banner_id}
    )

    db.commit()
    return result.first()