import { useEffect, useState } from 'react';
import styles from '../../../styles/component/button.module.css';

export default function RecordButton({ onStartRecording, onStopRecording }) {
    const [mic, setMic] = useState(false);
    const [error, setError] = useState(null);

    const requestMicrophoneAccess = async () => {
        setError(null);
        onStartRecording();  // 모달을 먼저 띄우도록 변경

        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            setMic(true);
            stream.getTracks().forEach(track => track.stop()); // 사용 후 스트림 종료
        } catch (err) {
            setMic(false);
            setError("마이크 접근 권한이 거부되었습니다.");  // 에러 메시지 설정
            onStopRecording("마이크 접근 권한이 거부되었습니다.");
        }
    };

    const uploadRecord = async (mediaBlobUrl) => {
        try {
            const blob = await fetch(mediaBlobUrl).then(r => r.blob());
            const formData = new FormData();
            formData.append("file", blob, "audio.wav");

            const response = await fetch("http://localhost:8080/api/stt/record", {
                method: "POST",
                body: formData,
            });

            const text = await response.text();
            const result = JSON.parse(text);
            onStopRecording(result.transcript || "No transcript received");
        } catch (error) {
            onStopRecording('Upload failed');
        }
    };

    return (
        <>
            <button className={styles.recordButton} onClick={requestMicrophoneAccess}>
                <img src="/images/home/voice.png" alt="Voice Search" className={styles.recordButtonimg}/>
            </button>
        </>
    );
}