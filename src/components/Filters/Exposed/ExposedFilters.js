import React from 'react';
import filterIcon from './../../../img/filter-icon.svg';

const ExposedFilters = (props) => {
    const {genders,nationalities,exposedFilters} = props;
    return (
        <section className="row bg-white text-center font-size-1 font-weight-bold text-uppercase">
            <div className="col-sm-8 offset-sm-2">
                <div className="row">
                    <div className="col-sm-3 padding-top-1 ">
                        <div className="">
                            <span className="font-size-1 font-weight-bold">
                                <img src={filterIcon} alt="Filter Icon" />
                                &nbsp;
                                Filter By 
                            </span>
                        </div>
                    </div>
                    <div className="col-sm-3 padding-top-1 form-group">
                         <input type="date" className="form-control" id="posting-date-filter" value={exposedFilters.field_posting_date_value} onChange={(e)=>props.setExposedFilter('field_posting_date_value',e.target.value)}/>
                    </div>
                    <div className="col-sm-3 padding-top-1 form-group">
                        <select id="nationality-filter" className="form-control" value={exposedFilters.field_nationality_target_id} onChange={(e)=>props.setExposedFilter('field_nationality_target_id',e.target.value)}>
                            <option value="" >Nationality</option>
                            {
                                nationalities.map((nationality) => <option key={nationality.tid} value={nationality.tid} >{nationality.name}</option>)
                            }
                        </select>
                    </div>
                    <div className="col-sm-3 padding-top-1 form-group">
                        <select id="gender-filter" className="form-control" value={exposedFilters.field_gender_target_id} onChange={(e)=>props.setExposedFilter('field_gender_target_id',e.target.value)}>
                            <option value="" >Gender</option>
                            {
                                genders.map((gender) => <option key={gender.tid} value={gender.tid} >{gender.name}</option>)
                            }
                        </select>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ExposedFilters;