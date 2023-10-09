import { Card, CardContent, Typography, Divider } from '@mui/material';
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
                        <Divider sx={{ my: 2 }} /> {/* Add a divider between rows */}
                        <div>
                            {/* Row 1 */}
                            <img src={one_img} alt="One Icon" style={{ width: '50px', height: '50px' }}/>
                        </div>
                        <Divider sx={{ my: 2 }} /> {/* Add a divider between rows */}
                        <div>
                            {/* Row 2 */}
                            <img src={two_img} alt="Two Icon" style={{ width: '50px', height: '50px' }}/>
                        </div>
                            <Divider sx={{ my: 2 }} /> {/* Add a divider between rows */}
                        <div>
                            {/* Row 3 */}
                            <img src={three_img} alt="Three Icon" style={{ width: '50px', height: '50px' }}/>
                        </div>
                    </CardContent>
                </Card>
        </div>
    );
}

export default RecommendationCard;