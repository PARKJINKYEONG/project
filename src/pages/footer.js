import '../components/styles/common.css'

export default function Footer(){

    const activeStyle={color:'#FFFFFF',fontWeight:'bold'};

    return <>
        <footer className="page-footer font-small pt-4 roboto-condensed-engfont">				
            <div className="footer-copyright text-center pt-3">
                @TravelJoy GitHub <a className="text-body">https://github.com/nineoutof9</a>
            </div>				
        </footer>	
    </>
}