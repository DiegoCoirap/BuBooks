import './Header.css'
import { useNavigate } from 'react-router-dom';

const HeaderWithoutIcons = ({isOpen, onClose}) => {
  const navigate = useNavigate();

  return (
      <div>
          {isOpen &&
            <div className='backgroundHeader'>
              <h1 className='logo' onClick={() => navigate('/')}>
                <span className='blueLogo'>B</span>
                u<span className='blueLogo'>B</span>ooks
              </h1>
            </div>
          }
      </div>
  );
};
export default HeaderWithoutIcons