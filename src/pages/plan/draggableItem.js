import {Grid, MenuItem, Select, TextField } from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export function DraggableItem({content, contents, type}){
    return <>
        
        <span>{content}</span>
        {type==='dropdown' && 
        <Grid container spacing={2}>
            <Select sx={{width: '50%'}}>
            <MenuItem value="">
                별점
            </MenuItem>
            {contents.map((item)=><MenuItem>{item}</MenuItem>)}
            </Select>
        </Grid>
        }
        {type==='range' &&
        
            <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Grid xs={12} sm={5}>
                    <TextField sx={{width: 1}} value={contents[0]} />
                </Grid>
                <Grid xs={12} sm={2}>
                    <ArrowBackIcon/><ArrowForwardIcon/>
                </Grid>
                <Grid xs={12} sm={5}>
                    <TextField sx={{width: 1}} value={contents[1]}/> 
                </Grid>
            </Grid>
        }
    </>
}