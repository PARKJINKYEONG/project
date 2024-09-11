import { Outlet, useLocation } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";
import '../styles/common.css'



//레이아웃용 컴포넌트
export default function Template(){
    const location = useLocation();
    const isCreatePlanPage = location.pathname === "/createPlan";

    return <>
        <Header />
        <div className={`container nanumsqr-korfont ${isCreatePlanPage ? 'hide-footer' : ''}`}>
            <Outlet />
        </div>
        {!isCreatePlanPage && <Footer />}
    </>
}