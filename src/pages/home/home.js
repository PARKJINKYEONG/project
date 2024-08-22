import React,{useState,useEffect} from "react";
import axios from "axios";

import ProductHero from './ProductHero';
import ProductSmokingHero from './ProductSmokingHero';
import ProductCategories from './ProductCategories';
import ProductValues from './ProductValues';



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
        <ProductHero /> {/* 대표이미지, 조금 더 크게+ 이미지 변하는 효과 */}
        {/* 간격 좀 넣어주세용 */}
        <ProductSmokingHero /> {/* 헬프, 조금만 작아지면 좋겠어요 */}
        {/* 간격 좀 넣어주세용 */}
        <ProductCategories /> {/* 사이트 소개, 좀 작아지면 좋겠어요 */}
        <ProductValues /> {/* 인기여행지, 좀 작아지면 좋겠어요, 내용이 두줄정도되면 좋을것같아요 */}
               
    </>
}