import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'

class Profile extends Component {
  state = {employeeDetails: '', isCheck: false}

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')

    const url = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)

    if (response.ok === true) {
      const fetchedData = await response.json()
      console.log(fetchedData)
      const details = fetchedData.profile_details
      const updatedData = {
        name: details.name,
        profileImageUrl: details.profile_image_url,
        shortBio: details.short_bio,
      }
      this.setState({employeeDetails: updatedData})
    } else {
      this.setState({isCheck: true})
    }
  }

  retryProfile = () => {
    this.getProfileDetails()
  }

  render() {
    const {employeeDetails, isCheck} = this.state
    const {name, profileImageUrl, shortBio} = employeeDetails
    return isCheck ? (
      <div className="retry-container">
        <button type="button" className="retry-btn" onClick={this.retryProfile}>
          Retry
        </button>
      </div>
    ) : (
      <div className="profile-container" key={profileImageUrl}>
        <img
          src={profileImageUrl}
          className="profile-pic"
          alt="profile"
          key={profileImageUrl}
        />
        <h1 className="employee-name">{name}</h1>
        <p className="bio">{shortBio}</p>
      </div>
    )
  }
}

export default Profile
