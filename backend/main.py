from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

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