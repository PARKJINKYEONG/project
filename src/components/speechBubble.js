const AlarmSpeechBubble = ({ children, style }) => {

    return<>
        <div style={{
        position: 'absolute',
        top: '50px',
        right: '10px',
        backgroundColor: 'white',
        border: '1px solid #ccc',
        borderRadius: '5px',
        padding: '5px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        zIndex: 1000,
        ...style
        }}>
        {children} {/* 이 위치에 부모 컴포넌트에서 전달된 내용이 삽입됩니다 */}
        </div>
    </>
};
export default AlarmSpeechBubble;