import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {AiFillStar} from 'react-icons/ai'
import {TiLocation} from 'react-icons/ti'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {GrShare} from 'react-icons/gr'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import SimilarJobs from '../SimilarJobs'

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class JobDetails extends Component {
  state = {
    jobDetailsList: {},
    skills: [],
    similarJobsList: [],
    status: apiStatus.initial,
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({status: apiStatus.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const JD = fetchedData.job_details
      const JDL = JD.life_at_company
      const updatedData = {
        companyLogoUrl: JD.company_logo_url,
        companyWebsiteUrl: JD.company_website_url,
        location: JD.location,
        packagePerAnnum: JD.package_per_annum,
        rating: JD.rating,
        id: JD.id,
        employmentType: JD.employment_type,
        jobDescription: JD.job_description,
        description: JDL.description,
        imageUrl: JDL.image_url,
        title: JD.title,
      }

      const updatedSkills = JD.skills.map(eachSkill => ({
        imageUrl: eachSkill.image_url,
        name: eachSkill.name,
      }))

      const updatedSimilarJobsLIst = fetchedData.similar_jobs.map(
        eachSimilar => ({
          companyLogoUrl: eachSimilar.company_logo_url,
          employmentType: eachSimilar.employment_type,
          id: eachSimilar.id,
          jobDescription: eachSimilar.job_description,
          location: eachSimilar.location,
          rating: eachSimilar.rating,
          title: eachSimilar.title,
        }),
      )

      console.log(updatedSimilarJobsLIst)

      this.setState({
        jobDetailsList: updatedData,
        skills: updatedSkills,
        similarJobsList: updatedSimilarJobsLIst,
        status: apiStatus.success,
      })
    } else {
      this.setState({status: apiStatus.failure})
    }
  }

  retryTwo = () => {
    this.getJobDetails()
  }

  getSuccessView = () => {
    const {jobDetailsList, skills, similarJobsList} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      location,
      rating,
      employmentType,
      jobDescription,
      packagePerAnnum,
      title,
      description,
      imageUrl,
    } = jobDetailsList

    return (
      <>
        <div className="particular-job-container">
          <div className="company-and-job-name">
            <img
              src={companyLogoUrl}
              alt="company logo"
              className="company-logo"
            />
            <div>
              <h1 className="job-title">{title}</h1>
              <div className="rating-container">
                <AiFillStar className="rating-img" />
                <p className="rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="location-and-others-container">
            <div className="location-cont">
              <div className="location-cont">
                <TiLocation className="location-icon" />
                <p className="location-text">{location}</p>
              </div>
              <div className="location-cont">
                <BsFillBriefcaseFill className="location-icon" />
                <p className="location-text">{employmentType}</p>
              </div>
            </div>
            <p className="rating">{packagePerAnnum}</p>
          </div>
          <hr className="hr-line" />
          <div className="location-and-others-container">
            <h1 className="job-description">Description</h1>
            <a href={companyWebsiteUrl} className="visit-text">
              Visit
              <GrShare className="share-icon" />
            </a>
          </div>
          <p className="description-paragraph">{jobDescription}</p>
          <h1 className="job-description">Skills</h1>
          <ul className="skills-ul-list">
            {skills.map(eachSkill => (
              <li className="skill-list-item" key={eachSkill.name}>
                <img
                  src={eachSkill.imageUrl}
                  alt={eachSkill.name}
                  className="skill-img"
                />
                <p className="skill-name">{eachSkill.name}</p>
              </li>
            ))}
          </ul>
          <h1 className="job-description">Life at Company</h1>
          <div className="life-at-company-container">
            <p className="description-paragraph li-description">
              {description}
            </p>
            <img
              src={imageUrl}
              alt="life at company"
              className="li-at-com-image"
            />
          </div>
        </div>
        <h1 className="similar-jobs-text">Similar Jobs</h1>
        <ul className="similar-jobs-ul-list">
          {similarJobsList.map(eachJob => (
            <SimilarJobs similarJobsDetails={eachJob} />
          ))}
        </ul>
      </>
    )
  }

  getLoadingView = () => (
    <div className="loader-container load" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

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
      <button className="retry-button" type="button" onClick={this.retryTwo}>
        Retry
      </button>
    </div>
  )

  renderViews = () => {
    const {status} = this.state
    switch (status) {
      case apiStatus.success:
        return this.getSuccessView()
      case apiStatus.inProgress:
        return this.getLoadingView()
      case apiStatus.failure:
        return this.getFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="job-details-container">
        <Header />
        {this.renderViews()}
      </div>
    )
  }
}

export default JobDetails
