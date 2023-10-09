import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography, Button, Autocomplete, TextField } from '@mui/material';
import { InsertEmoticon, Star, LocationOn } from '@mui/icons-material';
import DropdownSelector from './DropdownSelector'
import RecommendationCard from './RecommendationCard';

const SelectorCard: React.FC = () => {
    const [showRecommendation, setShowRecommendation] = useState(false);

    const handleRecommendClick = () => {
        // When the "Recommend" button is clicked, set showRecommendation to true
        setShowRecommendation(true);
    };

    return (
        <div>
            <Card sx={{ mt: '32px', mx: '32px' }}>
                <CardContent>
                    <Typography variant="h3">Select</Typography>
                    <div>
                    <Grid container spacing={3}>
                        <Grid item xs={4} sx={{borderRight: '1px solid'}}>
                            <Typography sx={{my: '8px'}}>Champions</Typography>
                            <DropdownSelector optionsFilePath='/test.json'/>
                        </Grid>
                        <Grid item xs={4} sx={{borderRight: '1px solid'}}>
                            <Typography sx={{my: '8px'}}>Items</Typography>
                            <DropdownSelector optionsFilePath='/test.json'/>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography sx={{my: '8px'}}>Augments</Typography>
                            <DropdownSelector optionsFilePath='/test.json'/>
                        </Grid>
                    </Grid>
                    </div>
                    <div style={{ display:'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Button variant="contained" sx={{ mt:'16px'}} onClick={handleRecommendClick}>Recommend</Button>
                    </div>
                </CardContent>
            </Card>
            {showRecommendation && (
                <RecommendationCard></RecommendationCard>
            )}
        </div>
    )
}

export default SelectorCard;