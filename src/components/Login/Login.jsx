import { useState } from "react";
import "./login.css";

export default function LoginSignup({ setIsEntered, setCurrentUser }) {
	const [isLogin, setIsLogin] = useState(true);
	const [isSignup, setIsSignup] = useState(false);
	const [loginData, setLoginData] = useState({ email: "", password: "" });
	const [signupData, setSignupData] = useState({ name: "", email: "", password: "", files: [] });
	const [showLoginPassword, setShowLoginPassword] = useState(false);
	const [showSignupPassword, setShowSignupPassword] = useState(false);
	const [isAlert, setIsAlert] = useState(false);
	const [alertMessage, setAlertMessage] = useState("");

	const toggleLoginPassword = () => setShowLoginPassword((prev) => !prev);
	const toggleSignupPassword = () => setShowSignupPassword((prev) => !prev);
	const handlePasswordToggleKey = (e, toggleFn) => {
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			toggleFn();
		}
	};
	const confirmSignup = () => {
		try {
			const usersExisting = JSON.parse(localStorage.getItem("users")) || [];
			const userExists = usersExisting.some(user => user.email === signupData.email);
			if (userExists) {
				setAlertMessage("User already exists. Please login.");
				setIsAlert(true);
				setTimeout(() => {
					setIsAlert(false);
				}, 1500);
				return;
			}
			usersExisting.push(signupData);
			localStorage.setItem("users", JSON.stringify(usersExisting));
			setAlertMessage("Signup successful!");
			setIsAlert(true);
			setCurrentUser(signupData.email);
			setTimeout(() => {
				setIsEntered(true);
			}, 1000);
		} catch (error) {
			console.error('Error during signup:', error);
			setAlertMessage("Signup failed. Please try again.");
			setIsAlert(true);
			setTimeout(() => {
				setIsAlert(false);
			}, 1500);
		}
	};
	const confirmLogin = () => {
		try {
			const usersExisting = JSON.parse(localStorage.getItem("users")) || [];
			const userExists = usersExisting.some(user => user.email === loginData.email && user.password === loginData.password);
			if (userExists) {
				setAlertMessage("Login successful!");
				setIsAlert(true);
				setCurrentUser(loginData.email);
				setTimeout(() => {
					setIsEntered(true);
				}, 1000);
			} else {
				setAlertMessage("Invalid credentials. Please try again.");
				setIsAlert(true);
				setTimeout(() => {
					setIsAlert(false);
				}, 1500);
			}
		} catch (error) {
			console.error('Error during login:', error);
			setAlertMessage("Login failed. Please try again.");
			setIsAlert(true);
			setTimeout(() => {
				setIsAlert(false);
			}, 1500);
		}
	};
	return (
		<div className="login-signup-container">
			{isLogin && (
				<div className="login-form">
					<input
						type="email"
						placeholder="Email"
						value={loginData.email}
						onChange={(e) => setLoginData({ ...loginData, email: e.target.value })} />
					<div className={`password-field ${showLoginPassword ? "show" : ""}`}>
						<input
							type={showLoginPassword ? "text" : "password"}
							placeholder="Password"
							value={loginData.password}
							onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} />
						<span
							className="password-toggle"
							role="button"
							tabIndex={0}
							aria-label={showLoginPassword ? "Hide password" : "Show password"}
							onClick={toggleLoginPassword}
							onKeyDown={(e) => handlePasswordToggleKey(e, toggleLoginPassword)}
						/>
					</div>
					<button onClick={confirmLogin}>Login</button>
					<span>Don't have an account? <button onClick={() => { setIsLogin(false); setIsSignup(true); }}>Sign up</button></span>
				</div>
			)}
			{isSignup && (
				<div className="signup-form">
					<input
						type="text"
						placeholder="Name"
						value={signupData.name}
						onChange={(e) => setSignupData({ ...signupData, name: e.target.value })} />
					<input
						type="email"
						placeholder="Email"
						value={signupData.email}
						onChange={(e) => setSignupData({ ...signupData, email: e.target.value })} />
					<div className={`password-field ${showSignupPassword ? "show" : ""}`}>
						<input
							type={showSignupPassword ? "text" : "password"}
							placeholder="Password"
							value={signupData.password}
							onChange={(e) => setSignupData({ ...signupData, password: e.target.value })} />
						<span
							className="password-toggle"
							role="button"
							tabIndex={0}
							aria-label={showSignupPassword ? "Hide password" : "Show password"}
							onClick={toggleSignupPassword}
							onKeyDown={(e) => handlePasswordToggleKey(e, toggleSignupPassword)}
						/>
					</div>
					<button onClick={confirmSignup}>Sign up</button>
					<span>Already have an account? <button onClick={() => { setIsLogin(true); setIsSignup(false); }}>Login</button></span>
				</div>
			)}
			{isAlert && (
				<div className="alert-message">
					<p>{alertMessage}</p>
				</div>
			)}
		</div>
	);
}