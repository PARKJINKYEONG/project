import { Link, useNavigate } from "react-router-dom";
import AlarmSpeechBubble from "../../components/speechBubble";

const Alarm = ({ isDropdownVisible, style, setIsDropdownVisible }) => {
    const navigate = useNavigate();

    const handleAlarmClick = () => {
        setIsDropdownVisible(false); // 말풍선 닫기
        navigate("/mypage/alarmDetail"); // 알림 상세 페이지로 이동
    };

    return(
        isDropdownVisible && (
            <AlarmSpeechBubble style={style}>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                    <li>
                        <Link to="/mypage/alarmDetail" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <p style={{ margin: 0, padding: '10px', cursor: 'pointer' }} onClick={handleAlarmClick}
                                 onMouseEnter={(e) => e.target.style.backgroundColor = '#f0f0f0'}
                                 onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'} 
                            >
                                알림이 도착했습니다.
                            </p>
                        </Link>
                    </li>
                </ul>
            </AlarmSpeechBubble>
        )
    );
};
export default Alarm;