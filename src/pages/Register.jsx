import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Login.css";

function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      await register(form.name, form.email, form.password);
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
          <h2>Create Account</h2>
          <p>Join to build your own watchlist.</p>

          <form onSubmit={onSubmit}>
            <div className="input-group">
              <label>Name</label>
              <input type="text" placeholder="Your name" value={form.name} onChange={set("name")} required />
            </div>
            <div className="input-group">
              <label>Email</label>
              <input type="email" placeholder="Enter your email" value={form.email} onChange={set("email")} required />
            </div>
            <div className="input-group">
              <label>Password</label>
              <input type="password" placeholder="Min 6 characters" minLength={6} value={form.password}
                onChange={set("password")} required />
            </div>

            {error && <p className="mv-error">{error}</p>}

            <button className="login-btn" disabled={busy}>{busy ? "Creating…" : "Register"}</button>
          </form>

          <div className="extra-links">
            <p>Already have an account?<Link to="/login"> Login</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
