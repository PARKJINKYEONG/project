import React,{useState,useEffect} from "react";
import axios from "axios";

import ProductHero from './ProductHero';
import ProductSmokingHero from './ProductSmokingHero';
import ProductCategories from './ProductCategories';
import ProductValues from './ProductValues';
import ChatBot from "../ChatBot/ChatBot";



export default function Home(){


    // const [chatShow,setChatShow]=useState(false);
    
    // // RESTAPI와 연동 시도중
    // const [hello,setHello] = useState()
    // useEffect(()=>{
    //     axios.get('/api')
    //     .then(response=>setHello(response.data))
    //     .catch(error=>console.log(error))

    // },[]);

    // const actions = [
    //     { icon:  <img src="/images/agent2.svg" style={{width:'30px',height:'30px'}} alt="logo" onClick={()=>{setChatShow(!chatShow)}} />, name: '1:1 상담사 연결' },
    //     { icon: <img src="/images/robot.svg" style={{width:'30px',height:'30px'}} alt="logo" onClick={()=>{setChatShow(!chatShow)}} />, name: '챗봇' },
    // ];

    // const [open, setOpen] = useState(false);
    // const handleOpen = () => setOpen(true);
    // const handleClose = () => setOpen(false);

    return <>        
        <ProductHero />
        <ProductSmokingHero />
        <ProductCategories />
        <ProductValues />

        <ChatBot />
    </>
}