import { NavLink } from "react-router-dom";

export default function LoginSecurity(){
    const handleEdit = (field) => {
    
    };

    return (
        <div className="privacy-container">
          <h2>아이디/비밀번호 수정</h2>
          <div className="privacy-content">
            <div className="privacy-item">
              <label className="form-label">변경 전 아이디</label>
              <div className="input-group">
                <input type="text" className="form-control" value="111@naver.com" readOnly />
                
              </div>
            </div>
            <div className="privacy-item">
              <label className="form-label">변경 후 아이디</label>
              <div className="input-group">
                <input type="email" className="form-control" value="example@example.com" readOnly />
                <button onClick={() => handleEdit('email')} className="btn btn-outline-primary ms-2">수정</button>
              </div>
            </div>
            <div className="privacy-item">
              <label className="form-label">변경 전 비밀번호</label>
              <div className="input-group">
                <input type="text" className="form-control" value="12345678" readOnly />
              </div>
            </div>
            <div className="privacy-item">
              <label className="form-label">변경 후 비밀번호</label>
              <div className="input-group">
                <input type="text" className="form-control" value="87654321" readOnly />
                <button onClick={() => handleEdit('password')} className="btn btn-outline-primary ms-2">수정</button>
              </div>
            </div>
          </div>
        </div>
      );
    }