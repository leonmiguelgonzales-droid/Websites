import { useState, useEffect, useCallback } from "react";

const ADMIN_PASSWORD = "admin123";

const DEFAULT_SOPS = {
  en: [
    {
      id: 1,
      title: "Content Upload Procedure",
      category: "Operations",
      version: "1.0",
      updated: "2026-03-06",
      steps: [
        { heading: "Prepare the file", body: "Ensure video is exported at 1080p minimum, H.264 codec. File size should be under 500MB for smooth upload." },
        { heading: "Upload to platform", body: "Log in to the scheduling tool. Click 'New Post', select the file, and choose the target accounts." },
        { heading: "Add caption and tags", body: "Use the pre-approved caption template. Add 3–5 relevant hashtags. Avoid day-specific language." },
        { heading: "Schedule or publish", body: "Set publish time based on the content calendar. Double-check timezone settings before confirming." },
      ],
    },
    {
      id: 2,
      title: "Account Issue Response",
      category: "Support",
      version: "1.1",
      updated: "2026-03-06",
      steps: [
        { heading: "Identify the issue type", body: "Determine if it's a ban, shadowban, or login issue. Check platform notifications and account health dashboard." },
        { heading: "Document the incident", body: "Screenshot the error or notification. Log it in the account tracker with date and affected account." },
        { heading: "Submit appeal", body: "Use the platform's official appeal form. Reference the specific policy cited. Be concise and factual." },
        { heading: "Follow up", body: "Check appeal status after 48 hours. If no response in 7 days, escalate via alternate support channel." },
      ],
    },
  ],
  de: [
    {
      id: 1,
      title: "Verfahren zum Hochladen von Inhalten",
      category: "Betrieb",
      version: "1.0",
      updated: "2026-03-06",
      steps: [
        { heading: "Datei vorbereiten", body: "Stelle sicher, dass das Video in mindestens 1080p mit H.264-Codec exportiert wird. Die Dateigröße sollte unter 500 MB liegen." },
        { heading: "Auf Plattform hochladen", body: "Beim Planungstool anmelden. Auf 'Neuer Beitrag' klicken, Datei auswählen und Zielkonten auswählen." },
        { heading: "Bildunterschrift und Tags hinzufügen", body: "Vorab genehmigtes Bildunterschriftstemplate verwenden. 3–5 relevante Hashtags hinzufügen. Tagesspezifische Sprache vermeiden." },
        { heading: "Planen oder veröffentlichen", body: "Veröffentlichungszeit gemäß Inhaltskalender festlegen. Zeitzoneneinstellungen vor der Bestätigung überprüfen." },
      ],
    },
    {
      id: 2,
      title: "Reaktion auf Kontoprobleme",
      category: "Support",
      version: "1.1",
      updated: "2026-03-06",
      steps: [
        { heading: "Problemtyp identifizieren", body: "Feststellen, ob es sich um ein Bann-, Shadowbann- oder Anmeldeproblem handelt. Plattformbenachrichtigungen prüfen." },
        { heading: "Vorfall dokumentieren", body: "Screenshot des Fehlers oder der Benachrichtigung erstellen. Im Konto-Tracker mit Datum und betroffenem Konto protokollieren." },
        { heading: "Einspruch einreichen", body: "Offizielles Einspruchsformular der Plattform verwenden. Die genannte Richtlinie referenzieren. Präzise und sachlich bleiben." },
        { heading: "Nachverfolgen", body: "Einspruchsstatus nach 48 Stunden prüfen. Bei keiner Antwort innerhalb von 7 Tagen über alternativen Support-Kanal eskalieren." },
      ],
    },
  ],
};

const STORAGE_KEY_EN = "sop_data_en";
const STORAGE_KEY_DE = "sop_data_de";

function loadData(lang) {
  try {
    const raw = sessionStorage.getItem(lang === "en" ? STORAGE_KEY_EN : STORAGE_KEY_DE);
    return raw ? JSON.parse(raw) : DEFAULT_SOPS[lang];
  } catch {
    return DEFAULT_SOPS[lang];
  }
}

function saveData(lang, data) {
  try {
    sessionStorage.setItem(lang === "en" ? STORAGE_KEY_EN : STORAGE_KEY_DE, JSON.stringify(data));
  } catch {}
}

// ─── Icons ───────────────────────────────────────────────────────────────────
const IconEdit = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);
const IconDelete = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
    <path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/>
  </svg>
);
const IconPlus = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);
const IconLock = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);
const IconUnlock = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 9.9-1"/>
  </svg>
);
const IconChevron = ({ open }) => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"
    style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s" }}>
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);

// ─── Step Editor ─────────────────────────────────────────────────────────────
function StepEditor({ steps, onChange }) {
  const update = (i, field, val) => {
    const s = [...steps];
    s[i] = { ...s[i], [field]: val };
    onChange(s);
  };
  const add = () => onChange([...steps, { heading: "", body: "" }]);
  const remove = (i) => onChange(steps.filter((_, idx) => idx !== i));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {steps.map((step, i) => (
        <div key={i} style={{
          background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 10, padding: "14px 16px", position: "relative"
        }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 8, alignItems: "center" }}>
            <span style={{ color: "#f0c060", fontWeight: 700, fontSize: 13, minWidth: 24 }}>{i + 1}.</span>
            <input
              value={step.heading}
              onChange={e => update(i, "heading", e.target.value)}
              placeholder="Step heading"
              style={inputStyle}
            />
            <button onClick={() => remove(i)} style={{ ...iconBtn, color: "#ff6b6b" }}><IconDelete /></button>
          </div>
          <textarea
            value={step.body}
            onChange={e => update(i, "body", e.target.value)}
            placeholder="Step description..."
            rows={3}
            style={{ ...inputStyle, resize: "vertical", width: "100%", boxSizing: "border-box" }}
          />
        </div>
      ))}
      <button onClick={add} style={addStepBtn}>
        <IconPlus /> Add Step
      </button>
    </div>
  );
}

// ─── SOP Modal Editor ────────────────────────────────────────────────────────
function SOPModal({ sop, lang, onSave, onClose }) {
  const isNew = !sop.id;
  const [form, setForm] = useState({
    title: sop.title || "",
    category: sop.category || "",
    version: sop.version || "1.0",
    steps: sop.steps || [{ heading: "", body: "" }],
  });

  return (
    <div style={overlayStyle} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={modalStyle}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <h2 style={{ margin: 0, color: "#f0c060", fontSize: 20, fontFamily: "'Playfair Display', serif" }}>
            {isNew ? (lang === "en" ? "New SOP" : "Neues SOP") : (lang === "en" ? "Edit SOP" : "SOP bearbeiten")}
          </h2>
          <button onClick={onClose} style={{ ...iconBtn, fontSize: 20, color: "#999" }}>✕</button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 16 }}>
          <div>
            <label style={labelStyle}>{lang === "en" ? "Title" : "Titel"}</label>
            <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })}
              style={inputStyle} placeholder="SOP Title" />
          </div>
          <div>
            <label style={labelStyle}>{lang === "en" ? "Category" : "Kategorie"}</label>
            <input value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}
              style={inputStyle} placeholder="e.g. Operations" />
          </div>
          <div>
            <label style={labelStyle}>Version</label>
            <input value={form.version} onChange={e => setForm({ ...form, version: e.target.value })}
              style={inputStyle} placeholder="1.0" />
          </div>
        </div>

        <label style={{ ...labelStyle, display: "block", marginBottom: 10 }}>
          {lang === "en" ? "Steps" : "Schritte"}
        </label>
        <div style={{ maxHeight: 380, overflowY: "auto", paddingRight: 4 }}>
          <StepEditor steps={form.steps} onChange={steps => setForm({ ...form, steps })} />
        </div>

        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 24 }}>
          <button onClick={onClose} style={cancelBtn}>{lang === "en" ? "Cancel" : "Abbrechen"}</button>
          <button onClick={() => onSave(form)} style={saveBtn}>{lang === "en" ? "Save SOP" : "SOP speichern"}</button>
        </div>
      </div>
    </div>
  );
}

// ─── SOP Card ────────────────────────────────────────────────────────────────
function SOPCard({ sop, isAdmin, lang, onEdit, onDelete }) {
  const [open, setOpen] = useState(false);

  return (
    <div style={cardStyle}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", cursor: "pointer" }}
        onClick={() => setOpen(!open)}>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <span style={categoryBadge}>{sop.category}</span>
            <span style={{ color: "#888", fontSize: 12 }}>v{sop.version} · {sop.updated}</span>
          </div>
          <h3 style={{ margin: "8px 0 0", color: "#f5f0e8", fontSize: 18, fontFamily: "'Playfair Display', serif" }}>
            {sop.title}
          </h3>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center", marginLeft: 12 }}>
          {isAdmin && (
            <>
              <button onClick={e => { e.stopPropagation(); onEdit(sop); }} style={{ ...iconBtn, color: "#f0c060" }}><IconEdit /></button>
              <button onClick={e => { e.stopPropagation(); onDelete(sop.id); }} style={{ ...iconBtn, color: "#ff6b6b" }}><IconDelete /></button>
            </>
          )}
          <span style={{ color: "#f0c060" }}><IconChevron open={open} /></span>
        </div>
      </div>

      {open && (
        <div style={{ marginTop: 20, borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 20 }}>
          {sop.steps.map((step, i) => (
            <div key={i} style={{ display: "flex", gap: 16, marginBottom: 18 }}>
              <div style={stepNumber}>{i + 1}</div>
              <div>
                <div style={{ color: "#f0c060", fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{step.heading}</div>
                <div style={{ color: "#bbb", fontSize: 14, lineHeight: 1.65 }}>{step.body}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Login Modal ─────────────────────────────────────────────────────────────
function LoginModal({ onLogin, onClose, lang }) {
  const [pw, setPw] = useState("");
  const [err, setErr] = useState(false);

  const attempt = () => {
    if (pw === ADMIN_PASSWORD) { onLogin(); }
    else { setErr(true); setTimeout(() => setErr(false), 1500); }
  };

  return (
    <div style={overlayStyle} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{ ...modalStyle, maxWidth: 360 }}>
        <h2 style={{ margin: "0 0 20px", color: "#f0c060", fontFamily: "'Playfair Display', serif", textAlign: "center" }}>
          {lang === "en" ? "Admin Login" : "Admin-Anmeldung"}
        </h2>
        <input
          type="password"
          value={pw}
          onChange={e => setPw(e.target.value)}
          onKeyDown={e => e.key === "Enter" && attempt()}
          placeholder={lang === "en" ? "Enter password" : "Passwort eingeben"}
          style={{ ...inputStyle, width: "100%", boxSizing: "border-box", marginBottom: 12,
            borderColor: err ? "#ff6b6b" : undefined }}
          autoFocus
        />
        {err && <p style={{ color: "#ff6b6b", margin: "0 0 12px", fontSize: 13, textAlign: "center" }}>
          {lang === "en" ? "Incorrect password" : "Falsches Passwort"}
        </p>}
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={onClose} style={{ ...cancelBtn, flex: 1 }}>{lang === "en" ? "Cancel" : "Abbrechen"}</button>
          <button onClick={attempt} style={{ ...saveBtn, flex: 1 }}>{lang === "en" ? "Login" : "Anmelden"}</button>
        </div>
      </div>
    </div>
  );
}

// ─── Main App ────────────────────────────────────────────────────────────────
export default function App() {
  const [lang, setLang] = useState("en");
  const [sops, setSops] = useState({ en: loadData("en"), de: loadData("de") });
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [editingSOP, setEditingSOP] = useState(null);
  const [search, setSearch] = useState("");

  const currentSops = sops[lang];

  const filtered = currentSops.filter(s =>
    s.title.toLowerCase().includes(search.toLowerCase()) ||
    s.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = (form) => {
    const today = new Date().toISOString().split("T")[0];
    const updated = { ...form, updated: today };
    let newList;
    if (editingSOP.id) {
      newList = currentSops.map(s => s.id === editingSOP.id ? { ...updated, id: editingSOP.id } : s);
    } else {
      const newId = Math.max(0, ...currentSops.map(s => s.id)) + 1;
      newList = [...currentSops, { ...updated, id: newId }];
    }
    const newSops = { ...sops, [lang]: newList };
    setSops(newSops);
    saveData(lang, newList);
    setEditingSOP(null);
  };

  const handleDelete = (id) => {
    if (!window.confirm(lang === "en" ? "Delete this SOP?" : "Dieses SOP löschen?")) return;
    const newList = currentSops.filter(s => s.id !== id);
    setSops({ ...sops, [lang]: newList });
    saveData(lang, newList);
  };

  return (
    <div style={appStyle}>
      {/* Background texture */}
      <div style={bgTexture} />

      {/* Header */}
      <header style={headerStyle}>
        <div style={headerInner}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={logoMark}>SOP</div>
              <div>
                <h1 style={titleStyle}>Standard Operating Procedures</h1>
                <p style={subtitleStyle}>
                  {lang === "en" ? "Operations Manual" : "Betriebshandbuch"}
                </p>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
            {/* Language switcher */}
            <div style={langSwitch}>
              {["en", "de"].map(l => (
                <button key={l} onClick={() => setLang(l)} style={{
                  ...langBtn,
                  background: lang === l ? "#f0c060" : "transparent",
                  color: lang === l ? "#1a1410" : "#f0c060",
                }}>
                  {l === "en" ? "🇬🇧 EN" : "🇩🇪 DE"}
                </button>
              ))}
            </div>
            {/* Admin toggle */}
            <button
              onClick={() => isAdmin ? setIsAdmin(false) : setShowLogin(true)}
              style={{ ...adminBtn, background: isAdmin ? "rgba(240,192,96,0.15)" : "rgba(255,255,255,0.06)" }}
            >
              {isAdmin ? <><IconUnlock /> {lang === "en" ? "Exit Edit" : "Bearbeitung beenden"}</> : <><IconLock /> Admin</>}
            </button>
            {isAdmin && (
              <button onClick={() => setEditingSOP({})} style={newSOPBtn}>
                <IconPlus /> {lang === "en" ? "New SOP" : "Neues SOP"}
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Search bar */}
      <div style={searchWrap}>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder={lang === "en" ? "🔍  Search SOPs..." : "🔍  SOPs durchsuchen..."}
          style={searchInput}
        />
      </div>

      {/* SOP list */}
      <main style={mainStyle}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", color: "#666", padding: "60px 0", fontSize: 15 }}>
            {lang === "en" ? "No SOPs found." : "Keine SOPs gefunden."}
          </div>
        ) : (
          filtered.map(sop => (
            <SOPCard
              key={sop.id}
              sop={sop}
              isAdmin={isAdmin}
              lang={lang}
              onEdit={setEditingSOP}
              onDelete={handleDelete}
            />
          ))
        )}
      </main>

      {/* Footer */}
      <footer style={{ textAlign: "center", padding: "32px 24px", color: "#444", fontSize: 12 }}>
        {filtered.length} {lang === "en" ? "procedures" : "Verfahren"} · {lang === "en" ? "English version" : "Deutsche Version"}
        {isAdmin && <span style={{ color: "#f0c060", marginLeft: 8 }}>· {lang === "en" ? "Edit mode active" : "Bearbeitungsmodus aktiv"}</span>}
      </footer>

      {/* Modals */}
      {showLogin && <LoginModal lang={lang} onLogin={() => { setIsAdmin(true); setShowLogin(false); }} onClose={() => setShowLogin(false)} />}
      {editingSOP && <SOPModal sop={editingSOP} lang={lang} onSave={handleSave} onClose={() => setEditingSOP(null)} />}
    </div>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────
const appStyle = {
  minHeight: "100vh",
  background: "#0f0d0a",
  color: "#f5f0e8",
  fontFamily: "'Crimson Text', Georgia, serif",
  position: "relative",
};

const bgTexture = {
  position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
  backgroundImage: `radial-gradient(ellipse at 20% 10%, rgba(240,192,96,0.06) 0%, transparent 60%),
    radial-gradient(ellipse at 80% 80%, rgba(180,120,40,0.04) 0%, transparent 50%)`,
};

const headerStyle = {
  borderBottom: "1px solid rgba(240,192,96,0.15)",
  background: "rgba(15,13,10,0.95)",
  backdropFilter: "blur(12px)",
  position: "sticky", top: 0, zIndex: 10,
};

const headerInner = {
  maxWidth: 860, margin: "0 auto", padding: "20px 24px",
  display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16,
};

const logoMark = {
  width: 48, height: 48, borderRadius: 10,
  background: "linear-gradient(135deg, #f0c060, #c07820)",
  display: "flex", alignItems: "center", justifyContent: "center",
  fontFamily: "'Playfair Display', serif", fontWeight: 900,
  fontSize: 14, color: "#1a1410", letterSpacing: 1,
  flexShrink: 0,
};

const titleStyle = {
  margin: 0, fontSize: 20, fontWeight: 700,
  fontFamily: "'Playfair Display', serif",
  color: "#f5f0e8", letterSpacing: 0.3,
};

const subtitleStyle = {
  margin: "3px 0 0", fontSize: 13, color: "#888", fontStyle: "italic",
};

const langSwitch = {
  display: "flex", border: "1px solid rgba(240,192,96,0.3)", borderRadius: 8, overflow: "hidden",
};

const langBtn = {
  border: "none", cursor: "pointer", padding: "7px 14px",
  fontSize: 13, fontWeight: 600, transition: "all 0.2s", letterSpacing: 0.5,
};

const adminBtn = {
  border: "1px solid rgba(240,192,96,0.25)", borderRadius: 8, cursor: "pointer",
  padding: "7px 14px", fontSize: 13, color: "#f0c060",
  display: "flex", alignItems: "center", gap: 6, transition: "all 0.2s",
};

const newSOPBtn = {
  border: "none", borderRadius: 8, cursor: "pointer",
  padding: "8px 16px", fontSize: 13, fontWeight: 700,
  background: "linear-gradient(135deg, #f0c060, #c07820)",
  color: "#1a1410", display: "flex", alignItems: "center", gap: 6,
  transition: "opacity 0.2s",
};

const searchWrap = {
  maxWidth: 860, margin: "0 auto", padding: "24px 24px 0",
  position: "relative", zIndex: 1,
};

const searchInput = {
  width: "100%", boxSizing: "border-box",
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(240,192,96,0.2)",
  borderRadius: 10, padding: "12px 18px",
  color: "#f5f0e8", fontSize: 15,
  outline: "none", fontFamily: "inherit",
  transition: "border-color 0.2s",
};

const mainStyle = {
  maxWidth: 860, margin: "0 auto", padding: "20px 24px 40px",
  display: "flex", flexDirection: "column", gap: 14,
  position: "relative", zIndex: 1,
};

const cardStyle = {
  background: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: 14, padding: "20px 24px",
  transition: "border-color 0.2s, background 0.2s",
};

const categoryBadge = {
  background: "rgba(240,192,96,0.12)",
  color: "#f0c060", border: "1px solid rgba(240,192,96,0.25)",
  borderRadius: 6, padding: "2px 10px", fontSize: 11,
  fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase",
  fontFamily: "'Crimson Text', serif",
};

const stepNumber = {
  minWidth: 28, height: 28, borderRadius: "50%",
  background: "rgba(240,192,96,0.1)", border: "1px solid rgba(240,192,96,0.3)",
  display: "flex", alignItems: "center", justifyContent: "center",
  color: "#f0c060", fontWeight: 700, fontSize: 13,
  flexShrink: 0, marginTop: 1,
};

const overlayStyle = {
  position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)",
  backdropFilter: "blur(6px)", zIndex: 100,
  display: "flex", alignItems: "center", justifyContent: "center", padding: 20,
};

const modalStyle = {
  background: "#1a1610", border: "1px solid rgba(240,192,96,0.2)",
  borderRadius: 16, padding: "28px 32px", width: "100%", maxWidth: 680,
  maxHeight: "90vh", overflowY: "auto",
};

const inputStyle = {
  background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: 8, padding: "9px 12px", color: "#f5f0e8",
  fontSize: 14, outline: "none", width: "100%", boxSizing: "border-box",
  fontFamily: "inherit",
};

const labelStyle = { color: "#999", fontSize: 12, fontWeight: 600, letterSpacing: 0.8, textTransform: "uppercase", display: "block", marginBottom: 6 };

const iconBtn = {
  background: "none", border: "none", cursor: "pointer",
  padding: 6, borderRadius: 6, display: "flex", alignItems: "center",
  transition: "opacity 0.2s",
};

const addStepBtn = {
  background: "rgba(240,192,96,0.07)", border: "1px dashed rgba(240,192,96,0.3)",
  borderRadius: 10, padding: "10px 16px", color: "#f0c060",
  fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center",
  gap: 6, transition: "all 0.2s", fontFamily: "inherit",
};

const cancelBtn = {
  background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: 8, padding: "10px 20px", color: "#ccc",
  fontSize: 14, cursor: "pointer", fontFamily: "inherit",
};

const saveBtn = {
  background: "linear-gradient(135deg, #f0c060, #c07820)",
  border: "none", borderRadius: 8, padding: "10px 24px",
  color: "#1a1410", fontSize: 14, fontWeight: 700,
  cursor: "pointer", fontFamily: "inherit",
};
