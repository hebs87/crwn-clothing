import styled from 'styled-components';
// Import Link to allow us to pass the Link into
// the styled component. Once we've done this, we
// no longer need the Link import in the component
// file, as it will pull it in when we import our
// styled components
import { Link } from 'react-router-dom';

export const HeaderContainer = styled.div`
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
  
  @media screen and (max-width: 800px) {
    height: 60px;
    padding: 10px;
    margin-bottom: 20px;
  }
`;

// To style a nested component (Link), we can
// call styled like a function instead of .element
// and pass it the relevant component
export const LogoContainer = styled(Link)`
  height: 100%;
  width: 70px;
  padding: 25px;
  
  @media screen and (max-width: 800px) {
    width: 50px;
    padding: 0;
  }
`;

export const OptionsContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  
  @media screen and (max-width: 800px) {
    width: 80%;
  }
`;

export const OptionLink = styled(Link)`
  padding: 10px 15px;
  cursor: pointer;
`;
