from sqlalchemy.orm import Session
from sqlalchemy import text


def get_dashboard_summary(db: Session):
    total_products = db.execute(text("SELECT COUNT(*) FROM products")).scalar()
    total_orders = db.execute(text("SELECT COUNT(*) FROM orders")).scalar()
    total_affiliates = db.execute(text("SELECT COUNT(*) FROM affiliates")).scalar()
    total_brands = db.execute(text("SELECT COUNT(*) FROM brands")).scalar()
    total_partner_brands = db.execute(text("SELECT COUNT(*) FROM partner_brands")).scalar()
    total_partner_products = db.execute(text("SELECT COUNT(*) FROM partner_products")).scalar()

    pending_orders = db.execute(
        text("SELECT COUNT(*) FROM orders WHERE payment_status = 'pending'")
    ).scalar()

    total_revenue = db.execute(
        text("SELECT COALESCE(SUM(total_amount), 0) FROM orders WHERE payment_status = 'paid'")
    ).scalar()

    return {
        "total_products": total_products,
        "total_orders": total_orders,
        "pending_orders": pending_orders,
        "total_affiliates": total_affiliates,
        "total_brands": total_brands,
        "total_partner_brands": total_partner_brands,
        "total_partner_products": total_partner_products,
        "total_revenue": total_revenue
    }