import React from 'react';
import SingleJobCard from "../SingleJobCard/SingleJobCard";

const JobCardsContainer = (props) => {
    return (
        <section className="row bg-grey font-size-1 padding-top-3 padding-bottom-1">
            <div className="col-sm-10 offset-sm-1">
                <div className="row">
                    {
                        props.jobs.map((singleJob) => <SingleJobCard key={singleJob.nid} job={singleJob} />)
                    }
                </div>
            </div>
        </section>
    )
}

export default JobCardsContainer;