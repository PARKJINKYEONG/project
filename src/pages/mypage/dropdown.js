
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function Dropdown({dropVal, items, uplabel, handleChange, underlabel}) {
  
  return <>
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">{uplabel}</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={dropVal}
          label="Uplabel"
          onChange={handleChange}
        >
          { items.map((item, index)=>(
            <MenuItem key={index} value={item}>{item}</MenuItem>
          )) }
        </Select>
        <FormHelperText>{underlabel}</FormHelperText>
      </FormControl>
      
    </div>
  </>
}