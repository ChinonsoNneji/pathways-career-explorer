let assessment;
const key = "pathways-v1";
let profile = { signals: [], progress: {} };
try {
  const saved = JSON.parse(localStorage.getItem(key));
  if (saved && Array.isArray(saved.signals) && saved.progress) profile = saved;
} catch {
  // The assessment can run without persistent storage.
}
const form = document.querySelector("#assessment");
const results = document.querySelector("#results");
const message = document.querySelector("#message");
const major = document.querySelector("#major");
const settings = document.querySelector("#settings");
const tools = document.querySelector("#profile-tools");
const comparison = document.querySelector("#comparison");
const opportunities = document.querySelector("#opportunities");
const compared = new Map();

function add(parent, tag, value) {
  const element = document.createElement(tag);
  if (value !== undefined) element.textContent = value;
  parent.append(element);
  return element;
}

function checkbox(parent, text, checked) {
  const label = add(parent, "label");
  const input = add(label, "input");
  input.type = "checkbox";
  input.checked = checked;
  label.append(" " + text);
  return input;
}

function link(parent, name, url) {
  add(parent, "a", name).href = url;
}

function showMajor() {
  const selected = Boolean(profile.major);
  document.querySelector("#profile-title").textContent = profile.major || "Choose your major";
  settings.open = !selected;
  settings.querySelector("summary").hidden = !selected;
  tools.hidden = !selected;
  opportunities.hidden = !selected;
  const list = opportunities.querySelector("ul");
  list.replaceChildren();
  for (const [name, url] of resources[profile.major]?.links ?? []) link(add(list, "li"), name, url);
}

function showComparison() {
  comparison.replaceChildren();
  comparison.hidden = compared.size === 0;
  for (const path of compared.values()) {
    const card = add(comparison, "article");
    add(card, "h3", path.name);
    const remove = add(card, "button", "Remove from comparison");
    remove.addEventListener("click", () => {
      compared.delete(path.name);
      showComparison();
    });
    add(card, "h4", "Courses and portfolio");
    add(card, "p", path.coursework.join(", ") || "See roadmap foundations.");
    add(card, "p", path.evidence);
    const data = resources[path.major];
    add(card, "h4", "U.S. occupation benchmark");
    add(card, "p", data.occupation + " · " + data.median + " median annual pay (May 2025)");
    if (data.mean) link(add(card, "p"), data.mean + " mean annual pay", "https://www.bls.gov/news.release/ocwage.t01.htm");
    add(card, "p", data.openings + " projected annual openings · " + data.growth + " projected growth, 2025–35.");
    link(add(card, "p"), "BLS occupation data", data.source);
    add(card, "h4", "Hiring and layoffs");
    add(card, "p", "Industry context only · " + data.industry + " · July–September 2026 · thousands, seasonally adjusted.");
    link(add(card, "p"), "Monthly hires " + data.hires.join(" / "), "https://www.bls.gov/news.release/jolts.t02.htm");
    link(add(card, "p"), "Monthly layoffs and discharges " + data.layoffs.join(" / "), "https://www.bls.gov/news.release/jolts.t05.htm");
    add(card, "p", "Role-specific layoffs and job security estimates are unavailable.");
  }
}

function save() {
  try {
    localStorage.setItem(key, JSON.stringify(profile));
  } catch {
    message.textContent = "Browser storage is unavailable. Your progress lasts for this session.";
  }
}

function renderSignals() {
 const signals = document.querySelector("#signals");
 signals.replaceChildren();
 for (const [name, options] of Object.entries(assessment[major.value] ?? {})) {
  const group = add(signals, "fieldset");
  add(group, "legend", name);
  for (const option of options) {
    const input = checkbox(group, option, profile.signals.includes(option));
    input.name = "signal";
    input.value = option;
  }
 }
}

let revision = 0;
async function render() {
  const current = ++revision;
  let matches = [];
  if (profile.major) {
    try {
      const response = await fetch("/api/v1/recommendations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ major: profile.major, signals: profile.signals })
      });
      if (!response.ok) throw new Error("Request failed");
      ({ matches } = await response.json());
    } catch {
      if (revision === current) {
        results.replaceChildren();
        message.textContent = "Could not load matches. Choose Find paths to retry.";
      }
      return;
    }
  }
  if (revision !== current) return;
  results.replaceChildren();
  message.textContent = matches.length
    ? "Try a roadmap step to see how the work feels."
    : "Choose your major to explore its roles.";
  for (const { path, reasons } of matches) {
    const article = add(results, "article");
    add(article, "h3", path.name);
    add(article, "p", reasons.length ? "Why it matches: " + reasons.join(", ") : "Explore this role within your major.");
    if (path.related) add(article, "p", "Related paths: " + path.related);
    const compare = add(article, "button", "Compare role");
    compare.addEventListener("click", () => {
      if (!compared.has(path.name) && compared.size === 2) {
        message.textContent = "Remove a role from the comparison before adding another.";
        return;
      }
      compared.set(path.name, path);
      showComparison();
      message.textContent = compared.size === 1 ? "Choose one more role to compare." : "Comparison ready above the catalog.";
    });
    const roadmap = add(article, "details");
    const summary = add(roadmap, "summary");
    const list = add(roadmap, "ol");
    const completed = new Set(profile.progress[path.name] ?? []);
    function updateProgress() {
      summary.textContent = "Roadmap · " + completed.size + " of " + path.steps.length + " complete";
    }
    updateProgress();
    path.steps.forEach((step, index) => {
      const input = checkbox(add(list, "li"), step, completed.has(index));
      input.addEventListener("change", () => {
        if (input.checked) completed.add(index);
        else completed.delete(index);
        profile.progress[path.name] = [...completed];
        updateProgress();
        save();
      });
    });
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  profile.major = major.value;
  profile.signals = new FormData(form).getAll("signal");
  render();
  save();
});
form.addEventListener("reset", (event) => {
  event.preventDefault();
  for (const input of form.querySelectorAll("input")) input.checked = false;
  profile.signals = [];
  render();
  save();
});
major.addEventListener("change", () => {
  if (!major.value) {
    major.value = profile.major || "";
    return;
  }
  profile.major = major.value;
  profile.signals = [];
  compared.clear();
  showComparison();
  showMajor();
  renderSignals();
  render();
  save();
});

async function initialize() {
  try {
    const response = await fetch("/api/v1/assessment");
    if (!response.ok) throw new Error("Assessment unavailable");
    assessment = await response.json();
    for (const name of Object.keys(assessment)) add(major, "option", name).value = name;
    major.value = Object.hasOwn(assessment, profile.major) ? profile.major : "";
    if (!major.value) delete profile.major;
    major.disabled = false;
    showMajor();
    showComparison();
    renderSignals();
    render();
  } catch {
    message.textContent = "Could not load the assessment. Reload to retry.";
  }
}
initialize();

