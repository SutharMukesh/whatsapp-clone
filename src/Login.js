import React from "react";
import { Button } from "@material-ui/core";
import "./Login.css";
import { auth, provider } from "./firebase";
import { useStateValue } from "./StateProvider";
function Login() {
	const [{}, dispatch] = useStateValue();

	const signIn = () => {
		auth.signInWithPopup(provider)
			.then((result) => {
				dispatch({
					type: "SET_USER",
					user: result.user,
				});
			})
			.catch((err) => {
				alert(`Auth: ${err.message}`);
			});
	};
	return (
		<div className="login">
			<div className="login__container">
				<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/225px-WhatsApp.svg.png" alt="" />
				<div className="login__text">
					<h1>Sign In to Whatsapp clone</h1>
				</div>

				<Button type="submit" onClick={signIn}>
					Sign In with Google
				</Button>
			</div>
		</div>
	);
}

export default Login;
