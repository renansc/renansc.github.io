const state = {
  patients: JSON.parse(localStorage.getItem("cc_patients") || "[]"),
  calls: JSON.parse(localStorage.getItem("cc_calls") || "[]"),
  stock: JSON.parse(localStorage.getItem("cc_stock") || "[]"),
  finance: JSON.parse(localStorage.getItem("cc_finance") || "[]"),
  ticket: Number(localStorage.getItem("cc_ticket") || 0),
};

const byId = (id) => document.getElementById(id);
const money = (v) => Number(v).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

function save() {
  localStorage.setItem("cc_patients", JSON.stringify(state.patients));
  localStorage.setItem("cc_calls", JSON.stringify(state.calls));
  localStorage.setItem("cc_stock", JSON.stringify(state.stock));
  localStorage.setItem("cc_finance", JSON.stringify(state.finance));
  localStorage.setItem("cc_ticket", String(state.ticket));
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

  if (days < 0) {
    return { label: "Vencido", cls: "expired" };
  }
  if (days <= 30) {
    return { label: `Vence em ${days}d`, cls: "expiring" };
  }
  return { label: "Dentro da validade", cls: "safe" };
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

  state.patients
    .sort((a, b) => a.ticket - b.ticket)
    .forEach((p) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${p.ticket}</td>
        <td>${p.nome}</td>
        <td>${new Date(p.createdAt).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}</td>
        <td><span class="status ${p.status}">${p.status === "waiting" ? "Aguardando" : p.status === "called" ? "Chamado" : "Finalizado"}</span></td>
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
        target.status = "called";
        state.calls.unshift({
          id: crypto.randomUUID(),
          ticket: target.ticket,
          name: target.nome,
          time: new Date().toISOString(),
        });
        state.calls = state.calls.slice(0, 15);
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
  byId("lastCall").textContent = last ? `Senha ${last.ticket} - ${last.name}` : "Nenhuma chamada realizada";

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
    li.textContent = `${new Date(c.time).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })} - Senha ${c.ticket} (${c.name})`;
    called.appendChild(li);
  });
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
    <li>Itens vencendo em até 30 dias: <strong>${expiring}</strong></li>
    <li>Resultado financeiro do período: <strong>${money(revenue - expense)}</strong></li>
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
  renderTabs();
  renderAll();
}

init();
