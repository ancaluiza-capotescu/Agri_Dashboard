import React from 'react';
import { useState,useEffect } from "react";
import axios from "axios";

const Login = () => {
    const handleGoBackHomepage = () => {
        window.location = "/";
      }
	  const [data, setData] = useState({ username: "", password: ""});
	  const [error, setError] = useState("");
  
	  const handleChange = ({ currentTarget: input }) => {
		  setData({ ...data, [input.name]: input.value });
	  };
	  const [ListOfUsers,setListOfUsers] =useState([]);
	  const currentLogged = localStorage.getItem("currentLoggedAdmin");
	 
	  
	  useEffect(()=>{
		axios.get("http://localhost:5000/users/Users").then((response)=>{
		 setListOfUsers(response.data);
		});
	 },[]);
	
	  const handleSubmit = async (e) => {
		  e.preventDefault();
		  try {
			  const url = "http://localhost:5000/auth/login";
			  const { data: res } = await axios.post(url, data);
			  localStorage.setItem("token", res.data);
			  localStorage.setItem("currentLoggedAdmin",data.username);
			  localStorage.setItem("currentLoggedAdminName",data);
			  localStorage.setItem("currentLoggedAdminID",String(data._id));
			  const users = ListOfUsers.filter(it => it.username === data.username);
			  users.map((user)=>{
				console.log(user.role);
				 if (user.role === "administrator"){

					window.location = "/adminHome";
	
				  }else if (user.role === "manager"){
	
					window.location = "/managerHome";
	
				  }else if (user.role === "angajat"){
	
					window.location = "/employeeHome";
	
				  }
			})}catch (error) {
			  console.log(error);
			  setError(error.response.data.error);
			  console.log(error.response.data);
			  console.log(error.response.data.error);
			  setTimeout(() => {
				setError("");
			  }, 5000);
		  }
	  };	  
  return (
      <div>
               <div>
         <button onClick={handleGoBackHomepage} type="submit" className="back_btn">
         <center><img className="img_back_login" src="images/backarrow.png" alt="" ></img></center>
     </button>
     </div>
	 
<div className="login_container">
			<div className="login_form_container">
				<div className="left">
					<form noValidate className="form_container" onSubmit={handleSubmit}>
						<h1>Intră în cont</h1>
						<br></br>
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
							type="password"
							placeholder="Parolă"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							className="input"
						/>
                        
						{error && <div className="error_message">{error}</div>}
						<button type="submit" className="green_btn">
							Loghează-te
						</button>
					</form>
				</div>
				
			</div>
           
		</div>

     </div>
  )
}

export default Login
