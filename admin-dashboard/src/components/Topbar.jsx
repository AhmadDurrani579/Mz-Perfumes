// src/components/Topbar.jsx
import { clearToken, isDemoMode, resetDemoData } from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Topbar({ title, onMenuClick }) {
  const navigate = useNavigate();

  function handleLogout() {
    clearToken();
    navigate("/login", { replace: true });
  }

  function handleReset() {
    if (window.confirm("Reset all demo data back to its original sample values?")) {
      resetDemoData();
      window.location.reload();
    }
  }

  return (
    <header className="topbar">
      <button
        className="topbar__menu-btn"
        onClick={onMenuClick}
        aria-label="Toggle navigation"
      >
        ☰
      </button>

      <h1 className="topbar__title">{title}</h1>

      {isDemoMode() && (
        <div className="topbar__demo">
          <span className="badge badge--pending">Demo data</span>
          <button className="btn btn--ghost btn--small" onClick={handleReset}>
            Reset sample data
          </button>
        </div>
      )}

      <div className="topbar__actions">
        <div className="topbar__avatar" title="Administrator">
          A
        </div>
        <button className="btn btn--ghost" onClick={handleLogout}>
          Sign out
        </button>
      </div>
    </header>
  );
}
