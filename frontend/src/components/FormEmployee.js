import React from 'react';
import { useState } from "react";
import axios from "axios";

const FormEmployee = () => {
    const handleGoBacktoEmployees = () => {
        window.location = "/managersemployees";
      }
	  const [data, setData] = useState({ username: "", password: "", email: "", name: "",owner: "",  CUI: "", address: "", phone: "", role: "", confirm_password: "" });
	  const [error, setError] = useState("");
      const [success, setSuccess] = useState("");
      const admin_name = localStorage.getItem("admin_name");
      const admin_CUI = localStorage.getItem("admin_CUI");
      
	  const handleChange = ({ currentTarget: input }) => {
		  setData({ ...data, [input.name]: input.value });
	  };

	  const handleSubmit = async (e) => {
		  e.preventDefault();
            data.owner = admin_name;
            data.CUI = admin_CUI;
            data.role = "angajat";
			const url = "http://localhost:5000/users/register";
            axios.post(url, {
                username: data.username,
                password: data.password,
                email: data.email,
                name: data.name,
                owner: data.owner,
                CUI: data.CUI,
                address: data.address,
                phone: data.phone,
                role: data.role,
                confirm_password: data.confirm_password
            }).then(response => { 

                setSuccess("Angajat creat cu succes!");
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
  return (
      <div>
               <div>
         <button onClick={handleGoBacktoEmployees} type="submit" className="back_btn">
         <center><img className="img_back_login" src="images/backarrow.png" alt="" ></img></center>
     </button>
     </div>
     <div className="center_homepage" >
  <div className='h1_add_employee'>Adaugă un angajat</div>
     <div className="formad_form_container">
			<div className="login_form_container">
			<div className="left">
      <form noValidate className="form_container" onSubmit={handleSubmit}>
						
                       <br></br>
                                <input
                                    formNoValidate
                                    placeholder="Numele"
                                    name="name"
                                    onChange={handleChange}
                                    value={data.name}
                                    required
                                    className="input_formad"
                                />
                                <input
                                    formNoValidate
                                    type="text"
                                    placeholder="Username"
                                    name="username"
                                    onChange={handleChange}
                                    value={data.username}
                                    required
                                    className="input_formad"
                                />
                                <input
                                    formNoValidate
                                    type="password"
                                    placeholder="Parolă"
                                    name="password"
                                    onChange={handleChange}
                                    value={data.password}
                                    required
                                    className="input_formad"
                                />
                                
                                <input
                                    formNoValidate
                                    placeholder="Confirmare parolă"
                                    type="password"
                                    name="confirm_password"
                                    onChange={handleChange}
                                    value={data.confirm_password}
                                    required
                                    className="input_formad"
                                />
                                
                                <input
                                    formNoValidate
                                    placeholder="Email"
                                    name="email"
                                    onChange={handleChange}
                                    value={data.email}
                                    required
                                    className="input_formad"
                                />
                                <input
                                    formNoValidate
                                    placeholder="Adresa"
                                    name="address"
                                    onChange={handleChange}
                                    value={data.address}
                                    required
                                    className="input_formad"
                                />
                                  <input
                                    formNoValidate
                                    placeholder="Numar de telefon"
                                    name="phone"
                                    onChange={handleChange}
                                    value={data.phone}
                                    required
                                    className="input_formad"
                                />
                            
                           
                        
                               
                            
                            
                               
						{error && <div className="error_message">{error}</div>}
                        {success && <div className="success_message">{success}</div>}
						<button type="submit" className="green_btn">
							Adaugă angajat
						</button>
                        <br></br>
					</form>
				</div>
				
			</div>
           
		</div>
        </div>
     </div>
  )
}

export default FormEmployee
