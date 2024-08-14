import ChangePassword from "./changePassword";
import ConfirmEmail from "./confitmEmail";
import { useState } from "react";

const FindPassword = () => {
    const [emailCheck, setEmailCheck] = useState(false)
    return <>
        {!emailCheck && <ConfirmEmail setEmailCheck={setEmailCheck}/>}
        {emailCheck && <ChangePassword/>}
  </>
};

export default FindPassword;