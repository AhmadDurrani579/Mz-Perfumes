from sqlalchemy.orm import Session
from sqlalchemy import text


def get_all_branches(db: Session):
    result = db.execute(
        text("SELECT * FROM branches ORDER BY created_at DESC")
    )
    return list(result.mappings().all())


def get_branch_by_id(db: Session, branch_id: str):
    result = db.execute(
        text("SELECT * FROM branches WHERE id = :branch_id"),
        {"branch_id": branch_id}
    )

    return result.mappings().first()


def create_branch(db: Session, branch_data: dict):
    query = text("""
        INSERT INTO branches (
            brand_id,
            name,
            slug,
            description,
            address,
            city,
            province,
            phone_number,
            whatsapp_number,
            email,
            is_active
        )
        VALUES (
            :brand_id,
            :name,
            :slug,
            :description,
            :address,
            :city,
            :province,
            :phone_number,
            :whatsapp_number,
            :email,
            :is_active
        )
        RETURNING *
    """)

    result = db.execute(query, branch_data)
    db.commit()

    return result.mappings().first()


def update_branch(
    db: Session,
    branch_id: str,
    branch_data: dict
):
    branch_data["branch_id"] = branch_id

    query = text("""
        UPDATE branches
        SET
            brand_id = :brand_id,
            name = :name,
            slug = :slug,
            description = :description,
            address = :address,
            city = :city,
            province = :province,
            phone_number = :phone_number,
            whatsapp_number = :whatsapp_number,
            email = :email,
            is_active = :is_active
        WHERE id = :branch_id
        RETURNING *
    """)

    result = db.execute(query, branch_data)
    db.commit()

    return result.mappings().first()


def delete_branch(db: Session, branch_id: str):
    result = db.execute(
        text(
            "DELETE FROM branches "
            "WHERE id = :branch_id RETURNING id"
        ),
        {"branch_id": branch_id}
    )

    db.commit()
    return result.first()