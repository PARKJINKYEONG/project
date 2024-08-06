import { Link, NavLink, redirect, useNavigate, useOutletContext } from "react-router-dom";
import style from "../components/styles/Header.module.css";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BarChartIcon from '@mui/icons-material/BarChart';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

export default function Header(){

    const activeStyle={fontWeight:'normal'};


    var isAuth=false;

    function change(){
        console.log('click!',isAuth)
        if(isAuth===false)
            isAuth=true;
        else
            isAuth=false;
    }



    var isAuth=false;

    function change(){
        console.log('click!',isAuth)
        if(isAuth==false)
            isAuth=true;
        else
            isAuth=false;
    }


    return <>
    <nav className="navbar navbar-expand-md fixed-top style.header roboto-condensed-engfont " id="bg-color">
        {(isAuth===true)?
            <div className="container-fluid">
                <div className="col-4">
                    <Link className="navbar-brand" to="/">
                        <img src="/images/sample_logo.png" style={{width:'50px',height:'50px'}} alt="logo"/>

                    </Link>
                </div>
                <div className="col-4 text-center fs-2 playwrite-dk-loopet-engfont">
                    Travel Joy
                </div>
                <div className="col-4">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="mynavbar">
                    <ul className="navbar-nav ms-auto ">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/" onClick={change}> Sign In </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/"> Sign Up </NavLink>
                        </li>
                        
                    </ul>
                    </div>
                </div>
            </div>
            :
            <div className="container-fluid {style.tjheader}" >
                <div className="col-6">
                    <Link className="navbar-brand" to="/">
                        <img src="/images/sample_logo.png" style={{width:'50px',height:'50px'}} alt="logo"/>

                    </Link>
                    <div className={style.headerTitle}>Travel Joy</div>

                </div>

                <div className="col-6 text-end">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="mynavbar">
                    <ul className="navbar-nav ms-auto gap-3" >
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/" onClick={change} style={({isActive})=>isActive?activeStyle:null} > New Plan <img src="/images/plus-circle.svg" style={{width:'15px',height:'15px'}} alt="new plan"/> </NavLink>
                        </li>
                        {/* style={({isActive})=>isActive?activeStyle:null} */}
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/" style={({isActive})=>isActive?activeStyle:null} > Notice </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/" style={({isActive})=>isActive?activeStyle:null} > Q&A </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/" style={({isActive})=>isActive?activeStyle:null} > <img src="/images/person-circle.svg" style={{width:'20px',height:'20px'}} alt="profile"/> </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/" style={({isActive})=>isActive?activeStyle:null} > <img src="/images/bell.svg" style={{width:'20px',height:'20px'}} alt="alarm"/> </NavLink>
                        </li>
                        <li className="nav-item">

                            <NavLink className="nav-link" to="/bookmark" style={({isActive})=>isActive?activeStyle:null} > <FavoriteBorderIcon /> </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/statistics" style={({isActive})=>isActive?activeStyle:null} > <BarChartIcon/> </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/changeInfo" style={({isActive})=>isActive?activeStyle:null} > <ManageAccountsIcon/> </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/ReviewList" style={({isActive})=>isActive?activeStyle:null} > 여행후기 </NavLink>
                        </li>
                    </ul>
                </div>
                
                </div>

            </div>
            }

    </nav>
    </>
}