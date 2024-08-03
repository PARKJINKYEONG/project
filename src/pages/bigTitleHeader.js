import { Link, NavLink, redirect, useNavigate, useOutletContext } from "react-router-dom";
import style from "../components/css/Header.module.css";

export default function BigTitleHeader(){

    const activeStyle={color:'#FFFFFF',fontWeight:'bold'};
    

    return <>
    <nav className="navbar navbar-expand-md fixed-top mt-5 style.header">
        <div className="container-fluid">
            <div className="col-4">
                <Link className="navbar-brand" to="/">
                    <img src="/images/sample_logo.png" style={{width:'50px',height:'50px'}}/>
                </Link>
            </div>
            <div className="col-4 text-center fs-2">
                Travel Joy
            </div>
            <div className="col-4">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="mynavbar">
                <ul className="navbar-nav ms-auto ">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/login" style={({isActive})=>isActive?activeStyle:null}> Sign In </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/singup" style={({isActive})=>isActive?activeStyle:null}> Sign Up </NavLink>
                    </li>
                    
                </ul>
            </div>
            
            </div>
        </div>
    </nav>
    </>
}