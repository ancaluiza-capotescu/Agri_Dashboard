import './App.css';
import {Route} from "react-router-dom";
import Login from './components/Login';
import Homepage from './components/Homepage';
import ManagerHome from './components/ManagerHome';
import AdminHome from './components/AdminHome';
import EmployeeHome from './components/EmployeeHome';
import Register from './components/Register';
import AboutUs from './components/AboutUs';
import Logout from './components/logout';
import ManagersEmployees from './components/ManagersEmployees';
import ManagersShop from './components/ManagersShop';
import ManagersAds from './components/ManagersAds';
import EditProfileManager from './components/EditProfileManager';
import FormAd from './components/FormAd';
import FormEmployee from './components/FormEmployee';
import EditEmployee from './components/EditEmployee';
function App() {
  return (
    <div className="App">
      <Route path='/' component={Homepage} exact />
      <Route path='/login' component={Login} />
      <Route path='/register' component={Register} />
      <Route path='/managerHome' component={ManagerHome} />
      <Route path='/employeeHome' component={EmployeeHome} />
      <Route path='/adminHome' component={AdminHome} />
      <Route path='/aboutus' component={AboutUs} />
      <Route  path="/logout" component={Logout} />
      <Route path='/managersemployees' component={ManagersEmployees} />
      <Route path='/managersshop' component={ManagersShop} />
      <Route  path="/managersads" component={ManagersAds} />
      <Route  path="/editprofile/:id"  component={EditProfileManager} />
      <Route  path="/editemployee/:id"  component={EditEmployee} />
      <Route  path="/formad"  component={FormAd} />
      <Route  path="/formemployee"  component={FormEmployee} />


    </div>
  );
}

export default App;
