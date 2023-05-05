import './index.css'

import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

const Header = props => {
  const {history} = props
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="nav-container">
      <ul className="ul-list-header">
        <Link to="/" className="link-item">
          <li className="list-item-header">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="logo"
            />
          </li>
        </Link>
        <li className="list-item-header">
          <ul className="header-un-ordered-list">
            <Link to="/" className="link-item">
              <li className="list-item">Home</li>
            </Link>
            <Link to="/jobs" className="link-item">
              <li className="list-item">Jobs</li>
            </Link>
          </ul>
        </li>
        <li className="list-item-header">
          <button
            type="button"
            className="log-out-button"
            onClick={onClickLogout}
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default withRouter(Header)
