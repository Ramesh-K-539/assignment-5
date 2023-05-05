import './index.css'
import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {TiLocation} from 'react-icons/ti'
import {BsFillBriefcaseFill} from 'react-icons/bs'

const SimilarJobs = props => {
  const {similarJobsDetails} = props
  const {
    id,
    companyLogoUrl,
    title,
    rating,
    jobDescription,
    location,
    employmentType,
  } = similarJobsDetails
  return (
    <Link to={`/jobs/${id}`} className="link-item">
      <li className="similar-job-list-item" key={id}>
        <div className="company-and-job-name">
          <img
            src={companyLogoUrl}
            alt="similar job company logo"
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
        <h1 className="job-description">Description</h1>
        <p className="description-paragraph add-description">
          {jobDescription}
        </p>
        <ul className="location-cont">
          <li className="location-cont" key="location">
            <TiLocation className="location-icon" />
            <p className="location-text">{location}</p>
          </li>
          <li className="location-cont" key="employment_type">
            <BsFillBriefcaseFill className="location-icon" />
            <p className="location-text">{employmentType}</p>
          </li>
        </ul>
      </li>
    </Link>
  )
}

export default SimilarJobs
