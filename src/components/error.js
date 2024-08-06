// 에러 내용 보여주는 컴포넌트
// 에러 내용은 props로 받기

export default function Error_({error}){
    return <>
         <div className="alert alert-danger">
            <strong>Error!</strong> {error}
        </div>
    
    </>
}