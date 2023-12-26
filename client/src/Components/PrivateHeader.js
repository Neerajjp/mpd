import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SidebarContext } from "../context/sidebarContext";



function PrivateHeader({ title, isEcomm }) {
  const navigate = useNavigate()
  const {sidebar, setSidebar, headerName} = useContext(SidebarContext)
  const logout = () => {
    localStorage.clear()
    navigate('/login')
  }


  return (
    <>
    <nav id="header" className="w-full z-30 top-0 py-1 mb-5 flex ">
      <div className="w-full mx-auto flex flex-wrap justify-between mt-0 px-6 py-3">
        <div className="flex">
        <label onClick={() => setSidebar(!sidebar)} htmlFor="menu-toggle" className="cursor-pointer block my-auto">
          <svg className="fill-current text-gray-900" xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 20 20">
            <title>menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </label>
        <input className="hidden" type="checkbox" id="menu-toggle" />
        <div className="flex md:w-auto w-full order-2 md:order-1" id="menu">
          <nav className="ml-4 my-auto">
            <Link className="flex items-center mgq-primary-dark tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl " to="/projects">
            
            <svg className="pr-2" fill="#000000" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="30px">
                <path d="M 56 11 C 48.8 11 43 16.8 43 24 C 43 25.7 44.3 27 46 27 C 47.7 27 49 25.7 49 24 C 49 20.1 52.1 17 56 17 L 72 17 C 75.9 17 79 20.1 79 24 C 79 25.7 80.3 27 82 27 C 83.7 27 85 25.7 85 24 C 85 16.8 79.2 11 72 11 L 56 11 z M 24 31 C 16.8 31 11 36.8 11 44 L 11 61 C 11 62.1 11.6 62.999609 12.5 63.599609 C 28.4 73.099609 46.2 77.900391 64 77.900391 C 81.8 77.900391 99.6 73.099609 115.5 63.599609 C 116.4 62.999609 117 62.1 117 61 L 117 44 C 117 36.8 111.2 31 104 31 L 24 31 z M 24 37 L 104 37 C 107.9 37 111 40.1 111 44 L 111 59.300781 C 81.9 76.100781 46.1 76.100781 17 59.300781 L 17 44 C 17 40.1 20.1 37 24 37 z M 14 73 C 12.3 73 11 74.3 11 76 L 11 104 C 11 111.2 16.8 117 24 117 L 104 117 C 111.2 117 117 111.2 117 104 L 117 76 C 117 74.3 115.7 73 114 73 C 112.3 73 111 74.3 111 76 L 111 104 C 111 107.9 107.9 111 104 111 L 24 111 C 20.1 111 17 107.9 17 104 L 17 76 C 17 74.3 15.7 73 14 73 z"/>
              </svg>
              {headerName ?headerName : "Projects"}
            </Link>
          </nav>
        </div>
        </div>
        {/* <div className="order-2 md:order-3 flex items-center" id="nav-content">
          <ul className="md:flex items-center justify-between text-base text-gray-700 pt-4 md:pt-0">
            <li className="cursor-pointer" onClick={logout}>Logout</li>
          </ul>
        </div> */}
      </div>
    </nav>

    </>
  );
}

export default PrivateHeader;