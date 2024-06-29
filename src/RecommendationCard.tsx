import { Card, CardContent, Container, Typography, Divider, Grid } from '@mui/material';
import React, { useEffect } from 'react';
import one_img from './assets/1_trans.png';
import two_img from './assets/2_trans.png';
import three_img from './assets/3_trans.png';
import { Option } from './DropdownSelector';
import ChampionIcon from './ChampionIcon';
import IconDisplaySmall from './IconDisplaySmall';

export interface compsInter {
    champions: String[],
    items: String[],
    augments: String[],
    traits: String[]
}
interface RecommendationCardProps {
    compsList: compsInter[];
  }
// fuck bruh i gotta define an interface for it...
const RecommendationCard: React.FC<RecommendationCardProps> = ({ compsList }) => {
    useEffect(() => {
        console.log(compsList);
      });

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
                                        <IconDisplaySmall iconUrls={["/champions/aatrox.png", "/champions/ahri.png"]} sideLength={40}></IconDisplaySmall>
                                        {/* {comp.champions.map(champ => (
                                            
                                        ))

                                        } */}
                                    <Divider sx={{ my: 1 }} />
                                    <Typography variant="h5" sx={{ my: 2 }}>Items</Typography>
                                        <IconDisplaySmall iconUrls={["/items/TFT_Item_BFSword.png", "/items/TFT_Item_ChainVest.png"]} sideLength={40}></IconDisplaySmall>
                                    <Divider sx={{ my: 1 }} />
                                    <Typography variant="h5" sx={{ my: 2 }}>Augments</Typography>
                                        <IconDisplaySmall iconUrls={["/augments/AFK-I.png", "/augments/Battle-Ready-III.TFT_Set9.png"]} sideLength={40}></IconDisplaySmall>
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