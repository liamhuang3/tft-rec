import React, { useState } from 'react';
import { Grid, Card, CardContent, Typography, Button, ToggleButton, ToggleButtonGroup, CircularProgress } from '@mui/material';
import DropdownSelector from './DropdownSelector'
import RecommendationCard from './RecommendationCard';
import { Option } from './DropdownSelector';
import { getRecommendations, getStats } from './apiFunctions';
import { compsInter } from './RecommendationCard';

const SelectorCard: React.FC = () => {
    const [showRecommendation, setShowRecommendation] = useState(false);
    const [selectedChampions, setSelectedChampions] = useState<Option[]>([]);
    const [selectedItems, setSelectedItems] = useState<Option[]>([]);
    const [selectedAugments, setSelectedAugments] = useState<Option[]>([]);
    const [selectedItemCategory, setItemCategory] = useState<string | null>('Components');
    const [selectedChampionCategory, setChampionCategory] = useState<string | null>('1 Cost');
    const [selectedAugmentCategory, setAugmentCategory] = useState<string | null>('Silver');
    const [loading, setLoading] = useState(false);
    const [compList, setCompList] = useState<compsInter[]>([]);

    const handleSelectedChampionsChange = (newSelected: Option[]) => {
        setSelectedChampions(newSelected);
    };

    const handleSelectedItemsChange = (newSelected: Option[]) => {
        setSelectedItems(newSelected);
    };
    
    const handleSelectedAugmentsChange = (newSelected: Option[]) => {
        setSelectedAugments(newSelected);
    };

    const handleItemCategoryChange = (event: React.MouseEvent<HTMLElement>, newCategory: string | null) => {
        if (newCategory !== null) {
            setItemCategory(newCategory);
        }
      };

      const handleChampionCategoryChange = (event: React.MouseEvent<HTMLElement>, newCategory: string | null) => {
        if (newCategory !== null) {
            setChampionCategory(newCategory);
        }
      };

      const handleAugmentCategoryChange = (event: React.MouseEvent<HTMLElement>, newCategory: string | null) => {
        if (newCategory !== null) {
            setAugmentCategory(newCategory);
        }
      };
    
    const handleRecommendClick = async () => {
        setLoading(true)
        let stats = await getStats()
        // When the "Recommend" button is clicked, set showRecommendation to true

        const userInput = [...selectedChampions, ...selectedItems, ...selectedAugments]
        setCompList(await getRecommendations(userInput, stats))
        setLoading(false);
        setShowRecommendation(true);
    };

    return (
        <div>
            <Card sx={{ mt: '32px', mx: '32px' }}>
                <CardContent>
                    <div>
                    <Grid container spacing={3}>
                        <Grid item xs={4}>
                            <Grid container alignItems="center" justifyContent="center" spacing={2}>
                                <Grid item xs={3}>
                                    <Typography sx={{my: '8px'}}>Champions</Typography>
                                </Grid>
                                <Grid item xs={9}>
                                    <ToggleButtonGroup
                                        value={selectedChampionCategory}
                                        exclusive
                                        onChange={handleChampionCategoryChange}
                                        aria-label="toggle options"
                                    >
                                        <ToggleButton value="1 Cost" aria-label="onecost">
                                        1 Cost
                                        </ToggleButton>
                                        <ToggleButton value="2 Cost" aria-label="twocost">
                                        2 Cost
                                        </ToggleButton>
                                        <ToggleButton value="3 Cost" aria-label="threecost">
                                        3 Cost
                                        </ToggleButton>
                                        <ToggleButton value="4 Cost" aria-label="fourcost">
                                        4 Cost
                                        </ToggleButton>
                                        <ToggleButton value="5 Cost" aria-label="fivecost">
                                        5 Cost
                                        </ToggleButton>
                                    </ToggleButtonGroup>
                                </Grid>
                            </Grid>
                            <div style={{ width: '100%', marginTop: '16px'}}>
                                <DropdownSelector 
                                    optionsFilePath='/test.json'
                                    selectedOptions={selectedChampions} 
                                    onSelectedOptionsChange={handleSelectedChampionsChange}/>
                            </div>
                        </Grid>
                        <Grid item xs={4}>
                            <Grid container alignItems="center" justifyContent="center" spacing={2}>
                                <Grid item xs={3}>
                                    <Typography sx={{my: '8px'}}>Items</Typography>
                                </Grid>
                                <Grid item xs={9}>
                                <ToggleButtonGroup
                                    value={selectedItemCategory}
                                    exclusive
                                    onChange={handleItemCategoryChange}
                                    aria-label="toggle options"
                                >
                                    <ToggleButton value="Components" aria-label="components">
                                    Components
                                    </ToggleButton>
                                    <ToggleButton value="Completed" aria-label="completed">
                                    Completed
                                    </ToggleButton>
                                    <ToggleButton value="Emblems" aria-label="emblems">
                                    Emblems
                                    </ToggleButton>
                                </ToggleButtonGroup>
                                </Grid>
                            </Grid>
                            <div style={{ width: '100%', marginTop: '16px'}}>
                                <DropdownSelector 
                                    optionsFilePath='/tft-item-components.json'
                                    selectedOptions={selectedItems} 
                                    onSelectedOptionsChange={handleSelectedItemsChange}/>
                            </div>
                        </Grid>
                        <Grid item xs={4}>
                            <Grid container alignItems="center" justifyContent="center" spacing={2}>
                                <Grid item xs={4}>
                                    <Typography sx={{my: '8px'}}>Augments</Typography>
                                </Grid>
                                <Grid item xs={8}>
                                <ToggleButtonGroup
                                    value={selectedAugmentCategory}
                                    exclusive
                                    onChange={handleAugmentCategoryChange}
                                    aria-label="toggle options"
                                >
                                    <ToggleButton value="Silver" aria-label="silver">
                                    Silver
                                    </ToggleButton>
                                    <ToggleButton value="Gold" aria-label="gold">
                                    Gold
                                    </ToggleButton>
                                    <ToggleButton value="Prismatic" aria-label="prismatic">
                                    Prismatic
                                    </ToggleButton>
                                </ToggleButtonGroup>
                                </Grid>
                            </Grid>
                            <div style={{ width: '100%', marginTop: '16px'}}>
                                {selectedAugmentCategory === "Prismatic" && 
                                <DropdownSelector 
                                optionsFilePath='/tft-augments-prismatic.json'
                                selectedOptions={selectedAugments} 
                                onSelectedOptionsChange={handleSelectedAugmentsChange}/>}
                                {selectedAugmentCategory === "Gold" && 
                                <DropdownSelector 
                                optionsFilePath='/tft-augments-silver.json'
                                selectedOptions={selectedAugments} 
                                onSelectedOptionsChange={handleSelectedAugmentsChange}/>}
                                {selectedAugmentCategory === "Silver" && 
                                <DropdownSelector 
                                optionsFilePath='/tft-augments-silver.json'
                                selectedOptions={selectedAugments} 
                                onSelectedOptionsChange={handleSelectedAugmentsChange}/>}
                            </div>
                        </Grid>
                    </Grid>
                    </div>
                    <div style={{ display:'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Button variant="contained" sx={{ mt:'16px'}} onClick={handleRecommendClick}>Recommend</Button>
                    </div>
                </CardContent>
            </Card>
                { loading && (
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                        <CircularProgress />
                        <Typography>Loading...</Typography>
                    </div>
                )}
                {showRecommendation && (
                    <RecommendationCard compsList={compList}></RecommendationCard>
                )} 
        </div>
    )
}

export default SelectorCard;