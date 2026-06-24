from sqlalchemy.orm import Session
from sqlalchemy import text


def generate_partner_code(db: Session):
    result = db.execute(
        text("SELECT COUNT(*) FROM partner_brands")
    )

    count = result.scalar() or 0
    return f"PB{count + 1:03d}"


def get_all_partner_brands(db: Session):
    result = db.execute(
        text("SELECT * FROM partner_brands ORDER BY created_at DESC")
    )
    return list(result.mappings().all())


def get_partner_brand_by_id(db: Session, partner_brand_id: str):
    result = db.execute(
        text("SELECT * FROM partner_brands WHERE id = :partner_brand_id"),
        {"partner_brand_id": partner_brand_id}
    )
    return result.mappings().first()


def create_partner_brand(db: Session, partner_brand_data: dict):
    partner_brand_data["partner_code"] = generate_partner_code(db)

    query = text("""
        INSERT INTO partner_brands (
            partner_code,
            brand_name,
            contact_person,
            phone_number,
            email,
            website_url,
            logo_url,
            commission_percentage,
            status,
            notes,
            is_active
        )
        VALUES (
            :partner_code,
            :brand_name,
            :contact_person,
            :phone_number,
            :email,
            :website_url,
            :logo_url,
            :commission_percentage,
            :status,
            :notes,
            :is_active
        )
        RETURNING *
    """)

    result = db.execute(query, partner_brand_data)
    db.commit()
    return result.mappings().first()


def update_partner_brand(
    db: Session,
    partner_brand_id: str,
    partner_brand_data: dict
):
    partner_brand_data["partner_brand_id"] = partner_brand_id

    query = text("""
        UPDATE partner_brands
        SET
            brand_name = :brand_name,
            contact_person = :contact_person,
            phone_number = :phone_number,
            email = :email,
            website_url = :website_url,
            logo_url = :logo_url,
            commission_percentage = :commission_percentage,
            status = :status,
            notes = :notes,
            is_active = :is_active
        WHERE id = :partner_brand_id
        RETURNING *
    """)

    result = db.execute(query, partner_brand_data)
    db.commit()
    return result.mappings().first()


def delete_partner_brand(db: Session, partner_brand_id: str):
    result = db.execute(
        text("""
            DELETE FROM partner_brands
            WHERE id = :partner_brand_id
            RETURNING id
        """),
        {"partner_brand_id": partner_brand_id}
    )

    db.commit()
    return result.first()