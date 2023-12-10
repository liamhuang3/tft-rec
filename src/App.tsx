import React from 'react';
import './App.css';
import { Typography, AppBar, Toolbar, Card, CardActions, CardContent, CardMedia, CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import SecondaryNavbar from './SecondaryNavbar';
import SelectorCard from './SelectorCard';
import darkTheme from './theme';
import logo from './assets/tftmaster_logo.png';

function App() {
  return (
    <>
      <ThemeProvider theme={darkTheme}>
          <CssBaseline>
          <AppBar position="sticky">
            <Toolbar>
              <img src={logo} alt="TFTMaster Logo" style={{ width: '90px', height: '90px' }}/>
              <Typography variant="h1" sx={{ mx: '16px'}}>
                TFTMaster
              </Typography>
            </Toolbar>
          </AppBar>
          <SecondaryNavbar />
          <SelectorCard />
          </CssBaseline>
      </ThemeProvider>
    </>
  );
}

export default App;
