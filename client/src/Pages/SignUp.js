import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../services/auth";

function SignUp() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()

  return (
    <>
      <div className="container mx-auto pt-10 pb-20">
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white mx-auto">
          <div className="flex mx-auto justify-center pt-4">
            <div className="" style={{ width: '30%' }}>
              <img className="" src="/logo2.png" alt="Sunset in the mountains" />
            </div>
          </div>
          <p className="flex mx-auto justify-center mgq-primary-light">Get Started for Free</p>
          <div className="px-6 py-4">
            <div>
              <div className="px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="full_name">
                    Full Name
                  </label>
                  <input onChange={(e) => setName(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="full_name" type="text" placeholder="John Deo" />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="company_name">
                    Company Name
                  </label>
                  <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="company_name" type="text" placeholder="xyz production" />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                    Email
                  </label>
                  <input onChange={(e) => setEmail(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="johndeo@gmail.com" />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                    Password
                  </label>
                  <input onChange={(e) => setPassword(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" />
                </div>
                <div className="mb-4 flex justify-center">
                  <small className="text-gray-500 text-xs text-center">By clicking "Sign Up", I agree to the <br /><Link to='/' className="mgq-primary-light">Terms & Privacy</Link></small>
                </div>
                <div className="">
                  <button onClick={()=>register(name, email, password, navigate)} className="mgq-bg-primary w-full text-white py-2 px-4 rounded text-sm focus:outline-none focus:shadow-outline" type="button">
                    Sign Up
                  </button>
                </div>
                <p className="text-center cursor-pointer mt-2 text-gray-500 text-xs">
                  Already have an account?
                  <Link className="ml-1 inline-block align-baseline mgq-primary" to="/login">
                    Log In
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

export default SignUp;
