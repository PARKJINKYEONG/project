import { Route, Routes } from "react-router-dom"
import AdminHome2 from "./adminHome2"
import ChatManagement from "../chatManagement/chatManagement"
import QuestionManagement from "../QnA/questionManagement"
import NoticeManagement from "../notice/noticeManagement"
import CollapsibleTable from "../reportManagement"
import StatisticHome from "../../statistic/statisticHome"
import Privacy from "../../changeInfoAsManager/privacy"
import FAQManagement from "../QnA/FAQManagement"

<ChatManagement/>

export default function AdminRoutes2(){

    return <>
        <Routes>
            <Route element={<AdminHome2/>}>
                <Route path="/"/>

                <Route path="/userinfo" element={<Privacy/>}/>
                <Route path="/alarm"/>
                <Route path="/reports" element={<CollapsibleTable/>}/>

                <Route path="/notice" element={<NoticeManagement/>}/>
                <Route path="/review"/>
                <Route path="/comments"/>

                <Route path="/questions" element={<QuestionManagement/>}/>
                <Route path="/faq" element={<FAQManagement/>} />
                <Route path="/chatting" element={<ChatManagement/>}/>

                <Route path="/contents"/>
                <Route path="/statistics" element={<StatisticHome/>}/>
                

            </Route>


        </Routes>
    </>
}