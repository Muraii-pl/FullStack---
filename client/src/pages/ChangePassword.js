import React, {useState} from 'react';
import axios from "axios";


const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")

    const changePassword = () => {
        axios.put("http://localhost:3001/auth/changepassword", {
                oldPassword: oldPassword,
                newPassword: newPassword
            }, {headers: {accessToken: localStorage.getItem("accessToken")}}
        ).then((response)=>{
            if(response){
                console.log(response.data)
            } else {

            }
        })
    }
    return (
        <div>
            <h1>Change Your Password</h1>
            <input type="password" placeholder="Old Password..." onChange={(event) => {
                setOldPassword(event.target.value)
            }}/>
            <input type="password" placeholder="New Password..." onChange={(event) => {
                setNewPassword(event.target.value)
            }}/>
            <button onClick={changePassword}>Save Changes</button>
        </div>
    );
};

export default ChangePassword;