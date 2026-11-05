import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Login.css";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-overlay">
        <div className="login-card">
          <h1>NET<span>Movie</span></h1>
          <h2>Welcome Back 👋</h2>
          <p>Sign in to continue watching your favorite movies.</p>

          <form onSubmit={onSubmit}>
            <div className="input-group">
              <label>Email</label>
              <input type="email" placeholder="Enter your email" value={email}
                onChange={(e) => setEmail(e.target.value)} required />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input type="password" placeholder="Enter your password" value={password}
                onChange={(e) => setPassword(e.target.value)} required />
            </div>

            {error && <p className="mv-error">{error}</p>}

            <button className="login-btn" disabled={busy}>{busy ? "Signing in…" : "Login"}</button>
          </form>

          <div className="extra-links">
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
