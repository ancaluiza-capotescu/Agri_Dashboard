import React from 'react';
import {useState,useEffect} from 'react';
import Axios from "axios";

const AboutUs = () => {

    const handleGoBackHomepage = () => {
        window.location = "/";
      }
      const [ListOfManagers,setListOfManagers] =useState([]);
      const onlyManagers = ListOfManagers.filter(it => it.role === 'manager');
      useEffect(()=>{
        Axios.get("http://localhost:5000/users/Users").then((response)=>{
         setListOfManagers(response.data);
        });
     },[]);
  return (
<div>
    <div>
         <button onClick={handleGoBackHomepage} type="submit" className="back_btn">
         <center><img className="img_back_login" src="images/backarrow.png" alt="" ></img></center>
     </button>
     </div>
    <div>
        <h1 className='h1_aboutus'>Cine suntem noi?</h1>
      
            <div className='child'><h2 className='description_aboutus'>
            Cu scopul de a veni în ajutorul antreprenorilor, propunem o soluție pentru gestionarea mai facilă a unei firme.
            Zi de zi, agricultorii se confruntă cu mai multe probleme: de la gestionarea angajaților, la supravegherea acestora, până la dezvoltarea firmei prin achiziționarea de teren agricol sau de utilaje.
            </h2><br></br><h2 className='description_aboutus'>Astfel, aplicația AgriDashboard, permite fiecărui antreprenor să își creeze un cont al firmei în care să își poată introduce proprii angajați și prin care să îi poată monitoriza de la distanță. 
            Fiecare angajat va avea propriul său cont din cadrul căruia își poate distribui locația curentă și poate oferi un status la finalul zilei.
            </h2><br></br><h2 className='description_aboutus'>În plus, aplicația oferă o pagină destinată vânzării de terenuri sau utilaje agricole, la care să aibă acces doar antreprenorii. 
            Aceștia pot crea porpriile anunțuri și pot vizualiza altele. Astfel, agricultorii vor găsi doar anunțuri din domeniu, acest lucru făcând căutarea mult mai ușoară.  
            </h2></div>
        <br></br>
    </div>
    <br></br>
    <h1 className="h2x_aboutus">Utilizatorii aplicației:</h1>
    <br></br>
          {onlyManagers.map((managers)=>{
            return (
              <div key={managers._id} className='ads_style'>
              <div className='br_color'>....</div>
              <div className="h2_myads"> {managers.name}</div>
              <div className="grid-container-element_myads">
                            <div className="grid-child-element_myads">
              <h3 >Manager:</h3> 
              <h3 >Contact:</h3>
              <h3 >Adresă:</h3>
              <h3 >CUI:</h3>
              </div>
              <div className="grid-child-element_myads">
              <h3 >{managers.owner} </h3>
              <h3 >{managers.phone} </h3>
              <h3 >{managers.address} </h3>
              <h3 >{managers.CUI} </h3>
                <br></br>
              </div>
              </div>
              </div>
 
            
             
              
              );
            })}
    </div>
  )
}

export default AboutUs
