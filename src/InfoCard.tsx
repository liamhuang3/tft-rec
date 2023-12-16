import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography, Divider, Button, ToggleButton, ToggleButtonGroup, CircularProgress } from '@mui/material';

const InfoCard: React.FC = () => {
    return (
        <div>
            <Card sx={{ mt: '32px', mx: '32px' }}>
                <CardContent>
                    <Typography variant="h5">How to Use</Typography>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="body1"></Typography>
                </CardContent>
            </Card>
        </div>
    )
}

export default InfoCard;