import { useNavigate } from "react-router-dom";

const AlarmDetail= () => {
    const navigate = useNavigate();

    const alarmData = {
        id: 1,
        title: '알림 1: 메시지가 도착했습니다.',
        date: '2024-08-15'
    };

    const handleRowClick = () => {
        navigate(`/mypage/alarmView`);
    };

    const handleMouseEnter = (e) => {
        e.currentTarget.style.backgroundColor = '#bbdefb'; //커서가 올라갔을 때 배경색 변경
    };

    const handleMouseLeave = (e) => {
        e.currentTarget.style.backgroundColor = '#e3f2fd'; //커서가 벗어났을 때 원래 배경색으로 복귀
    };
    return<>
        <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
            <div style={{ width: '100%', border: '1px solid #ddd', borderRadius: '8px', padding: '20px', backgroundColor: 'white' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>알림 상세 정보</h2>
                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px',border: '1px solid #ddd' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#1976d2', color: 'white', textAlign: 'left' }}>
                            <th style={{ padding: '10px' }}>ID</th>
                            <th style={{ padding: '10px' }}>알림 제목</th>
                            <th style={{ padding: '10px' }}>알림 날짜</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style={{ backgroundColor: '#e3f2fd' }} onClick={handleRowClick}  onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{alarmData.id}</td>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{alarmData.title}</td>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{alarmData.date}</td>
                        </tr>
                    </tbody>
                </table>
            </div>    
        </div>
    </>
};
export default AlarmDetail;