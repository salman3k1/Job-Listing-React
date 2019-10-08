import React from 'react';
import bellIcon from './img/bell.svg';
import prototypeLogo from './img/prototype.svg';
import axios from 'axios';

import './App.css';
import JobCardsContainer from './components/JobCards/JobCardsContainer/JobCardsContainer';
import ExposedFilters from './components/Filters/Exposed/ExposedFilters';

class App extends React.Component {
    webClient = null;
    state = {
        nationalities:[],
        genders:[],
        jobList: {
            currentPage:0,
            jobs:[],
            exposedFilters:{
                field_posting_date_value: '',
                field_nationality_target_id: '',
                field_gender_target_id: '',
            },
            contextualFilters:{
                jobCategory: 'all'
            },
        }
    };

    componentWillMount(){
        this.webClient = axios.create({
            baseURL: 'http://joblisting.test/api',
          });
        this.loadNationalities();
        this.loadGenders();
        this.loadJobs(false);

    }

    loadJobs(append = false){
        const {jobList} = this.state;
        const exposedFilters = this.getExposedFiltersForRequest();
        this.webClient.get(
            `joblisting/${jobList.contextualFilters.jobCategory}`,
            {
              params: {
                  _format: 'json',
                  ...exposedFilters,
                  page:jobList.currentPage,

              }
            }
          ).then((jobsReceived)=>{
              if(append){
                this.appendToJobs(jobsReceived.data);
              }else{
                this.resetJobs(jobsReceived.data);
              }
            
          });
    }

    loadNationalities(){
        this.webClient.get(
            `nationalities`,
            {
              params: {
                  _format: 'json',
              }
            }
          ).then((nationalitiesReceived)=>{
            this.setState({nationalities:nationalitiesReceived.data});
          });
    }

    loadGenders(){
        this.webClient.get(
            `genders`,
            {
              params: {
                  _format: 'json',
              }
            }
          ).then((gendersReceived)=>{
            this.setState({genders:gendersReceived.data});
          });
    }

    appendToJobs(jobs){
        this.setState({
            jobList: {
                ...this.state.jobList,
                jobs:this.state.jobList.jobs.concat(jobs),
                currentPage: jobs.length === 0 ? null : this.state.jobList.currentPage,
            }
        });
    }

    resetJobs(jobs){
        this.setState({
            jobList: {
                ...this.state.jobList,
                jobs,
                currentPage:jobs.length === 0 ? null : 0,
            }
        });
    }

    setExposedFilter = (filterKey, value) => {
        const exposedFilters = {...this.state.jobList.exposedFilters};
        exposedFilters[filterKey] = value;
        this.setState({
            jobList: {
                ...this.state.jobList,
                exposedFilters,
            }
        }, ()=>{
            
            this.loadJobs(false);
        });
    }

    getExposedFiltersForRequest(){
        // We need to send a null value for a filter to the backend if we don't want to apply it
        // If we keep it null react complains when binding
        // So keeping it an empty string for bindings and converting to null for the sake of web request
        const exposedFilters = {};
        for(let filterKey in this.state.jobList.exposedFilters){
            const filterVal = this.state.jobList.exposedFilters[filterKey].toString().trim();
            exposedFilters[filterKey] = filterVal !== '' ? filterVal : null;
        }
        return exposedFilters;
    }

    setContextualFilter = (filterKey, value) => {
        const contextualFilters = {...this.state.jobList.contextualFilters};
        contextualFilters[filterKey] = value;
        this.setState({
            jobList: {
                ...this.state.jobList,
                contextualFilters,
            }
        }, ()=>{
            this.loadJobs(false);
        });
    }

    loadNextPage(){
        if(this.state.jobList.currentPage !== null){
            // Increment page number
            this.setState({
                jobList: {
                    ...this.state.jobList,
                    currentPage:this.state.jobList.currentPage+1,
                }
            },()=>{
                this.loadJobs(true);
            });
        }
    }

    render(){
        return (
            <div className="App">
                <div className="container-fluid ">
                    <header className="row frontpage-header text-center">
                        <div className="col-sm-3 height-200">
                            <img className="logo center-vert " src={prototypeLogo} />
                        </div>
                        <nav className="col-sm-6">
                            <ul>
                                <li className="float-left">Working With Us</li>
                                <li className="float-left">How We Hire</li>
                            </ul>
                        </nav>
                        <div className="col-sm-3 height-200">
                            <img className="logo center-vert " src={prototypeLogo} />
                        </div>
                    </header>
                    <section className="row bg-white text-uppercase">
                        <div className="col-sm-10 offset-sm-1">
                            <div className="row">
                                <div className="col-sm-4 text-center padding-top-1">
                                    <div className="pointer" onClick={()=>{this.setContextualFilter('jobCategory','managerial')}} >
                                        <h3 className="font-size-1">I am looking for </h3>
                                        <h1 className="font-size-3">Managerial Jobs</h1>
                                        {
                                            this.state.jobList.contextualFilters.jobCategory === "managerial" &&
                                            <div className="tabbed-filter-selected"></div>
                                        }
                                    </div>
                                </div>
                                <div className="col-sm-4 text-center  padding-top-1 pointer" onClick={()=>{this.setContextualFilter('jobCategory','development')}}>
                                    <div className="">
                                        <h3 className="font-size-1"> I am looking for </h3>
                                        <h1 className="font-size-3">Development Jobs</h1>
                                        {
                                            this.state.jobList.contextualFilters.jobCategory === "development" &&
                                            <div className="tabbed-filter-selected"></div>
                                        }
                                    </div>
                                </div>
                                <div className="col-sm-4 text-center  padding-top-1 pointer" onClick={()=>{this.setContextualFilter('jobCategory','all')}}>
                                    <div className="">
                                        <h3 className="font-size-1">Show Me</h3>
                                        <h1 className="font-size-3">All Jobs</h1>
                                        {
                                            this.state.jobList.contextualFilters.jobCategory === "all" &&
                                            <div className="tabbed-filter-selected"></div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <ExposedFilters genders={this.state.genders}
                                    nationalities={this.state.nationalities} 
                                    setExposedFilter={this.setExposedFilter} 
                                    exposedFilters={this.state.jobList.exposedFilters} />
                    <section className="row bg-white text-center font-size-1 font-weight-bold padding-top-2 text-uppercase">
                        <div className="col-sm-4 offset-sm-4">
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="">
                                        <span className="font-size-1 font-weight-bold">
                                            <img src={bellIcon} alt="Filter Icon" />
                                            &nbsp;Create Email Notification
                      </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <JobCardsContainer jobs={this.state.jobList.jobs} />
                    <div className="row padding-bottom-1 bg-grey">
                        <div className="col-sm-12">
                            {
                                this.state.jobList.currentPage !== null &&
                                <button className="button-2" onClick={this.loadNextPage.bind(this)}>Load More</button>
                            }
                        </div>
                    </div>
                    <footer className="row padding-top-1 padding-bottom-1 font-size-1">
                        <div className="col-sm-10 offset-sm-2">
                            <div className="row">
                                <div className="col-sm-9">
                                    <div className="row">
                                        <div className="col-sm-4 footer-item">
                                            Terms & Conditions
                                </div>
                                        <div className="col-sm-4 footer-item">
                                            News
                                </div>
                                        <div className="col-sm-4 footer-item">
                                            Working Wih Us
                                </div>
                                        <div className="col-sm-4 footer-item">
                                            FAQ
                                </div>
                                        <div className="col-sm-4 footer-item">
                                            Sitemap
                                </div>
                                        <div className="col-sm-4 footer-item">
                                            Careers
                                </div>
                                        <div className="col-sm-4 footer-item">
                                            Privacy
                                </div>
                                        <div className="col-sm-4 footer-item">
                                            Login
                                </div>
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <div className="row">
                                        <div className="col-sm-12">
                                            Follow Us
                                </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-12">
                                            Icons Here
                                </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        );
    }
   
}

export default App;
