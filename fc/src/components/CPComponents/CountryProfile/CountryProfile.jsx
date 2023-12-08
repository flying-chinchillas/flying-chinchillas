import "./CountryProfile.css";
import HeaderSearch from "../../HeaderComponents/HeaderSearch/HeaderSearch";
import React, { useEffect, useState } from 'react';
import CPMap from "../CPMap/CPMap";
import { getDatabase, ref, get, child } from "firebase/database";
import countryInfo from '../../../countryInfo.json';
import { useParams } from 'react-router-dom';
import CountryIcon from "../../DashboardComponents/CountryIcon/CountryIcon";
import CPTravelAdvisory from "../CPTravelAdvisory/CPTravelAdvisory";
import "@fontsource/mochiy-pop-p-one";
import '@fontsource-variable/montserrat';
import UpvoteButton from '../../ReviewComponents/UpvoteButton/UpvoteButton';
import DownvoteButton from '../../ReviewComponents/DownvoteButton/DownvoteButton';
import ReplyButton from '../../ReviewComponents/ReplyButton/ReplyButton';
import StarReview from "../../ReviewComponents/StarReview/StarReview";
import Button from 'react-bootstrap/Button';
import CreateReview from "../../ReviewComponents/CreateReview/CreateReview";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faSolidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faRegularHeart } from '@fortawesome/free-regular-svg-icons';
import { faMap as faSolidMap } from '@fortawesome/free-solid-svg-icons';
import { faMap as faRegularMap} from '@fortawesome/free-regular-svg-icons';
import ReviewDisplay from "../../ReviewComponents/ReviewDisplay/ReviewDisplay";

export default function CountryProfile() {
    const vulnerable_grps = ["senior-citizens", "children", "women", "race", "solo-travel", "lgbtq+", "disabilities", "religion", "all"];
    const { country } = useParams();
    const formattedCountryName = country.charAt(0).toUpperCase() + country.slice(1);
    const countryData = countryInfo[formattedCountryName];
    const position = [parseFloat(countryData.lat), parseFloat(countryData.long)];
    const [isFavorited, setIsFavorited] = useState(false);
    const [visited, setVisited] = useState(false);
    const [modalShow, setModalShow] = React.useState(false);
    const [reviews, setReviews] = useState([]);
    const [displayedReviews, setDisplayedReviews] = useState([]);

    function handleClick(grp) {
        if(grp == "all") {
            setDisplayedReviews(reviews);
        }
        else {
            const filteredRev = reviews.filter(function (review) {
                return review.tags.includes(grp);
            })
            setDisplayedReviews(filteredRev);
        }
      }
    const handleFavoriteClick = () => {
        setIsFavorited(!isFavorited);
    };
    const handleVisitedClick = () => {
        setVisited(!visited);
    }

    function getReviews() {
        const db = getDatabase();
        const countryRef = ref(db, `country/${country}/reviews`);

        get(countryRef).then((snapshot) => {
            if (snapshot.exists()) {
                const reviewIds = Object.values(snapshot.val());
                const reviewPromises = reviewIds.map(id => 
                    get(child(ref(db, 'review'), id))
                );

                Promise.all(reviewPromises).then(reviewSnapshots => {
                    const reviews = reviewSnapshots.map(snap => snap.val());
                    setReviews(reviews);
                    setDisplayedReviews(reviews);
                });
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    useEffect(getReviews);

  return (

<div className={"head-cp"}>
        <HeaderSearch/>
    <div className={"cp"}>
        <div className={"side-bar"}> 
            <CPMap position={position}/>
            <div className={"overall-rating"}>
                <div className={"o-r-header"}>
                    <CPTravelAdvisory country={country}/>
                </div>
                <div className={"o-r-subsection"}>
                    <div className={"o-r-s-flag"}>
                        Flag: <CountryIcon countryCode={countryData.code}/>
                    </div>
                    <div className={"o-r-s-code"}>
                        Country code: {countryData.code.toUpperCase()}
                    </div>
                </div>
            </div>
        </div>
        <div className={"reviews"}>
            <div className={"country-name"}>
                {country}
                <div className={`heart ${isFavorited ? 'clicked' : ''}`} onClick={handleFavoriteClick}>
                    {isFavorited ? 
                    <FontAwesomeIcon icon={faSolidHeart} style={{color: "#d9dbee",}} /> : 
                    <FontAwesomeIcon icon={faRegularHeart} style={{color: "#d9dbee",}} />
                    }
                </div>
                <div className={`location ${visited ? 'clicked' : ''}`} onClick={handleVisitedClick}>
                    {visited ? 
                    <FontAwesomeIcon icon={faSolidMap} style={{color: "#d9dbee",}} /> : 
                    <FontAwesomeIcon icon={faRegularMap} style={{color: "#d9dbee",}} /> 
                    }
                </div>
            </div>
            <div className={"review-header"}>Reviews
                <Button variant="primary" onClick={() => setModalShow(true)}> + </Button>
                <CreateReview  
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    country={country}
                    getReviews={getReviews}
                />                
            </div>
            <div className={"review-display"}>
                <ReviewDisplay displayedReviews={displayedReviews}/>
            </div>
        </div>
        <div className={"v-groups-display"}>
            <div className={"v-groups-header"}>Vulnerable Groups</div>
            {vulnerable_grps.map((grp) => (
                <button className={"vulnerable-tab"} key={grp} onClick={() => handleClick(grp)}>
                    {grp} 
                </button>
                )
            )}
        </div>
    </div>
</div>
);
}
