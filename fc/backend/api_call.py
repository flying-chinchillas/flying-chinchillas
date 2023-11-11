import feedparser
import re

def fetch_safety_data(country:str) -> tuple:
    """
        Input: desired country to fetch safety level
        Output: tuple of publication date (DD/MM/YYYY) and safety level & description (Level #: Description)
    """
    data = feedparser.parse("https://travel.state.gov/_res/rss/TAsTWs.xml")
    if data.bozo:
        print("error")
    else:
        for entry in data.entries:
            if country in entry.title: 
                safety = entry.tags[0]["term"]
                pub_date = entry.published[5:]
                # print(country)
                # print("Pub Date:", pub_date)
                # print("Safety: ", safety)
                return pub_date, safety

    print(f'{country} not found')

if __name__ == "__main__":
    fetch_safety_data("North Korea")