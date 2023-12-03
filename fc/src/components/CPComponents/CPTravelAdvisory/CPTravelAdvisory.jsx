import { useState } from 'react';

export default function CPTravelAdvisory(props) {
    const [rating, setRating] = useState([]);
    

    async function fetchSafetyData(country) {
        const targetUrl = "http://localhost:8000/";
        const response = await fetch(targetUrl + country);
        if (response.ok) {
            const jsonString = await response.json();
            setRating([jsonString['pub_data'], jsonString['safety']])
        }
        else if (!response.ok) {
            setRating(['error', 'country not found'])
        }
    }

    fetchSafetyData(props.country);

    return (
        <div className="rating">
            Rating - {rating[1]}
            <div className="pubdate">
                Updated on {rating[0]} 
            </div>
        </div>
    )
}
