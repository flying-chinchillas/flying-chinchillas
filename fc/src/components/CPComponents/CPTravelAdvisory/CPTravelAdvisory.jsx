import { icon } from 'leaflet';
import { useState, useEffect } from 'react';

export default function CPTravelAdvisory(props) {
    const [rating, setRating] = useState([]);
    const [iconSrc, setIconSrc] = useState(null);

    useEffect(() => {
        const fetchIconSrc = async () => {
            const src = await getIconSrc();
            setIconSrc(src);
        };
    
        fetchIconSrc();
    }, [rating]);  

    useEffect(() => {
        async function fetchData() {
            try {
                const targetUrl = "http://localhost:8000/info/";
                const response = await fetch(targetUrl + props.country);

                if (response.ok) {
                    const jsonString = await response.json();
                    setRating([jsonString['date'], jsonString['safety']]);
                } else {
                    setRating(['error', 'country not found']);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        // Only fetch data if props.country has changed
        if (props.country) {
            fetchData();
        }
    }, [props.country]);

    const getIconSrc = async () => {
        return new Promise((resolve, reject) => {
            
            try{
                const levelNum = parseInt(rating[1].split(" ")[1]);
                console.log(levelNum)
                switch (levelNum) {
                    case 1:
                        resolve("https://firebasestorage.googleapis.com/v0/b/flying-chinchillas.appspot.com/o/Great1.png?alt=media&token=8dd36ebc-8440-4c5b-9856-1676404fc2a2");
                        break;
                    case 2:
                        resolve("https://firebasestorage.googleapis.com/v0/b/flying-chinchillas.appspot.com/o/Okay2.png?alt=media&token=aa2d3a58-f71d-4474-ab5f-232d70bc97cd");
                        break;
                    case 3:
                        resolve("https://firebasestorage.googleapis.com/v0/b/flying-chinchillas.appspot.com/o/Sad3.png?alt=media&token=d583bee5-4039-4cf0-9549-262bb5037c29");
                        break;
                    default:
                        resolve("https://firebasestorage.googleapis.com/v0/b/flying-chinchillas.appspot.com/o/Crying4.png?alt=media&token=cbbcd86a-ba89-4394-a1c3-0a63c7271d20");
                        break;
                }
            }catch{

                }
        });
    };

    return (
        <div className="rating">
            <img src={iconSrc} alt={`Rating ${rating[1]}`} />
            <div className="pubdate">
                Rating - {rating[1]}
                <div className="pubdate">
                    Updated on {rating[0]}
                </div>
            </div>
        </div>
    );
}
