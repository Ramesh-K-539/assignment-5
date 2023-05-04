import './index.css'

import {Link} from 'react-router-dom'

import Header from '../Header'

const Home = () => (
  <div className="home-container">
    <Header />
    <div className="inside-home-container">
      <h1 className="home-page-title">Find The Job That Fits Your Life</h1>
      <p className="home-page-description">
        Millions of people are searching for jobs, salary information, company
        reviews. Find the job that fits your abilities and potential.
      </p>
      <Link to="/jobs" className="link-item">
        <button type="button" className="find-jobs-button">
          Find Jobs
        </button>
      </Link>
    </div>
  </div>
)

export default Home