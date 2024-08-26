import { useEffect, useRef } from "react";
import Calendar from "../../components/calendar";
import styles from '../../styles/alarmView.module.css';
import { useNavigate } from "react-router-dom";
import AlarmSpeechBubble from "../../components/speechBubble";

const AlarmView = () => {
    const navigate = useNavigate();
    const calendarRef = useRef(null);

    useEffect(() => {
        // 제주도 일정에 해당하는 이벤트를 찾아서 스타일을 변경
        const eventElements = document.querySelectorAll('.fc-event-title');
        
        eventElements.forEach(el => {
            if (el.textContent === '제주도 일정') {
                const parentEl = el.parentElement;
                
                // 깜빡이는 효과를 유지하기 위해 클래스 추가
                parentEl.classList.add(styles.blinkingBorder);

                // 클릭 이벤트 추가
                parentEl.style.cursor = 'pointer';
                parentEl.addEventListener('click', () => {
                    navigate('/mypage/plan');
                });
            }
            });

            return () => {
                eventElements.forEach(el => {
                    if (el.textContent === '제주도 일정') {
                        const parentEl = el.parentElement;
                        parentEl.removeEventListener('click', () => {
                            navigate('/mypage/plan');
                        });
                    }
            });
        };
    }, [navigate]);

    return<>
        <div ref={calendarRef} style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
            <div style={{ width: '100%', border: '1px solid #ddd', borderRadius: '8px', padding: '20px', backgroundColor: 'white' }}>
                <Calendar/><br/>
                <AlarmSpeechBubble>
            
                </AlarmSpeechBubble>                
            </div>    
        </div>
    </>
};
export default AlarmView;