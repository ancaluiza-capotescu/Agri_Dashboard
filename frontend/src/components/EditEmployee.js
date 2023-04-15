import React, {useState,useEffect} from 'react';
import axios from 'axios';

const EditEmployee  = () =>{
   
  const [data, setData] = useState({ username: "", password: "", role: "",name: "", owner: "", CUI: "", address: "", phone: "", email: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [getdata,setGetdata] = useState("");
  const currentEmplId = localStorage.getItem("currentEmployeeId");
	  
  useEffect(()=>{
    axios.get('http://localhost:5000/users/'+currentEmplId).then((response)=>{ 
      setGetdata(response.data);
      setData(response.data);
    });
    
},[]);
       
    
  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };
    const   handleGoBackManagerEmployees =()  => {
        window.location="/managersemployees";
      }
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        axios
          .put('http://localhost:5000/users/'+currentEmplId, {
                username: getdata.username,
                password: getdata.password,
                email: data.email,
                name: data.name,
                owner: getdata.owner,
                CUI: getdata.CUI,
                address: data.address,
                phone: data.phone,
                role: getdata.role,
          }).then(response => {
            setSuccess("Cont editat cu succes!");

            setTimeout(() => {
              setSuccess("");
              window.location = "/managersemployees";
            }, 5000);
          })
          .catch(error => {
            
            setError(error.response.data.error);
            setTimeout(() => {
              setError("");
            }, 5000);
          })
      };
    
    
     
        return (
          <div  >
               <div>
         <button onClick={handleGoBackManagerEmployees} type="submit" className="back_btn">
         <center><img className="img_back_login" src="/images/backarrow.png" alt="" ></img></center>
     </button >
     </div>
            <div className="center_homepage" >
           
               
                <div className="h1_editprofile" >
                  <p className="h1_editprofile">
                      Editează profilul
                  </p>
                </div>
              
    
              <div className="col-md-8 m-auto">
              <form className='form_edit-employee' noValidate onSubmit={handleSubmit}>
              <br></br>

                <div className='form-group'>
                <label htmlFor="email">Email: </label>
                  <input
                    type='text'
                    placeholder='email'
                    name='email'
                    className='input'
                    value={data.email}
                    onChange={handleChange}
                  />
                </div>
                <div className='form-group'>
                <label htmlFor="name">Nume: </label>
                  <input
                    type='text'
                    placeholder='name'
                    name='name'
                    className='input'
                    value={data.name}
                    onChange={handleChange}
                  />
                </div>
        
                <div className='form-group'>
                <label htmlFor="address">Adresă: </label>
                  <input
                    type='text'
                    placeholder='address'
                    name='address'
                    className='input'
                    value={data.address}
                    onChange={handleChange}
                  />
                </div>
    
                <div className='form-group'>
                <label htmlFor="phone">Telefon: </label>
                  <input
                    type='text'
                    placeholder='phone'
                    name='phone'
                    className='input'
                    value={data.phone}
                    onChange={handleChange}
                  />
                </div>
             
                
                {error && <div className="error_message">{error}</div>}
                {success && <div className="success_message">{success}</div>}
                <button  className="green_btn">Editează</button>
               <br></br>
               <br></br>
               <br></br>
                </form>
              </div>
    
            </div>
          </div>
        );
      

}
export default EditEmployee