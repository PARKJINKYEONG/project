import { Link, NavLink, redirect, useNavigate, useOutletContext } from "react-router-dom";

export default function Header(){

    const activeStyle={color:'#FFFFFF',fontWeight:'bold'};

    return <>
    <nav className="navbar navbar-expand-sm bg-dark navbar-dark fixed-top">
        <div className="container-fluid">
            <Link className="navbar-brand" to="/">
                <img src="/images/tornado.svg" style={{width:'40px'}}/>
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="mynavbar">
            <ul className="navbar-nav ms-auto ">
                <li className="nav-item">
                    <NavLink className="nav-link" to="/login" style={({isActive})=>isActive?activeStyle:null}> 로그인 </NavLink>

                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/users" style={({isActive})=>isActive?activeStyle:null}> 회원</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/board"  style={({isActive})=>isActive?activeStyle:null}> 게시판 </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/photos" style={({isActive})=>isActive?activeStyle:null}> 사진 </NavLink>
                </li>
                
            </ul>
            
            </div>
        </div>
    </nav>
    </>
}