import './index.css'
import {Link} from 'react-router-dom'

import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch, BsFillBriefcaseFill} from 'react-icons/bs'
import {AiFillStar} from 'react-icons/ai'
import {TiLocation} from 'react-icons/ti'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import Profile from '../Profile'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class Jobs extends Component {
  state = {
    employmentType: [],
    salaryRange: '',
    searchInput: '',
    jobsList: [],
    status: apiStatus.initial,
  }

  componentDidMount() {
    this.getJobsList()
  }

  getJobsList = async () => {
    const {employmentType, salaryRange, searchInput} = this.state
    this.setState({status: apiStatus.inProgress})

    const jwtToken = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentType}&minimum_package=${salaryRange}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    console.log(response)
    if (response.ok === true) {
      const fetchedData = await response.json()
      console.log(fetchedData)
      const updatedList = fetchedData.jobs.map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        id: eachItem.id,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        packagePerAnnum: eachItem.package_per_annum,
        rating: eachItem.rating,
        title: eachItem.title,
      }))
      this.setState({jobsList: updatedList, status: apiStatus.success})
    } else {
      this.setState({status: apiStatus.failure})
    }
  }

  getSalaryRange = event => {
    this.setState({salaryRange: event.target.id}, this.getJobsList)
  }

  getEmploymentType = event => {
    const {employmentType} = this.state
    const notInList = employmentType.filter(each => each === event.target.id)

    if (notInList.length === 0) {
      this.setState(
        prevState => ({
          employmentType: [...prevState.employmentType, event.target.id],
        }),
        this.getJobsList,
      )
    } else {
      const filteredData = employmentType.filter(
        each => each !== event.target.id,
      )
      this.setState({employmentType: filteredData}, this.getJobsList)
    }
  }

  getSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  searchJob = () => {
    this.getJobsList()
  }

  getJobsListDetails = () => {
    const {jobsList} = this.state
    const noJobs = jobsList.length === 0

    return noJobs ? (
      <div className="failure-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
          className="failure-img"
        />
        <h1 className="failure-heading">No Jobs Found</h1>
        <p className="failure-description">
          We could not find any jobs Try others filters
        </p>
      </div>
    ) : (
      <ul className="ul-list">
        {jobsList.map(eachJob => (
          <Link to={`/jobs/${eachJob.id}`} className="link-item">
            <li className="job-list-item" key={eachJob.id}>
              <div className="company-and-job-name">
                <img
                  src={eachJob.companyLogoUrl}
                  alt="company logo"
                  className="company-logo"
                />
                <div>
                  <h1 className="job-title">{eachJob.title}</h1>
                  <div className="rating-container">
                    <AiFillStar className="rating-img" />
                    <p className="rating">{eachJob.rating}</p>
                  </div>
                </div>
              </div>
              <div className="location-and-others-container">
                <div className="location-cont">
                  <div className="location-cont">
                    <TiLocation className="location-icon" />
                    <p className="location-text">{eachJob.location}</p>
                  </div>
                  <div className="location-cont">
                    <BsFillBriefcaseFill className="location-icon" />
                    <p className="location-text">{eachJob.employmentType}</p>
                  </div>
                </div>
                <p className="rating">{eachJob.packagePerAnnum}</p>
              </div>
              <hr className="hr-line" />
              <h1 className="job-description">Description</h1>
              <p className="description-paragraph">{eachJob.jobDescription}</p>
            </li>
          </Link>
        ))}
      </ul>
    )
  }

  retry = () => {
    this.getJobsList()
  }

  getFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button className="retry-button" type="button" onClick={this.retry}>
        Retry
      </button>
    </div>
  )

  getLoadingView = () => (
    <div className="loader-container loading" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobsList = () => {
    const {status} = this.state

    switch (status) {
      case apiStatus.success:
        return this.getJobsListDetails()
      case apiStatus.failure:
        return this.getFailureView()
      case apiStatus.inProgress:
        return this.getLoadingView()
      default:
        return null
    }
  }

  render() {
    const {searchInput} = this.state

    return (
      <div className="jobs-container">
        <Header />
        <div className="jobs-inside-container">
          <div className="side-nav-bar-container">
            <Profile />
            <hr className="horizontal-line" />
            <h1 className="filters-heading">Type of Employment</h1>
            <ul className="ul-list">
              {employmentTypesList.map(eachType => (
                <li className="list-item" key={eachType.employmentTypeId}>
                  <input
                    type="checkbox"
                    id={eachType.employmentTypeId}
                    className="checkbox"
                    onChange={this.getEmploymentType}
                  />
                  <label
                    htmlFor={eachType.employmentTypeId}
                    className="label-text"
                  >
                    {eachType.label}
                  </label>
                </li>
              ))}
            </ul>
            <hr className="horizontal-line" />
            <h1 className="filters-heading">Salary Range</h1>
            <ul className="ul-list">
              {salaryRangesList.map(eachRange => (
                <li className="list-item" key={eachRange.salaryRangeId}>
                  <input
                    type="radio"
                    name="option"
                    id={eachRange.salaryRangeId}
                    className="checkbox"
                    onChange={this.getSalaryRange}
                  />
                  <label
                    htmlFor={eachRange.salaryRangeId}
                    className="label-text"
                  >
                    {eachRange.label}
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <div className="jobs-list-container">
            <div className="search-bar-container">
              <input
                type="search"
                className="search-bar"
                placeholder="Search"
                value={searchInput}
                onChange={this.getSearchInput}
              />
              <button
                type="button"
                data-testid="searchButton"
                className="search-btn"
                onClick={this.searchJob}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            {this.renderJobsList()}
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
