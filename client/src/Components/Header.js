import { Link, useNavigate } from "react-router-dom";


function Header({ title, isEcomm }) {
  const navigate = useNavigate()

  return (
    <nav id="header" className="w-full z-30 top-0 py-1 bg-white">
      <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-6 py-3">
        <div className="flex justify-center  w-full" id="menu">
          <nav >
            <img onClick={() => navigate('/')} src="/logo_long.png" style={{width: '200px', cursor : 'pointer'}} alt="logo" />
          </nav>
        </div>
      </div>
    </nav>
  );
}

export default Header;