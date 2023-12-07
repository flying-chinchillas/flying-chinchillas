from fastapi import FastAPI, HTTPException, Depends, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
# from fastapi_utils.tasks import repeat_every
import logging
import feedparser
import asyncio

import crud, models, schemas
from database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)
print("migrated")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

async def update_db():
    while True:
        await asyncio.sleep(86400)
        db = SessionLocal()
        print("deleted")
        crud.delete_all_countries(db)
        try:    
            data = feedparser.parse("https://travel.state.gov/_res/rss/TAsTWs.xml")
            if data.bozo:
                logging.error("Bozo is true")
                return

            for entry in data.entries:
                name = entry.title.split(" - ")[0]
                safety = entry.tags[0]["term"]
                date = entry.published.split(", ")[1]

                country_data = schemas.CountryCreate(name=name, safety=safety, date=date)
                crud.create_country(db, country_data)
        except Exception as e:
            logging.error(f"Error updating database: {str(e)}")
        
        finally:
            db.close()
    
@app.get("/info/{country}", response_model=schemas.Country)
async def main(country: str, db: Session = Depends(get_db)):
    db_country = crud.get_country(db, country)
    if db_country is None:
        raise HTTPException(status_code=404, detail="Country not found")
    return db_country

@app.get("/trigger")
async def send_job(background_tasks: BackgroundTasks):
    background_tasks.add_task(update_db)
    return {"message": "update started"}
