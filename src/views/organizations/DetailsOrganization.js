import React, { useEffect, useState } from 'react'
import 'react-circular-progressbar/dist/styles.css';
import Axios from "../../actions/Index";
import Loading from "../../containers/Loader";
import SubscriptionsPlan from "./SubscriptionsPlan";
import InfoOrganization from "./InfoOrganization";
import SubscriptionsHistory from "./SubscriptionsHistory";

function DetailsOrganizations (data) {

    const [loader, setLoader]               = useState(true);
    const [allData, setAllData]             = useState(null);

    function fetchData(){

        if(data.location.id === undefined || data.location.id === null){

            data.history.push('/organizations/organizations');

        }else {
            Axios(null, 'organizations/' + data.location.id.id, 'GET').then((response) => {
                setLoader(false);
                setAllData(response.data)
            }).catch((err) => {
                console.log('err ---', err)
                setLoader(false);
            });
        }

    }

    useEffect(() => {
        fetchData();
    }, [setAllData]);

    function loadBody() {
        if (loader) {
            return <Loading name="loadBody" value="please wait ..." />;
        }
    }

    return (
        <div className="position-relative">
            {loadBody()}

            {
                allData ?
                    <>
                        <InfoOrganization data={allData} />
                        <SubscriptionsPlan data={allData.activeSubscription} />
                        <SubscriptionsHistory data={allData.subscriptionHistory} />
                    </>
                    :
                    null
            }

        </div>
    )
}

export default DetailsOrganizations
