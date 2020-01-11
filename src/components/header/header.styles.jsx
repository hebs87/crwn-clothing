// Import css to allow us to create reusable
// style snippets (for the option Link and div)
// that share the same styles
import styled, { css } from 'styled-components';
// Import Link to allow us to pass the Link into
// the styled component. Once we've done this, we
// no longer need the Link import in the component
// file, as it will pull it in when we import our
// styled components
import { Link } from 'react-router-dom';

// We want to call the css library to make a
// reusable CSS styles snippet that can be used
// by both our OptionLink and OptionDiv - this
// avoids us repeating our CSS styles in two
// different components that share the same
const OptionContainerStyles = css`
  padding: 10px 15px;
  cursor: pointer;
`;

export const HeaderContainer = styled.div`
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
`;

// To style a nested component (Link), we can
// call styled like a function instead of .element
// and pass it the relevant component
export const LogoContainer = styled(Link)`
  height: 100%;
  width: 70px;
  padding: 25px;
`;

export const OptionsContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

// We pass in our OptionContainerStyles - the
// reusable CSS styles snippet that we created
export const OptionLink = styled(Link)`
  ${OptionContainerStyles}
`;

export const OptionDiv = styled.div`
  ${OptionContainerStyles}
`;
