// src/components/Sidebar.jsx
import { NavLink } from "react-router-dom";

const NAV_GROUPS = [
  {
    label: "Overview",
    items: [{ to: "/", label: "Dashboard", icon: "◆" }],
  },
  {
    label: "Catalogue",
    items: [
      { to: "/products", label: "Products", icon: "✦" },
      { to: "/categories", label: "Categories", icon: "▤" },
      { to: "/brands", label: "Brands", icon: "❀" },
    ],
  },
  {
    label: "Storefront",
    items: [
      { to: "/branches", label: "Branches", icon: "⌂" },
      { to: "/banners", label: "Banners", icon: "▭" },
      { to: "/promotions", label: "Promotions", icon: "%" },
    ],
  },
  {
    label: "Network",
    items: [
      { to: "/affiliates", label: "Affiliates", icon: "⟡" },
      { to: "/orders", label: "Orders", icon: "▣" },
    ],
  },
  {
    label: "Partners",
    items: [
      { to: "/partner-brands", label: "Partner Brands", icon: "❖" },
      { to: "/partner-products", label: "Partner Products", icon: "◈" },
    ],
  },
];

export default function Sidebar({ open, onNavigate }) {
  return (
    <aside className={`sidebar ${open ? "sidebar--open" : ""}`}>
      <div className="sidebar__brand">
        <span className="sidebar__brand-mark">MZ</span>
        <div className="sidebar__brand-text">
          <strong>MZ Essence</strong>
          <span>Admin Console</span>
        </div>
      </div>

      <nav className="sidebar__nav">
        {NAV_GROUPS.map((group) => (
          <div className="sidebar__group" key={group.label}>
            <p className="sidebar__group-label">{group.label}</p>
            {group.items.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={onNavigate}
                className={({ isActive }) =>
                  `sidebar__link ${isActive ? "sidebar__link--active" : ""}`
                }
                end={item.to === "/"}
              >
                <span className="sidebar__icon">{item.icon}</span>
                {item.label}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      <div className="sidebar__footer">
        <p>Crafted for MZ Essence</p>
        <span>v1.0 — Admin Dashboard</span>
      </div>
    </aside>
  );
}
