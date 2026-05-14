from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
import json
import os
from typing import Optional

app = FastAPI(title="Bangalore Pincode Explorer API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load data
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
with open(os.path.join(BASE_DIR, "pincodes.json"), "r") as f:
    AREAS = json.load(f)


@app.get("/api/areas")
def get_all_areas():
    return {"areas": AREAS, "count": len(AREAS)}


@app.get("/api/lookup")
def lookup(
    pincode: Optional[str] = Query(None),
    area: Optional[str] = Query(None)
):
    if not pincode and not area:
        raise HTTPException(status_code=400, detail="Provide either 'pincode' or 'area' query parameter.")

    if pincode:
        result = next((a for a in AREAS if a["pincode"] == pincode.strip()), None)
        if not result:
            raise HTTPException(status_code=404, detail=f"Pincode '{pincode}' not found.")
        return result

    if area:
        query = area.strip().lower()
        # Exact match first
        result = next((a for a in AREAS if a["area"].lower() == query), None)
        # Partial match fallback
        if not result:
            matches = [a for a in AREAS if query in a["area"].lower()]
            if not matches:
                raise HTTPException(status_code=404, detail=f"Area '{area}' not found.")
            result = matches[0]
            if len(matches) > 1:
                return {"matches": matches, "count": len(matches)}
        return result


@app.get("/")
def root():
    return {"message": "Bangalore Pincode Explorer API", "endpoints": ["/api/areas", "/api/lookup"]}
