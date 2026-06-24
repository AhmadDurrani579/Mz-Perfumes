from sqlalchemy.orm import Session
from sqlalchemy import text
import uuid


def generate_affiliate_code():
    return f"MZ{str(uuid.uuid4().int)[:3]}"


def get_all_affiliates(db: Session):
    result = db.execute(
        text("SELECT * FROM affiliates ORDER BY created_at DESC")
    )

    return list(result.mappings().all())


def get_affiliate_by_id(db: Session, affiliate_id: str):
    result = db.execute(
        text("SELECT * FROM affiliates WHERE id = :affiliate_id"),
        {"affiliate_id": affiliate_id}
    )

    return result.mappings().first()


def create_affiliate(db: Session, affiliate_data: dict):
    affiliate_data["affiliate_code"] = generate_affiliate_code()

    query = text("""
        INSERT INTO affiliates (
            affiliate_code,
            full_name,
            phone_number,
            email,
            instagram_username,
            tiktok_username,
            city,
            reason,
            status,
            is_active
        )
        VALUES (
            :affiliate_code,
            :full_name,
            :phone_number,
            :email,
            :instagram_username,
            :tiktok_username,
            :city,
            :reason,
            :status,
            :is_active
        )
        RETURNING *
    """)

    result = db.execute(query, affiliate_data)
    db.commit()

    return result.mappings().first()


def update_affiliate(
    db: Session,
    affiliate_id: str,
    affiliate_data: dict
):
    affiliate_data["affiliate_id"] = affiliate_id

    query = text("""
        UPDATE affiliates
        SET
            full_name = :full_name,
            phone_number = :phone_number,
            email = :email,
            instagram_username = :instagram_username,
            tiktok_username = :tiktok_username,
            city = :city,
            reason = :reason,
            status = :status,
            is_active = :is_active
        WHERE id = :affiliate_id
        RETURNING *
    """)

    result = db.execute(query, affiliate_data)
    db.commit()

    return result.mappings().first()


def delete_affiliate(db: Session, affiliate_id: str):
    result = db.execute(
        text("""
            DELETE FROM affiliates
            WHERE id = :affiliate_id
            RETURNING id
        """),
        {"affiliate_id": affiliate_id}
    )

    db.commit()
    return result.first()