import React, { useEffect, useState } from 'react';
import { Autocomplete, TextField, ListItemText, ListItemAvatar, Avatar } from '@mui/material';
import ChampionIcon from './ChampionIcon';

export interface Option {
  name: string;
  iconUrl?: string;
}

interface DropdownSelectorProps {
    optionsFilePath: string; // Path to the JSON file with options
  }

const DropdownSelector: React.FC<DropdownSelectorProps> = ({ optionsFilePath }) => {
  const [options, setOptions] = useState<Option[]>([]);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  useEffect(() => {
    // Fetch and parse the JSON file
    fetch(optionsFilePath)
      .then((response) => response.json())
      .then((data) => {
        const uniqueOptions = new Set<Option>();

        // Extract and add each option name to the Set
        Object.values(data).forEach((item: any) => {
          var option: Option = {name: item.name, iconUrl: item.iconUrl}
          uniqueOptions.add(option);
        });
        //set the shit

        // Convert the Set back to an array
        const uniqueOptionsArray = Array.from(uniqueOptions);

        setOptions(uniqueOptionsArray);
      })
      .catch((error) => console.error('Error fetching JSON:', error));

  }, [optionsFilePath]);

  const handleOptionSelect = (option: Option | null) => {
    setSelectedOption(option);
  };

  return (
    <div>
    <Autocomplete
      sx={{ width: 300 }} // Apply styling to the Autocomplete component
      options={options}
      getOptionLabel={(option: Option) => option.name}
      onChange={(event, newValue) => handleOptionSelect(newValue)}
      renderInput={(params) => (
        <TextField {...params} label="Select..." variant="outlined" />
      )}
      renderOption={(props, option: Option) => (
        <li {...props}>
          <ListItemAvatar>
            <Avatar src={option.iconUrl} alt={option.name} />
          </ListItemAvatar>
          <ListItemText primary={option.name} />
        </li>
      )}
    />
    {selectedOption && (
      <ChampionIcon imageUrl={selectedOption.iconUrl} />
    )}
    </div>
  );
};

export default DropdownSelector;