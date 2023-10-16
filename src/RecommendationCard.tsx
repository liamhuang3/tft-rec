import { Card, CardContent, Container, Typography, Divider, Grid } from '@mui/material';
import React from 'react';
import one_img from './images/1_trans.png';
import two_img from './images/2_trans.png';
import three_img from './images/3_trans.png';
import { Option } from './DropdownSelector';

interface RecommendationCardProps {
    iconUrls: Option[]; // Array of image URLs
  }

const RecommendationCard: React.FC<RecommendationCardProps> = ({ iconUrls }) => {
    return(
        <div>
           <Card sx={{ mt: '16px', mx: '32px' }}>
                    <CardContent>
                        <Typography variant="h5">Recommended Compositions</Typography>
                        <Divider sx={{ my: 2 }} />
                        <div>
                            <Grid container spacing={1}>
                                <Grid item xs={1}>
                                    <img src={one_img} alt="One Icon" style={{ width: '40px', height: '40px' }}/>
                                </Grid>
                                <Grid item xs={11}>
                                    <Typography variant="h4">Comp Name 1</Typography>
                                </Grid>
                            </Grid>
                            <div>
                                <Typography variant="h5" sx={{my: 2}}>Champions</Typography>
                                <Divider sx={{ my: 1 }} />
                                <Typography variant="h5" sx={{my: 2}}>Items</Typography>
                                <Divider sx={{ my: 1 }} />
                                <Typography variant="h5" sx={{my: 2}}>Augments</Typography>
                            </div>
                        </div>
                        <Divider sx={{ my: 2 }} />
                        <div>
                            
                            <Grid container spacing={1}>
                                <Grid item xs={1}>
                                    <img src={two_img} alt="Two Icon" style={{ width: '40px', height: '40px' }}/>
                                </Grid>
                                <Grid item xs={11}>
                                    <Typography variant="h4">Comp Name 2</Typography>
                                </Grid>
                            </Grid>
                            <div>
                                <Typography variant="h5" sx={{my: 2}}>Champions</Typography>
                                <Divider sx={{ my: 1 }} />
                                <Typography variant="h5" sx={{my: 2}}>Items</Typography>
                                <Divider sx={{ my: 1 }} />
                                <Typography variant="h5" sx={{my: 2}}>Augments</Typography>
                            </div>
                        </div>
                            <Divider sx={{ my: 2 }} />
                        <div>
                            <Grid container spacing={1}>
                                <Grid item xs={1}>
                                    <img src={three_img} alt="Three Icon" style={{ width: '40px', height: '40px' }}/>
                                </Grid>
                                <Grid item xs={11}>
                                    <Typography variant="h4">Comp Name 3</Typography>
                                </Grid>
                            </Grid>
                            <div>
                                <Typography variant="h5" sx={{my: 2}}>Champions</Typography>
                                <Divider sx={{ my: 1 }} />
                                <Typography variant="h5" sx={{my: 2}}>Items</Typography>
                                <Divider sx={{ my: 1 }} />
                                <Typography variant="h5" sx={{my: 2}}>Augments</Typography>
                            </div>
                        </div>
                    </CardContent>
                </Card>
        </div>
    );
}

export default RecommendationCard;