const state = {
  patients: JSON.parse(localStorage.getItem("cc_patients") || "[]"),
  calls: JSON.parse(localStorage.getItem("cc_calls") || "[]"),
  stock: JSON.parse(localStorage.getItem("cc_stock") || "[]"),
  finance: JSON.parse(localStorage.getItem("cc_finance") || "[]"),
  ticket: Number(localStorage.getItem("cc_ticket") || 0),
  panelVideoUrl: localStorage.getItem("cc_panel_video_url") || "",
};

const ui = {
  lastToastCallId: state.calls[0] ? state.calls[0].id : null,
  alertTimeoutId: null,
};

const byId = (id) => document.getElementById(id);
const money = (v) => Number(v).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

function save() {
  localStorage.setItem("cc_patients", JSON.stringify(state.patients));
  localStorage.setItem("cc_calls", JSON.stringify(state.calls));
  localStorage.setItem("cc_stock", JSON.stringify(state.stock));
  localStorage.setItem("cc_finance", JSON.stringify(state.finance));
  localStorage.setItem("cc_ticket", String(state.ticket));
  localStorage.setItem("cc_panel_video_url", state.panelVideoUrl || "");
}

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

function toLocalDate(dateISO) {
  return new Date(`${dateISO}T00:00:00`).toLocaleDateString("pt-BR");
}

function stockStatus(validade) {
  const now = new Date(`${todayStr()}T00:00:00`);
  const exp = new Date(`${validade}T00:00:00`);
  const days = Math.ceil((exp - now) / 86400000);

  if (days < 0) return { label: "Vencido", cls: "expired" };
  if (days <= 30) return { label: `Vence em ${days}d`, cls: "expiring" };
  return { label: "Dentro da validade", cls: "safe" };
}

function showConfigMessage(msg, isError = false) {
  const el = byId("configMessage");
  if (!el) return;
  el.textContent = msg;
  el.classList.toggle("error", isError);
}

function normalizeDate(value) {
  if (!value) return null;
  const raw = String(value).trim();
  if (!raw) return null;
  if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) return raw;

  const br = raw.match(/^(\d{2})[\/\-](\d{2})[\/\-](\d{4})$/);
  if (br) {
    const [, dd, mm, yyyy] = br;
    return `${yyyy}-${mm}-${dd}`;
  }

  const dt = new Date(raw);
  if (Number.isNaN(dt.getTime())) return null;
  return dt.toISOString().slice(0, 10);
}

function normalizeStockEntry(entry) {
  if (!entry || typeof entry !== "object") return null;

  const item = String(entry.item || "").trim();
  const lote = String(entry.lote || "").trim();
  const quantidade = Number(entry.quantidade);
  const validade = normalizeDate(entry.validade);

  if (!item || !lote || !Number.isFinite(quantidade) || quantidade <= 0 || !validade) return null;

  return {
    id: entry.id || crypto.randomUUID(),
    item,
    lote,
    quantidade,
    validade,
    createdAt: entry.createdAt || new Date().toISOString(),
  };
}

function parseYoutubeEmbed(url) {
  try {
    const u = new URL(url);
    const host = u.hostname.toLowerCase();
    let id = "";

    if (host.includes("youtu.be")) {
      id = u.pathname.replace("/", "");
    } else if (host.includes("youtube.com")) {
      if (u.pathname.startsWith("/shorts/")) {
        id = u.pathname.split("/")[2] || "";
      } else {
        id = u.searchParams.get("v") || "";
      }
    }

    if (!id) return null;
    const originParam = /^https?:/i.test(window.location.protocol)
      ? `&origin=${encodeURIComponent(window.location.origin)}`
      : "";
    return `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&mute=1&controls=0&loop=1&playlist=${id}&rel=0&modestbranding=1${originParam}`;
  } catch {
    return null;
  }
}

function isPanelFullscreen() {
  return document.fullscreenElement === byId("painel");
}

function applyPanelVideo() {
  const frame = byId("panelVideoFrame");
  const localVideo = byId("panelVideoLocal");
  if (!frame || !localVideo) return;

  const raw = String(state.panelVideoUrl || "").trim();
  const youtubeEmbed = parseYoutubeEmbed(raw);

  if (!raw) {
    frame.src = "";
    frame.style.display = "none";
    localVideo.pause();
    localVideo.removeAttribute("src");
    localVideo.load();
    localVideo.style.display = "none";
    return;
  }

  if (youtubeEmbed) {
    if (window.location.protocol === "file:") {
      showConfigMessage("YouTube pode falhar no arquivo local (erro 153). Abra o sistema via http://localhost.", true);
    }
    frame.src = youtubeEmbed;
    frame.style.display = "block";
    localVideo.pause();
    localVideo.removeAttribute("src");
    localVideo.load();
    localVideo.style.display = "none";
    return;
  }

  frame.src = "";
  frame.style.display = "none";
  localVideo.src = raw;
  localVideo.muted = true;
  localVideo.volume = 0;
  localVideo.style.display = "block";
  if (isPanelFullscreen()) localVideo.play().catch(() => {});
}

function updateFullscreenButton() {
  const btn = byId("panelFullscreenBtn");
  if (!btn) return;
  btn.textContent = isPanelFullscreen() ? "Sair da tela cheia" : "Tela cheia";
}

function announceCall(call) {
  if (!("speechSynthesis" in window)) return;
  const place = call.destination || "consultório";
  const text = `Paciente ${call.name}, por favor dirigir-se a ${place}.`;

  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "pt-BR";
  utter.rate = 0.96;
  utter.pitch = 1;
  utter.volume = 1;
  window.speechSynthesis.speak(utter);
}

function showCurrentCallAlert(call, prefix = "Chamada atual") {
  const alert = byId("currentCallAlert");
  const title = byId("currentCallAlertTitle");
  const place = byId("currentCallAlertPlace");
  const time = byId("currentCallAlertTime");
  const panel = byId("painel");
  const panelVisible = panel && panel.classList.contains("active");
  if (!alert || !title || !place || !time || (!isPanelFullscreen() && !panelVisible)) return;

  time.textContent = `${prefix} - ${new Date(call.time).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}`;
  title.textContent = `Senha ${call.ticket} - ${call.name}`;
  place.textContent = `Dirigir-se a ${call.destination || "consultório"}`;

  alert.classList.remove("show");
  void alert.offsetWidth;
  alert.classList.add("show");

  clearTimeout(ui.alertTimeoutId);
  ui.alertTimeoutId = setTimeout(() => {
    alert.classList.remove("show");
  }, 9000);
}

function getSelectedDestination(patientId) {
  const sel = document.querySelector(`select[data-destination-id="${patientId}"]`);
  return sel ? sel.value : "consultório";
}

function renderFullscreenHistory() {
  const list = byId("fullscreenHistoryList");
  if (!list) return;

  list.innerHTML = "";
  state.calls.slice(0, 8).forEach((c) => {
    const li = document.createElement("li");
    li.textContent = `${new Date(c.time).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })} - Senha ${c.ticket} (${c.name}) -> ${c.destination || "consultório"}`;
    list.appendChild(li);
  });
}

function bindPanel() {
  const btn = byId("panelFullscreenBtn");
  if (!btn) return;

  btn.addEventListener("click", async () => {
    const panel = byId("painel");
    if (!panel) return;

    try {
      if (isPanelFullscreen()) {
        await document.exitFullscreen();
      } else {
        await panel.requestFullscreen();
      }
    } catch {
      showConfigMessage("Nao foi possivel alternar a tela cheia do painel.", true);
    }
  });

  document.addEventListener("fullscreenchange", () => {
    updateFullscreenButton();
    applyPanelVideo();
    renderFullscreenHistory();

    if (!isPanelFullscreen()) {
      const alert = byId("currentCallAlert");
      if (alert) alert.classList.remove("show");
      return;
    }

    const latest = state.calls[0];
    if (latest) {
      ui.lastToastCallId = latest.id;
      showCurrentCallAlert(latest, "Ultima chamada");
    }
  });

  updateFullscreenButton();
  applyPanelVideo();
  renderFullscreenHistory();
}

function downloadJSON(filename, payload) {
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function parseDelimitedRows(text) {
  const lines = String(text || "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length < 2) return [];

  const sepCandidates = [";", "\t", ","];
  const header = lines[0];
  const sep = sepCandidates
    .map((candidate) => ({ candidate, count: header.split(candidate).length - 1 }))
    .sort((a, b) => b.count - a.count)[0].candidate;

  const splitLine = (line) => line.split(sep).map((part) => part.trim());
  const headers = splitLine(lines[0]).map((h) => h.toLowerCase());

  const idxItem = headers.findIndex((h) => ["item", "produto", "material", "nome", "desc", "descricao"].includes(h));
  const idxLote = headers.findIndex((h) => h === "lote");
  const idxQtd = headers.findIndex((h) => ["quantidade", "qtd", "qtde"].includes(h));
  const idxValidade = headers.findIndex((h) => ["validade", "vencimento", "venc", "data_validade", "data validade"].includes(h));

  if ([idxItem, idxLote, idxQtd, idxValidade].some((i) => i < 0)) return [];

  return lines.slice(1).map((line) => {
    const cols = splitLine(line);
    return {
      item: cols[idxItem],
      lote: cols[idxLote],
      quantidade: cols[idxQtd],
      validade: cols[idxValidade],
    };
  });
}

function bindConfig() {
  const exportBtn = byId("exportConfigBtn");
  const importFile = byId("importConfigFile");
  const importStockJsonBtn = byId("importStockJsonBtn");
  const convertSpreadsheetBtn = byId("convertSpreadsheetBtn");
  const importSpreadsheetBtn = byId("importSpreadsheetBtn");
  const stockJsonInput = byId("stockJsonInput");
  const spreadsheetInput = byId("spreadsheetInput");
  const spreadsheetJsonOutput = byId("spreadsheetJsonOutput");
  const panelVideoUrlInput = byId("panelVideoUrlInput");
  const savePanelVideoBtn = byId("savePanelVideoBtn");

  if (!exportBtn) return;

  if (panelVideoUrlInput) panelVideoUrlInput.value = state.panelVideoUrl || "";

  exportBtn.addEventListener("click", () => {
    const payload = {
      version: 1,
      exportedAt: new Date().toISOString(),
      data: {
        patients: state.patients,
        calls: state.calls,
        stock: state.stock,
        finance: state.finance,
        ticket: state.ticket,
        panelVideoUrl: state.panelVideoUrl,
      },
    };
    downloadJSON(`cardioclin-backup-${todayStr()}.json`, payload);
    showConfigMessage("Backup exportado com sucesso.");
  });

  importFile.addEventListener("change", async () => {
    const file = importFile.files && importFile.files[0];
    if (!file) return;

    try {
      const raw = await file.text();
      const parsed = JSON.parse(raw);
      const data = parsed.data || parsed;

      if (!data || typeof data !== "object") throw new Error("JSON invalido.");

      state.patients = Array.isArray(data.patients) ? data.patients : [];
      state.calls = Array.isArray(data.calls) ? data.calls : [];
      state.stock = Array.isArray(data.stock) ? data.stock.map(normalizeStockEntry).filter(Boolean) : [];
      state.finance = Array.isArray(data.finance) ? data.finance : [];
      state.ticket = Number.isFinite(Number(data.ticket)) ? Number(data.ticket) : 0;
      state.panelVideoUrl = typeof data.panelVideoUrl === "string" ? data.panelVideoUrl : "";

      if (panelVideoUrlInput) panelVideoUrlInput.value = state.panelVideoUrl;

      save();
      applyPanelVideo();
      renderAll();
      showConfigMessage("Configuracao importada com sucesso.");
    } catch {
      showConfigMessage("Falha ao importar JSON de configuracao.", true);
    } finally {
      importFile.value = "";
    }
  });

  importStockJsonBtn.addEventListener("click", () => {
    try {
      const parsed = JSON.parse(stockJsonInput.value || "[]");
      if (!Array.isArray(parsed)) throw new Error("Formato invalido");
      const normalized = parsed.map(normalizeStockEntry).filter(Boolean);
      if (!normalized.length) throw new Error("Sem itens validos");

      state.stock = normalized;
      save();
      renderAll();
      showConfigMessage(`Estoque importado com ${normalized.length} item(ns).`);
    } catch {
      showConfigMessage("JSON de estoque invalido. Verifique os campos obrigatorios.", true);
    }
  });

  convertSpreadsheetBtn.addEventListener("click", () => {
    const rows = parseDelimitedRows(spreadsheetInput.value);
    const normalized = rows.map(normalizeStockEntry).filter(Boolean);
    spreadsheetJsonOutput.textContent = JSON.stringify(normalized, null, 2);

    if (!normalized.length) {
      showConfigMessage("Nao foi possivel converter os dados da planilha. Confira cabecalhos e valores.", true);
      return;
    }
    showConfigMessage(`Conversao concluida: ${normalized.length} item(ns).`);
  });

  importSpreadsheetBtn.addEventListener("click", () => {
    const rows = parseDelimitedRows(spreadsheetInput.value);
    const normalized = rows.map(normalizeStockEntry).filter(Boolean);

    if (!normalized.length) {
      showConfigMessage("Sem linhas validas para importar.", true);
      return;
    }

    state.stock = normalized;
    save();
    renderAll();
    spreadsheetJsonOutput.textContent = JSON.stringify(normalized, null, 2);
    showConfigMessage(`Planilha importada para o estoque com ${normalized.length} item(ns).`);
  });

  savePanelVideoBtn.addEventListener("click", () => {
    state.panelVideoUrl = (panelVideoUrlInput.value || "").trim();
    save();
    applyPanelVideo();
    showConfigMessage("Link do video do painel salvo.");
  });
}

function renderTabs() {
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".tab-btn").forEach((b) => b.classList.remove("active"));
      document.querySelectorAll(".tab-content").forEach((tab) => tab.classList.remove("active"));
      btn.classList.add("active");
      byId(btn.dataset.tab).classList.add("active");
    });
  });
}

function renderReception() {
  const list = byId("queueList");
  list.innerHTML = "";

  state.patients
    .filter((p) => p.status !== "done")
    .sort((a, b) => a.ticket - b.ticket)
    .forEach((p) => {
      const li = document.createElement("li");
      li.textContent = `${p.ticket} - ${p.nome} (${p.convenio})`;
      list.appendChild(li);
    });
}

function renderAppointments() {
  const table = byId("appointmentsTable");
  table.innerHTML = "";

  state.patients.forEach((p) => {
    if (!p.id) p.id = crypto.randomUUID();
  });

  [...state.patients]
    .sort((a, b) => a.ticket - b.ticket)
    .forEach((p) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${p.ticket}</td>
        <td>${p.nome}</td>
        <td>${new Date(p.createdAt).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}</td>
        <td><span class="status ${p.status}">${p.status === "waiting" ? "Aguardando" : p.status === "called" ? "Chamado" : "Finalizado"}</span></td>
        <td>
          <select data-destination data-destination-id="${p.id}">
            <option value="consultório">Consultório</option>
            <option value="sala de medicação">Sala de medicação</option>
            <option value="recepção">Recepção</option>
          </select>
        </td>
        <td>
          <button class="btn primary" data-action="call" data-id="${p.id}">Chamar</button>
          <button class="btn" data-action="done" data-id="${p.id}">Finalizar</button>
        </td>
      `;
      table.appendChild(tr);
    });

  table.querySelectorAll("button").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      const target = state.patients.find((p) => p.id === id);
      if (!target) return;

      if (btn.dataset.action === "call") {
        const destination =
          btn.closest("tr")?.querySelector("select[data-destination]")?.value || getSelectedDestination(id);
        target.status = "called";
        const call = {
          id: crypto.randomUUID(),
          ticket: target.ticket,
          name: target.nome,
          time: new Date().toISOString(),
          destination,
        };
        state.calls.unshift(call);
        state.calls = state.calls.slice(0, 15);
        announceCall(call);
        showCurrentCallAlert(call);
      } else {
        target.status = "done";
      }

      save();
      renderAll();
    });
  });
}

function renderPanel() {
  const last = state.calls[0];
  byId("lastCall").textContent = last
    ? `Senha ${last.ticket} - ${last.name} -> ${last.destination || "consultório"}`
    : "Nenhuma chamada realizada";

  const panelQueue = byId("panelQueue");
  panelQueue.innerHTML = "";
  state.patients
    .filter((p) => p.status === "waiting")
    .sort((a, b) => a.ticket - b.ticket)
    .slice(0, 6)
    .forEach((p) => {
      const li = document.createElement("li");
      li.textContent = `Senha ${p.ticket} - ${p.nome}`;
      panelQueue.appendChild(li);
    });

  const called = byId("calledHistory");
  called.innerHTML = "";
  state.calls.slice(0, 8).forEach((c) => {
    const li = document.createElement("li");
    li.textContent = `${new Date(c.time).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })} - Senha ${c.ticket} (${c.name}) -> ${c.destination || "consultório"}`;
    called.appendChild(li);
  });

  renderFullscreenHistory();

  const latest = state.calls[0];
  if (latest && latest.id !== ui.lastToastCallId) {
    ui.lastToastCallId = latest.id;
    showCurrentCallAlert(latest);
  }
}

function renderStock() {
  const table = byId("stockTable");
  table.innerHTML = "";

  state.stock.forEach((s) => {
    const st = stockStatus(s.validade);
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${s.item}</td>
      <td>${s.lote}</td>
      <td>${s.quantidade}</td>
      <td>${toLocalDate(s.validade)}</td>
      <td><span class="status ${st.cls}">${st.label}</span></td>
      <td><button class="btn danger" data-id="${s.id}">Baixar 1 un.</button></td>
    `;
    table.appendChild(tr);
  });

  table.querySelectorAll("button").forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = state.stock.find((s) => s.id === btn.dataset.id);
      if (!target) return;
      target.quantidade -= 1;
      if (target.quantidade <= 0) {
        state.stock = state.stock.filter((s) => s.id !== target.id);
      }
      save();
      renderAll();
    });
  });
}

function renderFinance() {
  const table = byId("financeTable");
  table.innerHTML = "";

  let revenue = 0;
  let expense = 0;

  state.finance.forEach((f) => {
    if (f.tipo === "receita") revenue += Number(f.valor);
    if (f.tipo === "despesa") expense += Number(f.valor);

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${f.tipo === "receita" ? "Receita" : "Despesa"}</td>
      <td>${f.descricao}</td>
      <td>${money(f.valor)}</td>
      <td>${toLocalDate(f.vencimento)}</td>
      <td><button class="btn danger" data-id="${f.id}">Excluir</button></td>
    `;
    table.appendChild(tr);
  });

  byId("kpiRevenue").textContent = money(revenue);
  byId("kpiExpense").textContent = money(expense);
  byId("kpiBalance").textContent = money(revenue - expense);

  table.querySelectorAll("button").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.finance = state.finance.filter((f) => f.id !== btn.dataset.id);
      save();
      renderAll();
    });
  });
}

function renderReports() {
  const reports = byId("reportsList");
  const pending = state.patients.filter((p) => p.status === "waiting").length;
  const called = state.patients.filter((p) => p.status === "called").length;
  const expired = state.stock.filter((s) => stockStatus(s.validade).cls === "expired").length;
  const expiring = state.stock.filter((s) => stockStatus(s.validade).cls === "expiring").length;
  const revenue = state.finance.filter((f) => f.tipo === "receita").reduce((acc, f) => acc + Number(f.valor), 0);
  const expense = state.finance.filter((f) => f.tipo === "despesa").reduce((acc, f) => acc + Number(f.valor), 0);

  reports.innerHTML = `
    <li>Pacientes aguardando: <strong>${pending}</strong></li>
    <li>Pacientes chamados em consulta: <strong>${called}</strong></li>
    <li>Itens vencidos no estoque: <strong>${expired}</strong></li>
    <li>Itens vencendo em ate 30 dias: <strong>${expiring}</strong></li>
    <li>Resultado financeiro do periodo: <strong>${money(revenue - expense)}</strong></li>
  `;
}

function bindForms() {
  byId("patientForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    state.ticket += 1;

    state.patients.push({
      id: crypto.randomUUID(),
      ticket: state.ticket,
      nome: fd.get("nome"),
      cpf: fd.get("cpf"),
      telefone: fd.get("telefone"),
      convenio: fd.get("convenio"),
      queixa: fd.get("queixa"),
      createdAt: new Date().toISOString(),
      status: "waiting",
    });

    e.target.reset();
    save();
    renderAll();
  });

  byId("stockForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    state.stock.push({
      id: crypto.randomUUID(),
      item: fd.get("item"),
      lote: fd.get("lote"),
      quantidade: Number(fd.get("quantidade")),
      validade: fd.get("validade"),
      createdAt: new Date().toISOString(),
    });

    e.target.reset();
    save();
    renderAll();
  });

  byId("financeForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);

    state.finance.push({
      id: crypto.randomUUID(),
      tipo: fd.get("tipo"),
      descricao: fd.get("descricao"),
      valor: Number(fd.get("valor")),
      vencimento: fd.get("vencimento"),
      createdAt: new Date().toISOString(),
    });

    e.target.reset();
    save();
    renderAll();
  });
}

function renderAll() {
  renderReception();
  renderAppointments();
  renderPanel();
  renderStock();
  renderFinance();
  renderReports();
}

function init() {
  byId("currentDate").textContent = new Date().toLocaleString("pt-BR", {
    dateStyle: "full",
    timeStyle: "short",
  });

  bindForms();
  bindConfig();
  bindPanel();
  window.addEventListener("storage", (e) => {
    if (!e.key || !e.key.startsWith("cc_")) return;
    state.patients = JSON.parse(localStorage.getItem("cc_patients") || "[]");
    state.calls = JSON.parse(localStorage.getItem("cc_calls") || "[]");
    state.stock = JSON.parse(localStorage.getItem("cc_stock") || "[]");
    state.finance = JSON.parse(localStorage.getItem("cc_finance") || "[]");
    state.ticket = Number(localStorage.getItem("cc_ticket") || 0);
    state.panelVideoUrl = localStorage.getItem("cc_panel_video_url") || "";
    renderAll();
    applyPanelVideo();
  });
  renderTabs();
  renderAll();
}

init();
