import React, { useEffect, useState } from 'react';
import { Autocomplete, TextField, ListItemText, ListItemAvatar, Avatar, SelectChangeEvent } from '@mui/material';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  List,
  ListItem,
} from '@mui/material';

export interface Option {
  name: string;
  iconUrl?: string;
}

interface DropdownSelectorProps {
    optionsFilePath: string; // Path to the JSON file with options
    selectedCategory: Number;
    selectedTier: Number;
    selectedOptions: Option[];
    onSelectedOptionsChange: (newSelectedOptions: Option[]) => void;
  }

const DropdownSelector: React.FC<DropdownSelectorProps> = ({ optionsFilePath, selectedCategory, selectedTier, selectedOptions, onSelectedOptionsChange }) => {
  const [options, setOptions] = useState<Option[]>([]);
  const CHAMPIONS = 1;
  const ITEMS = 2;
  const AUGMENTS = 3;

  useEffect(() => {
    // Fetch and parse the JSON file
    fetch(optionsFilePath)
      .then((response) => response.json())
      .then((data) => {
        const uniqueOptions = new Set<Option>();

        // Extract and add each option name to the Set
        Object.values(data['data']).forEach((item: any) => {
          if (selectedCategory == CHAMPIONS) {
            if (selectedTier != item.tier) {
              return; //skip if not in the correct tier
            }
          }
          var option: Option = {name: item.name, iconUrl: item.image.full}
          uniqueOptions.add(option);
        });
        //set it

        // Convert the Set back to an array
        const uniqueOptionsArray = Array.from(uniqueOptions);

        setOptions(uniqueOptionsArray);
      })
      .catch((error) => console.error('Error fetching JSON:', error));

  }, [optionsFilePath]);

  const handleOptionSelect = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value[event.target.value.length - 1];
    console.log(value)
    const selectedOption = options.find((option) => option.name === value);

    if (selectedOption) {
      console.log(selectedOption)
      const newSelectedOptions = [...selectedOptions, selectedOption];
      onSelectedOptionsChange(newSelectedOptions); // Update selectedOptions in the parent component
    }

    console.log(selectedOptions)
  };
    // BUGGED AF RIGHT NOW, IF U KEEP CLICKING THE SAME ONES IT BUGS OUT LIKE CRAZY
  return (
    <div style={{ width: '100%' }}>
    <FormControl fullWidth>
        <Select
          multiple
          value={selectedOptions.map((option) => option.name)}
          onChange={handleOptionSelect}
          renderValue={(selected) => (
            <div>
              {selected.map((value) => (
                <span key={value}>{value},</span>
              ))}
            </div>
          )}
          style={{ width: '100%', height: '40px' }}
        >
          {options.map((option) => (
            <MenuItem key={option.name} value={option.name}>
              <img
                src={option.iconUrl}
                alt={option.name}
                style={{width:'32px', height: '32px', marginRight: '8px'}}
              />
              {option.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {selectedOptions.length > 0 && (
        <List>
          {selectedOptions.map((selectedOption, index) => (
            <ListItem key={index}>
              {selectedOption.iconUrl && (
                <img
                  src={selectedOption.iconUrl}
                  alt={selectedOption.name}
                  style={{ width: '120px', height: '120px', marginRight: '8px' }}
                />
              )}
              {selectedOption.name}
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};

export default DropdownSelector;