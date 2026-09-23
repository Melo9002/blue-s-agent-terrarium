const agentsElement = document.querySelector("#agents");
const form = document.querySelector("#event-form");
const eventText = document.querySelector("#event-text");
const importance = document.querySelector("#importance");
const importanceOutput = document.querySelector("#importance-output");
const reactions = document.querySelector("#reactions");
const emptyState = document.querySelector("#empty-state");
const sendButton = document.querySelector("#send");
let agentList = [];

async function getJson(url, options) {
  const response = await fetch(url, options);
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || `HTTP ${response.status}`);
  return data;
}

function selectedAgentIds() {
  return [...document.querySelectorAll(".agent-card input:checked")].map((input) => input.value);
}

function renderAgents() {
  agentsElement.replaceChildren(...agentList.map((agent) => {
    const label = document.createElement("label");
    label.className = "agent-card selected";
    label.innerHTML = `
      <input type="checkbox" value="${agent.id}" checked>
      <div class="agent-name"><span>${agent.name}</span><span class="agent-check">●</span></div>
      <p class="agent-identity">${agent.identity}</p>
      <div class="tags">${agent.interests.map((interest) => `<span class="tag">${interest}</span>`).join("")}</div>`;
    label.querySelector("input").addEventListener("change", (event) => {
      label.classList.toggle("selected", event.target.checked);
    });
    return label;
  }));
}

function addReaction(event, result) {
  emptyState.hidden = true;
  const article = document.createElement("article");
  article.className = `reaction ${result.status}`;
  const message = result.status === "ignored"
    ? `Stayed quiet — ${result.reason}.`
    : result.status === "error"
      ? result.error
      : result.text || "Chose not to speak.";
  const details = [result.status, result.emotion, result.animation, result.latencyMs === undefined ? null : `${result.latencyMs} ms`].filter(Boolean).join(" · ");
  article.innerHTML = `
    <p class="event-copy">${event.payload.text}</p>
    <div class="reaction-head"><span class="reaction-name">${result.agent}</span><span class="reaction-meta">${details}</span></div>
    <p>${message}</p>`;
  reactions.prepend(article);
}

importance.addEventListener("input", () => {
  importanceOutput.value = `Importance ${importance.value}`;
});

document.querySelector("#select-all").addEventListener("click", () => {
  document.querySelectorAll(".agent-card input").forEach((input) => {
    input.checked = true;
    input.closest(".agent-card").classList.add("selected");
  });
});

document.querySelector("#clear").addEventListener("click", () => {
  reactions.replaceChildren();
  emptyState.hidden = false;
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const agentIds = selectedAgentIds();
  if (!agentIds.length) return window.alert("Select at least one inhabitant.");
  sendButton.disabled = true;
  sendButton.textContent = "Observing…";
  try {
    const data = await getJson("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: eventText.value, importance: Number(importance.value), agentIds }),
    });
    data.results.forEach((result) => addReaction(data.event, result));
    eventText.value = "";
    eventText.focus();
  } catch (error) {
    window.alert(error.message);
  } finally {
    sendButton.disabled = false;
    sendButton.textContent = "Release event";
  }
});

try {
  const [status, agents] = await Promise.all([getJson("/api/status"), getJson("/api/agents")]);
  document.querySelector("#provider").textContent = `${status.provider} provider`;
  agentList = agents;
  renderAgents();
} catch (error) {
  document.querySelector("#provider").textContent = "Host unavailable";
  emptyState.textContent = error.message;
}
