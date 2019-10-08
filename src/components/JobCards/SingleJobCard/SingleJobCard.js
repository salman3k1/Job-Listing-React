import React from 'react';
import bellIcon from './../../../img/bell.svg';

const SingleJobCard = (props) => {
    const {job} = props;
    return (
        <div className="col-sm-6">
            <div className="job-card">
                <div className="row">
                    <div className="col-sm-2 text-center">
                        <img src={bellIcon} alt="Filter Icon" />
                    </div>
                    <div className="col-sm-7">
                        <div className="row font-size-2 font-weight-bold text-uppercase">
                            {job.title}
                    </div>
                        <div className="row font-size-1 font-color-grey">
                        {job.field_posting_date}
                    </div>
                    </div>
                    <div className="col-sm-3 font-size-1 text-uppercase">
                        <span className="jobCategory">{job.field_job_categ_export.title}</span>
                    </div>
                </div>
                <div className="row description">
                    <div className="col-sm-10 text-left offset-sm-1">
                        {job.field_job_description}
                    </div>
                </div>
                <div className="row description text-center">
                    <div className="col-sm-10 offset-sm-1">
                        <div className="row">
                            <div className="col-sm-4">
                                <div className="row font-weight-bold text-uppercase">
                                    <span className="col-sm-12">Nationality</span>
                                </div>
                                <div className="row">
                                    <span className="col-sm-12">{job.field_nationality_export.title}</span>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="row font-weight-bold text-uppercase">
                                    <span className="col-sm-12">Salary</span>
                                </div>
                                <div className="row">
                                    <span className="col-sm-12">{job.field_salary}</span>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="row font-weight-bold text-uppercase">
                                    <span className="col-sm-12">Last Date</span>
                                </div>
                                <div className="row">
                                    <span className="col-sm-12">{job.field_last_date}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="apply text-center">
                    <a href="#" className="applyButton">Apply and Offer</a>
                </div>
            </div>
        </div>
    )
}

export default SingleJobCard;