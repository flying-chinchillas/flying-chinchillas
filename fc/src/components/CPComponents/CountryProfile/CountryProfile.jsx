import './CountryProfile.css';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { getDatabase, ref, set } from 'firebase/database';



export default function CountryProfile() {
    const { country } = useParams();

    // const [visibility, setVisibility] = React.useState("hidden");
    // function popUp() {
    //     if (visibility === "hidden") {
    //       setVisibility("visible");
    //     } else {
    //       setVisibility("hidden");
    //     }
    //   } 
    function writeCountryData(country){
        console.log('entering into database');
        const db = getDatabase();
        const reference = ref(db, 'country/' + country)
        set(reference, {
            name: country,
            rating: '3',
            date: 'today'
        });
        console.log('done');
    }
    writeCountryData(country);
    
    
    return (
        <main >        
            <section>
                <div>
                    <div> 
                        <h1> { country } </h1>

                        <div className="countryPic"> Picture of Country </div>

                        <div className="countryInfo"> 
                            <div id="cinf-ratings"> Ratings </div>
                            <div id="cinf-addons"> Add-ons </div>
                        </div>

                        <div className="reviews">
                            <div id="rev-header"> Reviews Header </div>
                            <div id="rev-section"> Reviews Section </div>
                        </div>
                        
                        <div className="vulnerableGroups">
                            <div id="vg-header"> Vulnerable Groups Header </div>
                            <div id="vg-section"> Groups Section </div>
                                <div id="children"> Children </div>
                                <div id="disabilities"> Disabilities </div>
                                <div id="lgbtq+"> LGBTQ+ </div>
                                <div id="race"> Race </div>
                                <div id="religion"> Religion </div>
                                <div id="senior-citizens"> Senior Citizens </div>
                                <div id="senior-citizens"> Senior Citizens </div>
                                <div id="solo-travel"> Solo Travel </div>
                                <div id="women"> Women </div>

                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

