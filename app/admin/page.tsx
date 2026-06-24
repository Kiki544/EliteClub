"use client";

import { useState, useEffect } from "react";
import { PUBLICATIONS } from "@/lib/data";
import {
  Lock,
  Eye,
  EyeSlash,
  Warning,
  BellRinging,
  Books,
  UsersThree,
  SignOut,
  Check,
  X,
  PencilSimple,
  Trash,
  Plus,
} from "@phosphor-icons/react";

// Change this password to something secure before deploying
const ADMIN_PASSWORD = "ECA@admin2024";

type Tab = "banner" | "publications" | "applications";

type PubEntry = {
  id: string;
  title: string;
  category: string;
  year: number;
  restricted: boolean;
};

type Application = {
  id: string;
  name: string;
  email: string;
  type: string;
  submittedAt: string;
};

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [tab, setTab] = useState<Tab>("banner");

  // Banner state
  const [bannerOn, setBannerOn] = useState(false);
  const [bannerText, setBannerText] = useState(
    "Emergency Appeal: Flooding in Benue State has displaced 800 families. Support our emergency response."
  );
  const [bannerSaved, setBannerSaved] = useState(false);

  // Publications state (seeded from data.ts, editable in session)
  const [pubs, setPubs] = useState<PubEntry[]>([]);
  const [newPub, setNewPub] = useState<Omit<PubEntry, "id">>({
    title: "",
    category: "Report",
    year: new Date().getFullYear(),
    restricted: false,
  });
  const [addingPub, setAddingPub] = useState(false);

  // Applications
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("eca_admin_token");
    if (token === ADMIN_PASSWORD) setAuthed(true);
  }, []);

  useEffect(() => {
    if (!authed) return;
    const hidden = localStorage.getItem("eca_banner_hidden") === "true";
    setBannerOn(!hidden);
    const savedText = localStorage.getItem("eca_banner_text");
    if (savedText) setBannerText(savedText);

    // Seed publications
    const stored = localStorage.getItem("eca_publications");
    if (stored) {
      setPubs(JSON.parse(stored));
    } else {
      const seeded: PubEntry[] = PUBLICATIONS.map((p, i) => ({
        id: String(i),
        title: p.title,
        category: p.type,
        year: Number(p.year),
        restricted: p.restricted,
      }));
      setPubs(seeded);
      localStorage.setItem("eca_publications", JSON.stringify(seeded));
    }

    // Load applications
    const apps = localStorage.getItem("eca_member_applications");
    if (apps) setApplications(JSON.parse(apps));
  }, [authed]);

  const login = () => {
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem("eca_admin_token", ADMIN_PASSWORD);
      setAuthed(true);
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  const logout = () => {
    localStorage.removeItem("eca_admin_token");
    setAuthed(false);
    setPassword("");
  };

  const saveBanner = () => {
    localStorage.setItem("eca_banner_hidden", bannerOn ? "false" : "true");
    localStorage.setItem("eca_banner_text", bannerText);
    setBannerSaved(true);
    setTimeout(() => setBannerSaved(false), 2500);
  };

  const removePub = (id: string) => {
    const next = pubs.filter((p) => p.id !== id);
    setPubs(next);
    localStorage.setItem("eca_publications", JSON.stringify(next));
  };

  const toggleRestricted = (id: string) => {
    const next = pubs.map((p) => (p.id === id ? { ...p, restricted: !p.restricted } : p));
    setPubs(next);
    localStorage.setItem("eca_publications", JSON.stringify(next));
  };

  const addPub = () => {
    if (!newPub.title.trim()) return;
    const entry: PubEntry = { ...newPub, id: Date.now().toString() };
    const next = [entry, ...pubs];
    setPubs(next);
    localStorage.setItem("eca_publications", JSON.stringify(next));
    setNewPub({ title: "", category: "Report", year: new Date().getFullYear(), restricted: false });
    setAddingPub(false);
  };

  if (!authed) {
    return (
      <div className="min-h-screen bg-green-900 flex items-center justify-center px-4">
        <div className="w-full max-w-sm bg-white rounded-card shadow-2xl p-8">
          <div className="w-12 h-12 rounded-btn bg-green-700 flex items-center justify-center mb-6">
            <Lock size={22} className="text-white" weight="fill" />
          </div>
          <h1 className="font-display font-bold text-text-primary text-2xl mb-1">Admin Login</h1>
          <p className="text-text-muted text-sm mb-7">Elite Club of Aagba — Staff only</p>
          {loginError && (
            <div className="flex items-center gap-2 p-3 rounded-btn bg-red-50 border border-red-200 text-red-700 text-sm mb-4">
              <Warning size={16} weight="fill" />
              Incorrect password. Try again.
            </div>
          )}
          <div className="flex flex-col gap-1.5 mb-5">
            <label className="text-sm font-medium text-text-primary">Password</label>
            <div className="relative">
              <input
                type={showPw ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && login()}
                className="w-full px-4 py-3 rounded-btn border border-green-200 text-sm focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 pr-11"
                placeholder="Enter admin password"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary"
              >
                {showPw ? <EyeSlash size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          <button
            onClick={login}
            className="w-full py-3 rounded-btn bg-green-700 text-white font-semibold text-sm hover:bg-green-600 transition-colors active:scale-[0.98]"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  const tabs: { key: Tab; label: string; icon: typeof BellRinging }[] = [
    { key: "banner", label: "Emergency Banner", icon: BellRinging },
    { key: "publications", label: "Publications", icon: Books },
    { key: "applications", label: "Member Applications", icon: UsersThree },
  ];

  return (
    <div className="min-h-[100dvh] bg-green-50">
      {/* Admin header */}
      <header className="bg-green-900 text-white px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div>
          <p className="font-display font-bold text-lg">ECA Admin</p>
          <p className="text-green-300 text-xs">Elite Club of Aagba — Content Management</p>
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-2 px-4 py-2 rounded-btn border border-green-600 text-green-200 text-sm hover:bg-green-800 transition-colors"
        >
          <SignOut size={16} />
          Sign out
        </button>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Tabs */}
        <div className="flex gap-1 bg-white rounded-card border border-green-100 p-1 mb-8 overflow-x-auto w-full sm:w-fit"style={{ WebkitOverflowScrolling: "touch" }}>
          {tabs.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-btn text-sm font-semibold transition-colors ${
                tab === key
                  ? "bg-green-700 text-white"
                  : "text-text-secondary hover:text-text-primary hover:bg-green-50"
              }`}
            >
              <Icon size={16} weight={tab === key ? "fill" : "regular"} />
              {label}
            </button>
          ))}
        </div>

        {/* ── Banner Tab ── */}
        {tab === "banner" && (
          <div className="bg-white rounded-card border border-green-100 p-5 sm:p-8 max-w-2xl">
            <h2 className="font-display font-bold text-text-primary text-xl mb-1">Emergency Appeal Banner</h2>
            <p className="text-text-muted text-sm mb-7">
              Controls the gold banner shown at the top of the homepage.
            </p>

            <div className="flex items-center justify-between p-4 rounded-btn bg-green-50 border border-green-200 mb-6">
              <div>
                <p className="font-semibold text-text-primary text-sm">Banner visibility</p>
                <p className="text-text-muted text-xs mt-0.5">Toggle to show or hide the banner sitewide</p>
              </div>
              <button
                onClick={() => setBannerOn(!bannerOn)}
                className={`relative w-12 h-6 rounded-full transition-colors ${bannerOn ? "bg-green-600" : "bg-gray-300"}`}
              >
                <span
                  className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${
                    bannerOn ? "left-7" : "left-1"
                  }`}
                />
              </button>
            </div>

            <div className="flex flex-col gap-1.5 mb-6">
              <label className="text-sm font-medium text-text-primary">Banner message</label>
              <textarea
                rows={3}
                value={bannerText}
                onChange={(e) => setBannerText(e.target.value)}
                className="px-4 py-3 rounded-btn border border-green-200 text-sm focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 resize-none"
              />
              <p className="text-xs text-text-muted">The &ldquo;Donate now&rdquo; link is always appended automatically.</p>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={saveBanner}
                className="px-6 py-2.5 rounded-btn bg-green-700 text-white font-semibold text-sm hover:bg-green-600 transition-colors active:scale-[0.98]"
              >
                Save changes
              </button>
              {bannerSaved && (
                <span className="flex items-center gap-1.5 text-green-700 text-sm font-medium">
                  <Check size={16} weight="bold" /> Saved — refresh homepage to preview
                </span>
              )}
            </div>
          </div>
        )}

        {/* ── Publications Tab ── */}
        {tab === "publications" && (
          <div className="bg-white rounded-card border border-green-100 p-5 sm:p-8">
            <div className="flex items-center justify-between flex-wrap gap-3 mb-7">
              <div>
                <h2 className="font-display font-bold text-text-primary text-xl mb-1">Publications</h2>
                <p className="text-text-muted text-sm">{pubs.length} documents · toggle restricted to require &ldquo;Request Access&rdquo;</p>
              </div>
              <button
                onClick={() => setAddingPub(!addingPub)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-btn bg-green-700 text-white text-sm font-semibold hover:bg-green-600 transition-colors"
              >
                <Plus size={16} weight="bold" />
                Add document
              </button>
            </div>

            {addingPub && (
              <div className="p-5 rounded-btn border border-green-200 bg-green-50 mb-6 space-y-4">
                <p className="font-semibold text-text-primary text-sm">New publication</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-medium text-text-muted">Title</label>
                    <input
                      value={newPub.title}
                      onChange={(e) => setNewPub({ ...newPub, title: e.target.value })}
                      className="px-3 py-2 rounded-btn border border-green-200 text-sm focus:outline-none focus:border-green-600 bg-white"
                      placeholder="Annual Report 2024"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-medium text-text-muted">Category</label>
                    <select
                      value={newPub.category}
                      onChange={(e) => setNewPub({ ...newPub, category: e.target.value })}
                      className="px-3 py-2 rounded-btn border border-green-200 text-sm focus:outline-none focus:border-green-600 bg-white"
                    >
                      {["Report", "Policy", "Research", "Newsletter", "Financial"].map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-medium text-text-muted">Year</label>
                    <input
                      type="number"
                      value={newPub.year}
                      onChange={(e) => setNewPub({ ...newPub, year: Number(e.target.value) })}
                      className="px-3 py-2 rounded-btn border border-green-200 text-sm focus:outline-none focus:border-green-600 bg-white"
                    />
                  </div>
                  <div className="flex items-center gap-3 pt-5">
                    <input
                      type="checkbox"
                      id="restricted"
                      checked={newPub.restricted}
                      onChange={(e) => setNewPub({ ...newPub, restricted: e.target.checked })}
                      className="w-4 h-4 rounded accent-green-700"
                    />
                    <label htmlFor="restricted" className="text-sm text-text-primary">Restricted (request access)</label>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button onClick={addPub} className="px-5 py-2 rounded-btn bg-green-700 text-white text-sm font-semibold hover:bg-green-600 transition-colors">
                    Add
                  </button>
                  <button onClick={() => setAddingPub(false)} className="px-5 py-2 rounded-btn border border-green-200 text-sm font-medium text-text-secondary hover:bg-green-50 transition-colors">
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <div className="divide-y divide-green-50">
              {pubs.map((pub) => (
                <div key={pub.id} className="flex flex-col sm:flex-row sm:items-center justify-between py-4 gap-2 sm:gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-text-primary text-sm truncate">{pub.title}</p>
                    <p className="text-text-muted text-xs mt-0.5">{pub.category} · {pub.year}</p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <button
                      onClick={() => toggleRestricted(pub.id)}
                      className={`px-3 py-1 rounded-pill text-xs font-semibold transition-colors ${
                        pub.restricted
                          ? "bg-amber-100 text-amber-700 hover:bg-amber-200"
                          : "bg-green-100 text-green-700 hover:bg-green-200"
                      }`}
                    >
                      {pub.restricted ? "Restricted" : "Public"}
                    </button>
                    <button
                      onClick={() => removePub(pub.id)}
                      className="p-1.5 rounded text-text-muted hover:text-red-600 hover:bg-red-50 transition-colors"
                      aria-label="Remove"
                    >
                      <Trash size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-text-muted mt-6 pt-4 border-t border-green-50">
              Note: file uploads require a server/CMS integration. Changes here update the Publications page display only and reset on server restart.
            </p>
          </div>
        )}

        {/* ── Applications Tab ── */}
        {tab === "applications" && (
          <div className="bg-white rounded-card border border-green-100 p-5 sm:p-8">
            <h2 className="font-display font-bold text-text-primary text-xl mb-1">Membership Applications</h2>
            <p className="text-text-muted text-sm mb-7">Applications submitted via the Get Involved page.</p>

            {applications.length === 0 ? (
              <div className="text-center py-20 text-text-muted">
                <UsersThree size={40} className="mx-auto mb-3 opacity-30" />
                <p className="text-sm">No applications yet. They will appear here once submitted.</p>
              </div>
            ) : (
              <div className="divide-y divide-green-50">
                {applications.map((app) => (
                  <div key={app.id} className="py-5 flex items-start justify-between gap-4">
                    <div>
                      <p className="font-semibold text-text-primary text-sm">{app.name}</p>
                      <p className="text-text-muted text-xs">{app.email}</p>
                      <span className="mt-1 inline-block px-2 py-0.5 rounded-pill bg-green-100 text-green-700 text-xs font-semibold">
                        {app.type}
                      </span>
                    </div>
                    <p className="text-xs text-text-muted flex-shrink-0">{new Date(app.submittedAt).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" })}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
