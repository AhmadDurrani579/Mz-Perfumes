# app/services/cloudinary_service.py

import os
import time
import cloudinary
import cloudinary.uploader
from dotenv import load_dotenv

load_dotenv()

cloudinary.config(
    cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME"),
    api_key=os.getenv("CLOUDINARY_API_KEY"),
    api_secret=os.getenv("CLOUDINARY_API_SECRET"),
    secure=True
)


async def upload_image(
    image_bytes: bytes,
    folder_name: str = "general",
    image_name: str = "image"
) -> str:
    try:
        clean_name = image_name.lower() \
            .replace(" ", "_") \
            .replace("/", "_") \
            .replace("(", "") \
            .replace(")", "")

        public_id = f"mz-essence/{folder_name}/{clean_name}_{int(time.time())}"

        result = cloudinary.uploader.upload(
            image_bytes,
            public_id=public_id,
            resource_type="image",
            transformation=[
                {"width": 1200, "crop": "limit"},
                {"quality": "auto"}
            ]
        )

        return result.get("secure_url", "")

    except Exception as e:
        print(f"Cloudinary error: {e}")
        return ""