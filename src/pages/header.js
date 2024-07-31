import { Link, NavLink, redirect, useNavigate, useOutletContext } from "react-router-dom";
// import styles from "";   //header.css import하는법 찾아보기

export default function Header(){

    const activeStyle={color:'#FFFFFF',fontWeight:'bold'};

    return <>
    <nav className="navbar navbar-expand-md fixed-top">
        <div className="container-fluid">
            <div className="col-6">
                <Link className="navbar-brand" to="/">
                    <img src="/images/sample_logo.png" style={{width:'50px',height:'50px'}}/>
                </Link>
            </div>
            <div className="col-6">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="mynavbar">
                <ul className="navbar-nav ms-auto gap-3">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/login" style={({isActive})=>isActive?activeStyle:null}> New Plan <img src="/images/plus-circle.svg" style={{width:'15px',height:'15px'}}/> </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/singup" style={({isActive})=>isActive?activeStyle:null}> Notice </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/singup" style={({isActive})=>isActive?activeStyle:null}> Q&A </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/singup" style={({isActive})=>isActive?activeStyle:null}> <img src="/images/person-circle.svg" style={{width:'20px',height:'20px'}}/> </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/singup" style={({isActive})=>isActive?activeStyle:null}> <img src="/images/send.svg" style={{width:'20px',height:'20px'}}/> </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/changeInfo" style={({isActive})=>isActive?activeStyle:null}>계정관리</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/bookmark" style={({isActive})=>isActive?activeStyle:null}>즐겨찾기</NavLink>
                    </li>
                </ul>
            </div>
            
            </div>
        </div>
    </nav>
    </>
}