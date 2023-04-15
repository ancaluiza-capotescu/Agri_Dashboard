import React from 'react';
import { useState } from "react";
import axios from "axios";

const FormAd = () => {
    const handleGoBacktoAds = () => {
        window.location = "/managersads";
      }
      const [description, setDescription] = useState("");
      const [title, setTitle] = useState("");
      const [price, setPrice] = useState("");
      const [address, setAddress] = useState("");
      const [contact, setContact] = useState("");
      const [fileName, setFilename] = useState("");
	  const [error, setError] = useState("");
      const [success, setSuccess] = useState("");
      const username1 = localStorage.getItem("currentLoggedAdmin");
      const admin_name = localStorage.getItem("admin_name");
      
      const onChangeFile = (e) => {
        setFilename(e.target.files[0]);
      }

	  const handleSubmit = (e) => {
		  e.preventDefault();
          if(description && title && price && address && contact && fileName){
            if(contact.length === 10 && ((contact.includes("07", 0)) && /^\d+$/.test(contact))){
                const formData = new FormData();
                    formData.append("username", username1);
                    formData.append("description", description);
                    formData.append("title", title);
                    formData.append("owner", admin_name);
                    formData.append("price", price);
                    formData.append("address", address);
                    formData.append("contact", contact);
                    formData.append("picture", fileName);
                    const url = "http://localhost:5000/ad/Ads";
                    axios.post(url, formData)
                    .then(response => { 
                        setSuccess("Anunț creat cu succes!");
                        setTimeout(() => {
                            setSuccess("");
                            window.location = "/managersads"
                        }, 5000);
                    }).catch(error => {
                        setError("Încărcare nereușită, mai încercați!");
                        setTimeout(() => {
                            setError("");
                        }, 5000);
                    }); 
            }else{
                setError("Număr de telefon invalid!");
                setTimeout(() => {
                    setError("");
                }, 5000);
            }
          }else{
            setError("Completați toate câmpurile!");
            setTimeout(() => {
                setError("");
            }, 5000);
          }
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
      <form noValidate className="form_container" onSubmit={handleSubmit} encType='multipart/form-data'>
                       <br></br>
                                <input
                                    formNoValidate
                                    placeholder="Titlul anunțului"
                                    name="title"
                                    onChange={(e) =>setTitle(e.target.value)}
                                    value={title}
                                    required
                                    className="input_formad"
                                />
                                <input
                                    formNoValidate
                                    type="text"
                                    placeholder="Telefon"
                                    name="contact"
                                    onChange={(e) =>setContact(e.target.value)}
                                    value={contact}
                                    required
                                    className="input_formad"
                                />
                                <input
                                    formNoValidate
                                    placeholder="Adresă"
                                    name="address"
                                    onChange={(e) =>setAddress(e.target.value)}
                                    value={address}
                                    required
                                    className="input_formad"
                                />
                                
                                <input
                                    formNoValidate
                                    placeholder="Preț"
                                    name="price"
                                    onChange={(e) =>setPrice(e.target.value)}
                                    value={price}
                                    required
                                    className="input_formad"
                                />
                            
                           
                            <textarea
						    formNoValidate
							type="text"
							placeholder="Descriere"
							name="description"
							onChange={(e) =>setDescription(e.target.value)}
							value={description}
							required
                            rows="4"
                            cols="30"
                            className='textarea_employee'
						/>

                        <div>
                            <input 
                                id="files"
                                type="file" 
                                name="picture"
                                onChange = {onChangeFile}
                                className="image_formad"
                            />
                        </div>
   
                               
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
