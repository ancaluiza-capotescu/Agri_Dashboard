import React from 'react';
import { useState } from "react";
import axios from "axios";

const Register = () => {
    const handleGoBackHomepage = () => {
        window.location = "/";
      }
	  const [data, setData] = useState({ username: "", password: "", role: "", confirm_password: "",name: "", owner: "", cui: "", address: "", phone: "", email: "" });
	  const [error, setError] = useState("");
      const [success, setSuccess] = useState("");
  
	  const handleChange = ({ currentTarget: input }) => {
		  setData({ ...data, [input.name]: input.value });
	  };

	  const handleSubmit = async (e) => {
		  e.preventDefault();
            data.role = "manager";
			const url = "http://localhost:5000/requests/Requests";
			const urlCUI = "https://api.openapi.ro/api/companies/"+data.cui;
            axios.get(urlCUI,{ headers: { 'x-api-key': '8K5dfthvMSZ4LXEX56ZeHNL6A8ZUgsYf-CWHGZZot7KHr4egkg' } 
            }).then(result => {
                // If request is good...
                console.log('succes');
                console.log(result.data);
                axios.post(url, {
                    username: data.username,
                    password: data.password,
                    email: data.email,
                    name: data.name,
                    owner: data.owner,
                    CUI: data.cui,
                    address: data.address,
                    phone: data.phone,
                    role: data.role,
                    confirm_password: data.confirm_password,
                    approved: false
                }).then(response => { 
                    setSuccess("Cont creat cu succes! Veți primi o confirmare pe e-mail imediat ce contul este verificat si disponibil pentru utlizare.");
                    setTimeout(() => {
                        setSuccess("");
                        window.location = "/login";
                    }, 5000);
                }).catch(error => {
                    setError(error.response.data.error);
                    setTimeout(() => {
                        setError("");
                    }, 5000);
                }); 
             })
            .catch((error2) => {
                console.log('error ' + error2);
                setError("CUI-ul este invalid!");
                setTimeout(() => {
                    setError("");
                }, 5000);
             });
            
	  };	  
  return (
      <div>
               <div>
         <button onClick={handleGoBackHomepage} type="submit" className="back_btn">
         <center><img className="img_back_login" src="images/backarrow.png" alt="" ></img></center>
     </button>
     </div>
     
<div className="login_container">
			<div className="register_form_container">
				<div className="left">
					<form noValidate className="form_container" onSubmit={handleSubmit}>
						<h1>Creează-ți un cont</h1>
                        <div className="grid-container-element_register">
                            <div className="grid-child-element">
                                <input
                                formNoValidate
                                type="username"
                                placeholder="Username"
                                name="username"
                                onChange={handleChange}
                                value={data.username}
                                required
                                className="input"
                                />
                                <input
                                    formNoValidate
                                    placeholder="Nume firmă"
                                    name="name"
                                    onChange={handleChange}
                                    value={data.name}
                                    required
                                    className="input"
                                />
                                <input
                                    formNoValidate
                                    type="email"
                                    placeholder="E-mail"
                                    name="email"
                                    onChange={handleChange}
                                    value={data.email}
                                    required
                                    className="input"
                                />
                                <input
                                    formNoValidate
                                    placeholder="Director firmă"
                                    name="owner"
                                    onChange={handleChange}
                                    value={data.owner}
                                    required
                                    className="input"
                                />
                                <input
                                    formNoValidate
                                    placeholder="CUI"
                                    name="cui"
                                    onChange={handleChange}
                                    value={data.cui}
                                    required
                                    className="input"
                                />
                            </div>
                            <div className="grid-child-element">
                                <input
                                    formNoValidate
                                    placeholder="Adresă"
                                    name="address"
                                    onChange={handleChange}
                                    value={data.address}
                                    required
                                    className="input"
                                />
                                <input
                                    formNoValidate
                                    placeholder="Telefon"
                                    name="phone"
                                    onChange={handleChange}
                                    value={data.phone}
                                    required
                                    className="input"
                                />
                                <input
                                    formNoValidate
                                    type="password"
                                    placeholder="Parolă"
                                    name="password"
                                    onChange={handleChange}
                                    value={data.password}
                                    required
                                    className="input"
                                />
                                <input
                                    formNoValidate
                                    type="password"
                                    placeholder="Confirmă parola"
                                    name="confirm_password"
                                    onChange={handleChange}
                                    value={data.confirm_password}
                                    required
                                    className="input"
                                />
                                <select className="dropdown_register" required={true} id="role" name="role" value={data.role}  onChange={handleChange} >
                                    <option defaultValue >Manager</option>
                                </select>
                            </div>
                        </div>
						{error && <div className="error_message">{error}</div>}
                        {success && <div className="success_message">{success}</div>}
						<button type="submit" className="green_btn">
							Creează cont
						</button>
					</form>
				</div>
				
			</div>
           
		</div>

     </div>
  )
}

export default Register
