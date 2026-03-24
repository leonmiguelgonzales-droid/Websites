import { useState, useRef, useEffect } from "react";

// ─── CONFIG — Edit passwords here ────────────────────────────────────────────
const SITE_PASSWORD   = "perlage";        // Main login wall (everyone)
const ADMIN_PASSWORD  = "perlage2026";    // Edit mode for SOPs
const LOCKED_PASSWORD = "perlage-team";   // Accounts & Vendors tab lock

// ─── TABS CONFIG — Add/remove tabs here easily ───────────────────────────────
const TABS = [
  { id: "home",        label: "Home",        icon: "🏠", locked: false },
  { id: "sops",        label: "SOPs",        icon: "📋", locked: false },
  { id: "faqs",        label: "FAQs",        icon: "❓", locked: false },
  { id: "vendors",     label: "Vendors",     icon: "🔧", locked: true  },
];

// ─── DEFAULT DATA ─────────────────────────────────────────────────────────────
const DEFAULT_SOPS = {
  en: [
    {
      id: 1,
      title: "Account Problems",
      category: "Operations",
      version: "3.0",
      updated: "March 2026",
      content: `<p style="color:#4a5568;font-size:14px;line-height:1.75;">Covers account categorization, ban response by priority, shadowban detection and fixing, video removal handling, and quick reference guide.</p><p><a href="https://docs.google.com/document/d/1eml9AiQuuJVl9wJF7IRo0pfw8QEdC3HP/edit?usp=drive_link" target="_blank" style="display:inline-block;margin-top:12px;padding:10px 20px;background:linear-gradient(135deg,#667eea,#764ba2);color:#fff;border-radius:8px;text-decoration:none;font-weight:600;font-size:13px;">Open Full Document</a></p>`
    },
    {
      id: 2,
      title: "Vendors & Tools",
      category: "Operations",
      version: "1.0",
      updated: "March 2026",
      content: `<p style="color:#4a5568;font-size:14px;line-height:1.75;">Covers buying followers, purchasing IG accounts, unban services with contacts and pricing, link/funnel tools, and SMS verification.</p><p><a href="https://docs.google.com/document/d/1vfDQQf0NMkOHDTX446E-IzNTPe_GpQ5q/edit?usp=drive_link" target="_blank" style="display:inline-block;margin-top:12px;padding:10px 20px;background:linear-gradient(135deg,#667eea,#764ba2);color:#fff;border-radius:8px;text-decoration:none;font-weight:600;font-size:13px;">Open Full Document</a></p>`
    },
    {
      id: 3,
      title: "Task Management",
      category: "Operations",
      version: "1.0",
      updated: "March 2026",
      content: `<p style="color:#4a5568;font-size:14px;line-height:1.75;">Covers Asana board structure, task types and tags, daily routine, the WhatsApp to Asana rule, and the Needs Decision system.</p><p><a href="https://docs.google.com/document/d/1Avjy1URHjUSiO3qmWlRxHGwgvQs2ZetJ/edit?usp=drive_link" target="_blank" style="display:inline-block;margin-top:12px;padding:10px 20px;background:linear-gradient(135deg,#667eea,#764ba2);color:#fff;border-radius:8px;text-decoration:none;font-weight:600;font-size:13px;">Open Full Document</a></p>`
    },
    {
      id: 4,
      title: "Marketing MA",
      category: "Operations",
      version: "1.0",
      updated: "March 2026",
      content: `<p style="color:#4a5568;font-size:14px;line-height:1.75;">Covers the Marketing MA role, daily routine phases, content list template, weekly tasks, and common mistakes to avoid.</p><p><a href="https://docs.google.com/document/d/1mdUgxQVOtUPLp6JXiQzuh-dJbtX47s8Q/edit?usp=drive_link" target="_blank" style="display:inline-block;margin-top:12px;padding:10px 20px;background:linear-gradient(135deg,#667eea,#764ba2);color:#fff;border-radius:8px;text-decoration:none;font-weight:600;font-size:13px;">Open Full Document</a></p>`
    },
    {
      id: 5,
      title: "Account Warming",
      category: "Operations",
      version: "1.0",
      updated: "March 2026",
      content: `<p style="color:#4a5568;font-size:14px;line-height:1.75;">Covers the step-by-step warming process for new IG accounts, interaction rules, shadowban detection, and Facebook connection.</p><p><a href="https://docs.google.com/document/d/1ygcECxBcGETIjPtxaQub0iI8qnDfPDwq/edit?usp=drive_link" target="_blank" style="display:inline-block;margin-top:12px;padding:10px 20px;background:linear-gradient(135deg,#667eea,#764ba2);color:#fff;border-radius:8px;text-decoration:none;font-weight:600;font-size:13px;">Open Full Document</a></p>`
    },
    {
      id: 6,
      title: "Creator Onboarding",
      category: "Operations",
      version: "1.0",
      updated: "March 2026",
      content: `<p style="color:#4a5568;font-size:14px;line-height:1.75;">Full questionnaire (23 questions across 6 sections) and WhatsApp task message templates in English and German.</p><p><a href="https://docs.google.com/document/d/1pbzzk9aHeVdiOadhm9R659hAQUX0PQkZ/edit?usp=sharing" target="_blank" style="display:inline-block;margin-top:12px;padding:10px 20px;background:linear-gradient(135deg,#667eea,#764ba2);color:#fff;border-radius:8px;text-decoration:none;font-weight:600;font-size:13px;">Open Full Document</a></p>`
    }
  ],
  de: [
    {
      id: 1,
      title: "SOP #1 - Kontoprobleme",
      category: "Betrieb",
      version: "3.0",
      updated: "Maerz 2026",
      content: `<p style="color:#4a5568;font-size:14px;line-height:1.75;">Kontokategorisierung, Bann-Reaktion nach Prioritaet, Shadowban-Erkennung und Behebung, Video-Entfernung und Schnellreferenz.</p><p><a href="https://docs.google.com/document/d/1drhEEuHkePqCQm_raslkbf-GhGMXK4X6/edit?usp=drive_link" target="_blank" style="display:inline-block;margin-top:12px;padding:10px 20px;background:linear-gradient(135deg,#667eea,#764ba2);color:#fff;border-radius:8px;text-decoration:none;font-weight:600;font-size:13px;">Open Full Document</a></p>`
    },
    {
      id: 2,
      title: "SOP #2 - Vendors und Tools",
      category: "Betrieb",
      version: "1.0",
      updated: "Maerz 2026",
      content: `<p style="color:#4a5568;font-size:14px;line-height:1.75;">Follower kaufen, IG-Konten kaufen, Unban-Services mit Kontakten und Preisen, Link/Funnel-Tools und SMS-Verifizierung.</p><p><a href="https://docs.google.com/document/d/1Te24KoZvg5EQWQT52I3H8KP_Gm9dhMH2/edit?usp=drive_link" target="_blank" style="display:inline-block;margin-top:12px;padding:10px 20px;background:linear-gradient(135deg,#667eea,#764ba2);color:#fff;border-radius:8px;text-decoration:none;font-weight:600;font-size:13px;">Open Full Document</a></p>`
    },
    {
      id: 3,
      title: "SOP #3 - Aufgabenverwaltung",
      category: "Betrieb",
      version: "1.0",
      updated: "Maerz 2026",
      content: `<p style="color:#4a5568;font-size:14px;line-height:1.75;">Asana-Board-Struktur, Aufgabentypen und Tags, Tagesablauf, WhatsApp-zu-Asana-Regel und das Entscheidung-noetig-System.</p><p><a href="https://docs.google.com/document/d/191E5ipzg4AqNBtFJ-cZi1uM9q-EybG_Y/edit?usp=drive_link" target="_blank" style="display:inline-block;margin-top:12px;padding:10px 20px;background:linear-gradient(135deg,#667eea,#764ba2);color:#fff;border-radius:8px;text-decoration:none;font-weight:600;font-size:13px;">Open Full Document</a></p>`
    },
    {
      id: 4,
      title: "SOP #4 - Marketing MA",
      category: "Betrieb",
      version: "1.0",
      updated: "Maerz 2026",
      content: `<p style="color:#4a5568;font-size:14px;line-height:1.75;">Rolle des Marketing MA, Tagesphasen, Content-Listen-Template, Wochenaufgaben und haeufige Fehler.</p><p><a href="https://docs.google.com/document/d/1rxZqtdVW3RhLxnmXEr5Z75feEZgw21Li/edit?usp=drive_link" target="_blank" style="display:inline-block;margin-top:12px;padding:10px 20px;background:linear-gradient(135deg,#667eea,#764ba2);color:#fff;border-radius:8px;text-decoration:none;font-weight:600;font-size:13px;">Open Full Document</a></p>`
    },
    {
      id: 5,
      title: "SOP #5 - Account Warming",
      category: "Betrieb",
      version: "1.0",
      updated: "Maerz 2026",
      content: `<p style="color:#4a5568;font-size:14px;line-height:1.75;">Schritt-fuer-Schritt Warming-Prozess fuer neue IG-Konten, Interaktionsregeln, Shadowban-Erkennung und Facebook-Verbindung.</p><p><a href="https://docs.google.com/document/d/1xK3tz8RPjp2_DhyV9aT5iGhSdIh-Yd-d/edit?usp=drive_link" target="_blank" style="display:inline-block;margin-top:12px;padding:10px 20px;background:linear-gradient(135deg,#667eea,#764ba2);color:#fff;border-radius:8px;text-decoration:none;font-weight:600;font-size:13px;">Open Full Document</a></p>`
    },
    {
      id: 6,
      title: "SOP #6 - Creator Onboarding",
      category: "Betrieb",
      version: "1.0",
      updated: "Maerz 2026",
      content: `<p style="color:#4a5568;font-size:14px;line-height:1.75;">Vollstaendiger Fragebogen (23 Fragen in 6 Abschnitten) und WhatsApp-Task-Nachrichtenvorlagen auf Englisch und Deutsch.</p><p><a href="https://docs.google.com/document/d/1pbzzk9aHeVdiOadhm9R659hAQUX0PQkZ/edit?usp=sharing" target="_blank" style="display:inline-block;margin-top:12px;padding:10px 20px;background:linear-gradient(135deg,#667eea,#764ba2);color:#fff;border-radius:8px;text-decoration:none;font-weight:600;font-size:13px;">Open Full Document</a></p>`
    }
  ]
};

const DEFAULT_FAQS = [
  { id: 1, q: "What do I do when an account gets banned?", a: "Check the account category first (🟢🟡🔴). Low priority: appeal and replace. Medium: cost-benefit analysis before unbanning. Very important: contact unban service immediately, notify manager. NEVER appeal a medium or very important account without manager approval." },
  { id: 2, q: "How do I check for a shadowban?", a: "Go to Instagram → Settings → Account Status → Limited Reach. If 'People who don't follow you' is orange, act immediately. If 'People under 18' is orange, ignore it." },
  { id: 3, q: "Who do I contact for unbans?", a: "Check the Vendors tab for full contact details and pricing. Priority order: Joker (fastest), then Berdan or Liquide. Always check if the account has insurance first." },
  { id: 4, q: "When should I notify the manager?", a: "Always notify for: very important account bans, mass video removals (5+), any unban that costs over $300, repeated shadowbans on the same account, and any unusual platform behavior." },
];

const DEFAULT_VENDORS = [
  { id: 1, name: "Joker", service: "Unban (unappealed)", speed: "2–3h, max 24h", price_unban: "$300–400", price_rep: "$2,000+", contact: "@jokerisafk", platform: "Telegram", notes: "Fastest. Contact first for very important accounts." },
  { id: 2, name: "Berdan", service: "Unban (unappealed)", speed: "5–7 days", price_unban: "€500", price_rep: "~€1,700", contact: "@qberdan", platform: "Telegram", notes: "Slower but reliable." },
  { id: 3, name: "Liquide", service: "Unban + Shadowban", speed: "Slow, varies", price_unban: "Varies", price_rep: "Varies", contact: "@liquidback", platform: "Telegram", notes: "Use for insured accounts. Also fixes shadowbans." },
];

// ─── Icons ────────────────────────────────────────────────────────────────────
const IconLock = () => <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>;
const IconEdit = () => <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>;
const IconDelete = () => <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>;
const IconPlus = () => <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>;
const IconChevron = ({ open }) => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s" }}><polyline points="6 9 12 15 18 9"/></svg>;
const IconUnlock = () => <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/></svg>;

// ─── Mini Lock Screen (for locked tabs) ──────────────────────────────────────
function MiniLock({ tabLabel, onUnlock }) {
  const [pw, setPw] = useState("");
  const [err, setErr] = useState(false);
  const attempt = () => {
    if (pw === LOCKED_PASSWORD || pw === ADMIN_PASSWORD) onUnlock();
    else { setErr(true); setTimeout(() => setErr(false), 1500); }
  };
  return (
    <div style={{ maxWidth: 360, margin: "80px auto", textAlign: "center", padding: "0 24px" }}>
      <div style={{ fontSize: 40, marginBottom: 16 }}>🔒</div>
      <h2 style={{ color: "#667eea", fontFamily: "'Cormorant Garamond', serif", fontSize: 24, margin: "0 0 8px" }}>{tabLabel}</h2>
      <p style={{ color: "#9b8fc4", fontSize: 14, margin: "0 0 28px" }}>This section requires additional access</p>
      <input type="password" value={pw} onChange={e => setPw(e.target.value)} onKeyDown={e => e.key === "Enter" && attempt()}
        placeholder="Enter password" autoFocus
        style={{ width: "100%", boxSizing: "border-box", background: "#f7f8ff", border: `1px solid ${err ? "#e05555" : "rgba(102,126,234,0.3)"}`, borderRadius: 10, padding: "12px 16px", fontSize: 14, color: "#2d3748", outline: "none", marginBottom: 12, fontFamily: "inherit", textAlign: "center", letterSpacing: 2 }} />
      {err && <p style={{ color: "#e05555", fontSize: 12, margin: "0 0 12px" }}>Incorrect password</p>}
      <button onClick={attempt} style={{ width: "100%", padding: "12px", background: "linear-gradient(135deg, #667eea, #764ba2)", border: "none", borderRadius: 10, color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
        Unlock →
      </button>
    </div>
  );
}

// ─── Rich Text Toolbar ────────────────────────────────────────────────────────
function RichToolbar({ onCommand }) {
  const b = (cmd, label, title) => (
    <button type="button" title={title} onMouseDown={e => { e.preventDefault(); onCommand(cmd); }}
      style={{ background: "rgba(102,126,234,0.08)", border: "1px solid rgba(102,126,234,0.2)", borderRadius: 5, color: "#667eea", padding: "4px 9px", cursor: "pointer", fontSize: 12, fontWeight: 700 }}>
      {label}
    </button>
  );
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 4, padding: "10px 12px", background: "#f7f8ff", borderBottom: "1px solid rgba(102,126,234,0.12)", borderRadius: "10px 10px 0 0" }}>
      {b("bold","B","Bold")} {b("italic","I","Italic")} {b("underline","U","Underline")}
      <div style={{ width: 1, background: "rgba(102,126,234,0.2)", margin: "0 2px" }} />
      {b("formatBlock_h2","H2","Heading 2")} {b("formatBlock_h3","H3","Heading 3")}
      <div style={{ width: 1, background: "rgba(102,126,234,0.2)", margin: "0 2px" }} />
      {b("insertUnorderedList","• List","Bullet list")} {b("insertOrderedList","1. List","Numbered list")}
      <div style={{ width: 1, background: "rgba(102,126,234,0.2)", margin: "0 2px" }} />
      {b("insertTable","⊞ Table","Insert table")} {b("insertWarning","⚠ Warning","Warning box")}
    </div>
  );
}

// ─── SOP Modal ────────────────────────────────────────────────────────────────
function SOPModal({ sop, onSave, onClose }) {
  const editorRef = useRef(null);
  const [meta, setMeta] = useState({ title: sop.title||"", category: sop.category||"", version: sop.version||"1.0" });
  useEffect(() => { if (editorRef.current) editorRef.current.innerHTML = sop.content || ""; }, []);
  const handleCommand = (cmd) => {
    if (cmd.startsWith("formatBlock_")) document.execCommand("formatBlock", false, cmd.split("_")[1]);
    else if (cmd === "insertTable") document.execCommand("insertHTML", false, `<table><thead><tr><th>Col 1</th><th>Col 2</th><th>Col 3</th></tr></thead><tbody><tr><td>Cell</td><td>Cell</td><td>Cell</td></tr></tbody></table><p><br/></p>`);
    else if (cmd === "insertWarning") document.execCommand("insertHTML", false, `<div class="warning">⚠ IMPORTANT: Write your warning here.</div><p><br/></p>`);
    else document.execCommand(cmd, false, null);
    editorRef.current.focus();
  };
  return (
    <div style={overlayStyle} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{ ...modalStyle, maxWidth: 760, maxHeight: "92vh" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h2 style={{ margin: 0, color: "#667eea", fontFamily: "'Cormorant Garamond', serif", fontSize: 20 }}>{sop.id ? "Edit SOP" : "New SOP"}</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "#aaa", cursor: "pointer", fontSize: 20 }}>✕</button>
        </div>
        <div className="modal-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }}>
          <div style={{ gridColumn: "1/-1" }}>
            <label style={labelStyle}>Title</label>
            <input value={meta.title} onChange={e => setMeta({...meta, title: e.target.value})} style={inputStyle} placeholder="SOP #1 — Account Problems" />
          </div>
          <div><label style={labelStyle}>Subtitle</label><input value={meta.subtitle} onChange={e => setMeta({...meta, subtitle: e.target.value})} style={inputStyle} placeholder="Ban · Shadowban" /></div>
          <div><label style={labelStyle}>Category</label><input value={meta.category} onChange={e => setMeta({...meta, category: e.target.value})} style={inputStyle} placeholder="Operations" /></div>
          <div><label style={labelStyle}>Version</label><input value={meta.version} onChange={e => setMeta({...meta, version: e.target.value})} style={inputStyle} placeholder="1.0" /></div>
        </div>
        <label style={{ ...labelStyle, display: "block", marginBottom: 6 }}>Content</label>
        <div style={{ border: "1px solid rgba(102,126,234,0.2)", borderRadius: 10, overflow: "hidden", marginBottom: 16 }}>
          <RichToolbar onCommand={handleCommand} />
          <div ref={editorRef} contentEditable suppressContentEditableWarning
            style={{ minHeight: 280, maxHeight: 380, overflowY: "auto", padding: "16px 20px", outline: "none", fontSize: 14, lineHeight: 1.7, color: "#2d3748", background: "#fff" }} />
        </div>
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
          <button onClick={onClose} style={cancelBtn}>Cancel</button>
          <button onClick={() => onSave({ ...meta, content: editorRef.current.innerHTML })} style={saveBtn}>Save SOP</button>
        </div>
      </div>
    </div>
  );
}

// ─── SOP Card ─────────────────────────────────────────────────────────────────
function SOPCard({ sop, isAdmin, onEdit, onDelete }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={cardStyle}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", cursor: "pointer", gap: 12 }} onClick={() => setOpen(!open)}>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, flexWrap: "wrap" }}>
            <span style={badgeStyle}>{sop.category}</span>
            <span style={{ color: "#b0a8d0", fontSize: 12 }}>v{sop.version} · {sop.updated}</span>
          </div>
          <h3 style={{ margin: 0, color: "#2d3748", fontSize: 18, fontFamily: "'Cormorant Garamond', serif", fontWeight: 700 }}>{sop.title}</h3>
          {sop.subtitle && <p style={{ margin: "4px 0 0", color: "#9b8fc4", fontSize: 13, fontStyle: "italic" }}>{sop.subtitle}</p>}
        </div>
        <div style={{ display: "flex", gap: 6, alignItems: "center", flexShrink: 0 }}>
          {isAdmin && <>
            <button onClick={e => { e.stopPropagation(); onEdit(sop); }} style={{ ...iconBtn, color: "#667eea" }}><IconEdit /></button>
            <button onClick={e => { e.stopPropagation(); onDelete(sop.id); }} style={{ ...iconBtn, color: "#e05555" }}><IconDelete /></button>
          </>}
          <span style={{ color: "#667eea" }}><IconChevron open={open} /></span>
        </div>
      </div>
      {open && (
        <div style={{ marginTop: 20, borderTop: "1px solid rgba(102,126,234,0.1)", paddingTop: 20 }}>
          <div className="sop-content" style={{ background: "#fff", borderRadius: 10, padding: "24px 28px", boxShadow: "0 2px 16px rgba(102,126,234,0.08)" }}
            dangerouslySetInnerHTML={{ __html: sop.content }} />
        </div>
      )}
    </div>
  );
}

// ─── PAGE: HOME ───────────────────────────────────────────────────────────────
function HomePage({ setActiveTab }) {
  const cards = [
    { tab: "sops", icon: "📋", title: "SOPs", desc: "Standard operating procedures." },
    { tab: "faqs", icon: "❓", title: "FAQs", desc: "Common questions answered." },
    { tab: "vendors", icon: "🔧", title: "Vendors", desc: "Unban services & contacts.", locked: true },
  ];
  return (
    <div style={{ maxWidth: 860, margin: "0 auto", padding: "40px 24px" }}>
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <div style={{ display: "inline-block", background: "linear-gradient(135deg, #667eea, #764ba2)", borderRadius: 16, padding: "14px 24px", marginBottom: 20 }}>
          <span style={{ color: "#fff", fontSize: 28, fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, letterSpacing: 2 }}>PERLAGE</span>
        </div>
        <h1 style={{ color: "#2d3748", fontFamily: "'Cormorant Garamond', serif", fontSize: 28, margin: "0 0 12px" }}>Welcome to the Team Hub</h1>
        <p style={{ color: "#9b8fc4", fontSize: 15, maxWidth: 480, margin: "0 auto", lineHeight: 1.7 }}>
          Everything you need to do your job well — procedures, contacts, and resources in one place.
        </p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14 }}>
        {cards.map(c => (
          <div key={c.tab} onClick={() => setActiveTab(c.tab)}
            style={{ background: "#fff", border: "1px solid rgba(102,126,234,0.15)", borderRadius: 14, padding: "22px 20px", cursor: "pointer", transition: "all 0.2s", boxShadow: "0 2px 10px rgba(102,126,234,0.06)" }}>
            <div style={{ fontSize: 26, marginBottom: 10 }}>{c.icon}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 5 }}>
              <h3 style={{ margin: 0, color: "#2d3748", fontSize: 15, fontFamily: "'Cormorant Garamond', serif", fontWeight: 700 }}>{c.title}</h3>
              {c.locked && <span style={{ color: "#9b8fc4", display: "flex" }}><IconLock /></span>}
            </div>
            <p style={{ margin: 0, color: "#9b8fc4", fontSize: 13, lineHeight: 1.5 }}>{c.desc}</p>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 36, background: "linear-gradient(135deg, rgba(102,126,234,0.07), rgba(118,75,162,0.05))", borderRadius: 14, padding: "22px 26px", border: "1px solid rgba(102,126,234,0.12)" }}>
        <h3 style={{ margin: "0 0 10px", color: "#667eea", fontFamily: "'Cormorant Garamond', serif", fontSize: 18 }}>📢 Announcements</h3>
        <p style={{ margin: 0, color: "#4a5568", fontSize: 14, lineHeight: 1.7 }}>
          Welcome to the Perlage Studios team hub! All SOPs, vendor contacts, and account info are now centralized here.
          If you have questions not covered in the FAQs, reach out to the manager via WhatsApp.
        </p>
      </div>
    </div>
  );
}

// ─── PAGE: ONBOARDING ─────────────────────────────────────────────────────────
// ─── PAGE: SOPs ───────────────────────────────────────────────────────────────
function SOPsPage({ isAdmin }) {
  const [lang, setLang] = useState("en");
  const [sops, setSops] = useState({ en: DEFAULT_SOPS.en, de: DEFAULT_SOPS.de });
  const [editing, setEditing] = useState(null);
  const [search, setSearch] = useState("");
  const current = sops[lang];
  const filtered = current.filter(s => s.title.toLowerCase().includes(search.toLowerCase()) || (s.category||"").toLowerCase().includes(search.toLowerCase()));
  const handleSave = (form) => {
    const today = new Date().toLocaleDateString("en-GB", { month: "long", year: "numeric" });
    const updated = { ...form, updated: today };
    let newList;
    if (editing.id) newList = current.map(s => s.id === editing.id ? { ...updated, id: editing.id } : s);
    else { const newId = Math.max(0, ...current.map(s => s.id)) + 1; newList = [...current, { ...updated, id: newId }]; }
    setSops({ ...sops, [lang]: newList });
    setEditing(null);
  };
  return (
    <div style={{ maxWidth: 860, margin: "0 auto", padding: "32px 24px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, marginBottom: 20 }}>
        <div>
          <h2 style={pageTitle}>📋 Standard Operating Procedures</h2>
          <p style={pageSubtitle}>Internal procedures for the Perlage Studios team</p>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ display: "flex", border: "1px solid rgba(102,126,234,0.3)", borderRadius: 8, overflow: "hidden" }}>
            {["en","de"].map(l => (
              <button key={l} onClick={() => setLang(l)} style={{ border: "none", cursor: "pointer", padding: "6px 14px", fontSize: 12, fontWeight: 600, fontFamily: "inherit", transition: "all 0.2s", background: lang===l ? "linear-gradient(135deg,#667eea,#764ba2)" : "transparent", color: lang===l ? "#fff" : "#667eea" }}>
                {l === "en" ? "🇬🇧 EN" : "🇩🇪 DE"}
              </button>
            ))}
          </div>
          {isAdmin && <button onClick={() => setEditing({})} style={saveBtn}><IconPlus /> New SOP</button>}
        </div>
      </div>
      <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍  Search procedures..." style={{ ...inputStyle, marginBottom: 14 }} />
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {filtered.length === 0
          ? <div style={{ textAlign: "center", color: "#b0a8d0", padding: "60px 0" }}>No procedures found.</div>
          : filtered.map(sop => <SOPCard key={sop.id} sop={sop} isAdmin={isAdmin} onEdit={setEditing} onDelete={id => { if(window.confirm("Delete this SOP?")) setSops({...sops,[lang]:current.filter(s=>s.id!==id)}); }} />)
        }
      </div>
      {editing !== null && <SOPModal sop={editing} onSave={handleSave} onClose={() => setEditing(null)} />}
    </div>
  );
}

// ─── PAGE: FAQs ───────────────────────────────────────────────────────────────
function FAQsPage({ isAdmin }) {
  const [faqs, setFaqs] = useState(DEFAULT_FAQS);
  const [open, setOpen] = useState(null);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});

  const openEdit = (faq) => { setEditing(faq.id); setForm({...faq}); };
  const openNew = () => { setEditing("new"); setForm({ q: "", a: "" }); };
  const save = () => {
    if (editing === "new") setFaqs([...faqs, { ...form, id: Math.max(0, ...faqs.map(f => f.id)) + 1 }]);
    else setFaqs(faqs.map(f => f.id === editing ? { ...form, id: editing } : f));
    setEditing(null);
  };

  return (
    <div style={{ maxWidth: 760, margin: "0 auto", padding: "32px 24px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, marginBottom: 6 }}>
        <div>
          <h2 style={pageTitle}>❓ Frequently Asked Questions</h2>
          <p style={pageSubtitle}>Common questions from the team</p>
        </div>
        {isAdmin && <button onClick={openNew} style={saveBtn}><IconPlus /> Add FAQ</button>}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 24 }}>
        {faqs.map((faq, i) => (
          <div key={faq.id} style={{ background: "#fff", border: "1px solid rgba(102,126,234,0.12)", borderRadius: 12, overflow: "hidden", boxShadow: "0 2px 6px rgba(102,126,234,0.05)" }}>
            <div style={{ padding: "14px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
              <div onClick={() => setOpen(open === i ? null : i)} style={{ flex: 1, cursor: "pointer", display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ color: "#2d3748", fontSize: 15, fontWeight: 600 }}>{faq.q}</span>
                <span style={{ color: "#667eea", flexShrink: 0 }}><IconChevron open={open === i} /></span>
              </div>
              {isAdmin && (
                <div style={{ display: "flex", gap: 4, flexShrink: 0 }}>
                  <button onClick={() => openEdit(faq)} style={{ ...iconBtn, color: "#667eea" }}><IconEdit /></button>
                  <button onClick={() => { if(window.confirm("Delete FAQ?")) setFaqs(faqs.filter(f => f.id !== faq.id)); }} style={{ ...iconBtn, color: "#e05555" }}><IconDelete /></button>
                </div>
              )}
            </div>
            {open === i && (
              <div style={{ padding: "0 20px 18px", color: "#4a5568", fontSize: 14, lineHeight: 1.75, borderTop: "1px solid rgba(102,126,234,0.08)" }}>
                <div style={{ paddingTop: 14 }}>{faq.a}</div>
              </div>
            )}
          </div>
        ))}
      </div>

      {editing !== null && (
        <div style={overlayStyle} onClick={e => e.target === e.currentTarget && setEditing(null)}>
          <div style={{ ...modalStyle, maxWidth: 520 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h2 style={{ margin: 0, color: "#667eea", fontFamily: "'Cormorant Garamond', serif", fontSize: 20 }}>{editing === "new" ? "Add FAQ" : "Edit FAQ"}</h2>
              <button onClick={() => setEditing(null)} style={{ background: "none", border: "none", color: "#aaa", cursor: "pointer", fontSize: 20 }}>✕</button>
            </div>
            <div style={{ marginBottom: 12 }}>
              <label style={labelStyle}>Question</label>
              <input value={form.q || ""} onChange={e => setForm({...form, q: e.target.value})} style={inputStyle} placeholder="What do I do when...?" />
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={labelStyle}>Answer</label>
              <textarea value={form.a || ""} onChange={e => setForm({...form, a: e.target.value})} style={{ ...inputStyle, minHeight: 140, resize: "vertical" }} placeholder="Answer..." />
            </div>
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
              <button onClick={() => setEditing(null)} style={cancelBtn}>Cancel</button>
              <button onClick={save} style={saveBtn}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── PAGE: VENDORS ────────────────────────────────────────────────────────────
function VendorsPage() {
  const [vendors, setVendors] = useState(DEFAULT_VENDORS);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});
  const openEdit = (v) => { setEditing(v.id); setForm({...v}); };
  const openNew = () => { setEditing("new"); setForm({ name:"", service:"", speed:"", price_unban:"", price_rep:"", contact:"", platform:"Telegram", notes:"" }); };
  const save = () => {
    if (editing === "new") setVendors([...vendors, { ...form, id: Math.max(0,...vendors.map(v=>v.id))+1 }]);
    else setVendors(vendors.map(v => v.id === editing ? {...form, id: editing} : v));
    setEditing(null);
  };
  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 24px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, marginBottom: 22 }}>
        <div>
          <h2 style={pageTitle}>🔧 Vendor Contacts</h2>
          <p style={pageSubtitle}>Unban services, pricing, and contact details</p>
        </div>
        <button onClick={openNew} style={saveBtn}><IconPlus /> Add Vendor</button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {vendors.map(v => (
          <div key={v.id} style={{ background: "#fff", border: "1px solid rgba(102,126,234,0.12)", borderRadius: 14, padding: "20px 24px", boxShadow: "0 2px 8px rgba(102,126,234,0.06)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10, flexWrap: "wrap" }}>
                  <h3 style={{ margin: 0, color: "#2d3748", fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 700 }}>{v.name}</h3>
                  <span style={badgeStyle}>{v.service}</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "6px 20px", marginBottom: 10 }}>
                  {[["⚡ Speed", v.speed],["💰 Unappealed", v.price_unban],["💸 REP/MA", v.price_rep],[`${v.platform} Contact`, v.contact]].map(([label, val]) => (
                    <div key={label}>
                      <div style={{ color: "#9b8fc4", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5 }}>{label}</div>
                      <div style={{ color: "#2d3748", fontSize: 14, fontWeight: 500, marginTop: 2 }}>{val}</div>
                    </div>
                  ))}
                </div>
                {v.notes && <p style={{ margin: 0, color: "#667eea", fontSize: 13, background: "rgba(102,126,234,0.06)", borderRadius: 8, padding: "8px 12px", borderLeft: "3px solid #667eea" }}>ℹ {v.notes}</p>}
              </div>
              <div style={{ display: "flex", gap: 6 }}>
                <button onClick={() => openEdit(v)} style={{ ...iconBtn, color: "#667eea" }}><IconEdit /></button>
                <button onClick={() => { if(window.confirm("Delete vendor?")) setVendors(vendors.filter(x=>x.id!==v.id)); }} style={{ ...iconBtn, color: "#e05555" }}><IconDelete /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {editing !== null && (
        <div style={overlayStyle} onClick={e => e.target === e.currentTarget && setEditing(null)}>
          <div style={{ ...modalStyle, maxWidth: 480 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h2 style={{ margin: 0, color: "#667eea", fontFamily: "'Cormorant Garamond', serif", fontSize: 20 }}>{editing === "new" ? "Add Vendor" : "Edit Vendor"}</h2>
              <button onClick={() => setEditing(null)} style={{ background: "none", border: "none", color: "#aaa", cursor: "pointer", fontSize: 20 }}>✕</button>
            </div>
            {[["Name","name"],["Service","service"],["Speed","speed"],["Price (Unappealed)","price_unban"],["Price (REP/MA)","price_rep"],["Contact Handle","contact"],["Platform","platform"],["Notes","notes"]].map(([label, key]) => (
              <div key={key} style={{ marginBottom: 12 }}>
                <label style={labelStyle}>{label}</label>
                <input value={form[key]||""} onChange={e => setForm({...form,[key]:e.target.value})} style={inputStyle} />
              </div>
            ))}
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 20 }}>
              <button onClick={() => setEditing(null)} style={cancelBtn}>Cancel</button>
              <button onClick={save} style={saveBtn}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── GATE LOGIN ───────────────────────────────────────────────────────────────
function GateLogin({ onEnter }) {
  const [pw, setPw] = useState("");
  const [err, setErr] = useState(false);
  const attempt = () => {
    if (pw === SITE_PASSWORD || pw === ADMIN_PASSWORD) onEnter(pw === ADMIN_PASSWORD ? "admin" : "reader");
    else { setErr(true); setTimeout(() => setErr(false), 1500); }
  };
  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Outfit', sans-serif", padding: 24 }}>
      <div style={{ background: "rgba(255,255,255,0.97)", borderRadius: 20, padding: "48px 44px", width: "100%", maxWidth: 380, textAlign: "center", boxShadow: "0 20px 60px rgba(0,0,0,0.25)" }}>
        <div style={{ width: 56, height: 56, borderRadius: 14, background: "linear-gradient(135deg, #667eea, #764ba2)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
          <span style={{ color: "#fff", fontSize: 13, fontWeight: 700, letterSpacing: 1, fontFamily: "'Cormorant Garamond', serif" }}>PS</span>
        </div>
        <h1 style={{ margin: "0 0 4px", color: "#667eea", fontFamily: "'Cormorant Garamond', serif", fontSize: 28, letterSpacing: 1 }}>PERLAGE</h1>
        <p style={{ margin: "0 0 6px", color: "#9b8fc4", fontSize: 12, letterSpacing: 2, textTransform: "uppercase" }}>Studios</p>
        <p style={{ margin: "0 0 32px", color: "#b0a8d0", fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase" }}>Team Hub</p>
        <div style={{ height: 1, background: "rgba(102,126,234,0.15)", marginBottom: 28 }} />
        <p style={{ margin: "0 0 16px", color: "#718096", fontSize: 13 }}>Enter your password to access</p>
        <input type="password" value={pw} onChange={e => setPw(e.target.value)} onKeyDown={e => e.key === "Enter" && attempt()}
          placeholder="Password" autoFocus
          style={{ width: "100%", boxSizing: "border-box", background: "#f7f8ff", border: `1px solid ${err ? "#e05555" : "rgba(102,126,234,0.3)"}`, borderRadius: 10, padding: "12px 16px", fontSize: 15, color: "#2d3748", outline: "none", marginBottom: err ? 8 : 16, fontFamily: "inherit", textAlign: "center", letterSpacing: 2 }} />
        {err && <p style={{ color: "#e05555", fontSize: 12, margin: "0 0 14px" }}>Incorrect password</p>}
        <button onClick={attempt} style={{ width: "100%", padding: "13px", background: "linear-gradient(135deg, #667eea, #764ba2)", border: "none", borderRadius: 10, color: "#fff", fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Enter →</button>
        <p style={{ margin: "20px 0 0", color: "#c4b5fd", fontSize: 11 }}>Confidential — Internal Use Only</p>
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [access, setAccess] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [unlockedTabs, setUnlockedTabs] = useState({});
  const [adminPw, setAdminPw] = useState("");
  const [adminErr, setAdminErr] = useState(false);

  if (!access) return <GateLogin onEnter={(role) => { setAccess(role); if (role === "admin") setIsAdmin(true); }} />;

  const currentTab = TABS.find(t => t.id === activeTab);
  const isTabLocked = currentTab?.locked && !unlockedTabs[activeTab] && !isAdmin;

  const attemptAdmin = () => {
    if (adminPw === ADMIN_PASSWORD) { setIsAdmin(true); setShowAdminLogin(false); setAdminPw(""); }
    else { setAdminErr(true); setTimeout(() => setAdminErr(false), 1500); }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Outfit:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; background: #eef0fb; }
        html { -webkit-text-size-adjust: 100%; }
        .sop-content h2 { color: #667eea; font-family: 'Cormorant Garamond', serif; font-size: 18px; margin: 24px 0 8px; border-bottom: 2px solid rgba(102,126,234,0.15); padding-bottom: 6px; }
        .sop-content h3 { color: #764ba2; font-family: 'Cormorant Garamond', serif; font-size: 16px; margin: 18px 0 6px; }
        .sop-content p { color: #2a2a2a; font-size: 14px; line-height: 1.75; margin: 8px 0; }
        .sop-content ul, .sop-content ol { color: #2a2a2a; font-size: 14px; line-height: 1.8; padding-left: 20px; margin: 8px 0; }
        .sop-content li { margin-bottom: 4px; }
        .sop-content strong { color: #1a1a1a; }
        .sop-content em { color: #666; }
        .sop-content table { width: 100%; border-collapse: collapse; margin: 14px 0; font-size: 13px; display: block; overflow-x: auto; -webkit-overflow-scrolling: touch; }
        .sop-content thead tr { background: rgba(102,126,234,0.08); }
        .sop-content th { color: #667eea; font-weight: 600; padding: 9px 12px; text-align: left; border: 1px solid rgba(102,126,234,0.2); font-family: 'Outfit', sans-serif; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; white-space: nowrap; }
        .sop-content td { color: #333; padding: 8px 12px; border: 1px solid #e0e0e0; vertical-align: top; line-height: 1.5; font-size: 13px; }
        .sop-content tbody tr:nth-child(even) { background: rgba(102,126,234,0.02); }
        .sop-content .warning { background: rgba(220,80,50,0.07); border-left: 3px solid #d04030; border-radius: 0 8px 8px 0; padding: 12px 14px; margin: 14px 0; color: #a03020; font-size: 13px; line-height: 1.65; }
        [contenteditable] h2 { color: #667eea; font-family: 'Cormorant Garamond', serif; font-size: 20px; margin: 20px 0 8px; }
        [contenteditable] h3 { color: #764ba2; font-family: 'Cormorant Garamond', serif; font-size: 17px; margin: 16px 0 6px; }
        [contenteditable] table { width: 100%; border-collapse: collapse; margin: 10px 0; }
        [contenteditable] th { background: rgba(102,126,234,0.1); color: #667eea; padding: 8px 12px; border: 1px solid rgba(102,126,234,0.25); font-size: 12px; }
        [contenteditable] td { padding: 7px 12px; border: 1px solid rgba(102,126,234,0.15); color: #2d3748; }
        [contenteditable] .warning { background: rgba(220,80,50,0.07); border-left: 3px solid #d04030; padding: 10px 14px; margin: 10px 0; color: #a03020; border-radius: 0 6px 6px 0; }
        [contenteditable]:empty:before { content: 'Start writing your SOP content here...'; color: #aaa; pointer-events: none; }
        nav::-webkit-scrollbar { height: 0; }
        .nav-tab:hover { background: rgba(102,126,234,0.08) !important; color: #667eea !important; }
        @media (max-width: 640px) {
          .modal-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div style={{ minHeight: "100vh", background: "#eef0fb", fontFamily: "'Outfit', sans-serif" }}>
        {/* Header */}
        <header style={{ background: "rgba(255,255,255,0.97)", borderBottom: "1px solid rgba(102,126,234,0.12)", position: "sticky", top: 0, zIndex: 20, backdropFilter: "blur(12px)" }}>
          <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 20px", display: "flex", justifyContent: "space-between", alignItems: "center", height: 56 }}>
            {/* Logo */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg, #667eea, #764ba2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ color: "#fff", fontSize: 10, fontWeight: 700, fontFamily: "'Cormorant Garamond', serif" }}>PS</span>
              </div>
              <span style={{ color: "#667eea", fontSize: 16, fontWeight: 700, fontFamily: "'Cormorant Garamond', serif", letterSpacing: 1 }}>PERLAGE</span>
            </div>

            {/* Nav tabs */}
            <nav style={{ display: "flex", gap: 2, overflowX: "auto", flex: 1, margin: "0 12px", msOverflowStyle: "none", scrollbarWidth: "none" }}>
              {TABS.map(tab => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)} className="nav-tab" style={{
                  background: activeTab === tab.id ? "linear-gradient(135deg, #667eea, #764ba2)" : "transparent",
                  color: activeTab === tab.id ? "#fff" : "#718096",
                  border: "none", borderRadius: 8, padding: "6px 12px", fontSize: 13, fontWeight: 500,
                  cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap",
                  display: "flex", alignItems: "center", gap: 5, transition: "all 0.2s",
                }}>
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                  {tab.locked && !unlockedTabs[tab.id] && !isAdmin && <span style={{ opacity: 0.7, display: "flex" }}><IconLock /></span>}
                </button>
              ))}
            </nav>

            {/* Admin toggle */}
            <div style={{ flexShrink: 0 }}>
              {isAdmin
                ? <button onClick={() => setIsAdmin(false)} style={{ border: "1px solid rgba(102,126,234,0.3)", borderRadius: 8, cursor: "pointer", padding: "6px 12px", fontSize: 12, color: "#667eea", background: "rgba(102,126,234,0.08)", display: "flex", alignItems: "center", gap: 5, fontFamily: "inherit" }}><IconUnlock /> Exit Edit</button>
                : <button onClick={() => setShowAdminLogin(true)} style={{ border: "1px solid rgba(102,126,234,0.2)", borderRadius: 8, cursor: "pointer", padding: "6px 12px", fontSize: 12, color: "#9b8fc4", background: "transparent", display: "flex", alignItems: "center", gap: 5, fontFamily: "inherit" }}><IconLock /> Admin</button>
              }
            </div>
          </div>
        </header>

        {/* Page content */}
        <main>
          {isTabLocked
            ? <MiniLock tabLabel={currentTab.label} onUnlock={() => setUnlockedTabs({ ...unlockedTabs, [activeTab]: true })} />
            : activeTab === "home"       ? <HomePage setActiveTab={setActiveTab} />
            : activeTab === "sops"       ? <SOPsPage isAdmin={isAdmin} />
            : activeTab === "faqs"       ? <FAQsPage isAdmin={isAdmin} />
            : activeTab === "vendors"    ? <VendorsPage />
            : null
          }
        </main>

        {/* Footer */}
        <footer style={{ textAlign: "center", padding: "24px", color: "#b0a8d0", fontSize: 11, letterSpacing: 1, textTransform: "uppercase", borderTop: "1px solid rgba(102,126,234,0.08)" }}>
          Perlage Studios Marketing Agency LLC · Confidential — Internal Use Only
          {isAdmin && <span style={{ color: "#667eea", marginLeft: 10 }}>· Edit Mode Active</span>}
        </footer>
      </div>

      {/* Admin login modal */}
      {showAdminLogin && (
        <div style={overlayStyle} onClick={e => e.target === e.currentTarget && setShowAdminLogin(false)}>
          <div style={{ ...modalStyle, maxWidth: 340, textAlign: "center" }}>
            <h2 style={{ margin: "0 0 6px", color: "#667eea", fontFamily: "'Cormorant Garamond', serif", fontSize: 22 }}>Admin Login</h2>
            <p style={{ color: "#9b8fc4", fontSize: 13, margin: "0 0 20px" }}>Edit mode for SOPs and content</p>
            <input type="password" value={adminPw} onChange={e => setAdminPw(e.target.value)} onKeyDown={e => e.key === "Enter" && attemptAdmin()}
              placeholder="Admin password" autoFocus
              style={{ ...inputStyle, textAlign: "center", letterSpacing: 2, marginBottom: adminErr ? 8 : 14, borderColor: adminErr ? "#e05555" : undefined }} />
            {adminErr && <p style={{ color: "#e05555", fontSize: 12, margin: "0 0 12px" }}>Incorrect password</p>}
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => { setShowAdminLogin(false); setAdminPw(""); }} style={{ ...cancelBtn, flex: 1 }}>Cancel</button>
              <button onClick={attemptAdmin} style={{ ...saveBtn, flex: 1, justifyContent: "center" }}>Login</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ─── Shared Styles ────────────────────────────────────────────────────────────
const cardStyle = { background: "#fff", border: "1px solid rgba(102,126,234,0.12)", borderRadius: 14, padding: "20px 24px", boxShadow: "0 2px 8px rgba(102,126,234,0.06)" };
const badgeStyle = { background: "rgba(102,126,234,0.08)", color: "#667eea", border: "1px solid rgba(102,126,234,0.2)", borderRadius: 6, padding: "2px 10px", fontSize: 11, fontWeight: 600, letterSpacing: 0.5, textTransform: "uppercase" };
const overlayStyle = { position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", backdropFilter: "blur(6px)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 };
const modalStyle = { background: "#fff", border: "1px solid rgba(102,126,234,0.15)", borderRadius: 16, padding: "28px 30px", width: "100%", overflowY: "auto" };
const inputStyle = { background: "#f7f8ff", border: "1px solid rgba(102,126,234,0.25)", borderRadius: 8, padding: "10px 14px", color: "#2d3748", fontSize: 14, outline: "none", width: "100%", fontFamily: "inherit" };
const labelStyle = { color: "#9b8fc4", fontSize: 11, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", display: "block", marginBottom: 6 };
const iconBtn = { background: "none", border: "none", cursor: "pointer", padding: 6, borderRadius: 6, display: "flex", alignItems: "center" };
const cancelBtn = { background: "rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.1)", borderRadius: 8, padding: "9px 20px", color: "#718096", fontSize: 13, cursor: "pointer", fontFamily: "inherit" };
const saveBtn = { background: "linear-gradient(135deg, #667eea, #764ba2)", border: "none", borderRadius: 8, padding: "9px 20px", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 6 };
const pageTitle = { margin: "0 0 4px", color: "#2d3748", fontFamily: "'Cormorant Garamond', serif", fontSize: 26, fontWeight: 700 };
const pageSubtitle = { margin: 0, color: "#9b8fc4", fontSize: 14 };
