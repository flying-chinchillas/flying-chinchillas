import "./CountryProfile.css";
import * as React from "react";
import CPMap from "../CPMap/CPMap";
import countryInfo from '../../../countryInfo.json';
import { useParams } from 'react-router-dom';
import CountryIcon from "../../DashboardComponents/CountryIcon/CountryIcon";

export default function CountryProfile() {
    const temp_reviews = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const vulnerable_grps = ["Senior Citizens", "Children", "Women", "Race", "Solo Travel", "LGBTQ+", "Disabilities", "Religion"];
    const { country } = useParams();
    const formattedCountryName = country.charAt(0).toUpperCase() + country.slice(1);
    const countryData = countryInfo[formattedCountryName];
    const position = [parseFloat(countryData.lat), parseFloat(countryData.long)];

    function handleClick(country) {
        console.log('its happening o');
      }

  return (
    <div className={"cp"}>
        <div className={"side-bar"}> 
            <CPMap position={position}/>
            <div className={"overall-rating"}>
                <div className={"o-r-header"}>
                    Rating: <img src={"https://firebasestorage.googleapis.com/v0/b/flying-chinchillas.appspot.com/o/happy-chinchilla.png?alt=media&token=4cfaa0bf-1eb9-49ef-8612-41618227638c"} alt="Rating" className={"rating-image"}/>
                </div>
                Flag: <CountryIcon countryCode={countryData.code}/>
                Rating published date:
                Country code: {countryData.code.toUpperCase()}
                
            </div>
        </div>
        <div className={"reviews"}>
            <div className={"country-name"}>{country}</div>
            <div className={"review-header"}>Reviews:</div>
            <div className={"review-display"}>
                {temp_reviews.map((review) => (
                    <div className={"country-review"} key={review}>
                        {review}
                    </div>
                    )
                )}
            </div>
        </div>
        <div className={"v-groups-display"}>
            {vulnerable_grps.map((grp) => (
                <button className={"vulnerable-tab"} key={grp} onClick={() => handleClick(grp)}>
                    {grp} 
                </button>
                )
            )}
        </div>
    </div>
  );
}
