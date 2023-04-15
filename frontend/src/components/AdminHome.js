import React from 'react';
import Axios from 'axios';
import {useState,useEffect} from 'react';

const AdminHome = () => {

  const username = localStorage.getItem("currentLoggedAdmin");
  const [ListOfReuqests,setListOfReuqests] = useState([]);
  useEffect(()=>{
        Axios.get("http://localhost:5000/requests/Requests").then((response)=>{
          setListOfReuqests(response.data);
        });
  },[]);

  const handleLogOut = () => {
    localStorage.removeItem("token");
    window.location = "/login";
  }
  return (
    <div>
        <button onClick={handleLogOut} type="submit" className="back_btn_employee">Ieși din cont</button>
        <h1 className='h1_adminpage'>Bun venit, {username}!</h1>
        <h2 className="h2_adminpage">{ListOfReuqests.length} cereri în așteptare:</h2>
    {ListOfReuqests.map((request)=>{
      const handleApproveRequest = () => {
        const url = "http://localhost:5000/users/register";
        Axios.post(url, {
            username: request.username,
            password: request.password,
            email: request.email,
            name: request.name,
            owner: request.owner,
            CUI: request.CUI,
            address: request.address,
            phone: request.phone,
            role: request.role,
            confirm_password: request.password
        }).then(response => { 
          console.log("Cerere aprobată %s",response);
        }).catch(error => {
            console.log("Eroare la aprobare cerere %s",error);
        }); 

        Axios
         .delete("http://localhost:5000/requests/Requests/"+request._id)
         .then((res) => {
           window.location = '/adminHome';
         });
     }
     const handleDeleteRequest = () => {
       Axios
         .delete("http://localhost:5000/requests/Requests/"+request._id)
         .then((res) => {
           window.location = '/adminHome';
         })
       }
       return (   
        <div key = {request._id} className='ads_style'>
         <div className='br_color'>....</div>
         <div className="h2_myads"> {request.name}</div>
         <div className="grid-container-element_adminpage">
           <div className='grid-child-element_myemployees'>
               <div ><h3 >Manager:</h3> </div>
               <div><h3 >CUI:</h3> </div>
               <div><h3 >Email:</h3> </div>
               <div><h3 >Numar de telefon:</h3></div>
               <div><h3 >Adresă:</h3> </div>  
               </div>
           <div className='grid-child-element_myemployees'>
               <h3 >{request.owner} </h3>
               <h3>{request.CUI} </h3>
               <h3>{request.email} </h3>
               <h3>{request.phone} </h3>
               <h3>{request.address} </h3>
                 <br></br>
             </div>
             <div ></div>
             <div ></div>
             <div></div>
           <div>
           <h3 > <button type="submit" className="green_btn_myemployees" onClick={handleApproveRequest}>
                   Aprobă
               </button> </h3>
              <h3> <button type="submit" className="green_btn_adminpage" onClick={handleDeleteRequest}>
                    Șterge
               </button> </h3>
           </div>
       </div>
       
       </div>
         
         );
       
       })}
       </div>
  )
}

export default AdminHome