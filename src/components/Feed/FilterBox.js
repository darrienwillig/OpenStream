import { useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function FilterBox ({ currentCollections, currentFilter, handleChange}) {
  return (
    <>
    <FormControl style={{marginLeft: '7%'}}>
      <FormLabel id="demo-controlled-radio-buttons-group" style={{color: '#FCFFE7', fontWeight: 'bold', marginLeft: '3%' }}>Filter By Collection</FormLabel>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={currentFilter}
        onChange={(e) => handleChange(e)}
      >
                <FormControlLabel value="all" control={<Radio />} label="All Collections" />
        {
          currentCollections.length > 0 && currentCollections.map((collection, index) => {
            return (
              <FormControlLabel style={{marginTop: '6%'}} key={index} value={collection.slug} control={<Radio />} label={collection.name} />
            )
          })
        }
      </RadioGroup>
    </FormControl>
    </>
  )
}