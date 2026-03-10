import { useState, useRef, useEffect } from "react";

// ─── CONFIG — Edit passwords here ────────────────────────────────────────────
const SITE_PASSWORD   = "perlage";        // Main login wall (everyone)
const ADMIN_PASSWORD  = "perlage2026";    // Edit mode for SOPs
const LOCKED_PASSWORD = "perlage-team";   // Accounts & Vendors tab lock

// ─── TABS CONFIG — Add/remove tabs here easily ───────────────────────────────
const TABS = [
  { id: "home",        label: "Home",        icon: "🏠", locked: false },
  { id: "onboarding",  label: "Onboarding",  icon: "👋", locked: false },
  { id: "sops",        label: "SOPs",        icon: "📋", locked: false },
  { id: "faqs",        label: "FAQs",        icon: "❓", locked: false },
  { id: "accounts",    label: "Accounts",    icon: "📱", locked: true  },
  { id: "vendors",     label: "Vendors",     icon: "🔧", locked: true  },
  { id: "creatorform", label: "Creator Form", icon: "📝", locked: false },
];

// ─── DEFAULT DATA ─────────────────────────────────────────────────────────────
const DEFAULT_SOPS = {
  en: [
    {
      id: 1,
      title: "SOP #1 — Account Problems",
      subtitle: "Ban · Shadowban · Video Removed",
      category: "Operations",
      version: "3.0",
      updated: "March 2026",
      content: `<h2>1. Account Categorization</h2>
<p>Every account is categorized based on the number of subscribers it generates.</p>
<table><thead><tr><th>Category</th><th>Subs per Day</th><th>Value/Day</th><th>Response to Ban</th></tr></thead>
<tbody>
<tr><td>🟢 Low Priority</td><td>0–4 Subs</td><td>$0–$120</td><td>Create new account</td></tr>
<tr><td>🟡 Medium Important</td><td>5–14 Subs</td><td>$125–$420</td><td>Cost-benefit analysis</td></tr>
<tr><td>🔴 Very Important</td><td>15–100 Subs</td><td>$375–$3,000</td><td>Unban service immediately</td></tr>
</tbody></table>
<div class="warning">⚠ NEVER appeal an account before talking to the manager! An appeal makes the unban significantly more expensive.</div>
<h2>2. Account Got Banned</h2>
<div class="warning">⚠ GOLDEN RULE: DO NOT file an appeal! Talk to the manager first.</div>
<h3>2.1 🟢 Low Priority (0–4 Subs/Day)</h3>
<ol><li>Screenshot the ban screen</li><li>Appeal and wait</li><li>If fully banned → Create/buy new account</li><li>Mark as "banned" in account overview</li></ol>
<h3>2.2 🟡 Medium Important (5–14 Subs/Day)</h3>
<ol><li>Screenshot the ban screen</li><li>Do NOT appeal</li><li>Run cost-benefit calculation</li><li>If worth it: Contact unban service</li><li>Inform manager via WhatsApp</li></ol>
<h3>2.3 🔴 Very Important (15–100 Subs/Day)</h3>
<ol><li>Screenshot the ban screen</li><li>DO NOT APPEAL!</li><li>Check insurance → YES: Contact Liquide. NO: Contact Joker first</li><li>Notify manager IMMEDIATELY</li></ol>
<h2>3. Shadowban</h2>
<p><strong>Where to check:</strong> Instagram → Settings → Account Status → "Limited Reach"</p>
<ol><li>Click "Limited Reach" and check affected content</li><li>File an appeal on affected content</li><li>Wait 2 hours</li><li>No decision → Delete affected content</li></ol>
<h2>4. Video Removed</h2>
<ol><li>Screenshot the removal notice</li><li>Send screenshot + video to team group</li><li>Insurance? YES: Notify service, no appeal. NO: File appeal</li></ol>
<h2>5. Quick Reference</h2>
<table><thead><tr><th>Situation</th><th>Action</th></tr></thead><tbody>
<tr><td>🟢 Low priority banned</td><td>Screenshot → Appeal → New account if denied</td></tr>
<tr><td>🟡 Medium banned</td><td>Screenshot → NO appeal → Cost-benefit → Manager</td></tr>
<tr><td>🔴 Very important banned</td><td>Screenshot → NO APPEAL → Insurance? → Joker → Manager NOW</td></tr>
<tr><td>Shadowban</td><td>Insurance? → Liquide. No: Appeal → Wait 2h → Delete</td></tr>
<tr><td>Video removed</td><td>Screenshot + video to group → Insurance? → Service. No: Appeal</td></tr>
</tbody></table>`
    }
  ],
  de: [
    {
      id: 1,
      title: "SOP #1 — Kontoprobleme",
      subtitle: "Bann · Shadowban · Video entfernt",
      category: "Betrieb",
      version: "3.0",
      updated: "März 2026",
      content: `<h2>1. Kontokategorisierung</h2>
<p>Jedes Konto wird nach der Anzahl der täglich generierten Abonnenten kategorisiert.</p>
<table><thead><tr><th>Kategorie</th><th>Subs/Tag</th><th>Wert/Tag</th><th>Reaktion</th></tr></thead>
<tbody>
<tr><td>🟢 Niedrige Priorität</td><td>0–4</td><td>$0–$120</td><td>Neues Konto</td></tr>
<tr><td>🟡 Mittel wichtig</td><td>5–14</td><td>$125–$420</td><td>Kosten-Nutzen</td></tr>
<tr><td>🔴 Sehr wichtig</td><td>15–100</td><td>$375–$3.000</td><td>Sofort Unban-Service</td></tr>
</tbody></table>
<div class="warning">⚠ NIEMALS appealen ohne Manager! Ein Appeal macht den Unban deutlich teurer.</div>
<h2>2. Konto gebannt</h2>
<div class="warning">⚠ GOLDENE REGEL: KEINEN Appeal! Erst Manager sprechen.</div>
<h3>2.1 🟢 Niedrige Priorität (0–4 Subs/Tag)</h3>
<ol><li>Screenshot Bann-Bildschirm</li><li>Appeal einreichen und warten</li><li>Vollständig gebannt → Neues Konto</li><li>Als "gebannt" markieren</li></ol>
<h3>2.2 🟡 Mittel wichtig (5–14 Subs/Tag)</h3>
<ol><li>Screenshot Bann-Bildschirm</li><li>KEIN Appeal</li><li>Kosten-Nutzen-Rechnung</li><li>Wenn lohnenswert: Unban-Service kontaktieren</li><li>Manager informieren</li></ol>
<h3>2.3 🔴 Sehr wichtig (15–100 Subs/Tag)</h3>
<ol><li>Screenshot Bann-Bildschirm</li><li>KEIN APPEAL!</li><li>Versicherung? JA: Liquide. NEIN: Joker zuerst</li><li>Manager SOFORT benachrichtigen</li></ol>
<h2>3. Shadowban</h2>
<p><strong>Wo prüfen:</strong> Instagram → Einstellungen → Kontostatus → "Eingeschränkte Reichweite"</p>
<ol><li>Betroffene Inhalte prüfen</li><li>Appeal einlegen</li><li>2 Stunden warten</li><li>Keine Entscheidung → Inhalte löschen</li></ol>
<h2>4. Video entfernt</h2>
<ol><li>Screenshot der Entfernungsmeldung</li><li>Screenshot + Video an Teamgruppe</li><li>Versicherung? JA: Service, kein Appeal. NEIN: Appeal</li></ol>`
    }
  ]
};

const DEFAULT_FAQS = [
  { id: 1, q: "What do I do when an account gets banned?", a: "Check the account category first (🟢🟡🔴). Low priority: appeal and replace. Medium: cost-benefit analysis before unbanning. Very important: contact unban service immediately, notify manager. NEVER appeal a medium or very important account without manager approval." },
  { id: 2, q: "How do I check for a shadowban?", a: "Go to Instagram → Settings → Account Status → Limited Reach. If 'People who don't follow you' is orange, act immediately. If 'People under 18' is orange, ignore it." },
  { id: 3, q: "Who do I contact for unbans?", a: "Check the Vendors tab for full contact details and pricing. Priority order: Joker (fastest), then Berdan or Liquide. Always check if the account has insurance first." },
  { id: 4, q: "When should I notify the manager?", a: "Always notify for: very important account bans, mass video removals (5+), any unban that costs over $300, repeated shadowbans on the same account, and any unusual platform behavior." },
];

const DEFAULT_ACCOUNTS = [
  { id: 1, name: "Account A", platform: "Instagram", category: "🔴 Very Important", subs_day: "25", status: "Active", insurance: "Yes", notes: "Main revenue account" },
  { id: 2, name: "Account B", platform: "TikTok", category: "🟡 Medium", subs_day: "8", status: "Active", insurance: "No", notes: "" },
  { id: 3, name: "Account C", platform: "Instagram", category: "🟢 Low Priority", subs_day: "2", status: "Banned", insurance: "No", notes: "Appealed 03/2026" },
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
  const [meta, setMeta] = useState({ title: sop.title||"", subtitle: sop.subtitle||"", category: sop.category||"", version: sop.version||"1.0" });
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
    { tab: "onboarding", icon: "👋", title: "Onboarding", desc: "New to the team? Start here." },
    { tab: "sops", icon: "📋", title: "SOPs", desc: "Standard operating procedures." },
    { tab: "faqs", icon: "❓", title: "FAQs", desc: "Common questions answered." },
    { tab: "accounts", icon: "📱", title: "Accounts", desc: "Account overview & status.", locked: true },
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
const DEFAULT_STEPS = [
  { id: 1, icon: "📱", title: "Step 1 — Set Up Your Accounts", body: "Request account access from the manager via WhatsApp. You'll receive login credentials for the accounts you'll be managing. Never share these credentials with anyone." },
  { id: 2, icon: "📋", title: "Step 2 — Read the SOPs", body: "Go through all SOPs in the SOPs tab before starting work. Pay special attention to SOP #1 (Account Problems) — this is the most important one." },
  { id: 3, icon: "🔍", title: "Step 3 — Daily Account Checks", body: "Every day, check the account status for all accounts you manage. Go to Instagram → Settings → Account Status → Limited Reach. Report any issues immediately." },
  { id: 4, icon: "💬", title: "Step 4 — Communication", body: "Use WhatsApp for all team communication. Always notify the manager before taking any action on banned accounts. When in doubt, ask first." },
  { id: 5, icon: "📊", title: "Step 5 — Track Everything", body: "Document every account issue in the account overview. Include: date, account name, issue type, action taken, and outcome." },
  { id: 6, icon: "🚨", title: "Step 6 — When in Doubt", body: "If you're unsure what to do — STOP and contact the manager. Taking the wrong action (like appealing a very important banned account) can cost hundreds of dollars." },
];

function OnboardingPage({ isAdmin }) {
  const [steps, setSteps] = useState(DEFAULT_STEPS);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});

  const openEdit = (s) => { setEditing(s.id); setForm({...s}); };
  const openNew = () => { setEditing("new"); setForm({ icon: "📌", title: "", body: "" }); };
  const save = () => {
    if (editing === "new") setSteps([...steps, { ...form, id: Math.max(0, ...steps.map(s => s.id)) + 1 }]);
    else setSteps(steps.map(s => s.id === editing ? { ...form, id: editing } : s));
    setEditing(null);
  };

  return (
    <div style={{ maxWidth: 760, margin: "0 auto", padding: "32px 24px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, marginBottom: 6 }}>
        <div>
          <h2 style={pageTitle}>👋 Onboarding Guide</h2>
          <p style={pageSubtitle}>Everything you need to get started at Perlage Studios</p>
        </div>
        {isAdmin && <button onClick={openNew} style={saveBtn}><IconPlus /> Add Step</button>}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 24 }}>
        {steps.map((s) => (
          <div key={s.id} style={{ background: "#fff", border: "1px solid rgba(102,126,234,0.12)", borderRadius: 14, padding: "18px 22px", boxShadow: "0 2px 8px rgba(102,126,234,0.05)", display: "flex", gap: 16, alignItems: "flex-start" }}>
            <div style={{ fontSize: 22, flexShrink: 0, marginTop: 2 }}>{s.icon}</div>
            <div style={{ flex: 1 }}>
              <h3 style={{ margin: "0 0 6px", color: "#667eea", fontFamily: "'Cormorant Garamond', serif", fontSize: 17, fontWeight: 700 }}>{s.title}</h3>
              <p style={{ margin: 0, color: "#4a5568", fontSize: 14, lineHeight: 1.7 }}>{s.body}</p>
            </div>
            {isAdmin && (
              <div style={{ display: "flex", gap: 4, flexShrink: 0 }}>
                <button onClick={() => openEdit(s)} style={{ ...iconBtn, color: "#667eea" }}><IconEdit /></button>
                <button onClick={() => { if(window.confirm("Delete step?")) setSteps(steps.filter(x => x.id !== s.id)); }} style={{ ...iconBtn, color: "#e05555" }}><IconDelete /></button>
              </div>
            )}
          </div>
        ))}
      </div>

      {editing !== null && (
        <div style={overlayStyle} onClick={e => e.target === e.currentTarget && setEditing(null)}>
          <div style={{ ...modalStyle, maxWidth: 500 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h2 style={{ margin: 0, color: "#667eea", fontFamily: "'Cormorant Garamond', serif", fontSize: 20 }}>{editing === "new" ? "Add Step" : "Edit Step"}</h2>
              <button onClick={() => setEditing(null)} style={{ background: "none", border: "none", color: "#aaa", cursor: "pointer", fontSize: 20 }}>✕</button>
            </div>
            <div style={{ marginBottom: 12 }}>
              <label style={labelStyle}>Icon (emoji)</label>
              <input value={form.icon || ""} onChange={e => setForm({...form, icon: e.target.value})} style={inputStyle} placeholder="📌" />
            </div>
            <div style={{ marginBottom: 12 }}>
              <label style={labelStyle}>Title</label>
              <input value={form.title || ""} onChange={e => setForm({...form, title: e.target.value})} style={inputStyle} placeholder="Step title" />
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={labelStyle}>Body</label>
              <textarea value={form.body || ""} onChange={e => setForm({...form, body: e.target.value})} style={{ ...inputStyle, minHeight: 120, resize: "vertical" }} placeholder="Step description..." />
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

// ─── PAGE: ACCOUNTS ───────────────────────────────────────────────────────────
function AccountsPage({ isAdmin }) {
  const [accounts, setAccounts] = useState(DEFAULT_ACCOUNTS);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});
  const statusColor = s => s === "Active" ? "#22c55e" : s === "Banned" ? "#ef4444" : "#f59e0b";
  const openEdit = (acc) => { setEditing(acc.id); setForm({...acc}); };
  const openNew = () => { setEditing("new"); setForm({ name:"", platform:"Instagram", category:"🟢 Low Priority", subs_day:"", status:"Active", insurance:"No", notes:"" }); };
  const save = () => {
    if (editing === "new") setAccounts([...accounts, { ...form, id: Math.max(0,...accounts.map(a=>a.id))+1 }]);
    else setAccounts(accounts.map(a => a.id === editing ? {...form, id: editing} : a));
    setEditing(null);
  };
  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: "32px 24px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, marginBottom: 22 }}>
        <div>
          <h2 style={pageTitle}>📱 Account Overview</h2>
          <p style={pageSubtitle}>All creator accounts and their current status</p>
        </div>
        {isAdmin && <button onClick={openNew} style={saveBtn}><IconPlus /> Add Account</button>}
      </div>
      <div style={{ overflowX: "auto", borderRadius: 14, boxShadow: "0 2px 12px rgba(102,126,234,0.08)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", background: "#fff", fontSize: 14, minWidth: 640 }}>
          <thead>
            <tr style={{ background: "linear-gradient(135deg, #667eea, #764ba2)" }}>
              {["Account","Platform","Category","Subs/Day","Status","Insurance","Notes",""].map(h => (
                <th key={h} style={{ padding: "12px 14px", color: "#fff", fontWeight: 600, textAlign: "left", fontSize: 11, letterSpacing: 0.5, textTransform: "uppercase", whiteSpace: "nowrap" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {accounts.map((acc, i) => (
              <tr key={acc.id} style={{ borderBottom: "1px solid rgba(102,126,234,0.07)", background: i%2===0 ? "#fff" : "rgba(102,126,234,0.02)" }}>
                <td style={{ padding: "12px 14px", fontWeight: 600, color: "#2d3748" }}>{acc.name}</td>
                <td style={{ padding: "12px 14px", color: "#4a5568" }}>{acc.platform}</td>
                <td style={{ padding: "12px 14px", color: "#4a5568" }}>{acc.category}</td>
                <td style={{ padding: "12px 14px", color: "#4a5568", textAlign: "center" }}>{acc.subs_day}</td>
                <td style={{ padding: "12px 14px" }}>
                  <span style={{ background: statusColor(acc.status)+"20", color: statusColor(acc.status), borderRadius: 6, padding: "3px 10px", fontSize: 12, fontWeight: 600 }}>{acc.status}</span>
                </td>
                <td style={{ padding: "12px 14px", color: "#4a5568", textAlign: "center" }}>{acc.insurance}</td>
                <td style={{ padding: "12px 14px", color: "#9b8fc4", fontSize: 13 }}>{acc.notes}</td>
                <td style={{ padding: "12px 14px" }}>
                  {isAdmin && (
                    <div style={{ display: "flex", gap: 4 }}>
                      <button onClick={() => openEdit(acc)} style={{ ...iconBtn, color: "#667eea" }}><IconEdit /></button>
                      <button onClick={() => { if(window.confirm("Delete?")) setAccounts(accounts.filter(a=>a.id!==acc.id)); }} style={{ ...iconBtn, color: "#e05555" }}><IconDelete /></button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {editing !== null && (
        <div style={overlayStyle} onClick={e => e.target === e.currentTarget && setEditing(null)}>
          <div style={{ ...modalStyle, maxWidth: 480 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h2 style={{ margin: 0, color: "#667eea", fontFamily: "'Cormorant Garamond', serif", fontSize: 20 }}>{editing === "new" ? "Add Account" : "Edit Account"}</h2>
              <button onClick={() => setEditing(null)} style={{ background: "none", border: "none", color: "#aaa", cursor: "pointer", fontSize: 20 }}>✕</button>
            </div>
            {[["Account Name","name"],["Platform","platform"],["Category","category"],["Subs/Day","subs_day"],["Status","status"],["Insurance (Yes/No)","insurance"],["Notes","notes"]].map(([label, key]) => (
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
            : activeTab === "onboarding" ? <OnboardingPage isAdmin={isAdmin} />
            : activeTab === "sops"       ? <SOPsPage isAdmin={isAdmin} />
            : activeTab === "faqs"       ? <FAQsPage isAdmin={isAdmin} />
            : activeTab === "accounts"   ? <AccountsPage isAdmin={isAdmin} />
            : activeTab === "vendors"    ? <VendorsPage />
            : activeTab === "creatorform" ? <CreatorFormPage />
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

// ─── PAGE: CREATOR FORM ───────────────────────────────────────────────────────
const FORM_CONTENT = {
  en: {
    title: "Creator Onboarding",
    subtitle: "Your Path to Success — Let's Get Started!",
    welcome_title: "👋 Welcome!",
    welcome_body: "We're excited to get to know you better. This questionnaire helps us understand your situation, goals, and technical setup so we can provide you with the best possible support.",
    welcome_honest: "Please answer all questions honestly.",
    welcome_time: "⏱️ Time needed: approx. 5–7 minutes",
    progress: (s) => `Section ${s} of 4`,
    sections: [
      {
        title: "👤 Personal Basics",
        fields: [
          { id: "age", label: "How old are you?", type: "number", required: true, min: 18, max: 99 },
          { id: "country", label: "Which country do you live in?", type: "text", required: true },
          { id: "nationality", label: "What is your nationality?", type: "text", required: true },
          { id: "height_build", label: "Height & Build", type: "text", hint: 'E.g. "175 cm, athletic"', required: true, placeholder: "E.g. 170 cm, slim" },
          { id: "tattoos_piercings", label: "Do you have tattoos or piercings?", type: "text", hint: "If yes, briefly describe", placeholder: "E.g. small tattoo on wrist" },
          { id: "relationship_status", label: "Relationship Status", type: "select", required: true, options: ["Single","In a relationship","Married","Other"] },
          { id: "living_situation", label: "Living Situation", type: "select", required: true, options: ["Living alone","With partner","With roommates","With parents","With family"] },
        ]
      },
      {
        title: "⏱️ Availability & Commitment",
        fields: [
          { id: "hours_per_week", label: "Hours per week you can dedicate?", type: "number", required: true, hint: "Min. 15–20 hours/week needed", min: 0, max: 168 },
          { id: "productive_times", label: "When are you most productive?", type: "select", required: true, options: ["Morning (6–12)","Afternoon (12–18)","Evening (18–24)","Night (0–6)","Flexible"] },
          { id: "content_days", label: "On which days can you create content?", type: "text", required: true, hint: "E.g. Mon–Fri or Daily", placeholder: "E.g. Mon, Wed, Fri" },
          { id: "has_job", label: "Do you have another job?", type: "select", required: true, options: ["No","Yes, full-time","Yes, part-time","Yes, I'm a student"], toggle: { show: ["Yes, full-time","Yes, part-time","Yes, I'm a student"], field: "job_hours" } },
          { id: "job_hours", label: "How many hours/week do you work there?", type: "number", conditional: true, min: 0, max: 80 },
          { id: "commitment_duration", label: "How long are you planning to do OnlyFans?", type: "select", required: true, options: ["3–6 months","6–12 months","1 year or longer","Long-term (indefinite)"] },
        ]
      },
      {
        title: "📱 Technical Equipment",
        fields: [
          { id: "phone_model", label: "Which phone do you have?", type: "text", required: true, hint: "Model and year, e.g. iPhone 13", placeholder: "E.g. iPhone 14 Pro" },
          { id: "has_ringlight", label: "Do you have a ring light?", type: "select", required: true, options: ["Yes, I have one","No, but willing to buy one","No"], toggle: { show: ["Yes, I have one"], field: "ringlight_model" } },
          { id: "ringlight_model", label: "Which ring light model?", type: "text", conditional: true, placeholder: "E.g. Neewer 18 inch" },
          { id: "has_tripod", label: "Do you have a tripod?", type: "select", required: true, options: ["Yes, I have one","No, but willing to buy one","No"], toggle: { show: ["Yes, I have one"], field: "tripod_model" } },
          { id: "tripod_model", label: "Which tripod model?", type: "text", conditional: true, placeholder: "E.g. Manfrotto Compact" },
          { id: "has_car", label: "Do you have a car?", type: "select", required: true, options: ["Yes","No"] },
          { id: "has_microphone", label: "Do you have a microphone?", type: "select", required: true, options: ["Yes","No"] },
        ]
      },
      {
        title: "📲 Social Media",
        fields: [
          { id: "instagram", label: "Instagram Username", type: "text", hint: "@ not required", placeholder: "E.g. johndoe" },
          { id: "tiktok", label: "TikTok Username", type: "text", placeholder: "@johndoe" },
          { id: "twitter", label: "Twitter/X Username", type: "text", placeholder: "@johndoe" },
          { id: "youtube", label: "YouTube Channel", type: "text", placeholder: "Channel name or URL" },
          { id: "other_platforms", label: "Other Platforms", type: "text", hint: "E.g. Twitch, Snapchat", placeholder: "E.g. Twitch: johndoe" },
          { id: "social_experience", label: "Social Media Experience", type: "select", required: true, options: ["No experience","Beginner (posted a few times)","Intermediate (regular posts)","Advanced (active content creation)","Professional (monetized)"] },
          { id: "geo_blocking", label: "Geo-Blocking Preferences", type: "text", hint: "Countries you want to block (optional)", placeholder: "E.g. Germany, Austria" },
        ]
      }
    ],
    btn_next: "Next →",
    btn_back: "← Back",
    btn_review: "Review Summary →",
    btn_edit: "✏️ Edit",
    btn_copy: "📋 Copy",
    btn_submit: "✅ Submit",
    summary_title: "📋 Summary",
    qualification_title: "🎯 Qualification Check",
    qualified: "✅ QUALIFIED",
    needs_review: "⚠️ REVIEW REQUIRED",
    success_title: "Successfully Submitted! 🎉",
    success_body: "Thank you for filling out the questionnaire! We'll review your information and get back to you via WhatsApp within 24–48 hours.",
    copied: "✅ Summary copied to clipboard!",
  },
  de: {
    title: "Creator Onboarding",
    subtitle: "Dein Weg zum Erfolg — Los geht's!",
    welcome_title: "👋 Willkommen!",
    welcome_body: "Wir freuen uns, dich kennenzulernen. Dieser Fragebogen hilft uns, deine Situation, Ziele und technische Ausstattung zu verstehen, damit wir dir die bestmögliche Unterstützung bieten können.",
    welcome_honest: "Bitte beantworte alle Fragen ehrlich.",
    welcome_time: "⏱️ Zeitbedarf: ca. 5–7 Minuten",
    progress: (s) => `Abschnitt ${s} von 4`,
    sections: [
      {
        title: "👤 Persönliche Basics",
        fields: [
          { id: "age", label: "Wie alt bist du?", type: "number", required: true, min: 18, max: 99 },
          { id: "country", label: "In welchem Land lebst du?", type: "text", required: true },
          { id: "nationality", label: "Was ist deine Nationalität?", type: "text", required: true },
          { id: "height_build", label: "Größe & Körperbau", type: "text", hint: "z.B. 1,65m, athletisch", required: true, placeholder: "z.B. 1,70m, schlank" },
          { id: "tattoos_piercings", label: "Hast du Tattoos oder Piercings?", type: "text", hint: "Falls ja, kurz beschreiben", placeholder: "z.B. kleine Rose am Handgelenk" },
          { id: "relationship_status", label: "Beziehungsstatus", type: "select", required: true, options: ["Single","In einer Beziehung","Verheiratet","Es ist kompliziert","Möchte ich nicht sagen"] },
          { id: "living_situation", label: "Wohnsituation", type: "select", required: true, options: ["Alleine","Mit Partner","Mit Mitbewohnern","Bei Eltern","Bei Familie"] },
        ]
      },
      {
        title: "⏱️ Verfügbarkeit & Commitment",
        fields: [
          { id: "hours_per_week", label: "Wie viele Stunden/Woche kannst du investieren?", type: "number", required: true, hint: "Min. 15–20 Std/Woche nötig", min: 0, max: 168 },
          { id: "productive_times", label: "Wann bist du am produktivsten?", type: "select", required: true, options: ["Morgens (6–12)","Nachmittags (12–18)","Abends (18–24)","Nachts (0–6)","Flexibel"] },
          { id: "content_days", label: "An welchen Tagen kannst du Content erstellen?", type: "text", required: true, hint: "z.B. Mo–Fr oder täglich", placeholder: "z.B. Mo, Mi, Fr" },
          { id: "has_job", label: "Hast du einen anderen Job?", type: "select", required: true, options: ["Nein","Ja, Vollzeit","Ja, Teilzeit","Ja, ich studiere"], toggle: { show: ["Ja, Vollzeit","Ja, Teilzeit","Ja, ich studiere"], field: "job_hours" } },
          { id: "job_hours", label: "Wie viele Stunden/Woche arbeitest du dort?", type: "number", conditional: true, min: 0, max: 80 },
          { id: "commitment_duration", label: "Wie lange planst du OnlyFans zu betreiben?", type: "select", required: true, options: ["3–6 Monate","6–12 Monate","1 Jahr oder länger","Langfristig (unbegrenzt)"] },
        ]
      },
      {
        title: "📱 Technische Ausstattung",
        fields: [
          { id: "phone_model", label: "Welches Handy hast du?", type: "text", required: true, hint: "Modell und Jahr, z.B. iPhone 13", placeholder: "z.B. iPhone 14 Pro" },
          { id: "has_ringlight", label: "Hast du ein Ringlicht?", type: "select", required: true, options: ["Ja, habe ich","Nein, aber bereit eines zu kaufen","Nein"], toggle: { show: ["Ja, habe ich"], field: "ringlight_model" } },
          { id: "ringlight_model", label: "Welches Ringlicht-Modell?", type: "text", conditional: true, placeholder: "z.B. Neewer 18 Zoll" },
          { id: "has_tripod", label: "Hast du ein Stativ?", type: "select", required: true, options: ["Ja, habe ich","Nein, aber bereit eines zu kaufen","Nein"], toggle: { show: ["Ja, habe ich"], field: "tripod_model" } },
          { id: "tripod_model", label: "Welches Stativ-Modell?", type: "text", conditional: true, placeholder: "z.B. Manfrotto Compact" },
          { id: "has_car", label: "Hast du ein Auto?", type: "select", required: true, options: ["Ja","Nein"] },
          { id: "has_microphone", label: "Hast du ein Mikrofon?", type: "select", required: true, options: ["Ja","Nein"] },
        ]
      },
      {
        title: "📲 Social Media",
        fields: [
          { id: "instagram", label: "Instagram Username", type: "text", hint: "@ nicht erforderlich", placeholder: "z.B. johndoe" },
          { id: "tiktok", label: "TikTok Username", type: "text", placeholder: "@johndoe" },
          { id: "twitter", label: "Twitter/X Username", type: "text", placeholder: "@johndoe" },
          { id: "youtube", label: "YouTube Kanal", type: "text", placeholder: "Kanalname oder URL" },
          { id: "other_platforms", label: "Andere Plattformen", type: "text", hint: "z.B. Twitch, Snapchat", placeholder: "z.B. Twitch: johndoe" },
          { id: "social_experience", label: "Social Media Erfahrung", type: "select", required: true, options: ["Keine Erfahrung","Anfänger (wenige Posts)","Mittel (regelmäßige Posts)","Fortgeschritten (aktive Content-Erstellung)","Profi (monetarisiert)"] },
          { id: "geo_blocking", label: "Geo-Blocking Präferenzen", type: "text", hint: "Länder, die du blocken möchtest (optional)", placeholder: "z.B. Deutschland, Österreich" },
        ]
      }
    ],
    btn_next: "Weiter →",
    btn_back: "← Zurück",
    btn_review: "Zusammenfassung ansehen →",
    btn_edit: "✏️ Bearbeiten",
    btn_copy: "📋 Kopieren",
    btn_submit: "✅ Absenden",
    summary_title: "📋 Zusammenfassung",
    qualification_title: "🎯 Qualifikations-Check",
    qualified: "✅ QUALIFIZIERT",
    needs_review: "⚠️ PRÜFUNG ERFORDERLICH",
    success_title: "Erfolgreich abgesendet! 🎉",
    success_body: "Danke fürs Ausfüllen! Wir melden uns innerhalb von 24–48 Stunden per WhatsApp bei dir.",
    copied: "✅ Zusammenfassung kopiert!",
  }
};

const GOOGLE_SHEETS_URL = "https://script.google.com/macros/s/AKfycbwbqaIcu-l06cpd5D3yJlsvD-TsFA5XqlMiib2PKk-qvsHYWIhCwSrDKxeExmNNU0Zenw/exec";

function CreatorFormPage() {
  const [lang, setLang] = useState("en");
  const [section, setSection] = useState(0);
  const [answers, setAnswers] = useState({});
  const [stage, setStage] = useState("form"); // form | summary | success
  const [submitErr, setSubmitErr] = useState(false);

  const c = FORM_CONTENT[lang];
  const currentSec = c.sections[section];

  const isVisible = (field) => {
    if (!field.conditional) return true;
    // Find the parent toggle field
    for (const f of currentSec.fields) {
      if (f.toggle && f.toggle.field === field.id) {
        return f.toggle.show.includes(answers[f.id] || "");
      }
    }
    return false;
  };

  const validate = () => {
    for (const f of currentSec.fields) {
      if (f.required && isVisible(f) && !answers[f.id]?.trim()) return false;
    }
    return true;
  };

  const next = () => {
    if (!validate()) { alert(lang === "en" ? "⚠️ Please fill in all required fields (*)" : "⚠️ Bitte alle Pflichtfelder (*) ausfüllen!"); return; }
    if (section < c.sections.length - 1) { setSection(s => s + 1); window.scrollTo(0,0); }
    else { setStage("summary"); window.scrollTo(0,0); }
  };

  const back = () => { setSection(s => s - 1); window.scrollTo(0,0); };

  const submit = async () => {
    try {
      const payload = { ...answers, lang, timestamp: new Date().toISOString() };
      await fetch(GOOGLE_SHEETS_URL, { method: "POST", mode: "no-cors", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      setStage("success"); window.scrollTo(0,0);
    } catch(e) { setSubmitErr(true); }
  };

  const copyClipboard = () => {
    let t = `=== CREATOR ONBOARDING ===\n\n`;
    c.sections.forEach(sec => {
      t += `${sec.title}\n`;
      sec.fields.forEach(f => { if (answers[f.id]) t += `${f.label}: ${answers[f.id]}\n`; });
      t += "\n";
    });
    navigator.clipboard.writeText(t).then(() => alert(c.copied));
  };

  const fieldStyle = { width: "100%", padding: "11px 14px", border: "2px solid #e2e8f0", borderRadius: 8, fontSize: 14, color: "#2d3748", outline: "none", background: "#fff", fontFamily: "inherit", transition: "border-color 0.2s" };
  const focusStyle = { borderColor: "#667eea", boxShadow: "0 0 0 3px rgba(102,126,234,0.1)" };

  const renderField = (f) => {
    if (f.conditional && !isVisible(f)) return null;
    const val = answers[f.id] || "";
    const set = (v) => setAnswers(a => ({ ...a, [f.id]: v }));
    return (
      <div key={f.id} style={{ marginBottom: 22 }}>
        <label style={{ display: "block", fontWeight: 600, color: "#2d3748", fontSize: 14, marginBottom: f.hint ? 4 : 8 }}>
          {f.label} {f.required && <span style={{ color: "#e53e3e" }}>*</span>}
        </label>
        {f.hint && <span style={{ display: "block", fontSize: 12, color: "#9b8fc4", fontStyle: "italic", marginBottom: 8 }}>{f.hint}</span>}
        {f.type === "select" ? (
          <select value={val} onChange={e => set(e.target.value)} style={{ ...fieldStyle, cursor: "pointer", appearance: "none", backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23667eea' stroke-width='2'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center", backgroundSize: 18, paddingRight: 38 }}>
            <option value="">-- {lang === "en" ? "Please select" : "Bitte wählen"} --</option>
            {f.options.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
        ) : (
          <input type={f.type} value={val} onChange={e => set(e.target.value)}
            placeholder={f.placeholder || ""}
            min={f.min} max={f.max}
            onFocus={e => Object.assign(e.target.style, focusStyle)}
            onBlur={e => { e.target.style.borderColor = "#e2e8f0"; e.target.style.boxShadow = "none"; }}
            style={fieldStyle} />
        )}
      </div>
    );
  };

  const qualCheck = () => {
    const d = answers;
    const checks = lang === "en" ? [
      [parseInt(d.hours_per_week) >= 15, "Min. 15–20 hrs/week available", "Less than 15 hrs/week"],
      [!!d.phone_model?.trim(), "Smartphone available", "No smartphone specified"],
      [d.has_ringlight && !d.has_ringlight.toLowerCase().includes("no") || d.has_tripod && !d.has_tripod.toLowerCase().includes("no"), "Equipment available", "No equipment available"],
      [d.instagram || d.tiktok || d.twitter || d.youtube, "Social media account available", "No social media accounts"],
      [d.commitment_duration && !d.commitment_duration.includes("3–6"), "Long-term commitment", "Short commitment"],
    ] : [
      [parseInt(d.hours_per_week) >= 15, "Min. 15–20 Std/Woche verfügbar", "Weniger als 15 Std/Woche"],
      [!!d.phone_model?.trim(), "Smartphone vorhanden", "Kein Smartphone angegeben"],
      [d.has_ringlight && !d.has_ringlight.toLowerCase().includes("nein") || d.has_tripod && !d.has_tripod.toLowerCase().includes("nein"), "Equipment vorhanden", "Kein Equipment vorhanden"],
      [d.instagram || d.tiktok || d.twitter || d.youtube, "Social Media Account vorhanden", "Keine Social Media Accounts"],
      [d.commitment_duration && !d.commitment_duration.includes("3–6"), "Langfristiges Commitment", "Kurzes Commitment"],
    ];
    const score = checks.filter(([pass]) => pass).length;
    const qualified = score >= 4;
    return { checks, score, qualified };
  };

  if (stage === "success") return (
    <div style={{ maxWidth: 580, margin: "60px auto", padding: "0 24px", textAlign: "center" }}>
      <div style={{ fontSize: 56, marginBottom: 20 }}>🎉</div>
      <h2 style={{ color: "#667eea", fontFamily: "'Cormorant Garamond', serif", fontSize: 28, margin: "0 0 14px" }}>{c.success_title}</h2>
      <p style={{ color: "#4a5568", fontSize: 15, lineHeight: 1.8, marginBottom: 28 }}>{c.success_body}</p>
      <div style={{ background: "linear-gradient(135deg, rgba(102,126,234,0.08), rgba(118,75,162,0.05))", borderRadius: 14, padding: "20px 24px", border: "1px solid rgba(102,126,234,0.15)", marginBottom: 24, textAlign: "left" }}>
        <p style={{ color: "#667eea", fontWeight: 600, marginBottom: 10 }}>📸 {lang === "en" ? "Next Steps:" : "Nächste Schritte:"}</p>
        <p style={{ color: "#4a5568", fontSize: 14 }}>{lang === "en" ? "Please send us photos of your ring light and tripod via WhatsApp (if you have them)." : "Bitte sende uns Fotos deines Ringlichts und Stativs per WhatsApp (falls vorhanden)."}</p>
      </div>
      <button onClick={copyClipboard} style={{ ...saveBtn, margin: "0 auto 12px", justifyContent: "center" }}>{c.btn_copy}</button>
      <button onClick={() => { setAnswers({}); setSection(0); setStage("form"); }} style={{ ...cancelBtn, display: "block", margin: "0 auto" }}>
        {lang === "en" ? "Submit another response" : "Weitere Antwort absenden"}
      </button>
    </div>
  );

  if (stage === "summary") {
    const { checks, score, qualified } = qualCheck();
    return (
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, marginBottom: 24 }}>
          <h2 style={pageTitle}>{c.summary_title}</h2>
          <div style={{ display: "flex", border: "1px solid rgba(102,126,234,0.3)", borderRadius: 8, overflow: "hidden" }}>
            {["en","de"].map(l => (
              <button key={l} onClick={() => setLang(l)} style={{ border: "none", cursor: "pointer", padding: "6px 14px", fontSize: 12, fontWeight: 600, fontFamily: "inherit", background: lang===l ? "linear-gradient(135deg,#667eea,#764ba2)" : "transparent", color: lang===l ? "#fff" : "#667eea" }}>
                {l === "en" ? "🇬🇧 EN" : "🇩🇪 DE"}
              </button>
            ))}
          </div>
        </div>
        {c.sections.map((sec, si) => (
          <div key={si} style={{ background: "#fff", border: "1px solid rgba(102,126,234,0.12)", borderRadius: 14, padding: "20px 24px", marginBottom: 14, boxShadow: "0 2px 8px rgba(102,126,234,0.05)" }}>
            <h3 style={{ margin: "0 0 14px", color: "#667eea", fontFamily: "'Cormorant Garamond', serif", fontSize: 17 }}>{sec.title}</h3>
            {sec.fields.filter(f => answers[f.id]).map(f => (
              <div key={f.id} style={{ display: "flex", gap: 12, padding: "6px 0", borderBottom: "1px solid rgba(102,126,234,0.06)", fontSize: 14 }}>
                <span style={{ color: "#9b8fc4", fontWeight: 600, minWidth: 160, flexShrink: 0 }}>{f.label}</span>
                <span style={{ color: "#2d3748" }}>{answers[f.id]}</span>
              </div>
            ))}
          </div>
        ))}
        <div style={{ background: "#fff", border: "1px solid rgba(102,126,234,0.12)", borderRadius: 14, padding: "20px 24px", marginBottom: 24, boxShadow: "0 2px 8px rgba(102,126,234,0.05)" }}>
          <h3 style={{ margin: "0 0 14px", color: "#667eea", fontFamily: "'Cormorant Garamond', serif", fontSize: 17 }}>{c.qualification_title}</h3>
          <div style={{ display: "inline-block", padding: "8px 18px", borderRadius: 8, fontWeight: 700, fontSize: 14, marginBottom: 14, background: qualified ? "#c6f6d5" : "#fed7d7", color: qualified ? "#22543d" : "#742a2a" }}>
            {qualified ? c.qualified : c.needs_review} ({score}/5)
          </div>
          {checks.map(([pass, ok, fail], i) => (
            <div key={i} style={{ color: "#4a5568", fontSize: 14, margin: "5px 0" }}>{pass ? "✅" : "⚠️"} {pass ? ok : fail}</div>
          ))}
        </div>
        {submitErr && <p style={{ color: "#e05555", textAlign: "center", marginBottom: 12, fontSize: 13 }}>⚠️ Submit failed. Please try again or contact us via WhatsApp.</p>}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button onClick={() => { setStage("form"); setSection(0); window.scrollTo(0,0); }} style={cancelBtn}>{c.btn_edit}</button>
          <button onClick={copyClipboard} style={{ ...cancelBtn, color: "#667eea" }}>{c.btn_copy}</button>
          <button onClick={submit} style={{ ...saveBtn, flex: 1, justifyContent: "center" }}>{c.btn_submit}</button>
        </div>
      </div>
    );
  }

  const progress = ((section + 1) / c.sections.length) * 100;

  return (
    <div style={{ maxWidth: 680, margin: "0 auto", padding: "32px 24px" }}>
      {/* Header + lang toggle */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12, marginBottom: 24 }}>
        <div>
          <h2 style={pageTitle}>📝 {c.title}</h2>
          <p style={pageSubtitle}>{c.subtitle}</p>
        </div>
        <div style={{ display: "flex", border: "1px solid rgba(102,126,234,0.3)", borderRadius: 8, overflow: "hidden" }}>
          {["en","de"].map(l => (
            <button key={l} onClick={() => setLang(l)} style={{ border: "none", cursor: "pointer", padding: "6px 14px", fontSize: 12, fontWeight: 600, fontFamily: "inherit", background: lang===l ? "linear-gradient(135deg,#667eea,#764ba2)" : "transparent", color: lang===l ? "#fff" : "#667eea" }}>
              {l === "en" ? "🇬🇧 EN" : "🇩🇪 DE"}
            </button>
          ))}
        </div>
      </div>

      {/* Welcome card */}
      {section === 0 && (
        <div style={{ background: "linear-gradient(135deg, #f5f7fa, #e8eaf6)", borderRadius: 14, padding: "22px 24px", marginBottom: 24, borderLeft: "4px solid #667eea" }}>
          <h3 style={{ color: "#667eea", margin: "0 0 10px", fontFamily: "'Cormorant Garamond', serif", fontSize: 20 }}>{c.welcome_title}</h3>
          <p style={{ color: "#4a5568", fontSize: 14, lineHeight: 1.7, margin: "0 0 8px" }}>{c.welcome_body}</p>
          <p style={{ color: "#4a5568", fontSize: 14, fontWeight: 600, margin: "0 0 4px" }}>{c.welcome_honest}</p>
          <p style={{ color: "#9b8fc4", fontSize: 13, margin: 0 }}>{c.welcome_time}</p>
        </div>
      )}

      {/* Progress bar */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ height: 6, background: "#e2e8f0", borderRadius: 10, overflow: "hidden", marginBottom: 8 }}>
          <div style={{ height: "100%", width: `${progress}%`, background: "linear-gradient(90deg, #667eea, #764ba2)", transition: "width 0.4s ease", borderRadius: 10 }} />
        </div>
        <p style={{ textAlign: "center", color: "#667eea", fontSize: 12, fontWeight: 600 }}>{c.progress(section + 1)}</p>
      </div>

      {/* Section */}
      <div style={{ background: "#fff", border: "1px solid rgba(102,126,234,0.12)", borderRadius: 14, padding: "24px", boxShadow: "0 2px 8px rgba(102,126,234,0.05)", marginBottom: 20 }}>
        <div style={{ background: "linear-gradient(135deg, #667eea, #764ba2)", color: "#fff", borderRadius: 8, padding: "12px 16px", marginBottom: 24, fontSize: 15, fontWeight: 600 }}>
          {currentSec.title}
        </div>
        {currentSec.fields.map(renderField)}
      </div>

      {/* Navigation */}
      <div style={{ display: "flex", gap: 10 }}>
        {section > 0 && <button onClick={back} style={cancelBtn}>{c.btn_back}</button>}
        <button onClick={next} style={{ ...saveBtn, flex: 1, justifyContent: "center" }}>
          {section < c.sections.length - 1 ? c.btn_next : c.btn_review}
        </button>
      </div>
    </div>
  );
}
