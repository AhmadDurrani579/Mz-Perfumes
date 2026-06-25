// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { api, setToken, enableDemoMode } from "../api/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from || "/";

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const data = await api.auth.login({ email, password });
      const token = data?.token || data?.access_token || data?.access;
      if (!token) {
        throw new Error(
          "Signed in, but no token was returned by the server."
        );
      }
      setToken(token);
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(
        err.message ||
          "Couldn't sign in. Check your credentials and try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  function handleDemoMode() {
    enableDemoMode();
    navigate(redirectTo, { replace: true });
  }

  return (
    <div className="login">
      <div className="login__panel">
        <div className="login__brand">
          <span className="login__brand-mark">MZ</span>
          <h1>MZ Essence</h1>
          <p>Administrator access</p>
        </div>

        <form className="login__form" onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              required
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@mzessence.com"
            />
          </div>

          <div className="field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          {error && <p className="login__error">{error}</p>}

          <button type="submit" className="btn btn--primary btn--full" disabled={submitting}>
            {submitting ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <button type="button" className="btn btn--outline btn--full login__demo-btn" onClick={handleDemoMode}>
          Continue without login (demo mode)
        </button>
        <p className="login__demo-note">
          No backend auth yet? Demo mode opens the dashboard so you can
          explore the UI — pages will still try to call the real API and
          show "couldn't load" until your endpoints are live.
        </p>

        <p className="login__footnote">
          Connected to {"\u200B"}
          <code>ahmadyarai-mz-essence.hf.space</code>
        </p>
      </div>

      <div className="login__showcase" aria-hidden="true">
        <div className="login__showcase-content">
          <span className="login__eyebrow">Luxury Fragrance Group</span>
          <h2>Curate the essence of every collection.</h2>
          <p>
            Manage products, partners, and promotions from a single,
            refined console.
          </p>
        </div>
      </div>
    </div>
  );
}
