import "./Dashboard.css";
import * as React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import Logout from '../../Logout/Logout';
import CountryIcon from "../CountryIcon/CountryIcon";
import countryInfo from "../../../countryInfo.json";
import "@fontsource/mochiy-pop-p-one";
import '@fontsource-variable/montserrat';
import HeaderSearch from "../../HeaderComponents/HeaderSearch/HeaderSearch";

export default function Dashboard() {
  const navigate = useNavigate();
  const [visibility, setVisibility] = React.useState("hidden");
  const [countryList, setCountryList] = React.useState(Object.keys(countryInfo).sort());

  function popUp() {
    if (visibility === "hidden") {
      setVisibility("visible");
    } else {
      setVisibility("hidden");
    }
  } 

  function handleClick(country) {
    console.log('its happening o');
    navigate(`/countryprofile/${country}`);
  }

  // temporary-delete
  function gotoProfile(){
    navigate('/userprofile')
  }

  return (
    <div className={"dash"}>
      <div className={"dash-search"}>
      <button className={"profile-button"} onClick={() => gotoProfile()}>Profile</button>
      <Logout />
      <HeaderSearch countryList={countryList} setCountryList={setCountryList}/>
      </div>
      <div className={"country-grid"}>
        {/* {countries.map((country) => ( */}
        {countryList.map((country) => (
        <button id={"country-name"} key={country} onClick={() => handleClick(country)}>
          <CountryIcon countryCode={countryInfo[country].code} />
          {country}
        </button>)
        )}
      </div>
    </div>
  );
}
