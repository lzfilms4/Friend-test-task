import {Routes, Route} from 'react-router-dom';

import HomePage from "./components/HomePage";
import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import AfterRegister from "./components/AfterRegister";

function App() {
    return (
        <>
            <Header />
            <Routes>
                <Route path='/' element={<HomePage />}/>
                <Route path='/login' element={<Login />}/>
                <Route path='/afterreg' element={<AfterRegister />}/>
                <Route path='/register' element={<Register />}/>
                <Route path='/profile' element={<Profile />}/>
            </Routes>
        </>
  );
}

export default App;
