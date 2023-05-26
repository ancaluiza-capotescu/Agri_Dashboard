import React, {useState,useEffect} from 'react';
import axios from 'axios';

const EditProfileManager  = () =>{
   
  const [data, setData] = useState({ username: "", password: "", role: "",name: "", owner: "", CUI: "", address: "", phone: "", email: "", confirm_password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [getdata,setGetdata] = useState("");
  const admin_ID = localStorage.getItem("admin_ID");
	  
  useEffect(()=>{
    axios.get('http://localhost:5000/users/'+admin_ID).then((response)=>{ 
      setGetdata(response.data);
      setData(response.data);
    });
});
       
    
  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };
    const   handleGoBackManagerHome =()  => {
        window.location="/managerHome";
      }
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        if(data.confirm_password !== data.password && data.confirm_password){
          setError("Parolele nu corespund!");
            setTimeout(() => {
              setError("");
            }, 5000);
        }else{
        axios.put('http://localhost:5000/users/'+admin_ID, {
                username: data.username,
                password: data.password,
                email: data.email,
                name: data.name,
                owner: data.owner,
                CUI: getdata.CUI,
                address: data.address,
                phone: data.phone,
                role: getdata.role,
          }).then(response => {
            setSuccess("Cont editat cu succes!");
            setTimeout(() => {
              setSuccess("");
              window.location = "/managerHome";
            }, 5000);
          })
          .catch(error => {
            setError(error.response.data.error);
            setTimeout(() => {
              setError("");
            }, 5000);
          })
        }
      };
    
    
     
        return (
          <div  >
               <div>
         <button onClick={handleGoBackManagerHome} type="submit" className="back_btn">
         <center><img className="img_back_login" src="/images/backarrow.png" alt="" ></img></center>
     </button >
     </div>
     <div className="center_homepage" >
     <div className='h1_add_employee'>Editează-ți profilul</div>
     <div className="editprof_container">
			<div className="editprof_form_container">
				<div className="left">
					<form noValidate className="form_container" onSubmit={handleSubmit}>
                        <div className="grid-container-element_edit">
                        <div className="grid-child-element_edit">
              <div className='edit_profile_label'><label htmlFor="Username:">Username: </label></div>
              <div className='edit_profile_label'><label htmlFor="Parolă">Parolă: </label></div>
              <div className='edit_profile_label'><label htmlFor="Parolă">Confirmă parola: </label></div>
              <div className='edit_profile_label'><label htmlFor="email">Email: </label></div>
              <div className='edit_profile_label'><label htmlFor="name">Nume firmă: </label></div>
              <div className='edit_profile_label'><label htmlFor="owner">Nume: </label></div>
              <div className='edit_profile_label'><label htmlFor="address">Adresă: </label></div>
              <div className='edit_profile_label'><label htmlFor="phone">Telefon: </label></div>
              </div>
              <div className="grid-child-element">
                  <input
                    type='text'
                    placeholder='Username'
                    name='username'
                    className='input'
                    value={data.username}
                    onChange={handleChange}
                  />
                  <input
                    type='password'
                    placeholder='Parolă'
                    name='password'
                    className='input'
                    value={data.password}
                    onChange={handleChange}
                  />
                  <input
                    type='password'
                    placeholder='Confirmare parolă'
                    name='confirm_password'
                    className='input'
                    value={data.confirm_password}
                    onChange={handleChange}
                  />
                  <input
                    type='text'
                    placeholder='Email'
                    name='email'
                    className='input'
                    value={data.email}
                    onChange={handleChange}
                  />
                  <input
                    type='text'
                    placeholder='Nume Firmă'
                    name='name'
                    className='input'
                    value={data.name}
                    onChange={handleChange}
                  />
               
                  <input
                    type='text'
                    placeholder='Nume Manager'
                    name='owner'
                    className='input'
                    value={data.owner}
                    onChange={handleChange}
                  />
              
                 <input
                    type='text'
                    placeholder='Adresă'
                    name='address'
                    className='input'
                    value={data.address}
                    onChange={handleChange}
                  />
                
                  <input
                    type='text'
                    placeholder='Telefon'
                    name='phone'
                    className='input'
                    value={data.phone}
                    onChange={handleChange}
                  />
                
             
                </div>
                </div>
               {error && <div className="error_message">{error} </div>}
                {success && <div className="success_message">{success}</div>}
                {(success || error) && <br></br> }

                
                <button  className="green_btn_editprof">Editează</button>
               </form>
				     </div>
			</div>
      
		</div>
    </div>
          </div>
        );
      

}
export default EditProfileManager