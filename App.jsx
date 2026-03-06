import { useState, useEffect, useRef } from "react";

// ─── CONFIG — Change password here ───────────────────────────────────────────
const ADMIN_PASSWORD = "perlage2026";

// ─── Default SOP Data ─────────────────────────────────────────────────────────
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
<p>Every account is categorized based on the number of subscribers it generates. This category determines how to respond to problems.</p>
<table>
<thead><tr><th>Category</th><th>Subs per Day</th><th>Value/Day</th><th>Response to Ban</th></tr></thead>
<tbody>
<tr><td>🟢 Low Priority</td><td>0–4 Subs</td><td>$0–$120</td><td>Create new account</td></tr>
<tr><td>🟡 Medium Important</td><td>5–14 Subs</td><td>$125–$420</td><td>Cost-benefit analysis</td></tr>
<tr><td>🔴 Very Important</td><td>15–100 Subs</td><td>$375–$3,000</td><td>Unban service immediately</td></tr>
</tbody>
</table>
<p><em>ℹ Value calculation: Subs × $25–30 (average revenue per sub on OnlyFans)</em></p>

<h3>Cost-Benefit Calculation for Unbans</h3>
<p>Before every unban, calculate whether it's worth it:</p>
<table>
<thead><tr><th>Scenario</th><th>Cost</th><th>Payback Period</th></tr></thead>
<tbody>
<tr><td>Unappealed Unban</td><td>approx. $300–$500</td><td>At 10 subs/day: 1–2 days</td></tr>
<tr><td>Meta Employee Unban (appealed)</td><td>approx. $1,500–$2,000</td><td>At 10 subs/day: ~6 days</td></tr>
</tbody>
</table>
<div class="warning">⚠ IMPORTANT: NEVER appeal an account before talking to the manager! An appeal makes the unban significantly more expensive ($300 → $1,500+) and slower.</div>
<p><strong>Rule of thumb:</strong> If the account can earn back the unban cost within 10 days, the unban is worth it.</p>

<h2>2. Account Got Banned</h2>
<p>Bans happen almost exclusively on Instagram. TikTok, Twitter, and YouTube accounts generally don't get banned.</p>
<div class="warning">⚠ GOLDEN RULE: DO NOT file an appeal! Talk to the manager first. An appeal massively increases the unban cost.</div>

<h3>2.1 🟢 Low Priority Account Banned (0–4 Subs/Day)</h3>
<p>Unban usually not worth it. Replace quickly and move on.</p>
<ol>
<li>Take a screenshot of the ban screen + the "More about the rules" screen</li>
<li>Appeal and wait to see if you get it back or not</li>
<li>If fully banned → Create or buy a new account (see Vendors SOP)</li>
<li>Mark account as "banned" in the account overview</li>
<li>Move on</li>
</ol>

<h3>2.2 🟡 Medium Important Account Banned (5–14 Subs/Day)</h3>
<p>Calculate whether the unban is worth it.</p>
<ol>
<li>Take a screenshot of the ban screen + the "More about the rules" screen</li>
<li>Do NOT appeal</li>
<li>Run cost-benefit calculation (see table above)</li>
<li>If worth it: Contact unban service + get quotes</li>
<li>If not worth it: Create/buy a new account</li>
<li>Briefly inform manager via WhatsApp</li>
<li>Update the account overview</li>
</ol>

<h3>2.3 🔴 Very Important Account Banned (15–100 Subs/Day)</h3>
<p>Act immediately. Every day without this account costs serious money.</p>
<ol>
<li>Take a screenshot of the ban screen</li>
<li>DO NOT APPEAL!</li>
<li>Check: Does the account have insurance?<br/>If YES: Contact Liquide via Telegram/WhatsApp group.<br/>If NO: Contact unban service (unappealed).</li>
</ol>
<table>
<thead><tr><th>Provider</th><th>Speed</th><th>Price (unappealed)</th><th>Price (REP/MA)</th><th>Contact</th></tr></thead>
<tbody>
<tr><td>Joker</td><td>2–3h, max 24h</td><td>$300–400</td><td>$2,000+</td><td>Telegram → @jokerisafk</td></tr>
<tr><td>Berdan</td><td>5–7 days</td><td>€500</td><td>~€1,700</td><td>Telegram → @qberdan</td></tr>
<tr><td>Liquide</td><td>Slow, varies</td><td>Varies</td><td>Varies</td><td>Telegram → @liquidback</td></tr>
</tbody>
</table>
<ol start="4">
<li>Notify manager IMMEDIATELY via WhatsApp</li>
<li>Mark account as "banned" in the overview + date</li>
<li>Follow up with unban service daily until account is back</li>
</ol>

<h2>3. Shadowban (Limited Reach)</h2>
<p>A shadowban means content is no longer shown to new people. The account isn't suspended, but it's useless without organic reach.</p>

<h3>3.1 Detecting a Shadowban</h3>
<p>Account status MUST be checked DAILY by the team member managing the account.</p>
<p><strong>Where to check:</strong> Instagram → Settings → Account Status → "Limited Reach"</p>
<table>
<thead><tr><th>Option</th><th>Status</th><th>Action</th></tr></thead>
<tbody>
<tr><td>"People who don't follow you"</td><td>🟠 Orange</td><td>ACT IMMEDIATELY!</td></tr>
<tr><td>"People under 18"</td><td>🟠 Orange</td><td>IGNORE — Do nothing.</td></tr>
<tr><td>Both options</td><td>🟢 Green</td><td>All good. Continue normally.</td></tr>
</tbody>
</table>

<h3>3.2 Fixing a Shadowban — Step by Step</h3>
<ol>
<li>Click on "Limited Reach" and check which content is affected</li>
<li>Click "File an appeal" on the affected content</li>
<li>Wait 2 hours for a decision</li>
</ol>
<p>After 2 hours:</p>
<ul>
<li>Appeal successful? → Done.</li>
<li>No decision after 2h? → Delete the affected content.</li>
<li>Appeal denied? → Delete the affected content. If deletion not possible → file appeal on newly removed content.</li>
</ul>

<h2>4. Video Removed</h2>
<p>Happens regularly, about 1–2 videos per week. This is normal — do not panic.</p>
<ol>
<li>Take a screenshot of the removal notice</li>
<li>Send screenshot + full affected video to the team group</li>
<li>Check: Does the account have insurance?<br/>If YES: Notify unban service — do NOT file an appeal!<br/>If NO: Always file an appeal.</li>
</ol>

<h3>Instagram Strike System</h3>
<table>
<thead><tr><th>Threshold</th><th>Consequence</th></tr></thead>
<tbody>
<tr><td>1–11 removed posts / year</td><td>No immediate danger, but monitor account status</td></tr>
<tr><td>12–15 removed posts / year</td><td>WARNING: Account suspension possible! Notify manager immediately.</td></tr>
</tbody>
</table>

<h2>5. Quick Reference</h2>
<table>
<thead><tr><th>Situation</th><th>Immediate Action</th></tr></thead>
<tbody>
<tr><td>🟢 Low priority banned</td><td>Screenshot → Appeal → If denied: new account</td></tr>
<tr><td>🟡 Medium banned</td><td>Screenshot → DO NOT appeal → Cost-benefit → Inform manager</td></tr>
<tr><td>🔴 Very important banned</td><td>Screenshot → DO NOT APPEAL → Insurance? → Joker first → Notify manager IMMEDIATELY</td></tr>
<tr><td>Shadowban (orange)</td><td>Insurance? → Liquide. No: discuss manager → Appeal → Wait 2h → Delete if needed</td></tr>
<tr><td>Video removed</td><td>Screenshot + video to group → Insurance? → Service fixes. No: Appeal</td></tr>
<tr><td>Mass removal (5+ videos)</td><td>Stay calm → Insurance? → Liquide. No: Appeal all → Notify manager</td></tr>
</tbody>
</table>`
    },
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
<p>Jedes Konto wird nach der Anzahl der täglich generierten Abonnenten kategorisiert. Diese Kategorie bestimmt die Reaktion auf Probleme.</p>
<table>
<thead><tr><th>Kategorie</th><th>Subs pro Tag</th><th>Wert/Tag</th><th>Reaktion auf Bann</th></tr></thead>
<tbody>
<tr><td>🟢 Niedrige Priorität</td><td>0–4 Subs</td><td>$0–$120</td><td>Neues Konto erstellen</td></tr>
<tr><td>🟡 Mittel wichtig</td><td>5–14 Subs</td><td>$125–$420</td><td>Kosten-Nutzen-Analyse</td></tr>
<tr><td>🔴 Sehr wichtig</td><td>15–100 Subs</td><td>$375–$3.000</td><td>Sofort Unban-Service</td></tr>
</tbody>
</table>
<div class="warning">⚠ WICHTIG: NIEMALS ein Konto appealen, ohne vorher mit dem Manager gesprochen zu haben! Ein Appeal macht den Unban deutlich teurer ($300 → $1.500+).</div>

<h2>2. Konto gebannt</h2>
<p>Banns passieren fast ausschließlich auf Instagram. TikTok, Twitter und YouTube werden in der Regel nicht gebannt.</p>
<div class="warning">⚠ GOLDENE REGEL: KEINEN Appeal einreichen! Erst mit dem Manager sprechen.</div>

<h3>2.1 🟢 Niedrige Priorität gebannt (0–4 Subs/Tag)</h3>
<ol>
<li>Screenshot des Bann-Bildschirms + "Mehr zu den Regeln"</li>
<li>Appeal einreichen und abwarten</li>
<li>Wenn vollständig gebannt → Neues Konto erstellen oder kaufen</li>
<li>Konto in der Übersicht als "gebannt" markieren</li>
<li>Weitermachen</li>
</ol>

<h3>2.2 🟡 Mittel wichtiges Konto gebannt (5–14 Subs/Tag)</h3>
<ol>
<li>Screenshot des Bann-Bildschirms</li>
<li>KEINEN Appeal einreichen</li>
<li>Kosten-Nutzen-Rechnung durchführen</li>
<li>Wenn lohnenswert: Unban-Service kontaktieren + Angebote einholen</li>
<li>Wenn nicht lohnenswert: Neues Konto erstellen</li>
<li>Manager kurz via WhatsApp informieren</li>
<li>Kontoübersicht aktualisieren</li>
</ol>

<h3>2.3 🔴 Sehr wichtiges Konto gebannt (15–100 Subs/Tag)</h3>
<p>Sofort handeln. Jeder Tag ohne dieses Konto kostet ernsthaft Geld.</p>
<ol>
<li>Screenshot des Bann-Bildschirms</li>
<li>KEINEN APPEAL EINREICHEN!</li>
<li>Prüfen: Hat das Konto eine Versicherung?<br/>JA: Liquide über Telegram/WhatsApp kontaktieren.<br/>NEIN: Unban-Service kontaktieren (ohne Appeal).</li>
<li>Manager SOFORT via WhatsApp benachrichtigen</li>
<li>Konto in der Übersicht als "gebannt" markieren + Datum</li>
<li>Täglich beim Unban-Service nachfragen</li>
</ol>

<h2>3. Shadowban (Eingeschränkte Reichweite)</h2>
<p>Ein Shadowban bedeutet, dass Inhalte neuen Personen nicht mehr angezeigt werden.</p>
<p><strong>Wo prüfen:</strong> Instagram → Einstellungen → Kontostatus → "Eingeschränkte Reichweite"</p>
<div class="warning">⚠ Der Kontostatus MUSS täglich vom zuständigen Teammitglied geprüft werden.</div>

<h3>Shadowban beheben</h3>
<ol>
<li>Auf "Eingeschränkte Reichweite" klicken und betroffene Inhalte prüfen</li>
<li>Auf den betroffenen Inhalten "Einspruch einlegen" klicken</li>
<li>2 Stunden auf eine Entscheidung warten</li>
<li>Einspruch erfolgreich? → Fertig.<br/>Keine Entscheidung nach 2h? → Betroffene Inhalte löschen.<br/>Einspruch abgelehnt? → Betroffene Inhalte löschen.</li>
</ol>

<h2>4. Video entfernt</h2>
<ol>
<li>Screenshot der Entfernungsmeldung</li>
<li>Screenshot + vollständiges Video an die Teamgruppe senden</li>
<li>Versicherung vorhanden? → JA: Unban-Service benachrichtigen, KEINEN Appeal!<br/>NEIN: Immer Appeal einreichen.</li>
</ol>

<h2>5. Schnellreferenz</h2>
<table>
<thead><tr><th>Situation</th><th>Sofortmaßnahme</th></tr></thead>
<tbody>
<tr><td>🟢 Niedrige Priorität gebannt</td><td>Screenshot → Appeal → Wenn abgelehnt: neues Konto</td></tr>
<tr><td>🟡 Mittel gebannt</td><td>Screenshot → KEIN Appeal → Kosten-Nutzen → Manager informieren</td></tr>
<tr><td>🔴 Sehr wichtig gebannt</td><td>Screenshot → KEIN APPEAL → Versicherung? → Joker zuerst → Manager SOFORT</td></tr>
<tr><td>Shadowban (orange)</td><td>Versicherung? → Liquide. Nein: Manager → Appeal → 2h warten → Löschen</td></tr>
<tr><td>Video entfernt</td><td>Screenshot + Video an Gruppe → Versicherung? → Service. Nein: Appeal</td></tr>
</tbody>
</table>`
    },
  ],
};

// ─── Icons ────────────────────────────────────────────────────────────────────
const IconEdit = () => <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>;
const IconDelete = () => <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>;
const IconPlus = () => <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>;
const IconLock = () => <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>;
const IconUnlock = () => <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/></svg>;
const IconChevron = ({ open }) => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s ease" }}><polyline points="6 9 12 15 18 9"/></svg>;

// ─── Rich Text Toolbar ────────────────────────────────────────────────────────
function RichToolbar({ onCommand }) {
  const btn = (cmd, label, title) => (
    <button type="button" title={title} onMouseDown={e => { e.preventDefault(); onCommand(cmd); }}
      style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 5, color: "#d4af6a", padding: "4px 9px", cursor: "pointer", fontSize: 13, fontWeight: 700 }}>
      {label}
    </button>
  );
  const sep = <div style={{ width: 1, background: "rgba(255,255,255,0.1)", margin: "0 4px" }} />;
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 4, padding: "10px 12px", background: "rgba(0,0,0,0.3)", borderBottom: "1px solid rgba(255,255,255,0.08)", borderRadius: "10px 10px 0 0" }}>
      {btn("bold", "B", "Bold")}
      {btn("italic", "I", "Italic")}
      {btn("underline", "U", "Underline")}
      {sep}
      {btn("formatBlock_h2", "H2", "Heading 2")}
      {btn("formatBlock_h3", "H3", "Heading 3")}
      {sep}
      {btn("insertUnorderedList", "• List", "Bullet list")}
      {btn("insertOrderedList", "1. List", "Numbered list")}
      {sep}
      {btn("insertTable", "⊞ Table", "Insert table")}
      {btn("insertWarning", "⚠ Warning", "Warning box")}
    </div>
  );
}

// ─── SOP Editor Modal ─────────────────────────────────────────────────────────
function SOPModal({ sop, lang, onSave, onClose }) {
  const isNew = !sop.id;
  const editorRef = useRef(null);
  const [meta, setMeta] = useState({
    title: sop.title || "",
    subtitle: sop.subtitle || "",
    category: sop.category || "",
    version: sop.version || "1.0",
  });

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = sop.content || "";
    }
  }, []);

  const handleCommand = (cmd) => {
    if (cmd.startsWith("formatBlock_")) {
      document.execCommand("formatBlock", false, cmd.split("_")[1]);
    } else if (cmd === "insertTable") {
      const table = `<table><thead><tr><th>Column 1</th><th>Column 2</th><th>Column 3</th></tr></thead><tbody><tr><td>Cell</td><td>Cell</td><td>Cell</td></tr><tr><td>Cell</td><td>Cell</td><td>Cell</td></tr></tbody></table><p><br/></p>`;
      document.execCommand("insertHTML", false, table);
    } else if (cmd === "insertWarning") {
      document.execCommand("insertHTML", false, `<div class="warning">⚠ IMPORTANT: Write your warning here.</div><p><br/></p>`);
    } else {
      document.execCommand(cmd, false, null);
    }
    editorRef.current.focus();
  };

  const handleSave = () => {
    onSave({ ...meta, content: editorRef.current.innerHTML });
  };

  return (
    <div style={overlayStyle} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{ ...modalStyle, maxWidth: 800, maxHeight: "92vh" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h2 style={{ margin: 0, color: "#d4af6a", fontSize: 18, fontFamily: "'Cormorant Garamond', serif" }}>
            {isNew ? (lang === "en" ? "New SOP" : "Neues SOP") : (lang === "en" ? "Edit SOP" : "SOP bearbeiten")}
          </h2>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "#888", cursor: "pointer", fontSize: 20 }}>✕</button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
          <div style={{ gridColumn: "1/-1" }}>
            <label style={labelStyle}>{lang === "en" ? "Title" : "Titel"}</label>
            <input value={meta.title} onChange={e => setMeta({ ...meta, title: e.target.value })} style={inputStyle} placeholder="SOP #1 — Account Problems" />
          </div>
          <div>
            <label style={labelStyle}>Subtitle</label>
            <input value={meta.subtitle} onChange={e => setMeta({ ...meta, subtitle: e.target.value })} style={inputStyle} placeholder="Ban · Shadowban · Video Removed" />
          </div>
          <div>
            <label style={labelStyle}>{lang === "en" ? "Category" : "Kategorie"}</label>
            <input value={meta.category} onChange={e => setMeta({ ...meta, category: e.target.value })} style={inputStyle} placeholder="Operations" />
          </div>
          <div>
            <label style={labelStyle}>Version</label>
            <input value={meta.version} onChange={e => setMeta({ ...meta, version: e.target.value })} style={inputStyle} placeholder="1.0" />
          </div>
        </div>

        <label style={{ ...labelStyle, display: "block", marginBottom: 6 }}>Content</label>
        <div style={{ border: "1px solid rgba(255,255,255,0.12)", borderRadius: 10, overflow: "hidden", marginBottom: 16 }}>
          <RichToolbar onCommand={handleCommand} />
          <div
            ref={editorRef}
            contentEditable
            suppressContentEditableWarning
            style={{ minHeight: 320, maxHeight: 400, overflowY: "auto", padding: "16px 20px", outline: "none", fontSize: 14, lineHeight: 1.7, color: "#e0d8c8", background: "rgba(0,0,0,0.2)" }}
          />
        </div>

        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
          <button onClick={onClose} style={cancelBtn}>{lang === "en" ? "Cancel" : "Abbrechen"}</button>
          <button onClick={handleSave} style={saveBtn}>{lang === "en" ? "Save SOP" : "SOP speichern"}</button>
        </div>
      </div>
    </div>
  );
}

// ─── Login Modal ──────────────────────────────────────────────────────────────
function LoginModal({ onLogin, onClose, lang }) {
  const [pw, setPw] = useState("");
  const [err, setErr] = useState(false);
  const attempt = () => {
    if (pw === ADMIN_PASSWORD) onLogin();
    else { setErr(true); setTimeout(() => setErr(false), 1500); }
  };
  return (
    <div style={overlayStyle} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{ ...modalStyle, maxWidth: 340 }}>
        <h2 style={{ margin: "0 0 6px", color: "#d4af6a", fontFamily: "'Cormorant Garamond', serif", textAlign: "center", fontSize: 22 }}>Admin Login</h2>
        <p style={{ color: "#666", fontSize: 13, textAlign: "center", margin: "0 0 20px" }}>Perlage Studios</p>
        <input type="password" value={pw} onChange={e => setPw(e.target.value)} onKeyDown={e => e.key === "Enter" && attempt()}
          placeholder={lang === "en" ? "Enter password" : "Passwort eingeben"}
          style={{ ...inputStyle, width: "100%", boxSizing: "border-box", marginBottom: err ? 8 : 14, borderColor: err ? "#e05555" : undefined }}
          autoFocus />
        {err && <p style={{ color: "#e05555", margin: "0 0 12px", fontSize: 12, textAlign: "center" }}>
          {lang === "en" ? "Incorrect password" : "Falsches Passwort"}
        </p>}
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={onClose} style={{ ...cancelBtn, flex: 1 }}>{lang === "en" ? "Cancel" : "Abbrechen"}</button>
          <button onClick={attempt} style={{ ...saveBtn, flex: 1 }}>{lang === "en" ? "Login" : "Anmelden"}</button>
        </div>
      </div>
    </div>
  );
}

// ─── SOP Card ─────────────────────────────────────────────────────────────────
function SOPCard({ sop, isAdmin, lang, onEdit, onDelete }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={cardStyle}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", cursor: "pointer", gap: 12 }} onClick={() => setOpen(!open)}>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, flexWrap: "wrap" }}>
            <span style={categoryBadge}>{sop.category}</span>
            <span style={{ color: "#666", fontSize: 12 }}>v{sop.version} · {sop.updated}</span>
          </div>
          <h3 style={{ margin: 0, color: "#e8e0d0", fontSize: 19, fontFamily: "'Cormorant Garamond', serif", fontWeight: 700 }}>{sop.title}</h3>
          {sop.subtitle && <p style={{ margin: "4px 0 0", color: "#888", fontSize: 13, fontStyle: "italic" }}>{sop.subtitle}</p>}
        </div>
        <div style={{ display: "flex", gap: 6, alignItems: "center", flexShrink: 0 }}>
          {isAdmin && (
            <>
              <button onClick={e => { e.stopPropagation(); onEdit(sop); }} style={{ ...iconBtnStyle, color: "#d4af6a" }}><IconEdit /></button>
              <button onClick={e => { e.stopPropagation(); onDelete(sop.id); }} style={{ ...iconBtnStyle, color: "#e05555" }}><IconDelete /></button>
            </>
          )}
          <span style={{ color: "#d4af6a" }}><IconChevron open={open} /></span>
        </div>
      </div>
      {open && (
        <div style={{ marginTop: 24, borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: 24 }}
          dangerouslySetInnerHTML={{ __html: sop.content }} />
      )}
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [lang, setLang] = useState("en");
  const [sops, setSops] = useState({ en: DEFAULT_SOPS.en, de: DEFAULT_SOPS.de });
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [editingSOP, setEditingSOP] = useState(null);
  const [search, setSearch] = useState("");

  const currentSops = sops[lang];
  const filtered = currentSops.filter(s =>
    s.title.toLowerCase().includes(search.toLowerCase()) ||
    (s.category || "").toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = (form) => {
    const today = new Date().toLocaleDateString("en-GB", { month: "long", year: "numeric" });
    const updated = { ...form, updated: today };
    let newList;
    if (editingSOP.id) {
      newList = currentSops.map(s => s.id === editingSOP.id ? { ...updated, id: editingSOP.id } : s);
    } else {
      const newId = Math.max(0, ...currentSops.map(s => s.id)) + 1;
      newList = [...currentSops, { ...updated, id: newId }];
    }
    setSops({ ...sops, [lang]: newList });
    setEditingSOP(null);
  };

  const handleDelete = (id) => {
    if (!window.confirm(lang === "en" ? "Delete this SOP?" : "Dieses SOP löschen?")) return;
    setSops({ ...sops, [lang]: currentSops.filter(s => s.id !== id) });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Outfit:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; background: #0b120d; }
        .sop-content h2 { color: #d4af6a; font-family: 'Cormorant Garamond', serif; font-size: 20px; margin: 28px 0 10px; border-bottom: 1px solid rgba(212,175,106,0.2); padding-bottom: 6px; }
        .sop-content h3 { color: #b89a50; font-family: 'Cormorant Garamond', serif; font-size: 17px; margin: 20px 0 8px; }
        .sop-content p { color: #c8c0b0; font-size: 14px; line-height: 1.75; margin: 8px 0; }
        .sop-content ul, .sop-content ol { color: #c8c0b0; font-size: 14px; line-height: 1.8; padding-left: 22px; margin: 8px 0; }
        .sop-content li { margin-bottom: 4px; }
        .sop-content table { width: 100%; border-collapse: collapse; margin: 14px 0; font-size: 13px; }
        .sop-content thead tr { background: rgba(212,175,106,0.12); }
        .sop-content th { color: #d4af6a; font-weight: 600; padding: 10px 14px; text-align: left; border: 1px solid rgba(212,175,106,0.2); font-family: 'Outfit', sans-serif; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; }
        .sop-content td { color: #c0b89a; padding: 9px 14px; border: 1px solid rgba(255,255,255,0.07); vertical-align: top; line-height: 1.55; }
        .sop-content tbody tr:nth-child(even) { background: rgba(255,255,255,0.02); }
        .sop-content .warning { background: rgba(220,80,50,0.12); border-left: 3px solid #e05555; border-radius: 0 8px 8px 0; padding: 12px 16px; margin: 14px 0; color: #f0a090; font-size: 13.5px; line-height: 1.65; }
        .sop-content strong { color: #e0d8c8; }
        .sop-content em { color: #a09880; }
        [contenteditable] h2 { color: #d4af6a; font-family: 'Cormorant Garamond', serif; font-size: 20px; margin: 20px 0 8px; }
        [contenteditable] h3 { color: #b89a50; font-family: 'Cormorant Garamond', serif; font-size: 17px; margin: 16px 0 6px; }
        [contenteditable] table { width: 100%; border-collapse: collapse; margin: 10px 0; }
        [contenteditable] th { background: rgba(212,175,106,0.15); color: #d4af6a; padding: 8px 12px; border: 1px solid rgba(212,175,106,0.3); font-size: 12px; }
        [contenteditable] td { padding: 7px 12px; border: 1px solid rgba(255,255,255,0.1); color: #c0b89a; }
        [contenteditable] .warning { background: rgba(220,80,50,0.12); border-left: 3px solid #e05555; padding: 10px 14px; margin: 10px 0; color: #f0a090; border-radius: 0 6px 6px 0; }
        [contenteditable]:empty:before { content: 'Start writing your SOP content here. Use the toolbar above to add headings, lists, tables, and warning boxes...'; color: #555; pointer-events: none; }
      `}</style>

      <div style={{ minHeight: "100vh", background: "#0b120d", fontFamily: "'Outfit', sans-serif" }}>
        {/* Background */}
        <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
          backgroundImage: "radial-gradient(ellipse at 15% 0%, rgba(40,80,40,0.35) 0%, transparent 55%), radial-gradient(ellipse at 85% 90%, rgba(212,175,106,0.06) 0%, transparent 50%)" }} />

        {/* Header */}
        <header style={{ borderBottom: "1px solid rgba(212,175,106,0.15)", background: "rgba(11,18,13,0.96)", backdropFilter: "blur(14px)", position: "sticky", top: 0, zIndex: 10 }}>
          <div style={{ maxWidth: 900, margin: "0 auto", padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 44, height: 44, borderRadius: 10, background: "linear-gradient(135deg, #2d5a30, #1a3a1c)", border: "1px solid rgba(212,175,106,0.35)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span style={{ color: "#d4af6a", fontSize: 11, fontWeight: 700, letterSpacing: 1, fontFamily: "'Cormorant Garamond', serif" }}>SOP</span>
              </div>
              <div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                  <span style={{ color: "#d4af6a", fontSize: 20, fontWeight: 700, fontFamily: "'Cormorant Garamond', serif", letterSpacing: 1 }}>PERLAGE</span>
                  <span style={{ color: "#4a6b4c", fontSize: 13, fontWeight: 400, letterSpacing: 2, textTransform: "uppercase" }}>Studios</span>
                </div>
                <div style={{ color: "#4a5e4b", fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", marginTop: 1 }}>Standard Operating Procedures</div>
              </div>
            </div>

            <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
              <div style={{ display: "flex", border: "1px solid rgba(212,175,106,0.25)", borderRadius: 8, overflow: "hidden" }}>
                {["en", "de"].map(l => (
                  <button key={l} onClick={() => setLang(l)} style={{
                    border: "none", cursor: "pointer", padding: "6px 14px", fontSize: 12, fontWeight: 600,
                    fontFamily: "'Outfit', sans-serif", letterSpacing: 0.8, transition: "all 0.2s",
                    background: lang === l ? "#d4af6a" : "transparent",
                    color: lang === l ? "#0b120d" : "#d4af6a",
                  }}>
                    {l === "en" ? "🇬🇧 EN" : "🇩🇪 DE"}
                  </button>
                ))}
              </div>
              <button onClick={() => isAdmin ? setIsAdmin(false) : setShowLogin(true)} style={{
                border: "1px solid rgba(212,175,106,0.25)", borderRadius: 8, cursor: "pointer",
                padding: "6px 14px", fontSize: 12, color: "#d4af6a", display: "flex", alignItems: "center", gap: 6,
                background: isAdmin ? "rgba(212,175,106,0.12)" : "rgba(255,255,255,0.04)", fontFamily: "'Outfit', sans-serif",
              }}>
                {isAdmin ? <><IconUnlock /> {lang === "en" ? "Exit Edit" : "Beenden"}</> : <><IconLock /> Admin</>}
              </button>
              {isAdmin && (
                <button onClick={() => setEditingSOP({})} style={{
                  border: "none", borderRadius: 8, cursor: "pointer", padding: "7px 16px",
                  fontSize: 12, fontWeight: 600, background: "linear-gradient(135deg, #2d5a30, #1e4020)",
                  color: "#d4af6a", display: "flex", alignItems: "center", gap: 6,
                  border: "1px solid rgba(212,175,106,0.3)", fontFamily: "'Outfit', sans-serif",
                }}>
                  <IconPlus /> {lang === "en" ? "New SOP" : "Neues SOP"}
                </button>
              )}
            </div>
          </div>
        </header>

        {/* Language indicator */}
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "20px 24px 0", position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <div style={{ height: 1, flex: 1, background: "rgba(212,175,106,0.1)" }} />
            <span style={{ color: "#4a6b4c", fontSize: 11, letterSpacing: 2, textTransform: "uppercase" }}>
              {lang === "en" ? "English Version" : "Deutsche Version"}
            </span>
            <div style={{ height: 1, flex: 1, background: "rgba(212,175,106,0.1)" }} />
          </div>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={lang === "en" ? "🔍  Search procedures..." : "🔍  Verfahren suchen..."}
            style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(212,175,106,0.15)", borderRadius: 10, padding: "11px 18px", color: "#e0d8c8", fontSize: 14, outline: "none", fontFamily: "'Outfit', sans-serif" }}
          />
        </div>

        {/* SOP List */}
        <main style={{ maxWidth: 900, margin: "0 auto", padding: "16px 24px 60px", display: "flex", flexDirection: "column", gap: 12, position: "relative", zIndex: 1 }}>
          {filtered.length === 0 ? (
            <div style={{ textAlign: "center", color: "#3a4e3b", padding: "60px 0", fontSize: 15 }}>
              {lang === "en" ? "No procedures found." : "Keine Verfahren gefunden."}
            </div>
          ) : filtered.map(sop => (
            <SOPCard key={sop.id} sop={sop} isAdmin={isAdmin} lang={lang} onEdit={setEditingSOP} onDelete={handleDelete} />
          ))}
        </main>

        {/* Footer */}
        <footer style={{ textAlign: "center", padding: "24px", color: "#2d3e2e", fontSize: 11, letterSpacing: 1, textTransform: "uppercase", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
          Perlage Studios Marketing Agency LLC · {lang === "en" ? "Confidential — Internal Use Only" : "Vertraulich — Nur für internen Gebrauch"}
          {isAdmin && <span style={{ color: "#4a6b4c", marginLeft: 12 }}>· Edit Mode Active</span>}
        </footer>
      </div>

      {showLogin && <LoginModal lang={lang} onLogin={() => { setIsAdmin(true); setShowLogin(false); }} onClose={() => setShowLogin(false)} />}
      {editingSOP !== null && <SOPModal sop={editingSOP} lang={lang} onSave={handleSave} onClose={() => setEditingSOP(null)} />}
    </>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const cardStyle = {
  background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)",
  borderRadius: 14, padding: "22px 26px", transition: "border-color 0.2s",
};

const categoryBadge = {
  background: "rgba(45,90,48,0.4)", color: "#7daa80",
  border: "1px solid rgba(45,90,48,0.6)", borderRadius: 6,
  padding: "2px 10px", fontSize: 11, fontWeight: 600, letterSpacing: 0.8, textTransform: "uppercase",
};

const overlayStyle = {
  position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", backdropFilter: "blur(8px)",
  zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 20,
};

const modalStyle = {
  background: "#111a12", border: "1px solid rgba(212,175,106,0.2)",
  borderRadius: 16, padding: "28px 30px", width: "100%", overflowY: "auto",
};

const inputStyle = {
  background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: 8, padding: "9px 12px", color: "#e0d8c8",
  fontSize: 14, outline: "none", width: "100%", fontFamily: "'Outfit', sans-serif",
};

const labelStyle = {
  color: "#4a6b4c", fontSize: 11, fontWeight: 600, letterSpacing: 1,
  textTransform: "uppercase", display: "block", marginBottom: 6,
};

const iconBtnStyle = {
  background: "none", border: "none", cursor: "pointer", padding: 6,
  borderRadius: 6, display: "flex", alignItems: "center",
};

const cancelBtn = {
  background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: 8, padding: "9px 20px", color: "#888", fontSize: 13,
  cursor: "pointer", fontFamily: "'Outfit', sans-serif",
};

const saveBtn = {
  background: "linear-gradient(135deg, #2d5a30, #1e4020)",
  border: "1px solid rgba(212,175,106,0.35)", borderRadius: 8,
  padding: "9px 24px", color: "#d4af6a", fontSize: 13, fontWeight: 600,
  cursor: "pointer", fontFamily: "'Outfit', sans-serif",
};
