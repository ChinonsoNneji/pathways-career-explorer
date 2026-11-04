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
  profile.major = major.value;
  profile.signals = [];
  renderSignals();
  render();
  save();
});

async function initialize() {
  try {
    const response = await fetch("/api/v1/assessment");
    if (!response.ok) throw new Error("Assessment unavailable");
    assessment = await response.json();
    for (const name of Object.keys(assessment)) add(major, "option", name);
    major.value = Object.hasOwn(assessment, profile.major) ? profile.major : "";
    if (!major.value) delete profile.major;
    major.disabled = false;
    renderSignals();
    render();
  } catch {
    message.textContent = "Could not load the assessment. Reload to retry.";
  }
}
initialize();

