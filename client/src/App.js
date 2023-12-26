import { Navigate, Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import PrivateHeader from "./Components/PrivateHeader";
import Project from "./Pages/Project";
import Login from "./Pages/Login";
import Projects from "./Pages/Projects";
import ResetPassword from "./Pages/ResetPassword";
import ResetPasswordMessage from "./Pages/ResetPasswordMessage";
import SignUp from "./Pages/SignUp";
import { getAuthToken } from './services/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from "./Components/Sidebar";
import { tabWidth } from "./utils/tabWidth";

function App() {
  return (
    <>
      <ToastContainer />

      {getAuthToken()
        ? <PrivateHeader />
        : <Header />
      }
      <Sidebar isLogin={getAuthToken()}>

        <div  style={{ marginLeft: tabWidth ? 0 :  getAuthToken() ? 50 : 0, height : '85vh' , overflowY: 'scroll'}} className="bg-gray-100">
          <Routes>
            {/* <Route index element={<Project />} /> */}
            {getAuthToken()
              ? <>
                <Route path={'/projects'} element={<Projects />} />
                <Route path={'/projects/:id/:type'} element={<Project />} />
                <Route path="*" element={<Navigate to="/projects" />} />
              </>
              : <>
                <Route path={'/login'} element={<Login />} />
                <Route path={'/register'} element={<SignUp />} />
                <Route path={'/reset-password'} element={<ResetPassword />} />
                <Route path={'/reset-password-message'} element={<ResetPasswordMessage />} />
                <Route path="*" element={<Navigate to="/login" />} />
              </>}
          </Routes>
        </div>
      </Sidebar>

    </>
  );
}

export default App;
