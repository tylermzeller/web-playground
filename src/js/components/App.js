import { hot } from 'react-hot-loader';
import React from 'react';
import styled from 'styled-components'
import {App as AppStructure, AppHeader, AppBody, AppFooter} from './structure/App'
import {BodyLeft} from './structure/Body'
import ChatSelector from './ChatSelector.jsx'

const StyledHeader = styled(AppHeader)`
  height: 50px;
  background-color: purple;
`;

const Body = ({left, center, right, ...rest}) => {
  return (
    <AppBody
    {...rest}
  >
    {left && left}
    {center && center}
    {right && right}
  </AppBody>
  )
};

const LeftSidebar = (props) => (
  <BodyLeft 
    {...props}
  >
    <ChatSelector />
  </BodyLeft>
);

const StyledLeftSidebar = styled(LeftSidebar)`
  background-color: red;
  width: 300px;

  @media (max-width: 900px) {
    width: 250px;
  }
`;
 

const StyledBody = styled(Body)`
  height: calc(100vh - 100px);
  display: flex;
  flex-direction: row;
`;

const StyledFooter = styled(AppFooter)`
  height: 50px;
  background-color: blue;
`;


// TODO support ThemeProvider
function App() {
  return (
    <AppStructure>
      <StyledHeader />
      <StyledBody
        left={<StyledLeftSidebar/>}
      />
      <StyledFooter />
    </AppStructure>
  );
}

export default hot(module)(App);
