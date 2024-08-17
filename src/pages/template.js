import { Outlet } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";
import SideController from "./home/sideController";
import styles from "../styles/SideController.module.css";
import '../styles/common.css'

//레이아웃용 컴포넌트
export default function Template(){


    return <>
        <Header />
        <div className="container godo-korfont">
            <Outlet />
        </div>
        <Footer/>
        {/* footer 경미님이 만드신것처럼 mui 말고 div로 만들어주세요 */}
    </>
}