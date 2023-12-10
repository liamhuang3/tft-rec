import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';

const SecondaryNavbar: React.FC = () => {

  return (
    <AppBar position="sticky" sx={{ top: '64px' }}>
      <Toolbar>
        <Button color="inherit">Comp Recommender</Button>
        <Tooltip title="Coming soon!" arrow>
          <Button color="inherit">Stats</Button>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};

export default SecondaryNavbar;