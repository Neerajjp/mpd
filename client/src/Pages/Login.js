import { useState } from "react";
import { Link } from "react-router-dom";
import { login } from "../services/auth";

function Login() {

  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('hello');

  return (
    <>
      <div className="container mx-auto pt-10 pb-20">
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white mx-auto">
          <div className="flex mx-auto justify-center pt-4">
            <div className="" style={{ width: '30%' }}>
              <img className="" src="/logo2.png" alt="Sunset in the mountains" />
            </div>
          </div>
          <p className="flex mx-auto justify-center mgq-primary-light">Log into Your Account</p>
          <div className="px-6 py-4">
            <div>
              <div className="px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Email">
                    Email
                  </label>
                  <input defaultValue={'admin@example.com'} onChange={e=>setEmail(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="user@site.com" />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                    Password
                  </label>
                  <input defaultValue={'hello'} onChange={e=>setPassword(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" />
                </div>
                <div className="mb-4 flex justify-between">
                  <label className="text-gray-500">
                    <input className="leading-tight" type="checkbox" />
                    <span className="text-sm">
                      {"\u00A0"}Remember me
                    </span>
                  </label>
                  <label className="text-gray-500">
                    <span className="text-sm"><Link className="mgq-primary-light" to="/reset-password">Forget Password?</Link></span>
                  </label>
                </div>
                <div className="">
                  <button onClick={()=>login(email, password)} className="w-full text-white py-2 px-4 rounded text-sm focus:outline-none mgq-bg-primary focus:shadow-outline" type="button">
                    Sign In
                  </button>
                  <button className="w-full mt-4 py-2 px-4 rounded border hover:bg-white bg-slate-50 text-sm" type="button">
                    <span className="flex justify-center mx-atuo">
                      <img style={{width:'20px'}} className="mr-2" src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png" alt="google logo" />
                      Sign In with Google
                    </span>
                  </button>
                </div>
                <p className="text-center cursor-pointer mt-2 text-gray-500 text-xs">
                  Don't have an account?
                  <Link className="ml-1 inline-block align-baseline mgq-primary" to="/register">
                    Sign Up
                  </Link>
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </>
  );
}

export default Login;
