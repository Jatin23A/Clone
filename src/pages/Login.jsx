import { Link } from "react-router-dom";
import "./Login.css";

function Login() {
  return (
    <div className="login-page">
      <div className="login-overlay">
        <div className="login-card">

          <h1>
            NET<span>Movie</span>
          </h1>

          <h2>Welcome Back 👋</h2>

          <p>Sign in to continue watching your favorite movies.</p>

          <form>

            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter your email"
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
              />
            </div>

            <button className="login-btn">
              Login
            </button>

          </form>

          <div className="extra-links">

            <a href="#">Forgot Password?</a>

            <p>
              Don't have an account?
              <Link to="/register"> Register</Link>
            </p>

          </div>

        </div>
      </div>
    </div>
  );
}

export default Login;