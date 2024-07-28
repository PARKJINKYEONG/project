import { Outlet } from "react-router-dom";
import Header from "./header";
import BigTitleHeader from "./bigTitleHeader";
import Footer from "./footer";

//레이아웃용 컴포넌트
export default function Template(){


    return <>
        <Header />
        <BigTitleHeader/>
        <div className="container">
            <Outlet />
        </div>
        <Footer/>
    </>
}