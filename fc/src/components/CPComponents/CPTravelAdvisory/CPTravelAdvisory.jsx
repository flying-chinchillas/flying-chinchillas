import axios from 'axios';
import { useState } from 'react';

export default function CPTravelAdvisory() {
    const [rating, setRating] = useState("");

    async function fetchSafetyData(country) {
        const proxyUrl = "https://cors-anywhere.herokuapp.com/";
        const targetUrl = "https://travel.state.gov/_res/rss/TAsTWs.xml";
        const response = await fetch(proxyUrl + targetUrl);
        const xmlString = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlString, "text/xml");
        const items = xmlDoc.getElementsByTagName('item');
        for(let i = 0; i < items.length; i++) {
            const title = items[i].getElementsByTagName('title')[0].textContent;
            if(title.includes(country)) {
                const safety = items[i].getElementsByTagName('category')[0].textContent;
                const pubDate = items[i].getElementsByTagName('pubDate')[0].textContent.substring(5);
                return { pubDate, safety };
            }
        }
        console.log(`${country} not found`);
    }

    fetchSafetyData("South Korea").then(data => setRating(data));

    return (
        <div className="rating">
            Rating: {rating}
            <div className="pubdate">
                Updated on {rating} 
            </div>
        </div>
    )
}
    // npm install rss-parser axios