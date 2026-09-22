const SKILLS = [
  "laravel", "php", "vue", "nuxt", "react", "next", "flutter", "dart",
  "node", "python", "django", "docker", "redis", "mysql", "postgres",
  "nginx", "chapa", "api", "rest", "graphql", "typescript", "javascript",
];

function tokens(text) {
  return (text || "").toLowerCase().match(/[a-z][a-z0-9+.#-]*/g) || [];
}

function matchedSkills(jd) {
  const set = new Set(tokens(jd));
  return SKILLS.filter((s) => set.has(s) || [...set].some((t) => t.includes(s)));
}

function draft({ name, title, cv, jd }) {
  const matched = matchedSkills(jd);
  const matchLine = matched.length
    ? `Overlap with this role: ${matched.slice(0, 8).join(", ")}.`
    : "I work across Laravel, Vue, Flutter, and Node in production.";
  const roleHint = (jd.match(/(?:looking for|seeking|hiring)\s+([^.!\n]{8,60})/i) || [])[1];
  const opener = roleHint
    ? `I saw the opening for ${roleHint.trim()}.`
    : "I saw your opening and wanted to reach out.";

  return [
    `Hi — I'm ${name}, ${title} based in Addis Ababa.`,
    opener,
    cv.trim(),
    matchLine,
    "Happy to share a CV or jump on a short call. Thanks for reading.",
    "",
    "— Matched bullets to emphasize —",
    ...matched.slice(0, 6).map((s) => `• Emphasize recent ${s} work and metrics from production.`),
  ].join("\n");
}

document.getElementById("run").addEventListener("click", () => {
  const payload = {
    name: document.getElementById("name").value.trim() || "Biruk Endrias",
    title: document.getElementById("title").value.trim() || "Full Stack Developer",
    cv: document.getElementById("cv").value,
    jd: document.getElementById("jd").value,
  };
  document.getElementById("out").value = draft(payload);
});

document.getElementById("copy").addEventListener("click", async () => {
  const out = document.getElementById("out").value;
  if (out) await navigator.clipboard.writeText(out);
});
