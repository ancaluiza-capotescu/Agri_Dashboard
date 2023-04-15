import React from 'react';
import { useState } from "react";
import axios from "axios";

const FormAd = () => {
    const handleGoBacktoAds = () => {
        window.location = "/managersads";
      }
	  const [data, setData] = useState({ username: "", description: "", title: "", owner: "",price: "",  address: "", contact: "", picture: "" });
	  const [error, setError] = useState("");
      const [success, setSuccess] = useState("");
      const username1 = localStorage.getItem("currentLoggedAdmin");
      const admin_name = localStorage.getItem("admin_name");
  
	  const handleChange = ({ currentTarget: input }) => {
		  setData({ ...data, [input.name]: input.value });
	  };

	  const handleSubmit = async (e) => {
		  e.preventDefault();
            data.username = username1;
            data.owner = admin_name;
			const url = "http://localhost:5000/ad/Ads";
            axios.post(url, {
                username: data.username,
                description: data.description,
                title: data.title,
                owner: data.owner,
                price: data.price,
                address: data.address,
                contact: data.contact,
                picture: "",
            }).then(response => { 
                setSuccess("Anunț creat cu succes!");
                setTimeout(() => {
                    setSuccess("");
                    window.location = "/managersads"
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
         <button onClick={handleGoBacktoAds} type="submit" className="back_btn">
         <center><img className="img_back_login" src="images/backarrow.png" alt="" ></img></center>
     </button>
     </div>
     <div className="center_homepage" >
     <div className='h1_add_employee'>Adaugă un anunț</div>
     <div className="formad_form_container">
			<div className="login_form_container">
			<div className="left">
      <form noValidate className="form_container" onSubmit={handleSubmit}>
                       <br></br>
                                <input
                                    formNoValidate
                                    placeholder="Titlul anunțului"
                                    name="title"
                                    onChange={handleChange}
                                    value={data.title}
                                    required
                                    className="input_formad"
                                />
                                <input
                                    formNoValidate
                                    type="text"
                                    placeholder="Contact"
                                    name="contact"
                                    onChange={handleChange}
                                    value={data.contact}
                                    required
                                    className="input_formad"
                                />
                                <input
                                    formNoValidate
                                    placeholder="Adresă"
                                    name="address"
                                    onChange={handleChange}
                                    value={data.address}
                                    required
                                    className="input_formad"
                                />
                                
                                <input
                                    formNoValidate
                                    placeholder="Preț"
                                    name="price"
                                    onChange={handleChange}
                                    value={data.price}
                                    required
                                    className="input_formad"
                                />
                            
                           
                            <textarea
						    formNoValidate
							type="text"
							placeholder="Descriere"
							name="description"
							onChange={handleChange}
							value={data.description}
							required
                            rows="4"
                            cols="30"
                            className='textarea_employee'
						/>
   
                               
						{error && <div className="error_message">{error}</div>}
                        {success && <div className="success_message">{success}</div>}
						<button type="submit" className="green_btn">
							Adaugă anunț
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

export default FormAd
