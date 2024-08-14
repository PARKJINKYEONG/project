import { Link, useNavigate } from "react-router-dom"
import './board.css';

const Form=()=>{
    
    return <>
        <div className="header">
            <h3>
                글 작성
            </h3>
        </div>
        <form>
        <div>
            <div className="title-form">
                <input type="text" className="form-control" id="title" placeholder="제목" name="title"/>
            </div>
            <div class="content-form">
                <textarea className="form-control" rows="5" id="content" name="content" placeholder="내용을 입력하세요"></textarea>
            </div>
        </div>
        
        <div className="text-right">
            <button type="submit" className="btn btn-primary">등록</button>
        </div>
        </form>
    </>
};
export default Form;