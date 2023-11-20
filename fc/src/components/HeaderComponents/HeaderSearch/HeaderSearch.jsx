import "./HeaderSearch.css";
import * as React from "react";


export default function HeaderSearch() {
    
    return (
        <div className={"header-search"}>
            <input type="text" placeholder="Search for a Country..."></input>
            {/* <button className={"submit-button"}>Submit</button> */}
        </div>
    );
}