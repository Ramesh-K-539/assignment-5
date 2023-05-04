import './index.css'
import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'

const SimilarJobs = props => {
  const {similarJobsDetails} = props
  const {id, companyLogoUrl, title, rating, jobDescription} = similarJobsDetails
  return (
    <Link to={`/jobs/${id}`} className="link-item">
      <li className="similar-job-list-item">
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
        <h1 className="job-description">Description</h1>
        <p className="description-paragraph add-description">
          {jobDescription}
        </p>
      </li>
    </Link>
  )
}

export default SimilarJobs
