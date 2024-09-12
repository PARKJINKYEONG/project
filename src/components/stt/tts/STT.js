import React, { useState } from 'react';
import { ReactMediaRecorder } from 'react-media-recorder';

export default function STT() {
    const [mic, setMic] = useState(false);
    const [error, setError] = useState(null);
    const [resp, setResp] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const requestMicrophoneAccess = async () => {
        setError(null);

        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            setMic(true);
            stream.getTracks().forEach(track => track.stop()); // 사용 후 스트림 종료
        } catch (err) {
            setMic(false);
            setError(err.message);
        }
    };

    const uploadAudioAsOctetStream = async (mediaBlobUrl) => {
        try {
            const blob = await fetch(mediaBlobUrl).then(r => r.blob());
            console.log('Blob:', blob); // 업로드할 Blob의 정보 출력
            const formData = new FormData();
            formData.append("file", blob, "audio.wav");
    
            const response = await fetch("http://localhost:8080/api/stt/record", {
                method: "POST",
                body: formData,
            });
    
            const text = await response.text();
            const result = JSON.parse(text);
            console.log('Response:', result); // 서버에서 반환된 응답 로그
            setResp(result.transcript || "No transcript received");
        } catch (error) {
            console.error('Upload failed:', error);
            setResp('Upload failed');
        }
    };

    const uploadSelectedFile = async () => {
        console.log('upload Audio File click!');
        if (!selectedFile) return;

        const formData = new FormData();
        formData.append("file", selectedFile);

        try {
            const response = await fetch("http://localhost:8080/api/stt/upload", {
                method: "POST",
                body: formData,
            });

            const result = await response.json();
            console.log(result);
            setResp(result.transcript || "No transcript received");
        } catch (error) {
            console.error('Upload failed:', error);
            setResp('Upload failed');
        }
    };


    

    return (
        <div>
            <div>
                <button onClick={requestMicrophoneAccess}>Request Microphone Access</button>
                <p>Mic Status: {mic ? "Granted" : "Denied"}</p>
                {error && <p style={{ color: 'red' }}>Error: {error}</p>}
            </div>

            <h2>음성 녹음 및 업로드</h2>

            <ReactMediaRecorder
                audio
                render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
                    <div>
                        <p>{status}</p>
                        <button onClick={startRecording}>Start Recording</button>
                        <button onClick={stopRecording}>Stop Recording</button>
                        <audio src={mediaBlobUrl} controls />
                        {mediaBlobUrl && (
                            <button onClick={() => uploadAudioAsOctetStream(mediaBlobUrl)}>
                                Upload Recording
                            </button>
                        )}
                    </div>
                )}
            />

            <hr />
            <h2>파일 업로드</h2>
            <input type="file" accept="audio/*" onChange={handleFileChange} />
            <button onClick={uploadSelectedFile} disabled={!selectedFile}>
                Upload Selected File
            </button>

            <hr />
            <h2>STT 결과</h2>
            <h3>{resp}</h3>
        </div>
    );
}