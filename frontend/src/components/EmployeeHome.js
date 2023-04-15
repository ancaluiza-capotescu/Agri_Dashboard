import React from 'react';
import {useState} from 'react';
import {GoogleMap, LoadScript, Marker} from '@react-google-maps/api';
import axios from "axios";

export default function EmployeeHome() {
  const [pushed, setPushed] = useState("");
  const [center, setCenter]= useState({lat:45.748871, lng:21.208679});
  const username = localStorage.getItem("currentLoggedAdmin");
  const [data, setData] = useState({ name: "", status: ""});
	const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleLogOut = () => {
    localStorage.removeItem("token");
    window.location = "/login";
  }

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
			const url = "http://localhost:5000/dailyStatuses/DailyStatuses";
            axios.post(url, {
                username: username,
                status: data.status
            }).then(response => { 
                setSuccess("Status introdus cu succes!");
                setTimeout(() => {
                    setSuccess("");
                }, 5000);
            }).catch(error => {
                setError(error.response.data.error);
                setTimeout(() => {
                    setError("");
                }, 5000);
            }); 
  };	  

  const handleLocation = () => {
    const success = (position) => {
      console.log(position);
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      setCenter({lat:latitude, lng:longitude});
      setPushed("1");
      const urlPut = "http://localhost:5000/locations/Locations/" + username;
      axios.put(urlPut, {
        username: username,
        latitude: latitude,
        longitude: longitude
      }).then(response => { 
          if(response.data == null){
            const urlPost = "http://localhost:5000/locations/Locations/";
            axios.post(urlPost, {
              username: username,
              latitude: latitude,
              longitude: longitude
            }).then(response => { 
                console.log("S-a salvat locatia curenta!");
            }).catch(() => {
              console.log("Eroare la salvarea locatiei curente");
            }); 
          }
      }).catch(() => {
          console.log("Eroare la updatarea locatiei curente");
      }); 
    }
    const error = () => {
      console.log('Unable to retrieve your location');
    }
    navigator.geolocation.getCurrentPosition(success, error);
  }

  return (
    <div>
      <button onClick={handleLogOut} type="submit" className="back_btn_employee">Ieși din cont</button>
      <h1 className='h1_employeepage'>Bun venit, {username}!</h1>
        <LoadScript
          googleMapsApiKey="AIzaSyA8-e5V-3Cjt5366J_GNt_wVHzPC04SjLY"
        >  
        <GoogleMap 
          zoom={14} 
          center={center} 
          mapContainerClassName="map-container">
          {pushed && <Marker position = {center}/>}
        </GoogleMap>
        </LoadScript>
      <div className='employee_page_element'><button  onClick={handleLocation} className="green_btn_employeepage">Distribuie locația</button></div>
      <div className="employee_form_container">
			<div className="login_form_container">
			<div className="left">
      <form noValidate className="form_container" onSubmit={handleSubmit}>
            <h1>De completat la finalul zilei:</h1>
						<textarea
						    formNoValidate
							type="text"
							placeholder="Ce ai făcut azi și ce nu?"
							name="status"
							onChange={handleChange}
							value={data.status}
							required
              rows="4"
              cols="30"
              className='textarea_employee'
						/>
            {error && <div className="error_message">{error}</div>}
            {success && <div className="success_message">{success}</div>}
						<button type="submit" className="green_btn_employeepage_status">
							Trimite
						</button>
					</form>
          </div> </div>  </div>
  </div>
  )
}