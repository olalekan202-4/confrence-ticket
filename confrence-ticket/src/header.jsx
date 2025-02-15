import Logo from './assets/navbar-logo.png'
function Header () {
  return (
    <div>
      <div className = "nav">
        <div>
          <img src={Logo} alt="logo" />
        </div>
        <div className = "nav-mid">
          <div>Events</div>
          <div>My Tickets</div>
          <div>About Project</div>
        </div>
        <div className="my-tickets">MY TICKETS →</div>
      </div>
    </div>
    
  )
} 

export default Header;