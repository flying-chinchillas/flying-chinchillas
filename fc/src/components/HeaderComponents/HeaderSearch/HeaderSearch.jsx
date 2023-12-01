import "./HeaderSearch.css";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSearch } from '@fortawesome/free-solid-svg-icons';
import * as React from "react";
import countryInfo from "../../../countryInfo.json";


export default function HeaderSearch(props) {
    const [baseCountries, setBaseCountries] = React.useState(Object.keys(countryInfo).sort());
    const [searchTerm, setSearchTerm] = React.useState("");

    function search() {
        let newCountryList = [];
        baseCountries.map( country => {
            if (country.toLowerCase().startsWith(searchTerm.toLowerCase())) {
                newCountryList.push(country);
            }
        })
        props.setCountryList(newCountryList);
        console.log('its happening o');
      }

    function handleTermChange(e) {
        const newTerm = e.target.value;
        setSearchTerm(newTerm);
      }

    function handleKeyPress(e) {
        if (e.key === 'Enter') {
            search(); 
        }
    }
    
    return (
        <div className={"header-search"}>
            {/* <FontAwesomeIcon icon={faSearch} className="search-icon" /> */}
            <input type="text" placeholder="Search for a Country..." onChange={handleTermChange} onKeyUp={handleKeyPress.bind(this)}></input>
            {/* <button className={"submit-button"}>Submit</button> */}
        </div>
    );
}