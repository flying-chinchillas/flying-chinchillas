import "./HeaderSearch.css";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSearch } from '@fortawesome/free-solid-svg-icons';
import * as React from "react";
import Logout from '../../Logout/Logout';
import { useNavigate } from "react-router";
import countryInfo from "../../../countryInfo.json";


export default function HeaderSearch(props) {
    const [baseCountries] = React.useState(Object.keys(countryInfo).sort());
    const [searchTerm, setSearchTerm] = React.useState("");
    const navigate = useNavigate();

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

    function gotoProfile(){
        navigate('/userprofile')
    }

    function gotoDashboard(){
        navigate('/dashboard')
    }
    
    return (
        <div className={"header-search"}>
            <img src = {'https://firebasestorage.googleapis.com/v0/b/flying-chinchillas.appspot.com/o/Logo-flying-chinchilla.png?alt=media&token=04a409dc-c35b-4123-8f9f-d18112b2044a'} alt="Logo" className={"header-logo-image"} />
            <input type="text" placeholder="Search for a Country..." onChange={handleTermChange} onKeyUp={handleKeyPress.bind(this)}></input>
            <button className={"dashboard-button"} onClick={() => gotoDashboard()}></button>
            <button className={"profile-button"} onClick={() => gotoProfile()}></button>
            <Logout />
                
        </div>
    );
}