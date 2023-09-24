import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';


const SecondaryNavbar: React.FC = () => {

  return (
    <AppBar position="fixed" sx={{ top: '64px' }}>
      <Toolbar>
        <Button color="inherit">Stats</Button>
        <Button color="inherit">Comp Recommender</Button>
      </Toolbar>
    </AppBar>
  );
};

export default SecondaryNavbar;