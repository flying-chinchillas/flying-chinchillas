from pydantic import BaseModel


class CountryBase(BaseModel):
    name: str
    date: str
    safety: str


class CountryCreate(CountryBase):
    pass


class Country(CountryBase):
    id: int

    class Config:
        orm_mode = True
