import React from 'react';
import {useState,useEffect} from 'react';
import Axios from "axios";

const ManagerHome = () => {
   
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
 
  
  const [ListOfUsers,setListOfUsers] =useState([]);
  const currentLogged = localStorage.getItem("currentLoggedAdmin");
  const res = ListOfUsers.filter(it => it.username === currentLogged);
  
  useEffect(()=>{
    Axios.get("http://localhost:5000/users/Users").then((response)=>{
     setListOfUsers(response.data);
    });
 },[]);
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

    
    <div>
    {res.map((admin)=>{
      localStorage.setItem("admin_name",admin.name);
      localStorage.setItem("admin_CUI",admin.CUI);
      localStorage.setItem("admin_ID",admin._id);
      
      const handleEditProfile = () => {
        window.location = "/editprofile/"+admin._id;
      }
          return(
            <div key ={admin._id} >
            <div className='center_homepage'>  
            <div><h4 className='h1x_homepage'>{admin.name}</h4></div>
            <div><button  onClick={handleEditProfile}><img src="images/edit_button.png" alt="" className='edit_button'></img></button></div>
           
            </div>
            <form className="form_managerhome">
            <h1 className="titles_homepage">Manager:</h1>
            <h4 className="details_homepage">{admin.owner}</h4>
            <h1 className="titles_homepage">Contact:</h1>
            <h4 className="details_homepage">{admin.phone}</h4>
            <h1 className="titles_homepage">Adresă:</h1>
            <h4 className="details_homepage">{admin.address}</h4>
            <h1 className="titles_homepage">CUI:</h1>
            <h4 className="details_homepage">{admin.CUI}</h4>
            
            <br></br>
            </form>
            
            </div>
          );
        })}
       
    </div>
    </div>
  )
}

export default ManagerHome