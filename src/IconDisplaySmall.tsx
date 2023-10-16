import React from 'react';
import { Box, Paper } from '@mui/material';

interface IconDisplaySmallProps {
    iconUrls: string[]; // Array of image URLs
    sideLength: number;
  }

const IconDisplaySmall: React.FC<IconDisplaySmallProps> = ({ iconUrls, sideLength }) => {
    return (
        <Box display="flex" flexDirection="row" alignItems="center">
            {iconUrls.map((iconUrl, index) => (
                <Paper
                    key={index}
                    style={{
                        width: sideLength,
                        height: sideLength,
                        marginRight: 2, // Adjust the spacing between images
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                <img
                    src={iconUrl}
                    alt={`Image ${index + 1}`}
                    style={{ maxWidth: '100%', maxHeight: '100%' }}
                />
                </Paper>
            ))}
        </Box>
    );
}

export default IconDisplaySmall;