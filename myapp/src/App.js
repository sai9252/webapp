import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import RegisterForm from "./Components/RegisterForm.js";
import LoginForm from "./Components/LoginForm.js";
import Allprofiles from "./Components/Allprofiles.js"
import Myprofile from "./Components/Myprofile.js"
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path ='/register' element = {<RegisterForm/>}/>
          <Route path ='/login' element = {<LoginForm/>}/>
          <Route path='/allprofiles' element= {<Allprofiles/>}/>
          <Route path = '/myprofile' element = {<Myprofile/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
