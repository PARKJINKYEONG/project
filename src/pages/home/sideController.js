import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';

import styles from "../../styles/SideController.module.css";


export default function SideController(){

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return <>
        {/* <Box position="fixed" sx={{height:360,transform: 'translateZ(0px)', flexGrow: 1}}>
            
            <SpeedDial ariaLabel="SpeedDial basic example" sx={{ position: 'absolute', top: '60vh', left: '115vh'}} icon={<SpeedDialIcon />} onClose={handleClose} onOpen={handleOpen} open={open}>
                {actions.map((action) => (
                <SpeedDialAction key={action.name} icon={action.icon} tooltipTitle={action.name} sx={{ bgcolor:'white'}} onClick={handleClose}/>
                ))}
            </SpeedDial>
        </Box> */}
    </>
}