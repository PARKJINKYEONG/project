import React,{useState,useEffect} from "react";
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import styles from "../../components/styles/Home.module.css";
import ChatRoom from '../../chat/chatroom';
import axios from "axios";


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

    return <>
    {/* <div>백엔드 연동 : {hello} </div> */}
        {chatShow && <ChatRoom/>}        
        <Box position="fixed" sx={{height:360,transform: 'translateZ(0px)', flexGrow: 1}}>
            {/* 메인페이지 내용 */}
            <SpeedDial ariaLabel="SpeedDial basic example" sx={{ position: 'absolute', top: '60vh', left: '115vh'}} icon={<SpeedDialIcon />} >
                {actions.map((action) => (
                <SpeedDialAction key={action.name} icon={action.icon} tooltipTitle={action.name} sx={{ bgcolor:'white'}}/>
                ))}
            </SpeedDial>
        </Box>
    </>
}