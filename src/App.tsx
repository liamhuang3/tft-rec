import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Typography, AppBar, Toolbar, Card, CardActions, CardContent, CardMedia, CssBaseline } from '@mui/material';
import SecondaryNavbar from './SecondaryNavbar';
import SelectorCard from './SelectorCard';


function App() {
  return (
    <>
        <CssBaseline>
        <AppBar position="relative">
          <Toolbar>
            <Typography variant="h6">
              TFTMaster
            </Typography>
          </Toolbar>
        </AppBar>
        <SecondaryNavbar />
        <SelectorCard />
        </CssBaseline>
    </>
  );
}

export default App;
