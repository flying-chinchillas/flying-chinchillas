import "./CountryIcon.css";
import * as React from "react";

export default function CountryIcon({countryCode}) {
  const iconUrl = `https://flagcdn.com/${countryCode}.svg`;

  return (
    <div className={"cp-icon"}>
        <img id={"country-code"} src={iconUrl} alt='Flag'/>
    </div>
  );
}