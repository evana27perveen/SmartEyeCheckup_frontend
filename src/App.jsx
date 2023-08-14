import { BrowserRouter, Routes, Route } from 'react-router-dom';


import LandingPage from './Components/HomeScreens/LandingPage';
import Login from './Components/AuthScreens/Login';
import Signup from './Components/AuthScreens/Signup';
import Home from './Components/HomeScreens/Home';
import ProfileDisplay from './Components/ProfileScreens/ProfileDisplay';
import PatientUpdate from './Components/ProfileScreens/PatientUpdate';
import DoctorUpdate from './Components/ProfileScreens/DoctorUpdate';
import Setting from './Components/SettingScreens/Setting';
import AllDoctors from './Components/DoctorScreens/AllDoctors'





function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<ProfileDisplay />} />
        <Route path="/patient-update" element={<PatientUpdate />} />
        <Route path="/doctor-update" element={<DoctorUpdate />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/doctors" element={<AllDoctors />} />
      </Routes>
    </BrowserRouter>
  );
}



export default App;
