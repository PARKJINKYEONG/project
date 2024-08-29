import { Outlet, useLocation } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";
import SideController from "./home/sideController";
import styles from "../styles/SideController.module.css";
import '../styles/common.css'
import Header2 from "./header2";

//레이아웃용 컴포넌트
export default function Template(){
    const location = useLocation();
    const isCreatePlanPage = location.pathname === "/createPlan";

    return <>
        {/* <Header /> */}
        <Header2/>
        <div className={`container godo-korfont ${isCreatePlanPage ? 'hide-footer' : ''}`}>
            <Outlet />
        </div>
        {!isCreatePlanPage && <Footer />}
    </>
}