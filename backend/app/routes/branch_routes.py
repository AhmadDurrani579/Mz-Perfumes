from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.db import get_db
from app.schemas.branch_schema import (
    BranchCreate,
    BranchUpdate
)
from app.services import branch_service

router = APIRouter(
    prefix="/api/branches",
    tags=["Branches"]
)


@router.get("/")
def get_branches(db: Session = Depends(get_db)):
    return branch_service.get_all_branches(db)


@router.get("/{branch_id}")
def get_branch(
    branch_id: str,
    db: Session = Depends(get_db)
):
    branch = branch_service.get_branch_by_id(
        db,
        branch_id
    )

    if not branch:
        raise HTTPException(
            status_code=404,
            detail="Branch not found"
        )

    return branch


@router.post("/")
def create_branch(
    branch: BranchCreate,
    db: Session = Depends(get_db)
):
    return branch_service.create_branch(
        db,
        branch.model_dump()
    )


@router.put("/{branch_id}")
def update_branch(
    branch_id: str,
    branch: BranchUpdate,
    db: Session = Depends(get_db)
):
    updated = branch_service.update_branch(
        db,
        branch_id,
        branch.model_dump()
    )

    if not updated:
        raise HTTPException(
            status_code=404,
            detail="Branch not found"
        )

    return updated


@router.delete("/{branch_id}")
def delete_branch(
    branch_id: str,
    db: Session = Depends(get_db)
):
    deleted = branch_service.delete_branch(
        db,
        branch_id
    )

    if not deleted:
        raise HTTPException(
            status_code=404,
            detail="Branch not found"
        )

    return {
        "message": "Branch deleted successfully"
    }