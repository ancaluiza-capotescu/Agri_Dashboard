import React from 'react';

const Homepage = () => {
  const handleLogin = () => {
    window.location = "/login";
  }

  const handleRegister = () => {
    window.location = "/register";
  }

  const handleAboutUs = () => {
    window.location = "/aboutus";
  }
  
  return (

    
    <div>
        <h1 className='h1_homepage'>AgriDashboard</h1>
        <div className='parent'>
            <div className='child'><h2 className='h2_homepage'>Înregistrează-te și te vom ajuta să-ți gestionezi ferma...</h2></div>
            <div className='child'> 
              <button onClick={handleAboutUs}>
                <img src="images/ExternalLinkIcon.png" alt="" className='img_homepage' title="Află mai multe despre noi"></img>
              </button>
            </div>
        </div>
        <div className="grid-container-element">
            <div className="grid-child-element"><button className='btn_homepage' onClick={handleLogin}>Intră în cont</button></div>
            <div className="grid-child-element"><button className='btn_homepage' onClick={handleRegister}>Creează un cont</button></div>
        </div>
        <div className='homepage_register_message'>*Doar pentru firme</div>
    </div>
  )
}

export default Homepage
