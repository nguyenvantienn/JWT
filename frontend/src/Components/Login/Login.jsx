import { useState } from "react";
import {useDispatch} from 'react-redux'
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import * as apis from "../../redux/apiRequest";
const Login = () => {
	const [userName, setUserName] = useState("");
	const [password, setPassword] = useState("");

	const dispatch = useDispatch();
	const navigate = useNavigate()

    const handleLogin =(e)=>{
        e.preventDefault(); //Khi submit ko bi load lai trang
        const newUser = {
            username : userName,
            password : password,
        };
        apis.loginUser(newUser , dispatch , navigate);
    }

	return (
		<section className="login-container">
			<div className="login-title"> Log in</div>
			<form onSubmit={handleLogin}>
				<label>USERNAME</label>
				<input
					value={userName}
					type="text"
					placeholder="Enter your username"
					onChange={(e) => {
						setUserName(e.target.value);
					}}
				/>
				<label>PASSWORD</label>
				<input
					value={password}
					type="password"
					placeholder="Enter your password"
					onChange={(e) => {
						setPassword(e.target.value);
					}}
				/>
				<button type="submit"> Continue </button>
			</form>
			<div className="login-register"> Don't have an account yet? </div>
			<Link className="login-register-link" to="/register">
				Register one for free{" "}
			</Link>
		</section>
	);
};

export default Login;
