import React from 'react';
import { makeStyles, Avatar } from '@mui/material';

interface ChampionIconProps {
  imageUrl: string; // The URL of the image to be displayed
}


const ChampionIcon: React.FC<ChampionIconProps> = ({ imageUrl }) => {

  return (
    <Avatar alt="User Avatar" src={imageUrl} sx={{width: 100, height:100}} />
  );
};

export default ChampionIcon;