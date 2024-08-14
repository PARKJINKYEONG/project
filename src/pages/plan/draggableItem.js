import { Grid, Rating, TextField } from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export function DraggableItem({ content, contents, type, value, setValue }) {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                {content}
            </Grid>
            {type === 'dropdown' && (
                <Grid container sx={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                    <Grid item>
                        <Rating
                            name="simple-controlled"
                            value={value}
                            onChange={(event, newValue) => {
                                setValue(newValue);
                            }}
                        />
                    </Grid>
                </Grid>
            )}
            {type === 'range' && (
                <Grid container sx={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                    <Grid item xs={5}>
                        <TextField type='number' sx={{ width: 1 }}  />
                    </Grid>
                    <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <ArrowBackIcon /><ArrowForwardIcon />
                    </Grid>
                    <Grid item xs={5}>
                        <TextField type='number' sx={{ width: 1 }}  />
                    </Grid>
                </Grid>
            )}
        </Grid>
    );
}