import React, { useEffect, useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';

interface Option {
  name: string;
  iconUrl?: string;
}

interface DropdownSelectorProps {
    optionsFilePath: string; // Path to the JSON file with options
  }

const DropdownSelector: React.FC<DropdownSelectorProps> = ({ optionsFilePath }) => {
  const [options, setOptions] = useState<Option[]>([]);

  useEffect(() => {
    // Fetch and parse the JSON file
    fetch(optionsFilePath)
      .then((response) => response.json())
      .then((data) => {
        const uniqueOptions = new Set<Option>();

        // Extract and add each option name to the Set
        Object.values(data.data).forEach((item: any) => {
          var option: Option = {name: item.name}
          uniqueOptions.add(option);
        });

        // Convert the Set back to an array
        const uniqueOptionsArray = Array.from(uniqueOptions);

        setOptions(uniqueOptionsArray);
      })
      .catch((error) => console.error('Error fetching JSON:', error));

  }, [optionsFilePath]);

  return (
    <Autocomplete
      sx={{ width: 300 }} // Apply styling to the Autocomplete component
      options={options}
      getOptionLabel={(option: Option) => option.name}
      renderInput={(params) => (
        <TextField {...params} label="Select..." variant="outlined" />
      )}
    />
  );
};

export default DropdownSelector;