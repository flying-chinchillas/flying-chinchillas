import requests
import re
import feedparser
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
# from fastapi_utils.tasks import repeat_every


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    # allow_credentials=True,
    # allow_methods=["*"],
    # allow_headers=["*"],
)


@app.get("/{country}")
async def main(country):
    print(country)
    data = fetch_safety_data(country)
    return data

# @app.on_event("startup")
# @repeat_every(seconds=60 * 60 * 24)  # 1 day
def fetch_safety_data(country:str) -> tuple:
    """
        Input: desired country to fetch safety level
        Output: tuple of publication date (DD/MM/YYYY) and safety level & description (Level #: Description)
    """

    data = feedparser.parse("https://travel.state.gov/_res/rss/TAsTWs.xml")
    if data.bozo:
        return HTTPException(status_code=404, detail="Bozo is True")
    for entry in data.entries:
        if country in entry.title: 
            safety = entry.tags[0]["term"]
            pub_date = entry.published[5:]
            return {"pub_data": pub_date, "safety": safety}
    else:
        raise HTTPException(status_code=404, detail="Country Not Found")

if __name__ == "__main__":
    fetch_safety_data("North Korea")