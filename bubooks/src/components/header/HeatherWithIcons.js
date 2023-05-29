import './Header.css';
import { useNavigate } from 'react-router-dom';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useState } from "react";
import UserPopUp from "../popUp/UserPopUp";

const HeaderWithIcons = ({ userType }) => {
  const navigate = useNavigate();
  const [showUserPopUp, setShowUserPopUp] = useState(false);

  const handleLogoClick = () => {
    if (userType === "author") {
      navigate('/authorProfile');
    } else {
      navigate('/');
    }
  };

  const handleProfileIconClick = () => {
    if (userType === "user") {
      navigate('/userProfile');
    } else {
      setShowUserPopUp(true);
    }
  };

  const handleCartIconClick = () => {
    // Lógica para manejar el clic en el icono del carrito
  };

  return (
    <div className='backgroundHeader'>
      <h1 className='logo' onClick={handleLogoClick}>
        <span className='blueLogo'>B</span>
        u<span className='blueLogo'>B</span>ooks
      </h1>
      {(userType === "user" || userType !== "author") && (
        <>
          <PersonRoundedIcon className='profileIcon' onClick={handleProfileIconClick} />
          <ShoppingCartOutlinedIcon className='cartIcon' onClick={handleCartIconClick} />
        </>
      )}
      {userType !== "author" && userType !== "user" && <UserPopUp isOpen={showUserPopUp} onClose={() => setShowUserPopUp(false)} />}
    </div>
  );
};

export default HeaderWithIcons;
