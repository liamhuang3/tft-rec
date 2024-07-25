import { Card, CardContent, Container, Typography, Divider, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import one_img from './assets/1_trans.png';
import two_img from './assets/2_trans.png';
import three_img from './assets/3_trans.png';
import { Option } from './DropdownSelector';
import ChampionIcon from './ChampionIcon';
import IconDisplaySmall from './IconDisplaySmall';

export interface compsInter {
    champions: string[],
    items: string[],
    augments: string[],
    traits: string[]
}
interface RecommendationCardProps {
    compsList: compsInter[];
  }

const RecommendationCard: React.FC<RecommendationCardProps> = ({ compsList }) => {

    useEffect(() => {
        console.log(compsList)
    }, [compsList]);

    return (
        <div>
            <Card sx={{ mt: '16px', mx: '32px' }}>
                <CardContent>
                    <Typography variant="h5">Recommended Compositions</Typography>
                    {compsList.map((comp, index) => (
                        <div key={index}>
                            <Divider sx={{ my: 2 }} />
                            <div>
                                <Grid container spacing={1}>
                                    <Grid item xs={1}>
                                        <img src={one_img} alt="One Icon" style={{ width: '40px', height: '40px' }} />
                                    </Grid>
                                    <Grid item xs={11}>
                                        <Typography variant="h4">{comp.traits[0] + " & " + comp.traits[1]}</Typography>
                                    </Grid>
                                </Grid>
                                <div>
                                    <Typography variant="h5" sx={{ my: 2 }}>Champions</Typography>
                                        <IconDisplaySmall iconUrls={comp.champions} sideLength={40}></IconDisplaySmall>
                                    <Divider sx={{ my: 1 }} />
                                    <Typography variant="h5" sx={{ my: 2 }}>Items</Typography>
                                        <IconDisplaySmall iconUrls={comp.items} sideLength={40}></IconDisplaySmall>
                                    <Divider sx={{ my: 1 }} />
                                    <Typography variant="h5" sx={{ my: 2 }}>Augments</Typography>
                                        <IconDisplaySmall iconUrls={comp.augments} sideLength={40}></IconDisplaySmall>
                                </div>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    )
}

export default RecommendationCard;