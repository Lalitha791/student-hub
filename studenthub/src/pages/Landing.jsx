import { useNavigate } from 'react-router-dom'
import './Landing.css'

function Landing() {

  const navigate = useNavigate()

  function handleStart() {
    navigate('/profile')
  }

  return (
    <div className="landing-page">

      {/* Background balls */}

      <div className="ball ball-one"></div>
      <div className="ball ball-two"></div>
      <div className="ball ball-three"></div>
      <div className="ball ball-four"></div>


      {/* Main content */}

      <div className="content">

        <p className="welcome">
          WELCOME TO
        </p>

        <h1>
          Student <span>Hub</span>
        </h1>

        <p className="description">
          Manage your student information easily
          in one simple place.
        </p>

        <button onClick={handleStart}>
          Let's Start
        </button>

      </div>

    </div>
  )
}

export default Landing