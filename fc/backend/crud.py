from sqlalchemy.orm import Session

import models, schemas


def get_country(db: Session, country_name: str):
    return db.query(models.Country).filter(models.Country.name == country_name).first()

def create_country(db: Session, country: schemas.CountryCreate):
    db_country = models.Country(name=country.name, date=country.date, safety=country.safety)
    db.add(db_country)
    db.commit()
    db.refresh(db_country)
    return db_country

def delete_all_countries(db: Session):
    db.query(models.Country).delete()
    db.commit()
