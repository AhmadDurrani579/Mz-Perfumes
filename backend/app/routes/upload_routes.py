# app/routes/upload_routes.py

from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from app.services.cloudinary_service import upload_image

router = APIRouter(prefix="/api/uploads", tags=["Uploads"])


@router.post("/image")
async def upload_image_route(
    file: UploadFile = File(...),
    folder_name: str = Form("general"),
    image_name: str = Form("image")
):
    image_bytes = await file.read()

    image_url = await upload_image(
        image_bytes=image_bytes,
        folder_name=folder_name,
        image_name=image_name
    )

    if not image_url:
        raise HTTPException(status_code=500, detail="Image upload failed")

    return {"url": image_url}