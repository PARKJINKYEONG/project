import { useEffect } from 'react';
import styles from '../../../styles/admin/sideMemoBar.module.css';


// 메모추가/삭제/조회는 여기서
const SideMemoBar = ({ dispatch, isopen }) => {

    useEffect(() => {
        if (isopen.isOpen) {
            // 예: dispatch({ type: 'fetchDataSuccess', payload: fetchedData });
        }
    }, [isopen]);

    const handleClose = () => {
        dispatch({ type: 'close' });
    };

    return (
        <div className={`${styles.sideMemoBar} ${isopen.isOpen ? styles.open : ''}`}>
            <button className={styles.closeButton} onClick={handleClose}>
                <img src="/images/icons/x.svg" style={{ width: '20px', height: '20px' }} alt="x" />
            </button>
            <div className={styles.content}>
                <div><h4>Memo</h4></div>
                <div>
                    {/* 여기에 메모 내용을 표시 map으로 */}
                </div>
            </div>
        </div>
    );
};

export default SideMemoBar;