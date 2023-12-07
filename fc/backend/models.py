from sqlalchemy import Column, Integer, String

from database import Base

class Country(Base):
    __tablename__ = "country"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    date = Column(String, unique=False, index=False)
    safety = Column(String, unique=False, index=False)
