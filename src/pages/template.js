import { Outlet } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";
import SideController from "./home/sideController";
import styles from "../components/styles/SideController.module.css";
import '../components/styles/common.css'

//레이아웃용 컴포넌트
export default function Template(){


    return <>
        <Header />
        <div className="container">
            <Outlet />
        </div>
        <Footer/>
    </>
}