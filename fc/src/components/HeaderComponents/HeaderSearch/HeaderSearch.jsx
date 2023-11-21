import "./HeaderSearch.css";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSearch } from '@fortawesome/free-solid-svg-icons';
import * as React from "react";


export default function HeaderSearch() {
    
    return (
        <div className={"header-search"}>
            {/* <FontAwesomeIcon icon={faSearch} className="search-icon" /> */}
            <input type="text" placeholder="Search for a Country..."></input>
            {/* <button className={"submit-button"}>Submit</button> */}
        </div>
    );
}