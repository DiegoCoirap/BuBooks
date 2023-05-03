import './Header.css'
import { useNavigate } from 'react-router-dom';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import UserPopUp from "../popUp/UserPopUp";
import {useState} from "react";

const HeaderWithtIcons = () => {
  const navigate = useNavigate();
  const [showUserPopUp, setShowUserPopUp] = useState(false);

  return (
    <div className='backgroundHeader'>
      <h1 className='logo' onClick={() => navigate('/')}>
        <span className='blueLogo'>B</span>
        u<span className='blueLogo'>B</span>ooks
      </h1>
        <PersonRoundedIcon className='profileIcon' onClick={() => setShowUserPopUp(true)}/>
        <ShoppingCartOutlinedIcon className='cartIcon'/>
      <UserPopUp isOpen={showUserPopUp} onClose={() => setShowUserPopUp(false)}/>
    </div>
  );
};
export default HeaderWithtIcons
