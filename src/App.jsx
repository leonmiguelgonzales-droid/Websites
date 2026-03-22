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
      content: `<h2>1. Account Categorization</h2>
<p>Every account is categorized based on the number of subscribers it generates. This category determines how to respond to problems.</p>
<table><thead><tr><th>Category</th><th>Subs per Day</th><th>Value/Day</th><th>Response to Ban</th></tr></thead><tbody>
<tr><td>🟢 Low Priority</td><td>0–4 Subs</td><td>$0–$120</td><td>Create new account</td></tr>
<tr><td>🟡 Medium Important</td><td>5–14 Subs</td><td>$125–$420</td><td>Cost-benefit analysis</td></tr>
<tr><td>🔴 Very Important</td><td>15–100 Subs</td><td>$375–$3,000</td><td>Unban service immediately</td></tr>
</tbody></table>
<p>ℹ Value calculation: Subs × $25–30 (average revenue per sub on OnlyFans)</p>
<h3>Cost-Benefit Calculation for Unbans</h3>
<table><thead><tr><th>Scenario</th><th>Cost</th><th>Payback Period</th></tr></thead><tbody>
<tr><td>Unappealed Unban</td><td>approx. $300–$500</td><td>At 10 subs/day: 1–2 days</td></tr>
<tr><td>Meta Employee Unban (appealed)</td><td>approx. $1,500–$2,000</td><td>At 10 subs/day: ~6 days</td></tr>
</tbody></table>
<div class="warning">⚠ NEVER appeal an account before talking to the manager! An appeal makes the unban significantly more expensive ($300 → $1,500+) and slower.</div>
<p>Rule of thumb: If the account can earn back the unban cost within 10 days, the unban is worth it.</p>
<h2>2. Account Got Banned</h2>
<p>Bans happen almost exclusively on Instagram. TikTok, Twitter, and YouTube accounts generally don't get banned.</p>
<div class="warning">⚠ GOLDEN RULE: DO NOT file an appeal! Talk to the manager first. An appeal massively increases the unban cost.</div>
<h3>2.1 🟢 Low Priority Account Banned (0–4 Subs/Day)</h3>
<p>Unban usually not worth it. Replace quickly and move on.</p>
<ol><li>Take a screenshot of the ban screen + the "More about the rules" screen</li><li>Appeal and wait to see if you get it back or not</li><li>If fully banned → Create or buy a new account (see Vendors SOP)</li><li>Mark account as "banned" in the account overview</li><li>Move on</li></ol>
<h3>2.2 🟡 Medium Important Account Banned (5–14 Subs/Day)</h3>
<ol><li>Take a screenshot of the ban screen + the "More about the rules" screen</li><li>Do NOT appeal</li><li>Run cost-benefit calculation (see table above). Example: Account generates 8 subs/day = ~$200–240/day. Unappealed unban costs $300–500 → Paid back in 2 days = WORTH IT.</li><li>If worth it: Contact unban service + get quotes → How fast and how much (unappealed!)</li><li>If not worth it: Create/buy a new account</li><li>Briefly inform manager via WhatsApp</li><li>Update the account overview</li></ol>
<h3>2.3 🔴 Very Important Account Banned (15–100 Subs/Day)</h3>
<p>Act immediately. Every day without this account costs serious money.</p>
<ol><li>Take a screenshot of the ban screen + the "More about the rules" screen</li><li>DO NOT APPEAL!</li><li>Check: Does the account have insurance? If YES: Contact Liquide via the shared Telegram/WhatsApp group. If NO: Contact unban service (unappealed).</li></ol>
<table><thead><tr><th>Provider</th><th>Speed</th><th>Price (unappealed)</th><th>Price (REP/MA)</th><th>Contact</th></tr></thead><tbody>
<tr><td>Joker</td><td>2–3h, max 24h</td><td>$300–400</td><td>$2,000+ (fluctuates)</td><td>Telegram → @jokerisafk</td></tr>
<tr><td>Berdan</td><td>5–7 days</td><td>€500</td><td>~€1,700</td><td>Telegram → @qberdan</td></tr>
<tr><td>Liquide</td><td>Slow, varies</td><td>Varies</td><td>Varies</td><td>Telegram → @liquidback</td></tr>
</tbody></table>
<p>ℹ For very important accounts: Contact Joker first (fastest). If unavailable, reach out to all others in parallel.</p>
<ol start="4"><li>Notify manager IMMEDIATELY via WhatsApp</li><li>Mark account as "banned" in the overview + date</li><li>Follow up with unban service daily until account is back</li></ol>
<div class="warning">⚠ Some accounts get banned repeatedly — even with green account status. Nobody is at fault; this is a known IG issue.</div>
<h2>3. Shadowban (Limited Reach)</h2>
<p>A shadowban means content is no longer shown to new people. The account isn't suspended, but it's useless without organic reach.</p>
<h3>3.1 Detecting a Shadowban</h3>
<p>Account status MUST be checked DAILY. Where to check: <strong>Instagram → Settings → Account Status → "Limited Reach"</strong></p>
<table><thead><tr><th>Option</th><th>Status</th><th>Action</th></tr></thead><tbody>
<tr><td>"People who don't follow you"</td><td>🟠 Orange</td><td>ACT IMMEDIATELY! See process below.</td></tr>
<tr><td>"People under 18"</td><td>🟠 Orange</td><td>IGNORE — We only want to reach 18+ anyway.</td></tr>
<tr><td>Both options</td><td>🟢 Green</td><td>All good. Continue normally.</td></tr>
</tbody></table>
<h3>3.2 Fixing a Shadowban — Step by Step</h3>
<ol><li>Click on "Limited Reach" and check which content is affected</li><li>Click "File an appeal" on the affected content</li><li>Wait 2 hours for a decision</li><li>Appeal successful? → Done. No decision after 2h? → Delete the affected content. Appeal denied? → Delete the affected content.</li><li>If the account has insurance: Contact Liquide. If no insurance: File an appeal.</li></ol>
<div class="warning">⚠ Edge case: Sometimes IG shows "Removed Content" instead of allowing you to delete videos. In that case you MUST file an appeal. If denied, limited reach may persist for days to weeks.</div>
<h3>3.3 Shadowban Escalation: When Appeal Is Denied</h3>
<p><strong>Step 1:</strong> Check Account Value — calculate daily value from last 30 days link clicks and subs.</p>
<p><strong>Step 2:</strong> Get Quotes — ask unban services: how much and how long? Cost: approx. $300–500 per account.</p>
<p><strong>Step 3:</strong> Cost-Benefit Calculation — same as for bans. If account earns back cost within 10 days, it's worth it.</p>
<p><strong>Recommended Strategy for Recurring Shadowbans:</strong></p>
<ol><li>Immediately start new replacement accounts and begin posting on them</li><li>Let the affected account rest for approximately 4 weeks</li><li>After 4 weeks: Have the unban service remove the shadowban</li><li>Carefully resume posting and monitor reach closely</li></ol>
<p>ℹ Why wait 4 weeks? The risk is significantly lower once Instagram's "monitoring phase" has passed. Removing the ban immediately and posting right away often causes the shadowban to return within days.</p>
<h3>3.4 Shadowban Fix via Unban Service</h3>
<p>Cost: approx. +/- $700 (without insurance). Recommendation: Only worth it for very important accounts (🔴). For all others, try the free methods first (appeal + delete).</p>
<h2>4. Video Removed</h2>
<p>Happens regularly, about 1–2 videos per week. This is normal and not a reason to panic.</p>
<h3>4.1 Immediate Response</h3>
<ol><li>Take a screenshot of the removal notice</li><li>Send screenshot + the full affected video to the team group</li><li>Check: Does the account have insurance? If YES: Notify unban service — he fixes it. Do NOT file an appeal! If NO: Always file an appeal (costs nothing, often successful).</li></ol>
<h3>4.2 Mass Removal (Multiple Videos at Once)</h3>
<ol><li>Stay calm — IG typically removes a maximum of 9 posts at once</li><li>If the account has insurance → Contact unban service and let him fix it</li><li>If no insurance → File an appeal for all removed posts</li><li>Experience: Out of 9 removed posts, you usually get 7+ back</li><li>Warning: Sometimes additional removals follow hours/days later</li><li>Notify manager</li></ol>
<h3>4.3 Instagram Strike System</h3>
<table><thead><tr><th>Threshold</th><th>Consequence</th></tr></thead><tbody>
<tr><td>1–11 removed posts / year</td><td>No immediate danger, but monitor account status</td></tr>
<tr><td>12–15 removed posts / year</td><td>WARNING: Account suspension possible! Notify manager immediately.</td></tr>
</tbody></table>
<h2>5. Documentation</h2>
<table><thead><tr><th>What to document?</th><th>How?</th></tr></thead><tbody>
<tr><td>Screenshot of the problem</td><td>Take screenshot and send to team group</td></tr>
<tr><td>Affected video</td><td>Send the full video to the group with a screenshot of the in-app notification</td></tr>
<tr><td>Account name & platform</td><td>So it's clear which account is affected</td></tr>
<tr><td>Date & time</td><td>When did the problem occur?</td></tr>
<tr><td>Action taken</td><td>What was done? (Unban service, appeal, new account, etc.)</td></tr>
</tbody></table>
<h2>6. Quick Reference</h2>
<table><thead><tr><th>Situation</th><th>Immediate Action</th></tr></thead><tbody>
<tr><td>🟢 Low priority banned</td><td>Screenshot → Appeal → If denied: Create/buy new account</td></tr>
<tr><td>🟡 Medium banned</td><td>Screenshot → DO NOT appeal → Cost-benefit calculation → Inform manager</td></tr>
<tr><td>🔴 Very important banned</td><td>Screenshot → DO NOT APPEAL → Insurance? Yes: Liquide. No: Joker first → Notify manager IMMEDIATELY</td></tr>
<tr><td>Shadowban ("People who don't follow you" = orange)</td><td>Insurance? Yes: Contact Liquide. No: Discuss with manager → Appeal → Wait 2–3h → No success: Delete content → If all denied: See Section 3.3</td></tr>
<tr><td>Video removed (single)</td><td>Screenshot + video to group → Insurance? Yes: Service fixes it, no appeal. No: File appeal</td></tr>
<tr><td>Mass removal (5+ videos)</td><td>Stay calm → Insurance? Yes: Contact Liquide. No: Appeal all → Notify manager → Wait</td></tr>
</tbody></table>`
    },
    {
      id: 2,
      title: "Vendors & Tools",
      category: "Operations",
      version: "1.0",
      updated: "March 2026",
      content: `<h2>1. Buying Followers</h2>
<p>We buy fake followers exclusively for Instagram. The purpose is trust-building: Accounts with 0 or very few followers look sketchy, causing people to follow less or not click on links.</p>
<h3>1.1 Providers</h3>
<table><thead><tr><th>Provider</th><th>Website</th><th>Price/1K</th><th>Priority</th></tr></thead><tbody>
<tr><td>MoreThanPanel</td><td>morethanpanel.com</td><td>from $0.31</td><td>⭐ Preferred</td></tr>
<tr><td>SMMFollows</td><td>smmfollows.com</td><td>Similar</td><td>Alternative</td></tr>
</tbody></table>
<p>Recommended option: <strong>Instagram Followers | No Refill | Speed: 5–10K/Day | Max 100K</strong> — approx. $0.31 per 1K. Always choose the cheaper options — don't buy anything over $0.50/1K.</p>
<h3>1.2 What Do We Buy Followers For?</h3>
<p><strong>A) Funnel Accounts</strong> — Private accounts that redirect people from TikTok or other IG accounts to OnlyFans. A funnel account must look like this:</p>
<ol><li>Set to private</li><li>7 posts published (looks authentic)</li><li>500–900 purchased followers</li><li>Following 20–30 people</li><li>Authentic, believable bio</li><li>Profile picture set</li><li>Funnel link in bio (Bouncy.ai or Link.me)</li></ol>
<div class="warning">⚠ When buying followers, the account MUST be set to PUBLIC until all followers have arrived! Switch back to private afterwards. Delivery time: Usually 8–24 hours.</div>
<p><strong>B) Reel Accounts (new accounts)</strong> — For brand new reel accounts, we sometimes buy 150–200 followers so the account doesn't start at zero.</p>
<h2>2. Buying Instagram Accounts</h2>
<p>We generally always buy IG accounts rather than creating them manually. Creating accounts usually takes a very long time and frequently results in errors.</p>
<h3>2.1 Providers</h3>
<table><thead><tr><th>Provider</th><th>Contact</th><th>Price/Account</th><th>Notes</th></tr></thead><tbody>
<tr><td>AccsMarket</td><td>accsmarket.com</td><td>$3–7</td><td>⭐ Preferred</td></tr>
<tr><td>WhatsApp Contact</td><td>+44 7926 386960</td><td>~$2</td><td>Communicate exactly what you need</td></tr>
</tbody></table>
<h3>2.2 Which Accounts to Buy?</h3>
<p>Always buy <strong>aged accounts (1–2 years old)</strong>. The country/IP must match the creator's target audience:</p>
<table><thead><tr><th>Creator Target Audience</th><th>Buy Account From</th></tr></thead><tbody>
<tr><td>USA IP</td><td>Aged USA Accounts (1–2 years old)</td></tr>
<tr><td>Germany IP</td><td>Aged German Accounts (1–2 years old)</td></tr>
<tr><td>Other Countries</td><td>Aged accounts from the respective country</td></tr>
</tbody></table>
<h3>2.3 Buying Criteria</h3>
<ol><li>Only buy aged accounts (1–2 years old)</li><li>Check seller reviews carefully</li><li>Don't spend more than $5–7 per account. $3–5 is optimal.</li><li>Email provider: Prefer Outlook/Hotmail (Gmail accounts often have login issues or are already banned)</li></ol>
<div class="warning">⚠ Purchased accounts always come with an email. Prefer Outlook/Hotmail! Gmail or other providers often cause problems.</div>
<p>When purchasing multiple accounts (e.g. 5), you receive a text file with all login data. This file is often messy — the data needs to be organized properly. Video tutorial: <strong>https://www.loom.com/share/b87b7e24bbfa4adca963ccdd15e42b38</strong></p>
<h2>3. Unban Services</h2>
<p>Details on when and how to use unban services are in SOP #1. Contact overview only here.</p>
<table><thead><tr><th>Provider</th><th>Contact</th><th>Price (unappealed)</th><th>Price (REP/MA)</th><th>Speed</th></tr></thead><tbody>
<tr><td>Joker</td><td>Telegram: @jokerisafk</td><td>$300–400</td><td>$2,000+ (fluctuates)</td><td>2–3h, max 24h</td></tr>
<tr><td>Berdan</td><td>Telegram: @qberdan</td><td>€500</td><td>~€1,700</td><td>5–7 days</td></tr>
<tr><td>Liquide</td><td>Telegram: @liquidback</td><td>Varies</td><td>Varies</td><td>Slow, varies</td></tr>
</tbody></table>
<h2>4. Link Services & Funnel Tools</h2>
<table><thead><tr><th>Tool</th><th>Usage</th><th>Access</th></tr></thead><tbody>
<tr><td>Bouncy.ai</td><td>Funnel links for OnlyFans</td><td>Access via Leon</td></tr>
<tr><td>Link.me</td><td>Funnel links for OnlyFans</td><td>Access via Leon</td></tr>
<tr><td>GoDaddy</td><td>Buy domains for new models</td><td>See Onboarding SOP</td></tr>
<tr><td>StayUndercover</td><td>Buy domains for new models</td><td>See Onboarding SOP</td></tr>
</tbody></table>
<div class="warning">⚠ When checking stats, creating new links, or making changes to existing links — handle EVERYTHING through Leon.</div>
<h2>5. Other Tools</h2>
<h3>5.1 SMS Verification</h3>
<table><thead><tr><th>Service</th><th>Website</th><th>Usage</th></tr></thead><tbody>
<tr><td>SMSPool</td><td>smspool.net</td><td>Virtual phone numbers for verification</td></tr>
</tbody></table>
<div class="warning">⚠ Do NOT store login credentials in this document! All access credentials are managed centrally in a password manager or protected document.</div>
<h2>6. Quick Reference</h2>
<table><thead><tr><th>What do I need?</th><th>Where?</th><th>Price</th></tr></thead><tbody>
<tr><td>Fake followers (IG)</td><td>morethanpanel.com</td><td>from $0.31 / 1K</td></tr>
<tr><td>IG account (preferred)</td><td>accsmarket.com</td><td>$3–7 / account</td></tr>
<tr><td>IG account (alternative)</td><td>WhatsApp: +44 7926 386960</td><td>~$2 / account</td></tr>
<tr><td>Unban (unappealed)</td><td>Joker: @jokerisafk</td><td>$300–400</td></tr>
<tr><td>Unban (REP/MA)</td><td>Contact all providers</td><td>$1,500–2,000+</td></tr>
<tr><td>Funnel links</td><td>Bouncy.ai / Link.me (via Leon)</td><td>—</td></tr>
<tr><td>Domain (new model)</td><td>GoDaddy / StayUndercover</td><td>Varies</td></tr>
<tr><td>SMS verification</td><td>smspool.net</td><td>Varies</td></tr>
</tbody></table>`
    },
    {
      id: 3,
      title: "Task Management",
      category: "Operations",
      version: "1.0",
      updated: "March 2026",
      content: `<h2>1. Why Asana?</h2>
<p>Our problem: Tasks are discussed in WhatsApp but not tracked. Especially growth tasks and spontaneous tasks get lost because they're not written down anywhere. Routine tasks work fine, but everything beyond that gets forgotten quickly.</p>
<p>The solution: Asana is our central task system. All tasks that go beyond routine end up there — no exceptions.</p>
<div class="warning">⚠ WhatsApp is ONLY for quick communication and urgent short messages. Tasks are NO LONGER assigned or tracked via WhatsApp.</div>
<h2>2. Asana Structure</h2>
<p>We use ONE central board for the entire team — not one board per creator, but everything in one place so nobody has to check 5 different boards.</p>
<h3>2.1 Columns (Sections)</h3>
<table><thead><tr><th>Column</th><th>Meaning</th></tr></thead><tbody>
<tr><td>📋 To Do</td><td>New tasks that haven't been started yet</td></tr>
<tr><td>🔧 In Progress</td><td>Tasks currently being worked on</td></tr>
<tr><td>❓ Needs Decision</td><td>Task is unclear or you're unsure what to do. Reviewed daily.</td></tr>
<tr><td>⏳ Waiting for…</td><td>Waiting on someone else (creator, unban service, manager, etc.)</td></tr>
<tr><td>✅ Done</td><td>Completed. Cleaned up at the end of the week.</td></tr>
</tbody></table>
<div class="warning">⚠ The "Needs Decision" column is the most important difference from before. Instead of letting a task sit, it gets parked here and reviewed daily. Nothing gets lost anymore.</div>
<h3>2.2 Tags / Labels</h3>
<p><strong>Creator Tags:</strong> One tag per creator (e.g. [Creator 1], [Creator 2]) plus a "General" tag for tasks that don't relate to a specific creator.</p>
<table><thead><tr><th>Tag</th><th>Meaning</th></tr></thead><tbody>
<tr><td>🔴 Urgent</td><td>Must be done today or ASAP</td></tr>
<tr><td>🟡 Normal</td><td>Has a deadline but not immediate</td></tr>
<tr><td>🟢 Growth</td><td>Improvement / optimization — important but not urgent. Done when there's time.</td></tr>
<tr><td>🔁 Routine</td><td>Recurring task (daily/weekly)</td></tr>
</tbody></table>
<h2>3. What a Task Looks Like</h2>
<table><thead><tr><th>Field</th><th>Description</th><th>Example</th></tr></thead><tbody>
<tr><td>Title</td><td>Short and clear — what needs to be done?</td><td>"Analyze IG profile Model X"</td></tr>
<tr><td>Assignee</td><td>Who does it?</td><td>"@Leon"</td></tr>
<tr><td>Creator Tag</td><td>For which creator?</td><td>"Model X"</td></tr>
<tr><td>Type Tag</td><td>Urgent / Normal / Growth / Routine</td><td>"🟢 Growth"</td></tr>
<tr><td>Deadline</td><td>When must it be done?</td><td>"03/15/2026"</td></tr>
<tr><td>Description</td><td>Details, context, links (optional)</td><td>"Check bio, highlights, posting times"</td></tr>
</tbody></table>
<div class="warning">⚠ A task without an assignee is not a task. If it's not clear who does it, it will NOT get done.</div>
<h2>4. Daily Asana Routine</h2>
<h3>Phase 1: Morning (2–3 minutes)</h3>
<ol><li>Open Asana and check "My Tasks"</li><li>What's due today? What has a deadline?</li><li>Are there tasks in "Needs Decision" that need to be discussed?</li></ol>
<h3>Phase 2: During the day</h3>
<ol><li>When starting a task → Move to "In Progress"</li><li>When finished → Move to "Done"</li><li>When unsure what to do → Move to "Needs Decision" + add comment why</li><li>When waiting on someone → Move to "Waiting for…" + comment who</li></ol>
<h3>Phase 3: Evening (2 minutes)</h3>
<ol><li>What was completed today? Update status if not done yet</li><li>Any tasks due tomorrow?</li><li>New tasks that came up during the day → Add to Asana</li></ol>
<p>ℹ Total time per day: approx. 5–7 minutes.</p>
<h2>5. The WhatsApp → Asana Rule</h2>
<p>This is the most important rule in this SOP:</p>
<div class="warning">⚠ When a task is discussed in WhatsApp, it must be entered into Asana IMMEDIATELY.</div>
<ol><li>In WhatsApp you discuss WHAT needs to be done and make a decision</li><li>The person taking the task enters it into Asana immediately (title, assignee, deadline, tags)</li><li>Confirm in WhatsApp: "It's in Asana"</li></ol>
<p><strong>What happens if it stays in WhatsApp?</strong> Then exactly what's been happening will happen: It gets lost. The message scrolls up, nobody thinks about it, the task is forgotten.</p>
<div class="warning">⚠ If something is only in WhatsApp and not in Asana, it doesn't exist as a task. No Asana entry = No task.</div>
<h2>6. "Needs Decision" — The Anti-Forgetting System</h2>
<ol><li>You have a task but don't know exactly what to do</li><li>Do NOT let it sit. Instead: Move task to "Needs Decision"</li><li>Add a comment explaining what exactly is unclear</li><li>The manager or responsible team member checks this column DAILY</li><li>Decision is made — via Asana comment, WhatsApp message, or voice note</li><li>Task moves back to "To Do" or "In Progress"</li></ol>
<h2>7. Task Types</h2>
<table><thead><tr><th>Type</th><th>Description</th><th>How to handle</th></tr></thead><tbody>
<tr><td>🔁 Routine</td><td>Daily tasks every team member knows</td><td>Can be in Asana but don't have to be.</td></tr>
<tr><td>🔴 Urgent</td><td>Must be done immediately (e.g. account banned)</td><td>Immediately in Asana + WhatsApp message to those involved.</td></tr>
<tr><td>🟡 Normal</td><td>Has a clear deadline but not due immediately</td><td>In Asana with deadline. Done in normal workflow.</td></tr>
<tr><td>🟢 Growth</td><td>Improvements and optimizations</td><td>In Asana with "Growth" tag. Done when routine and normal tasks are completed.</td></tr>
</tbody></table>
<div class="warning">⚠ Growth tasks are the tasks that get lost the fastest — that's exactly why they must be in Asana.</div>
<h2>8. Daily Control</h2>
<p>For the system to work, someone must check the board daily. Without control, Asana will fall asleep again.</p>
<p><strong>Daily Check:</strong></p>
<ul><li>"Needs Decision" column: Are there tasks that need a decision?</li><li>"To Do" column: Are all tasks assigned to someone?</li><li>"Waiting for…" column: Does anything need a follow-up?</li><li>Overdue tasks: Are there tasks past their deadline?</li><li>New tasks: Were things discussed in WhatsApp today that aren't in Asana yet?</li></ul>
<div class="warning">⚠ This check takes 5 minutes. If it's not done, Asana will die within 2 weeks.</div>
<h2>9. Quick Reference: The Golden Rules</h2>
<table><thead><tr><th>#</th><th>Rule</th></tr></thead><tbody>
<tr><td>1</td><td>No Asana entry = No task. If it's not in Asana, it doesn't exist.</td></tr>
<tr><td>2</td><td>Every task has an assignee. Without a name, nothing gets done.</td></tr>
<tr><td>3</td><td>Unsure? → "Needs Decision". Never let it sit.</td></tr>
<tr><td>4</td><td>WhatsApp task? → Enter in Asana immediately + confirm "It's in Asana."</td></tr>
<tr><td>5</td><td>Open Asana in the morning, update status in the evening. Every day. 5 minutes.</td></tr>
<tr><td>6</td><td>Daily control by manager or trusted team member.</td></tr>
<tr><td>7</td><td>Growth tasks belong in Asana — otherwise they will ALWAYS be forgotten.</td></tr>
</tbody></table>`
    },
    {
      id: 4,
      title: "Marketing MA",
      category: "Operations",
      version: "1.0",
      updated: "March 2026",
      content: `<h2>1. Role Overview</h2>
<p>The Marketing MA is responsible for the entire content process from idea generation to the finished video. Once fully onboarded, they manage 2 creators simultaneously.</p>
<h3>Core Responsibilities</h3>
<table><thead><tr><th>Area</th><th>What exactly?</th></tr></thead><tbody>
<tr><td>Research</td><td>Find viral videos and trends that match the model</td></tr>
<tr><td>Create content lists</td><td>Detailed instructions for each video (text, acting, location, outfit, description)</td></tr>
<tr><td>Live feedback</td><td>Monitor and correct while the model is filming</td></tr>
<tr><td>Editing feedback</td><td>Review edited videos and request changes</td></tr>
<tr><td>Model communication</td><td>Help models with questions and problems, coordinate shoot days</td></tr>
<tr><td>Manage IG accounts</td><td>Manage 2 reel accounts: post, comments, stories, check account status</td></tr>
</tbody></table>
<h3>Tools Used Daily</h3>
<table><thead><tr><th>Tool</th><th>What for?</th></tr></thead><tbody>
<tr><td>Instagram</td><td>Research, posting, engagement, account status checks</td></tr>
<tr><td>Telegram</td><td>Research groups, sending content lists, receiving videos</td></tr>
<tr><td>WhatsApp</td><td>Team communication, model communication</td></tr>
<tr><td>CreatorHero</td><td>Check subs and link clicks, performance data</td></tr>
<tr><td>Asana</td><td>Task management (see SOP #3)</td></tr>
</tbody></table>
<h2>2. Daily Routine</h2>
<h3>Phase 1: Morning — Start & Overview</h3>
<ol><li>Open Asana: What's due today? (2–3 min)</li><li>Check WhatsApp: New messages from models or team?</li><li>Open CreatorHero: Check subs and link clicks from yesterday</li><li>Check video performance (see Section 2.1)</li><li>Check account status: Both IG accounts for bans/shadowbans</li></ol>
<h3>2.1 How to Check Video Performance</h3>
<p><strong>Accounts you manage (on your phone):</strong> Open Instagram Insights and check key metrics: Where did people drop off? What's the average watch time?</p>
<p><strong>Accounts you don't manage yourself:</strong> Compare views of recent videos with the account's average. Example: If an account normally gets 2,000 views and a video only has 500 views after 2–3 days, it performed significantly below average.</p>
<h3>Phase 2: Late Morning — Create Content Lists</h3>
<p>This is the most important and creative task of the day. Do it in the morning when focus is highest.</p>
<ol><li>Open research from previous evening (Telegram research groups)</li><li>Select videos that match the model</li><li>Write content list (see template in Section 3)</li><li>Per model: At least 4–5 videos per list (2 videos/day + buffer)</li><li>Send finished list to the lists group on Telegram/WhatsApp</li></ol>
<p>ℹ 2 videos per day are needed per model. With 2 models = 4 videos per day minimum. If Sunday is off, plan for 5 videos per day.</p>
<h3>Phase 3: Live Feedback (When Model Is Filming)</h3>
<p>Live feedback doesn't happen every day — only when the model films (2–3x/week). Coordinate shoot days in advance.</p>
<ol><li>Model sends first takes via video call or message</li><li>Check if acting, text, location, outfit match the brief</li><li>Give corrective feedback if something doesn't fit</li><li>Make sure the model films all videos from the list</li></ol>
<div class="warning">⚠ Live feedback is critical for video quality. Without feedback, models often film videos that are unusable.</div>
<h3>Phase 4: Afternoon — Editing Feedback & Accounts</h3>
<p><strong>Editing Feedback:</strong></p>
<ol><li>Review edited videos (usually from the past few days)</li><li>Give feedback: What needs to change?</li><li>Approve final video when it's good</li></ol>
<p><strong>Manage IG Accounts:</strong></p>
<ol><li>Post videos sent by the other MA on Telegram (video + caption)</li><li>Copy and paste caption</li><li>Reply to comments</li><li>Post stories</li><li>Check account status again (if missed in the morning)</li></ol>
<h3>Phase 5: Evening — Research & Wrap Up</h3>
<p>Research is recommended in the evening so you can start with the content list first thing the next morning.</p>
<ol><li>Research intentionally on Instagram (FYP must be properly configured!)</li><li>Send good videos to the appropriate Telegram research group</li><li>About 30–60 minutes per session, maximum 90 minutes</li><li>Research doesn't have to be done every day — as long as there's enough material for the next content list</li></ol>
<p><strong>Wrap Up:</strong></p>
<ul><li>Model communication: Answer last questions, discuss next shoot day</li><li>Work on growth tasks if time allows</li><li>Update Asana: Update status of all tasks (2 min)</li></ul>
<h2>3. Content List — Template</h2>
<table><thead><tr><th>Field</th><th>Description</th></tr></thead><tbody>
<tr><td>Text</td><td>The spoken text or text displayed in the video</td></tr>
<tr><td>Acting</td><td>What should the model do? (Facial expressions, gestures, movement)</td></tr>
<tr><td>Location</td><td>Where to film? (Bedroom, kitchen, gym, outside etc.)</td></tr>
<tr><td>Outfit</td><td>What should the model wear?</td></tr>
<tr><td>Description/Caption</td><td>The caption posted under the video</td></tr>
</tbody></table>
<p><strong>Example Format (Telegram/WhatsApp):</strong></p>
<p>1st TikTok - List @[Model Name]<br/>Text: [Spoken text]<br/>Acting: [What the model should do]<br/>Location: [Where]<br/>Outfit: [What to wear]<br/>Description: [Caption]</p>
<div class="warning">⚠ Tip: If a scene is hard to explain, record a short video via Loom and show the model exactly what you mean. Or send reference images/videos for specific scenes.</div>
<h2>4. Weekly Tasks</h2>
<table><thead><tr><th>Task</th><th>Details</th></tr></thead><tbody>
<tr><td>Performance brainstorming</td><td>What can we improve this/next week? (Outfits, locations, video types, acting, posting strategy)</td></tr>
<tr><td>Refill research</td><td>Make sure there's enough research material in the Telegram groups for next week</td></tr>
<tr><td>Account status review</td><td>Go through all accounts: Any issues? Strikes? Performance drops?</td></tr>
<tr><td>Video analysis (Top & Flop)</td><td>Analyze best and worst videos of the week using the Account Analysis Sheet. Identify patterns.</td></tr>
</tbody></table>
<h2>5. Common Mistakes & How to Avoid Them</h2>
<h3>5.1 Research: FYP Not Properly Built</h3>
<p>New MAs often spend 3–4 hours on research and find barely any good videos. An experienced MA needs 30–60 minutes max.</p>
<p><strong>The cause:</strong> The FYP isn't properly configured. The MA watches personal content during research, manipulating their FYP.</p>
<p><strong>The solution:</strong> Use the research account ONLY for research — never for personal use. Only watch/like videos that match the model's content style. It takes several days for the FYP to adjust.</p>
<div class="warning">⚠ The FYP is the most important tool for efficient research. Once it's "polluted," it takes a long time to fix. NEVER pursue personal interests on the research account.</div>
<h3>5.2 Content Lists: Not Detailed Enough</h3>
<p>Lists are too vague, the model doesn't know exactly what to do. Result: Bad videos that need to be re-filmed.</p>
<p><strong>The solution:</strong> Every field must be specific and unambiguous. Not "be sexy" but "lean casually against the wall, look into the camera, smile briefly." Send reference images or a Loom video if needed.</p>
<h3>5.3 Forgetting to Check Account Status</h3>
<p>Shadowbans are discovered too late and the account loses reach for days without anyone noticing. Account status check is part of the morning routine — check EVERY day.</p>
<h3>5.4 Too Little Model Communication</h3>
<p>Communicate proactively. Don't wait for the model to ask — reach out yourself: "How was the shoot?", "When are you filming next?"</p>
<h3>5.5 Video Selection During Research</h3>
<p>New MAs don't always understand why a video went viral or why a viral video doesn't fit their model. Get feedback from the manager or experienced MAs. Ask questions: "Why does this video work?"</p>
<h2>6. Quick Reference: Daily Schedule</h2>
<table><thead><tr><th>Phase</th><th>Tasks</th></tr></thead><tbody>
<tr><td>Morning</td><td>Asana check → WhatsApp check → CreatorHero numbers → Check video performance → Account status</td></tr>
<tr><td>Late Morning</td><td>Create content list(s) → Send to lists group</td></tr>
<tr><td>When model films</td><td>Give live feedback (not every day — only when model films, 2–3x/week)</td></tr>
<tr><td>Afternoon</td><td>Editing feedback → Manage IG accounts (post, comments, stories)</td></tr>
<tr><td>Evening</td><td>Research (30–90 min) → Model communication → Growth tasks → Update Asana</td></tr>
<tr><td>Weekly</td><td>Performance brainstorming → Video analysis with Analysis Sheet → Account review</td></tr>
</tbody></table>
<h2>7. Related SOPs</h2>
<table><thead><tr><th>SOP</th><th>Relevance</th></tr></thead><tbody>
<tr><td>SOP #1 — Account Problems</td><td>When an account gets banned, shadowbanned, or videos are removed</td></tr>
<tr><td>SOP #2 — Vendors & Tools</td><td>Where to buy followers, accounts etc.</td></tr>
<tr><td>SOP #3 — Task Management</td><td>How Asana is used, WhatsApp → Asana rule</td></tr>
</tbody></table>`
    }
,
    {
      id: 5,
      title: "New Model Onboarding",
      category: "Operations",
      version: "1.0",
      updated: "March 2026",
      content: `<h2>Complete Onboarding Checklist</h2>
<table><thead><tr><th>Task</th><th>Responsible</th><th>Deadline</th></tr></thead><tbody>
<tr><td>WhatsApp groups created (Traffic + Backend)</td><td>Backend</td><td>Day 1</td></tr>
<tr><td>Welcome messages sent (Owner -> MM -> Assistant)</td><td>All</td><td>Day 1</td></tr>
<tr><td>Onboarding questionnaire sent (website)</td><td>MM / Assistant</td><td>Day 1</td></tr>
<tr><td>Questionnaire fully returned</td><td>Model</td><td>Day 1-2</td></tr>
<tr><td>Tasks sent (Equipment, Room Tour, Outfits, Reels, AI photos, Link image)</td><td>Leon</td><td>After questionnaire</td></tr>
<tr><td>All tasks received from model</td><td>Model</td><td>Day 1-2</td></tr>
<tr><td>4 IG accounts purchased</td><td>Leon</td><td>Day 1-2</td></tr>
<tr><td>Accounts distributed to team (1x MM, 3x VA)</td><td>Manuel / MM</td><td>Day 1-2</td></tr>
<tr><td>Link landing page created per account</td><td>MM / VA</td><td>By Day 5</td></tr>
<tr><td>Deep links + 18+ verification configured</td><td>MM / VA</td><td>By Day 5</td></tr>
<tr><td>Background image for links organized</td><td>MM</td><td>By Day 5</td></tr>
<tr><td>Marketing concept completed (5 steps)</td><td>MM + Team</td><td>Day 1-3</td></tr>
<tr><td>First content list sent to model</td><td>MM</td><td>Day 2-5</td></tr>
<tr><td>Warming process started</td><td>MM / VA</td><td>Day 1-2</td></tr>
<tr><td>Funnel check completed</td><td>Leon</td><td>Day 2-3</td></tr>
<tr><td>Asana project created</td><td>MM</td><td>Day 1-2</td></tr>
<tr><td>Everyone logged into accounts</td><td>MM / VA</td><td>Day 1-2</td></tr>
<tr><td>Go-live confirmed</td><td>Manuel / MM</td><td>From Day 7+</td></tr>
</tbody></table>
<h2>Phase 1 - Communication & Initial Setup</h2>
<h3>1.1 Create WhatsApp Groups</h3>
<table><thead><tr><th>Group</th><th>Name Format</th></tr></thead><tbody>
<tr><td>Traffic / Marketing</td><td>[Modelname] Traffic - Perlage Studios</td></tr>
<tr><td>Backend</td><td>[Modelname] Backend - Perlage Studios</td></tr>
</tbody></table>
<h3>1.2 Welcome & Introduction</h3>
<p>Once groups are created, the team introduces themselves in this order:</p>
<table><thead><tr><th>#</th><th>Role</th><th>Action</th></tr></thead><tbody>
<tr><td>1</td><td>Owner (Manuel)</td><td>Welcomes first, sets the tone</td></tr>
<tr><td>2</td><td>Marketing Manager</td><td>Introduces with role and responsibilities</td></tr>
<tr><td>3</td><td>Assistant</td><td>Introduces with role and responsibilities</td></tr>
</tbody></table>
<h3>Welcome Message Templates</h3>
<p><strong>Owner:</strong><br/>Hey [Modelname]! I am Manuel, founder of Perlage Studios. Welcome to the team! I am always in the background making sure everything runs smoothly. If you have any bigger questions or concerns, feel free to reach out to me anytime. We are excited to work with you!</p>
<p><strong>Marketing Manager:</strong><br/>Hey [Modelname]! I am [Name], your Marketing Manager. I take care of your content strategy, your Instagram accounts, and make sure your content goes viral. For anything related to content, videos, and social media, I am your go-to person!</p>
<p><strong>Assistant:</strong><br/>Hey [Modelname]! I am [Name], I support you with video shooting and editing. If you have any questions about filming or your videos, feel free to reach out to me!</p>
<div class="warning">TIP: These templates serve as a guide - core info (name, role, responsibility) must always be included.</div>
<h3>1.3 Questionnaire and Tasks (2-Step Process)</h3>
<table><thead><tr><th>Step</th><th>What?</th><th>Who sends?</th></tr></thead><tbody>
<tr><td>Step 1</td><td>Questionnaire on website (24 text questions)</td><td>MM or Assistant</td></tr>
<tr><td>Step 2</td><td>Tasks via WhatsApp (6 assignments with photo/video)</td><td>Leon - AFTER questionnaire</td></tr>
</tbody></table>
<p><strong>The 6 tasks in Step 2:</strong></p>
<ol><li>Equipment photos + price</li><li>Room tour (video/photos of shooting location)</li><li>3 favorite outfits - Photos</li><li>3-4 reel inspirations - Links / screenshots</li><li>AI photos (30+ photos, face + body)</li><li>Link landing page background image - 1-3 photos</li></ol>
<h3>1.4 AI Photos - Requirements</h3>
<table><thead><tr><th>Requirement</th><th>Details</th></tr></thead><tbody>
<tr><td>Quantity</td><td>Minimum 30 photos (more is better)</td></tr>
<tr><td>Mix</td><td>Face selfies, body selfies, full body, bikini, casual clothing</td></tr>
<tr><td>Quality</td><td>Good lighting, no filters, not blurry</td></tr>
<tr><td>Face</td><td>Always clearly visible - no caps, sunglasses, obstructions</td></tr>
<tr><td>People</td><td>No other people in any photos</td></tr>
<tr><td>Gallery</td><td>Existing photos from gallery are allowed</td></tr>
</tbody></table>
<div class="warning">More variation (outfits, locations, poses, lighting) = better AI character training.</div>
<h2>Phase 2 - Accounts and Link Setup</h2>
<h3>2.1 Purchase Instagram Accounts</h3>
<table><thead><tr><th>Detail</th><th>Standard</th></tr></thead><tbody>
<tr><td>Quantity</td><td>4 accounts per new model</td></tr>
<tr><td>Account type</td><td>Aged accounts (1-2 years old)</td></tr>
<tr><td>Responsible</td><td>Leon</td></tr>
<tr><td>Suppliers</td><td>See SOP #2 (Vendors and Tools)</td></tr>
</tbody></table>
<p>If a model brings their own IG accounts (1-2), the model keeps and manages them.</p>
<h3>2.2 Account Distribution</h3>
<table><thead><tr><th>Role</th><th>Accounts</th><th>Description</th></tr></thead><tbody>
<tr><td>Marketing Manager</td><td>1 account</td><td>Main account - content instructions to model</td></tr>
<tr><td>Poster VA</td><td>3 accounts</td><td>Manages, posts and interacts</td></tr>
</tbody></table>
<h3>2.3 Link Landing Page Setup</h3>
<div class="warning">EACH account gets its OWN link! Same link on multiple accounts = chain reaction on ban.</div>
<table><thead><tr><th>Element</th><th>Details</th></tr></thead><tbody>
<tr><td>Current provider</td><td>Bouncy.ai</td></tr>
<tr><td>Link name</td><td>= IG username of the account</td></tr>
<tr><td>Buttons</td><td>OnlyFans + Private IG + optionally Fansly</td></tr>
<tr><td>Deep links</td><td>18+ verification - Safari/Chrome (not IG browser)</td></tr>
</tbody></table>
<h2>Phase 3 - Marketing Concept and Content Strategy</h2>
<h3>3.1 Marketing Concept (5 Steps)</h3>
<table><thead><tr><th>Step</th><th>Topic</th><th>What is done?</th></tr></thead><tbody>
<tr><td>1</td><td>Creator Strengths</td><td>Analyze body, personality, setup, talents</td></tr>
<tr><td>2</td><td>Target Creator List</td><td>Analyze 10 creators: What to adopt? What to do better?</td></tr>
<tr><td>3</td><td>Define Target Group</td><td>Who do we want to target? Picture the average subscriber</td></tr>
<tr><td>4</td><td>Define Content Style</td><td>What type of content, which niche, what branding?</td></tr>
<tr><td>5</td><td>Write 5x 10/10 Reels</td><td>Checklist per reel: Why is it a 10/10 reel?</td></tr>
</tbody></table>
<h3>3.2 First Content List</h3>
<table><thead><tr><th>Scenario</th><th>Approach</th></tr></thead><tbody>
<tr><td>New / small model</td><td>4-5 viral videos from current research - model recreates 1:1</td></tr>
<tr><td>Larger model</td><td>Individually tailored list based on what works</td></tr>
<tr><td>AI content model</td><td>Same process, content created via AI</td></tr>
</tbody></table>
<div class="warning">No outdated lists! Content must always be current and trending.</div>
<h2>Phase 4 - Team Assignment and Tools</h2>
<table><thead><tr><th>Role</th><th>Task</th></tr></thead><tbody>
<tr><td>Marketing Manager</td><td>Main contact. Content strategy, instructions, AI content creation</td></tr>
<tr><td>Assistant</td><td>Support with video shooting, editing together with editor</td></tr>
<tr><td>Poster VA</td><td>Manages 3 of 4 accounts, posts content, interacts</td></tr>
</tbody></table>
<h2>Phase 5 - Account Warming and Go-Live</h2>
<h3>5.1 Go-Live Conditions</h3>
<ul><li>All IG accounts assigned (MA + Poster VA)</li><li>Everyone logged into their accounts</li><li>Link landing pages created and configured</li><li>Account warming started</li><li>Content available and high quality</li><li>Funnel check completed (Leon)</li><li>Posting timezone: Morning US time (Pacific Time)</li></ul>
<h3>5.2 Interaction Rules</h3>
<div class="warning">Do NOT interact like a bot! IG detects robotic behavior.</div>
<table><thead><tr><th>Wrong</th><th>Right</th></tr></thead><tbody>
<tr><td>Watch reel 1 sec, instantly like</td><td>Actually watch reels, skip some</td></tr>
<tr><td>Like every reel</td><td>Like some, skip some</td></tr>
<tr><td>Always same actions</td><td>Mix: scroll, like, comment, stories</td></tr>
<tr><td>Follow 50 accounts right away</td><td>Slowly scroll through feed</td></tr>
</tbody></table>
<h2>Timeline Overview</h2>
<table><thead><tr><th>Timeframe</th><th>Phase</th><th>Key Actions</th></tr></thead><tbody>
<tr><td>Day 1</td><td>Phase 1: Communication</td><td>Groups, welcome, questionnaire + tasks</td></tr>
<tr><td>Day 1-2</td><td>Phase 2: Accounts and Links</td><td>Purchase, distribute, create landing pages</td></tr>
<tr><td>Day 1-3</td><td>Phase 3: Concept and Content</td><td>Marketing concept, content list, material</td></tr>
<tr><td>Day 1-2</td><td>Phase 4: Team and Tools</td><td>Assign, funnel check, Asana</td></tr>
<tr><td>Day 1-7+</td><td>Phase 5: Warming and Go-Live</td><td>Warming, from day 7+ Facebook + bio link</td></tr>
</tbody></table>
<h2>WhatsApp Task Templates</h2>
<h3>English - Tasks Message</h3>
<p>Hey [Modelname]! Thanks for filling out the questionnaire. Now we still need a few things from you:<br/><br/>
1. Equipment Photos - Please send a photo of each piece of equipment you have (ring light, tripod, camera, mic etc.) + include how much it cost<br/>
2. Room Tour - Please send a short video or photos of where you would shoot content<br/>
3. Outfit Photos - Send pictures in your 3 favorite outfits where you feel the hottest<br/>
4. Reel Inspirations - Send 3-4 reels or creators whose content style you like<br/>
5. Social Media Accounts - Please send the links to all relevant social media accounts (IG, TikTok, Twitter, Reddit, etc.)<br/>
6. OnlyFans/Fansly Account - Do you already have an OnlyFans or Fansly account? If yes, link please!<br/><br/>
Please send everything here in the chat!</p>
<h3>Deutsch - Tasks-Nachricht</h3>
<p>Hey [Modelname]! Danke fuers Ausfullen des Fragebogens. Jetzt brauchen wir noch ein paar Sachen von dir:<br/><br/>
1. Equipment-Fotos - Bitte schick ein Foto von jedem Geraet das du hast + schreib dazu wie viel es gekostet hat<br/>
2. Room Tour - Bitte schick ein kurzes Video oder Fotos von dort wo du Content drehen wuerdest<br/>
3. Outfit-Fotos - Schick Bilder in deinen 3 Lieblingsoutfits in denen du dich am heissesten fuehlst<br/>
4. Reel-Inspirationen - Schick 3-4 Reels oder Creator die dir vom Content her gefallen<br/>
5. Social-Media-Accounts - Bitte sende die Links zu allen relevanten Social-Media-Accounts<br/>
6. OnlyFans-/Fansly-Account - Hast du bereits einen OnlyFans- oder Fansly-Account? Wenn ja, bitte den Link senden!<br/><br/>
Bitte schick alles hier in den Chat!</p>`
    }
,
    {
      id: 6,
      title: "Onboarding Questions & Templates",
      category: "Operations",
      version: "1.0",
      updated: "March 2026",
      content: `<h2>Overview</h2>
<p>This SOP contains the full questionnaire sent to new models via the website, plus the WhatsApp task message templates. The questionnaire is sent in Step 1, the tasks message in Step 2 (see SOP #5).</p>
<p>Website link: <strong>https://leonmiguelgonzales-droid.github.io/Onboarding/</strong></p>

<h2>Questionnaire — English</h2>
<p>Send this to the model via the website link or copy directly into WhatsApp/Telegram.</p>
<h3>1 - Personal Information</h3>
<ol>
<li>What is your name / stage name?</li>
<li>How old are you?</li>
<li>What is your height?</li>
<li>What is your nationality?</li>
<li>Where do you currently live? (Country / City)</li>
<li>What is your current job / occupation?</li>
</ol>
<h3>2 - Goals and Availability</h3>
<ol start="7">
<li>What is your long-term goal for OnlyFans?</li>
<li>What monthly income would you like to reach? (realistic and dream goal)</li>
<li>How many hours per day can you dedicate to OF?</li>
<li>What is your daily schedule like? When are you most available?</li>
<li>What are your absolute No-Gos on OF and Social Media?</li>
</ol>
<h3>3 - What Makes You Unique?</h3>
<p><em>Think about everything that is special about you — no matter how small it seems!</em></p>
<ol start="12">
<li>What are your hobbies, interests, or passions?</li>
<li>Do you have any special talents or skills for content? (dancing, cooking, accent, humor...)</li>
<li>Do you have any pets? If yes, which ones?</li>
<li>Do you have access to special locations? (pool, beach, gym, nature spots...)</li>
<li>Do you have any special items, gadgets or accessories that could stand out? (motorcycle, sports car, instrument...)</li>
</ol>
<h3>4 - Equipment and Content Style</h3>
<ol start="17">
<li>What phone do you currently use? (model and camera quality)</li>
<li>Do you have any additional equipment? (ring light, tripod, camera, mic...)</li>
</ol>
<h3>5 - Social Media and Content</h3>
<ol start="19">
<li>Which platforms are you currently active on that we can use for OF? (IG, TikTok, Twitter, Reddit, etc.)</li>
<li>Do you already have an OnlyFans account? If yes, link please!</li>
<li>Do you have any existing social content we can use? (photos, videos, reels)</li>
</ol>
<h3>6 - Additional Info</h3>
<ol start="22">
<li>Have you worked with an agency before? If yes, what was your experience?</li>
<li>Is there anything else important we should know about you?</li>
</ol>

<h2>WhatsApp Tasks Message — English</h2>
<p>Leon sends this AFTER the questionnaire is returned:</p>
<p>Hey [Modelname]! Thanks for filling out the questionnaire! Now we still need a few things from you:<br/><br/>
<strong>1. Equipment Photos</strong><br/>Please send a photo of each piece of equipment you have (ring light, tripod, camera, mic etc.) + include how much it cost<br/><br/>
<strong>2. Room Tour</strong><br/>Please send a short video or photos of where you would shoot content — so we can assess lighting and setup<br/><br/>
<strong>3. Outfit Photos</strong><br/>Send pictures in your 3 favorite outfits where you feel the hottest<br/><br/>
<strong>4. Reel Inspirations</strong><br/>Send 3-4 reels or creators whose content style you like — so we get a feel for what direction suits you<br/><br/>
<strong>5. Social Media Accounts</strong><br/>Please send the links to all relevant social media accounts (IG, TikTok, Twitter, Reddit, etc.)<br/><br/>
<strong>6. OnlyFans/Fansly Account</strong><br/>Do you already have an OnlyFans or Fansly account? If yes, link please!<br/><br/>
Please send everything here in the chat!</p>`
    }
  ],
  de: [
    {
      id: 1,
      title: "SOP #1 — Kontoprobleme",
      category: "Betrieb",
      version: "3.0",
      updated: "März 2026",
      content: `<h2>1. Kontokategorisierung</h2>
<p>Jedes Konto wird nach der Anzahl der täglich generierten Abonnenten kategorisiert.</p>
<table><thead><tr><th>Kategorie</th><th>Subs/Tag</th><th>Wert/Tag</th><th>Reaktion auf Bann</th></tr></thead><tbody>
<tr><td>🟢 Niedrige Priorität</td><td>0–4 Subs</td><td>$0–$120</td><td>Neues Konto erstellen</td></tr>
<tr><td>🟡 Mittel wichtig</td><td>5–14 Subs</td><td>$125–$420</td><td>Kosten-Nutzen-Analyse</td></tr>
<tr><td>🔴 Sehr wichtig</td><td>15–100 Subs</td><td>$375–$3.000</td><td>Sofort Unban-Service</td></tr>
</tbody></table>
<div class="warning">⚠ NIEMALS einen Appeal einlegen, bevor du mit dem Manager gesprochen hast! Ein Appeal macht den Unban deutlich teurer ($300 → $1.500+).</div>
<h2>2. Konto gebannt</h2>
<div class="warning">⚠ GOLDENE REGEL: KEINEN Appeal einlegen! Zuerst mit dem Manager sprechen.</div>
<h3>2.1 🟢 Niedrige Priorität (0–4 Subs/Tag)</h3>
<ol><li>Screenshot des Bann-Bildschirms + "Mehr über die Regeln" machen</li><li>Appeal einlegen und warten</li><li>Vollständig gebannt → Neues Konto erstellen oder kaufen</li><li>Konto als "gebannt" im Kontoüberblick markieren</li></ol>
<h3>2.2 🟡 Mittel wichtig (5–14 Subs/Tag)</h3>
<ol><li>Screenshot des Bann-Bildschirms machen</li><li>KEINEN Appeal einlegen</li><li>Kosten-Nutzen-Rechnung durchführen</li><li>Wenn lohnenswert: Unban-Service kontaktieren + Angebote einholen</li><li>Manager kurz via WhatsApp informieren</li><li>Kontoüberblick aktualisieren</li></ol>
<h3>2.3 🔴 Sehr wichtig (15–100 Subs/Tag)</h3>
<ol><li>Screenshot des Bann-Bildschirms machen</li><li>KEINEN APPEAL!</li><li>Versicherung prüfen: JA → Liquide kontaktieren. NEIN → Joker zuerst kontaktieren.</li><li>Manager SOFORT benachrichtigen</li><li>Konto als "gebannt" markieren + Datum</li><li>Unban-Service täglich nachfassen</li></ol>
<h2>3. Shadowban (Eingeschränkte Reichweite)</h2>
<p>Ein Shadowban bedeutet, dass Inhalte nicht mehr neuen Leuten gezeigt werden. Wo prüfen: <strong>Instagram → Einstellungen → Kontostatus → "Eingeschränkte Reichweite"</strong></p>
<table><thead><tr><th>Option</th><th>Status</th><th>Aktion</th></tr></thead><tbody>
<tr><td>"Personen, denen du nicht folgst"</td><td>🟠 Orange</td><td>SOFORT handeln! Prozess unten.</td></tr>
<tr><td>"Personen unter 18"</td><td>🟠 Orange</td><td>IGNORIEREN — wir wollen sowieso nur 18+ erreichen.</td></tr>
<tr><td>Beide Optionen</td><td>🟢 Grün</td><td>Alles gut. Normal weiterarbeiten.</td></tr>
</tbody></table>
<h3>Shadowban beheben</h3>
<ol><li>Auf "Eingeschränkte Reichweite" klicken und betroffene Inhalte prüfen</li><li>"Appeal einlegen" auf den betroffenen Inhalten klicken</li><li>2 Stunden auf Entscheidung warten</li><li>Appeal erfolgreich? → Erledigt. Keine Entscheidung nach 2h? → Betroffenen Content löschen. Appeal abgelehnt? → Content löschen.</li></ol>
<h2>4. Video entfernt</h2>
<ol><li>Screenshot der Entfernungsmeldung machen</li><li>Screenshot + vollständiges Video an Teamgruppe senden</li><li>Versicherung? JA: Unban-Service benachrichtigen — er behebt es. KEINEN Appeal! NEIN: Appeal einlegen.</li></ol>
<h2>5. Schnellreferenz</h2>
<table><thead><tr><th>Situation</th><th>Sofortmaßnahme</th></tr></thead><tbody>
<tr><td>🟢 Niedrige Priorität gebannt</td><td>Screenshot → Appeal → Bei Ablehnung: Neues Konto</td></tr>
<tr><td>🟡 Mittel gebannt</td><td>Screenshot → KEIN Appeal → Kosten-Nutzen → Manager informieren</td></tr>
<tr><td>🔴 Sehr wichtig gebannt</td><td>Screenshot → KEIN APPEAL → Versicherung? Ja: Liquide. Nein: Joker → Manager SOFORT</td></tr>
<tr><td>Shadowban</td><td>Versicherung? Ja: Liquide. Nein: Appeal → 2h warten → Kein Erfolg: Content löschen</td></tr>
<tr><td>Video entfernt</td><td>Screenshot + Video an Gruppe → Versicherung? Ja: Service, kein Appeal. Nein: Appeal</td></tr>
</tbody></table>`
    },
    {
      id: 2,
      title: "SOP #2 — Vendors & Tools",
      category: "Betrieb",
      version: "1.0",
      updated: "März 2026",
      content: `<h2>1. Follower kaufen</h2>
<p>Wir kaufen gefälschte Follower ausschließlich für Instagram. Zweck: Vertrauensaufbau — Konten mit 0 Followern wirken unseriös.</p>
<table><thead><tr><th>Anbieter</th><th>Website</th><th>Preis/1K</th><th>Priorität</th></tr></thead><tbody>
<tr><td>MoreThanPanel</td><td>morethanpanel.com</td><td>ab $0,31</td><td>⭐ Bevorzugt</td></tr>
<tr><td>SMMFollows</td><td>smmfollows.com</td><td>Ähnlich</td><td>Alternative</td></tr>
</tbody></table>
<div class="warning">⚠ Beim Follower-Kauf muss das Konto auf PUBLIC gestellt sein, bis alle Follower angekommen sind! Danach wieder auf privat stellen.</div>
<h2>2. Instagram-Konten kaufen</h2>
<p>Wir kaufen immer gealterter IG-Konten statt sie manuell zu erstellen. Das Land/IP des Kontos muss zur Zielgruppe des Creators passen.</p>
<table><thead><tr><th>Anbieter</th><th>Kontakt</th><th>Preis/Konto</th><th>Hinweise</th></tr></thead><tbody>
<tr><td>AccsMarket</td><td>accsmarket.com</td><td>$3–7</td><td>⭐ Bevorzugt</td></tr>
<tr><td>WhatsApp Kontakt</td><td>+44 7926 386960</td><td>~$2</td><td>Genau kommunizieren was benötigt wird</td></tr>
</tbody></table>
<h2>3. Unban Services</h2>
<table><thead><tr><th>Anbieter</th><th>Kontakt</th><th>Preis (ohne Appeal)</th><th>Preis (REP/MA)</th><th>Geschwindigkeit</th></tr></thead><tbody>
<tr><td>Joker</td><td>Telegram: @jokerisafk</td><td>$300–400</td><td>$2.000+</td><td>2–3h, max 24h</td></tr>
<tr><td>Berdan</td><td>Telegram: @qberdan</td><td>€500</td><td>~€1.700</td><td>5–7 Tage</td></tr>
<tr><td>Liquide</td><td>Telegram: @liquidback</td><td>Variiert</td><td>Variiert</td><td>Langsam</td></tr>
</tbody></table>
<h2>4. Link Services & Funnel Tools</h2>
<table><thead><tr><th>Tool</th><th>Verwendung</th><th>Zugang</th></tr></thead><tbody>
<tr><td>Bouncy.ai</td><td>Funnel-Links für OnlyFans</td><td>Zugang über Leon</td></tr>
<tr><td>Link.me</td><td>Funnel-Links für OnlyFans</td><td>Zugang über Leon</td></tr>
<tr><td>GoDaddy</td><td>Domains für neue Models kaufen</td><td>Siehe Onboarding SOP</td></tr>
</tbody></table>
<h2>5. Schnellreferenz</h2>
<table><thead><tr><th>Was brauche ich?</th><th>Wo?</th><th>Preis</th></tr></thead><tbody>
<tr><td>Fake Follower (IG)</td><td>morethanpanel.com</td><td>ab $0,31 / 1K</td></tr>
<tr><td>IG-Konto (bevorzugt)</td><td>accsmarket.com</td><td>$3–7 / Konto</td></tr>
<tr><td>Unban (ohne Appeal)</td><td>Joker: @jokerisafk</td><td>$300–400</td></tr>
<tr><td>Funnel-Links</td><td>Bouncy.ai / Link.me (über Leon)</td><td>—</td></tr>
<tr><td>SMS-Verifizierung</td><td>smspool.net</td><td>Variiert</td></tr>
</tbody></table>`
    },
    {
      id: 3,
      title: "SOP #3 — Aufgabenverwaltung",
      category: "Betrieb",
      version: "1.0",
      updated: "März 2026",
      content: `<h2>1. Warum Asana?</h2>
<p>Unser Problem: Aufgaben werden in WhatsApp besprochen, aber nicht verfolgt. Besonders Wachstumsaufgaben gehen verloren.</p>
<div class="warning">⚠ WhatsApp ist NUR für schnelle Kommunikation und dringende Nachrichten. Aufgaben werden NICHT MEHR über WhatsApp vergeben oder verfolgt.</div>
<h2>2. Asana-Struktur</h2>
<table><thead><tr><th>Spalte</th><th>Bedeutung</th></tr></thead><tbody>
<tr><td>📋 To Do</td><td>Neue Aufgaben, die noch nicht begonnen wurden</td></tr>
<tr><td>🔧 In Bearbeitung</td><td>Aufgaben, an denen gerade gearbeitet wird</td></tr>
<tr><td>❓ Entscheidung nötig</td><td>Aufgabe ist unklar. Täglich überprüft.</td></tr>
<tr><td>⏳ Warte auf…</td><td>Warte auf jemand anderen</td></tr>
<tr><td>✅ Erledigt</td><td>Abgeschlossen. Ende der Woche aufgeräumt.</td></tr>
</tbody></table>
<h2>3. Die WhatsApp → Asana Regel</h2>
<div class="warning">⚠ Wenn eine Aufgabe in WhatsApp besprochen wird, muss sie SOFORT in Asana eingetragen werden. Kein Asana-Eintrag = Keine Aufgabe.</div>
<h2>4. Goldene Regeln</h2>
<table><thead><tr><th>#</th><th>Regel</th></tr></thead><tbody>
<tr><td>1</td><td>Kein Asana-Eintrag = Keine Aufgabe.</td></tr>
<tr><td>2</td><td>Jede Aufgabe hat einen Verantwortlichen.</td></tr>
<tr><td>3</td><td>Unsicher? → "Entscheidung nötig". Nie liegen lassen.</td></tr>
<tr><td>4</td><td>WhatsApp-Aufgabe? → Sofort in Asana + "Ist in Asana" bestätigen.</td></tr>
<tr><td>5</td><td>Asana morgens öffnen, abends Status aktualisieren. Täglich. 5 Minuten.</td></tr>
</tbody></table>`
    },
    {
      id: 4,
      title: "SOP #4 — Marketing MA",
      category: "Betrieb",
      version: "1.0",
      updated: "März 2026",
      content: `<h2>1. Rollenübersicht</h2>
<p>Der Marketing MA ist für den gesamten Content-Prozess von der Ideenfindung bis zum fertigen Video verantwortlich. Nach vollständigem Onboarding betreut er 2 Creator gleichzeitig.</p>
<h2>2. Tagesablauf</h2>
<h3>Phase 1: Morgens</h3>
<ol><li>Asana öffnen: Was steht heute an? (2–3 Min)</li><li>WhatsApp prüfen: Neue Nachrichten von Models oder Team?</li><li>CreatorHero öffnen: Subs und Link-Klicks von gestern prüfen</li><li>Video-Performance prüfen</li><li>Kontostatus: Beide IG-Konten auf Bans/Shadowbans prüfen</li></ol>
<h3>Phase 2: Vormittags — Content-Listen erstellen</h3>
<p>Das ist die wichtigste und kreativste Aufgabe des Tages. Morgens erledigen, wenn die Konzentration am höchsten ist.</p>
<ol><li>Recherche vom Vorabend öffnen</li><li>Videos auswählen, die zum Model passen</li><li>Content-Liste schreiben (siehe Template in Abschnitt 3)</li><li>Pro Model: Mindestens 4–5 Videos pro Liste</li><li>Fertige Liste an die Listen-Gruppe auf Telegram/WhatsApp senden</li></ol>
<h3>Phase 3: Live-Feedback (wenn Model filmt)</h3>
<div class="warning">⚠ Live-Feedback ist entscheidend für die Videoqualität. Ohne Feedback filmen Models oft Videos, die nicht verwendbar sind.</div>
<h3>Phase 4: Nachmittags</h3>
<ol><li>Bearbeitete Videos reviewen und Feedback geben</li><li>IG-Konten verwalten (posten, Kommentare, Stories)</li></ol>
<h3>Phase 5: Abends — Recherche</h3>
<ol><li>Gezielt auf Instagram recherchieren (FYP muss richtig konfiguriert sein!)</li><li>Gute Videos in die entsprechende Telegram-Recherche-Gruppe senden</li><li>Ca. 30–60 Minuten pro Session, max. 90 Minuten</li></ol>
<h2>3. Content-Listen Template</h2>
<table><thead><tr><th>Feld</th><th>Beschreibung</th></tr></thead><tbody>
<tr><td>Text</td><td>Der gesprochene Text oder Text im Video</td></tr>
<tr><td>Acting</td><td>Was soll das Model tun? (Mimik, Gestik, Bewegung)</td></tr>
<tr><td>Location</td><td>Wo filmen? (Schlafzimmer, Küche, Gym, draußen etc.)</td></tr>
<tr><td>Outfit</td><td>Was soll das Model tragen?</td></tr>
<tr><td>Description/Caption</td><td>Die Caption unter dem Video</td></tr>
</tbody></table>
<h2>4. Häufige Fehler</h2>
<h3>FYP nicht richtig aufgebaut</h3>
<p>Neue MAs verbringen 3–4 Stunden mit Recherche und finden kaum gute Videos. Lösung: Recherche-Account NUR für Recherche nutzen — niemals für persönlichen Gebrauch.</p>
<h3>Content-Listen zu unspezifisch</h3>
<p>Listen sind zu vage, das Model weiß nicht genau was zu tun ist. Lösung: Jedes Feld muss spezifisch und eindeutig sein. Nicht "sei sexy" sondern "lehn dich lässig gegen die Wand, schau in die Kamera, lächle kurz."</p>`
    },
    {
      id: 5,
      title: "SOP #5 - Neues Model Onboarding",
      category: "Betrieb",
      version: "1.0",
      updated: "Maerz 2026",
      content: `<h2>Vollstaendige Onboarding-Checkliste</h2>
<table><thead><tr><th>Aufgabe</th><th>Verantwortlich</th><th>Deadline</th></tr></thead><tbody>
<tr><td>WhatsApp-Gruppen erstellt (Traffic + Backend)</td><td>Backend</td><td>Tag 1</td></tr>
<tr><td>Willkommensnachrichten gesendet (Owner, MM, Assistent)</td><td>Alle</td><td>Tag 1</td></tr>
<tr><td>Onboarding-Fragebogen gesendet (Website)</td><td>MM / Assistent</td><td>Tag 1</td></tr>
<tr><td>Fragebogen vollstaendig zurueckgesendet</td><td>Model</td><td>Tag 1-2</td></tr>
<tr><td>Tasks gesendet (Equipment, Room Tour, Outfits, Reels, AI-Fotos, Link-Bild)</td><td>Leon</td><td>Nach Fragebogen</td></tr>
<tr><td>Alle Tasks vom Model erhalten</td><td>Model</td><td>Tag 1-2</td></tr>
<tr><td>4 IG-Konten gekauft</td><td>Leon</td><td>Tag 1-2</td></tr>
<tr><td>Konten ans Team verteilt (1x MM, 3x VA)</td><td>Manuel / MM</td><td>Tag 1-2</td></tr>
<tr><td>Link-Landingpage pro Konto erstellt</td><td>MM / VA</td><td>Bis Tag 5</td></tr>
<tr><td>Deep Links + 18+ Verifizierung konfiguriert</td><td>MM / VA</td><td>Bis Tag 5</td></tr>
<tr><td>Hintergrundbild fuer Links organisiert</td><td>MM</td><td>Bis Tag 5</td></tr>
<tr><td>Marketingkonzept fertiggestellt (5 Schritte)</td><td>MM + Team</td><td>Tag 1-3</td></tr>
<tr><td>Erste Content-Liste ans Model gesendet</td><td>MM</td><td>Tag 2-5</td></tr>
<tr><td>Warming-Prozess gestartet</td><td>MM / VA</td><td>Tag 1-2</td></tr>
<tr><td>Funnel-Check abgeschlossen</td><td>Leon</td><td>Tag 2-3</td></tr>
<tr><td>Asana-Projekt erstellt</td><td>MM</td><td>Tag 1-2</td></tr>
<tr><td>Alle in Konten eingeloggt</td><td>MM / VA</td><td>Tag 1-2</td></tr>
<tr><td>Go-live bestaetigt</td><td>Manuel / MM</td><td>Ab Tag 7+</td></tr>
</tbody></table>
<h2>Phase 1 - Kommunikation und Ersteinrichtung</h2>
<h3>1.1 WhatsApp-Gruppen erstellen</h3>
<table><thead><tr><th>Gruppe</th><th>Namensformat</th></tr></thead><tbody>
<tr><td>Traffic / Marketing</td><td>[Modelname] Traffic - Perlage Studios</td></tr>
<tr><td>Backend</td><td>[Modelname] Backend - Perlage Studios</td></tr>
</tbody></table>
<h3>1.2 Willkommen und Vorstellung</h3>
<table><thead><tr><th>#</th><th>Rolle</th><th>Aktion</th></tr></thead><tbody>
<tr><td>1</td><td>Owner (Manuel)</td><td>Begruesst zuerst, setzt den Ton</td></tr>
<tr><td>2</td><td>Marketing Manager</td><td>Stellt sich mit Rolle und Verantwortlichkeiten vor</td></tr>
<tr><td>3</td><td>Assistent</td><td>Stellt sich mit Rolle und Verantwortlichkeiten vor</td></tr>
</tbody></table>
<h3>Willkommensnachrichten-Vorlagen</h3>
<p><strong>Owner:</strong><br/>Hey [Modelname]! Ich bin Manuel, Gruender von Perlage Studios. Willkommen im Team! Ich bin immer im Hintergrund und stelle sicher, dass alles reibungslos laeuft. Wir freuen uns auf die Zusammenarbeit!</p>
<p><strong>Marketing Manager:</strong><br/>Hey [Modelname]! Ich bin [Name], dein Marketing Manager. Ich kuemmere mich um deine Content-Strategie, deine Instagram-Konten und stelle sicher, dass dein Content viral geht. Bei allem was Content, Videos und Social Media betrifft, bin ich deine Ansprechperson!</p>
<p><strong>Assistent:</strong><br/>Hey [Modelname]! Ich bin [Name], ich unterstuetze dich beim Video-Drehen und Schneiden. Bei Fragen zum Filmen oder zu deinen Videos kannst du dich gerne bei mir melden!</p>
<h3>1.3 Fragebogen und Tasks (2-Schritt-Prozess)</h3>
<table><thead><tr><th>Schritt</th><th>Was?</th><th>Wer sendet?</th></tr></thead><tbody>
<tr><td>Schritt 1</td><td>Fragebogen auf Website (24 Textfragen)</td><td>MM oder Assistent</td></tr>
<tr><td>Schritt 2</td><td>Tasks per WhatsApp (6 Aufgaben mit Foto/Video)</td><td>Leon - NACH Fragebogen</td></tr>
</tbody></table>
<p><strong>Die 6 Tasks:</strong></p>
<ol><li>Equipment-Fotos + Preis</li><li>Room Tour (Video/Fotos des Drehortes)</li><li>3 Lieblingsoutfits - Fotos</li><li>3-4 Reel-Inspirationen - Links / Screenshots</li><li>AI-Fotos (30+ Fotos, Gesicht + Koerper)</li><li>Hintergrundbild fuer Link-Landingpage - 1-3 Fotos</li></ol>
<h2>Phase 2 - Konten und Link-Einrichtung</h2>
<table><thead><tr><th>Detail</th><th>Standard</th></tr></thead><tbody>
<tr><td>Anzahl</td><td>4 Konten pro neuem Model</td></tr>
<tr><td>Kontotyp</td><td>Gealterter Konten (1-2 Jahre alt)</td></tr>
<tr><td>Verantwortlich</td><td>Leon</td></tr>
</tbody></table>
<div class="warning">JEDES Konto bekommt seinen EIGENEN Link! Gleicher Link auf mehreren Konten = Kettenreaktion beim Bann.</div>
<h2>Phase 3 - Marketingkonzept und Content-Strategie</h2>
<table><thead><tr><th>Schritt</th><th>Thema</th><th>Was wird gemacht?</th></tr></thead><tbody>
<tr><td>1</td><td>Creator-Staerken</td><td>Koerper, Persoenlichkeit, Setup, Talente analysieren</td></tr>
<tr><td>2</td><td>Ziel-Creator-Liste</td><td>10 Creator analysieren: Was uebernehmen? Was besser machen?</td></tr>
<tr><td>3</td><td>Zielgruppe definieren</td><td>Wen wollen wir ansprechen?</td></tr>
<tr><td>4</td><td>Content-Stil definieren</td><td>Welche Art Content, welche Nische, welches Branding?</td></tr>
<tr><td>5</td><td>5x 10/10 Reels schreiben</td><td>Checkliste pro Reel: Warum ist es ein 10/10 Reel?</td></tr>
</tbody></table>
<h2>Phase 5 - Account Warming und Go-Live</h2>
<ul><li>Alle IG-Konten zugewiesen (MA + Poster VA)</li><li>Alle in ihre Konten eingeloggt</li><li>Link-Landingpages erstellt und konfiguriert</li><li>Account-Warming gestartet</li><li>Content verfuegbar und von hoher Qualitaet</li><li>Funnel-Check abgeschlossen (Leon)</li><li>Posting-Zeitzone: Morgens US-Zeit (Pacific Time)</li></ul>
<div class="warning">NICHT wie ein Bot interagieren! IG erkennt roboterhaftes Verhalten.</div>
<table><thead><tr><th>Falsch</th><th>Richtig</th></tr></thead><tbody>
<tr><td>Reel 1 Sek. ansehen, sofort liken</td><td>Reels wirklich ansehen, manche ueberspringen</td></tr>
<tr><td>Jeden Reel liken</td><td>Manche liken, manche ueberspringen</td></tr>
<tr><td>Immer gleiche Aktionen</td><td>Mix: scrollen, liken, kommentieren, Stories</td></tr>
<tr><td>Sofort 50 Konten folgen</td><td>Langsam durch Feed scrollen</td></tr>
</tbody></table>`
    }
,
    {
      id: 6,
      title: "SOP #6 - Onboarding Fragen und Vorlagen",
      category: "Betrieb",
      version: "1.0",
      updated: "Maerz 2026",
      content: `<h2>Uebersicht</h2>
<p>Dieses SOP enthaelt den vollstaendigen Fragebogen fuer neue Models (Website) sowie die WhatsApp-Task-Nachrichtenvorlagen. Der Fragebogen wird in Schritt 1 gesendet, die Tasks-Nachricht in Schritt 2 (siehe SOP #5).</p>
<p>Website-Link: <strong>https://leonmiguelgonzales-droid.github.io/Onboarding/</strong></p>

<h2>Fragebogen - Deutsch</h2>
<h3>1 - Persoenliche Informationen</h3>
<ol>
<li>Wie ist dein Name / Kuenstlername?</li>
<li>Wie alt bist du?</li>
<li>Wie gross bist du?</li>
<li>Was ist deine Nationalitaet?</li>
<li>Wo wohnst du aktuell? (Land / Stadt)</li>
<li>Was ist dein aktueller Job / Beschaeftigung?</li>
</ol>
<h3>2 - Ziele und Verfuegbarkeit</h3>
<ol start="7">
<li>Was ist dein langfristiges Ziel mit OnlyFans?</li>
<li>Welches monatliche Einkommen moechtest du erreichen? (realistisch und Traumziel)</li>
<li>Wie viele Stunden pro Tag kannst du fuer OF aufwenden?</li>
<li>Wie sieht dein Tagesablauf aus? Wann bist du am besten verfuegbar?</li>
<li>Was sind deine absoluten No-Gos auf OF und Social Media?</li>
</ol>
<h3>3 - Was macht dich einzigartig?</h3>
<p><em>Denk an alles was besonders an dir ist - egal wie klein es scheint!</em></p>
<ol start="12">
<li>Was sind deine Hobbys, Interessen oder Leidenschaften?</li>
<li>Hast du besondere Talente oder Faehigkeiten fuer Content? (Tanzen, Kochen, Akzent, Humor...)</li>
<li>Hast du Haustiere? Wenn ja, welche?</li>
<li>Hast du Zugang zu besonderen Locations? (Pool, Strand, Gym, Natur-Spots...)</li>
<li>Hast du besondere Gegenstaende, Gadgets oder Accessoires die auffallen koennten? (Motorrad, Sportwagen, Instrument...)</li>
</ol>
<h3>4 - Equipment und Content-Stil</h3>
<ol start="17">
<li>Welches Handy nutzt du? (Modell und Kameraqualitaet)</li>
<li>Hast du weiteres Equipment? (Ringlicht, Stativ, Kamera, Mikro...)</li>
</ol>
<h3>5 - Social Media und Content</h3>
<ol start="19">
<li>Auf welchen Social Media Plattformen bist du aktiv die wir fuer OF nutzen koennen? (IG, TikTok, Twitter, Reddit, etc.)</li>
<li>Hast du bereits einen OnlyFans-Account? Wenn ja, Link bitte!</li>
<li>Hast du bestehenden Content den wir nutzen koennen? (Fotos, Videos, Reels)</li>
</ol>
<h3>6 - Weitere Infos</h3>
<ol start="22">
<li>Hast du schon mit einer Agentur zusammengearbeitet? Wenn ja, wie war die Erfahrung?</li>
<li>Gibt es sonst noch etwas Wichtiges das wir ueber dich wissen sollten?</li>
</ol>

<h2>WhatsApp Tasks-Nachricht - Deutsch</h2>
<p>Leon sendet diese Nachricht NACHDEM der Fragebogen zurueck ist:</p>
<p>Hey [Modelname]! Danke fuers Ausfullen des Fragebogens! Jetzt brauchen wir noch ein paar Sachen von dir:<br/><br/>
<strong>1. Equipment-Fotos</strong><br/>Bitte schick ein Foto von jedem Geraet das du hast (Ringlicht, Stativ, Kamera, Mikro etc.) + schreib dazu wie viel es gekostet hat<br/><br/>
<strong>2. Room Tour</strong><br/>Bitte schick ein kurzes Video oder Fotos von dort wo du Content drehen wuerdest - so koennen wir Beleuchtung und Setup einschaetzen<br/><br/>
<strong>3. Outfit-Fotos</strong><br/>Schick Bilder in deinen 3 Lieblingsoutfits in denen du dich am heissesten fuehlst<br/><br/>
<strong>4. Reel-Inspirationen</strong><br/>Schick 3-4 Reels oder Creator die dir vom Content her gefallen - damit wir ein Gefuehl bekommen welche Richtung dir liegt<br/><br/>
<strong>5. Social-Media-Accounts</strong><br/>Bitte sende die Links zu allen relevanten Social-Media-Accounts (Instagram, TikTok, Twitter, Reddit etc.)<br/><br/>
<strong>6. OnlyFans-/Fansly-Account</strong><br/>Hast du bereits einen OnlyFans- oder Fansly-Account? Wenn ja, bitte den Link senden!<br/><br/>
Bitte schick alles hier in den Chat!</p>`
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
