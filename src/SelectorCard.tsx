import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography, Button, Autocomplete, TextField } from '@mui/material';
import { InsertEmoticon, Star, LocationOn } from '@mui/icons-material';
import DropdownSelector from './DropdownSelector'

const SelectorCard: React.FC = () => {
    return (
        <Card sx={{ mt: '128px', mx: '32px' }}>
            <CardContent>
                <Typography variant="h5">Select</Typography>
                <div>
                <Grid container spacing={3}>
                    <Grid item xs={4} sx={{borderRight: '1px solid'}}>
                        <Typography>Champions</Typography>
                        <DropdownSelector optionsFilePath='/tft-champion.json'/>
                    </Grid>
                    <Grid item xs={4} sx={{borderRight: '1px solid'}}>
                        <Typography>Items</Typography>
                        <DropdownSelector optionsFilePath='/tft-item.json'/>
                    </Grid>
                    <Grid item xs={4} sx={{borderRight: '1px solid'}}>
                        <Typography>Augments</Typography>
                        <DropdownSelector optionsFilePath='/tft-augments.json'/>
                    </Grid>
                </Grid>
                </div>
                <div style={{ display:'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Button>Recommend</Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default SelectorCard;