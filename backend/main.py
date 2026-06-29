from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text

from app.database.db import engine
from app.routes.product_routes import router as product_router
from app.routes.brand_routes import router as brand_router
from app.routes.category_routes import router as category_router
from app.routes.branch_routes import router as branch_router
from app.routes.promotion_routes import router as promotion_router
from app.routes.banner_routes import router as banner_router
from app.routes.affiliate_routes import router as affiliate_router
from app.routes.order_routes import router as order_router
from app.routes.partner_brand_routes import router as partner_brand_router
from app.routes.partner_product_routes import router as partner_product_router
from app.routes.dashboard_routes import router as dashboard_router
from app.routes.upload_routes import router as upload_router
from app.routes.store_routes import router as store_router

# Create FastAPI app
app = FastAPI(
    title="MZ Essence API",
    description="Backend API for MZ Perfume Store",
    version="1.0.0"
)

# Enable CORS so frontend can communicate with backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Later replace * with frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Health check route
@app.get("/")
async def root():
    return {
        "status": "success",
        "message": "Welcome to MZ Essence Backend API"
    }

# API health endpoint
@app.get("/health")
async def health_check():
    return {
        "status": "healthy"
    }

@app.get("/health/db")
async def db_health_check():
    try:
        with engine.connect() as connection:
            connection.execute(text("SELECT 1"))

        return {
            "status": "healthy",
            "database": "connected"
        }

    except Exception as e:
        return {
            "status": "unhealthy",
            "database": "disconnected",
            "error": str(e)
        }

app.include_router(product_router)
app.include_router(brand_router)
app.include_router(category_router)
app.include_router(branch_router)
app.include_router(promotion_router)
app.include_router(banner_router)
app.include_router(affiliate_router)
app.include_router(order_router)
app.include_router(partner_brand_router)
app.include_router(partner_product_router)
app.include_router(dashboard_router)
app.include_router(upload_router)
app.include_router(store_router)