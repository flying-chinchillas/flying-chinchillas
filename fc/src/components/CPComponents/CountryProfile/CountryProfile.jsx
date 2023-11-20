import "./CountryProfile.css";
import HeaderSearch from "../../HeaderComponents/HeaderSearch/HeaderSearch";

export default function CountryProfile() {
    const temp_reviews = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const vulnerable_grps = ["Senior Citizens", "Children", "Women", "Race", "Solo Travel", "LGBTQ+", "Disabilities", "Religion"];

  return (
    <div className={"head-cp"}>
        <HeaderSearch/>
        <div className={"cp"}>
            <div className={"side-bar"}> 
                <img src={'https://cdn.pixabay.com/photo/2012/04/10/23/23/ecuador-26986_960_720.png'} alt="Flag" className={"flag-image"}/>
                <div className={"overall-rating"}>
                    <div className={"o-r-header"}>
                        <img src={"https://firebasestorage.googleapis.com/v0/b/flying-chinchillas.appspot.com/o/happy-chinchilla.png?alt=media&token=4cfaa0bf-1eb9-49ef-8612-41618227638c"} alt="Rating" className={"rating-image"}/>
                    </div>
                </div>
            </div>
            <div className={"reviews"}>
                <div className={"country-name"}>Name of Country</div>
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
                    <div className={"vulnerable-tab"} key={grp}>
                        {grp}
                    </div>
                    )
                )}
            </div>
        </div>
    </div>
  );
}