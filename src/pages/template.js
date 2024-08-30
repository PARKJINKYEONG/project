import { Outlet, useLocation } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";
import '../styles/common.css'
import Header2 from "./header2";

import NewHeader from "./newheader";


//레이아웃용 컴포넌트
export default function Template(){
    const location = useLocation();
    const isCreatePlanPage = location.pathname === "/createPlan";

    return <>
        {/* <Header /> */}

        {/* <Header2 /> */}
        <NewHeader/>
        <div className={`container godo-korfont ${isCreatePlanPage ? 'hide-footer' : ''}`}>
            <Outlet />
        </div>
        {!isCreatePlanPage && <Footer />}
    </>
}