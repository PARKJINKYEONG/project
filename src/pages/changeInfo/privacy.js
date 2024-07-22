import React from 'react';

export default function Privacy() {
    return (
        <div className="container mt-5">
            <h2>개인정보 수정</h2>
            <div className="row mt-4">
                <div className="col-12 col-md-6">
                    <div className="mb-3">
                        <label className="form-label">실명</label>
                        <div className="d-flex justify-content-between align-items-center">
                            <input type="text" className="form-control" value="홍길동" readOnly />
                            <a href="#" className="btn btn-outline-primary ms-2">수정</a>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">이메일 주소</label>
                        <div className="d-flex justify-content-between align-items-center">
                            <input type="email" className="form-control" value="example@example.com" readOnly />
                            <a href="#" className="btn btn-outline-primary ms-2">수정</a>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">전화번호</label>
                        <div className="d-flex justify-content-between align-items-center">
                            <input type="tel" className="form-control" value="010-1234-5678" readOnly />
                            <a href="#" className="btn btn-outline-primary ms-2">수정</a>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">주소</label>
                        <div className="d-flex justify-content-between align-items-center">
                            <input type="text" className="form-control" value="서울특별시 강남구" readOnly />
                            <a href="#" className="btn btn-outline-primary ms-2">수정</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
