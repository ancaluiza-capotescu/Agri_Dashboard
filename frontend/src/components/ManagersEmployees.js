import React from 'react';
import {useState,useEffect} from 'react';
import Axios from "axios";
import {GoogleMap, LoadScript, Marker} from '@react-google-maps/api';

const ManagersEmployees = () => {
    const handleMyAccount = () => {
        window.location = "/managerHome";
      }
      const handleMyEmployees = () => {
        window.location = "/managersemployees";
      }
      const handleShop = () => {
        window.location = "/managersshop";
      }
      const handleMyAds = () => {
        window.location = "/managersads";
      }
      const handleLogout = () => {
        localStorage.removeItem("token");
        window.location = "/login";
      }
      const handleAddEmployee = () => {
        window.location = "/formemployee";
      }
      const [ListOfStatuses,setListOfStatuses] = useState([]);
      const [ListOfLocations, setListOfLocations] = useState([]);
      const [ListOfMyEmployees,setListOfMyEmployees] = useState([]);
      const admin_CUI = localStorage.getItem("admin_CUI");
      const onlyMyEmployees = ListOfMyEmployees.filter(it => it.role === "angajat" && it.CUI === admin_CUI );
      useEffect(()=>{
        Axios.get("http://localhost:5000/users/Users").then((response)=>{
          setListOfMyEmployees(response.data);
        });
        Axios.get("http://localhost:5000/locations/Locations").then((response) => {
          setListOfLocations(response.data);
        });
        Axios.get("http://localhost:5000/dailyStatuses/DailyStatuses").then((response) =>{
          setListOfStatuses(response.data);
        });
     },[]);
     
    let wantedLocations = [];
    let avgLat = 45.748871,avgLng = 21.208679;
    let aux1=0,aux2=0;
    var loc = function () {
      let i=0,j=0;
      for(i=0;i<onlyMyEmployees.length;i++){
        for(j=0;j<ListOfLocations.length;j++){
          if(onlyMyEmployees[i].username === ListOfLocations[j].username){
            wantedLocations.push(ListOfLocations[j]);
            aux1 += parseFloat(ListOfLocations[j].latitude);
            aux2 += parseFloat(ListOfLocations[j].longitude);
          }
        }
      }
      if(aux1){
        avgLat = (aux1/(wantedLocations.length));
        avgLng = (aux2/(wantedLocations.length));
      }
      
    }
    loc();

    const handleRefreshLoc = () => {
      window.location.reload();
    }
    
  return (
    
    <div>
    <div className="dropdown">
    <button   className="menu_btn">
    <center><img className="img_menu" src="images/menu_dropdown.png" alt="" ></img></center>
    </button>
    <div className="dropdown-content">
    <button onClick={handleMyAccount} >Contul Meu</button>
    <button onClick={handleMyEmployees}>Angajați</button>
    <button onClick={handleShop}>Magazin</button>
    <button onClick={handleMyAds}>Anunțurile mele</button>
    <button onClick={handleLogout}>Ieși din cont</button>
    </div>
    </div>
    <h1 className='h1_employeepage'>Angajați</h1>
    <br></br>
    <LoadScript
          googleMapsApiKey="AIzaSyA8-e5V-3Cjt5366J_GNt_wVHzPC04SjLY"
    >  
    <GoogleMap 
          zoom = {12}
          center={{lat: avgLat, lng: avgLng}} 
          mapContainerClassName="map-container-manager">
          {
            wantedLocations.map((location,index) =>{
              return(
                <Marker 
                  key={index} 
                  label={location.username} 
                  className="markerStyle" 
                  position = {{lat: parseFloat(location.latitude), lng: parseFloat(location.longitude)}}>
                </Marker> 
              );
            })
          }
    </GoogleMap>
    </LoadScript>
    <div className='employee_page_element'><button  onClick={handleRefreshLoc} className="green_btn_employeepage">Vezi angajații</button></div>
          {onlyMyEmployees.map((myemployees)=>{
           const handleEditEmployee = () => {
            localStorage.setItem("currentEmployeeId",myemployees._id);
            window.location = "/editemployee/"+myemployees._id;
          }

          let i=0;
          let status;
          for(i=0;i<ListOfStatuses.length;i++){
            if(ListOfStatuses[i].username === myemployees.username){
              status = ListOfStatuses[i].status;
            }
          }
          const handleDelete = () => {
            Axios
              .delete("http://localhost:5000/users/Users/"+myemployees._id)
              .then((res) => {
                window.location = '/managersemployees';
              })
            }
            return (   
             <div key={myemployees._id} className='ads_style'>
              <div className='br_color'>....</div>
              <div className="h2_myads"> {myemployees.name}</div>
              <div className="grid-container-element_myemployees">
                <div className='grid-child-element_myemployees'>
                    <div><h3 >Email:</h3> </div>
                    <div><h3 >Numar de telefon:</h3></div>
                    <div><h3 >Adresă:</h3> </div>  
                    <div><h3 >Raport zilnic:</h3> </div>  
                    </div>
                <div className='grid-child-element_myemployees'>
                    <h3 >{myemployees.email} </h3>
                    <h3 >{myemployees.phone} </h3>
                    <h3 >{myemployees.address} </h3>
                    <h3 >{status} </h3>
                      <br></br>
                  </div>
                  <div></div>
                  <div></div>
                  <div></div>
                <div>
                <h3 > <button type="submit" className="green_btn_myemployees" onClick={handleEditEmployee}>
                        Editează
                    </button> </h3>
                   <h3> <button type="submit" className="green_btn_myemployees2" onClick={handleDelete}>
                         Șterge
                    </button> </h3>
                </div>
            </div>
            
            </div>
              
              );
            
            })}
          
   
    <div>
        
        <button type="submit" className="green_btn_myads" onClick={handleAddEmployee}>
							Adaugă un nou angajat
						</button>   
       
    </div>
    </div>
  )
}

export default ManagersEmployees