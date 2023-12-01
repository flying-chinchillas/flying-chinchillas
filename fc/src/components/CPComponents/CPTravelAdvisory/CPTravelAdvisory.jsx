import Parser from 'rss-parser';
import axios from 'axios';

async function fetchSafetyData(country) {
    const parser = new Parser();
    const url = "https://travel.state.gov/_res/rss/TAsTWs.xml";
    const feed = await parser.parseURL(url);
    for(let entry of feed.items) {
        if(entry.title.includes(country)) {
            const safety = entry.categories[0];
            const pubDate = entry.pubDate.substring(5);
            return { pubDate, safety };
        }
    }
    console.log(`${country} not found`);
}

fetchSafetyData("North Korea").then(data => console.log(data));

// npm install rss-parser axios