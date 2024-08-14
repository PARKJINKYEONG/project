import React,{useState,useEffect} from "react";
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import styles from "../../styles/Home.module.css";
import ChatRoom from '../../components/chat/chatroom';
import axios from "axios";
import Mahome from './mahome';


export default function Home(){


    const [chatShow,setChatShow]=useState(false);
    
    // RESTAPI와 연동 시도중
    const [hello,setHello] = useState()
    useEffect(()=>{
        axios.get('/api')
        .then(response=>setHello(response.data))
        .catch(error=>console.log(error))

    },[]);

    const actions = [
        { icon:  <img src="/images/agent2.svg" style={{width:'30px',height:'30px'}} alt="logo" onClick={()=>{setChatShow(!chatShow)}} />, name: '1:1 상담사 연결' },
        { icon: <img src="/images/robot.svg" style={{width:'30px',height:'30px'}} alt="logo" onClick={()=>{setChatShow(!chatShow)}} />, name: '챗봇' },
    ];

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return <>
    {/* <div>백엔드 연동 : {hello} </div> */}
        {chatShow && <ChatRoom/>}        
        <Box position="fixed" sx={{height:360,transform: 'translateZ(0px)', flexGrow: 1}} className={styles.sideController}>
            <SpeedDial ariaLabel="SpeedDial basic example" sx={{ position: 'absolute', top: '60vh', left: '115vh'}} icon={<SpeedDialIcon />} onClose={handleClose} onOpen={handleOpen} open={open}>
                {actions.map((action) => (
                <SpeedDialAction key={action.name} icon={action.icon} tooltipTitle={action.name} sx={{ bgcolor:'white'}} onClick={handleClose}/>
                ))}
            </SpeedDial>
        </Box>
        
        <Mahome />
    </>
}