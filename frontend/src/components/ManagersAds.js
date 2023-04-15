import React from 'react';
import {useState,useEffect} from 'react';
import Axios from "axios";

const ManagersAds = () => {
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
      const handleAddAd = () => {
        window.location = "/formad";
      }
      const [ListOfMyAds,setListOfMyAds] =useState([]);
      const currentLogged = localStorage.getItem("currentLoggedAdmin");
      const onlyMyAds = ListOfMyAds.filter(it => it.username === currentLogged );
      useEffect(()=>{
        Axios.get("http://localhost:5000/ad/Ads").then((response)=>{
          setListOfMyAds(response.data);
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
    <h1 className='h1_employeepage'>Anunțurile mele</h1>
    <br></br>
          {onlyMyAds.map((myads)=>{
            const handleDelete = () => {
              Axios
                .delete("http://localhost:5000/ad/Ads/"+myads._id)
                .then((res) => {
                  window.location = '/managersads';
                })
              }
            return (
              
 
             <div key={myads._id} className='ads_style'>
              <div className='br_color'>....</div>
              <div className="h2_myads"> {myads.title}</div>
              <div className="grid-container-element_myads">
              <div className="grid-child-element_myads">
                <img src={`uploads/${myads.picture}`} alt="..." className="img_ads"/>
              </div>
              <div className="grid-child-element_myads">
              <div><h3 >Descriere:</h3> </div>
              <div><h3 >Proprietar:</h3></div>
              <div><h3 >Contact:</h3> </div>
              <div><h3 >Adresă:</h3></div>
              <div><h3 >Preț:</h3></div>
              </div>
              <div className="grid-child-element_myads">
              <h3 >{myads.description} </h3>
              <h3 >{myads.owner} </h3>
              <h3 >{myads.contact} </h3>
              <h3 >{myads.address} </h3>
              <h3>{myads.price} </h3>
                <br></br>
              </div>
              <div className="grid-child-element_myads">
              <h3> <button type="submit" className="green_btn_myemployees2" onClick={handleDelete}>
                         Șterge
                    </button> </h3>
              </div>
              </div>
              </div>
              
              );
            })}
   
    <div>
        
        <button type="submit" className="green_btn_myads" onClick={handleAddAd}>
							Adaugă anunț
						</button>   
       
    </div>
    </div>
  )
}

export default ManagersAds