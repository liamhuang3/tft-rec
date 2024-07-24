import React from 'react';
import { makeStyles, Avatar } from '@mui/material';

interface ChampionIconProps {
  imageUrl?: string; // The URL of the image to be displayed
  x: number;
  y: number;
  w: number;
  h: number;
}


const ChampionIcon: React.FC<ChampionIconProps> = ({ imageUrl, x, y, w, h }) => {

  return (
    <div
      className="image-section"
      style={{
        width: `${w}px`,
        height: `${h}px`,
        backgroundImage: `url(${imageUrl})`,
        backgroundPosition: `-${x}px -${y}px`,
      }}
    ></div>
    
  );
};

export default ChampionIcon;