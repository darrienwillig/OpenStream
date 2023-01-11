import { useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function FilterBox ({ currentCollections, currentFilter, handleChange}) {

  return (
    <>
    <FormControl>
      <FormLabel id="demo-controlled-radio-buttons-group" style={{color: '#FCFFE7', fontWeight: 'bold' }}>Filter By Collection</FormLabel>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={currentFilter}
        onChange={(e) => handleChange(e)}
      >
        <FormControlLabel value="all" control={<Radio />} label="All Collections" />
        <FormControlLabel value="female" control={<Radio />} label="Female" />
      </RadioGroup>
    </FormControl>
    </>
  )
}