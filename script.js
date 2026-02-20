/* ================= VARIÁVEIS GLOBAIS ================= */
let colunas = [];
let dados = [];

const STORAGE_KEY = "crud_excel_dados";
const STORAGE_COLS = "crud_excel_colunas";

/* ================= MENU ================= */
function mostrar(id) {
  document.querySelectorAll("section").forEach(s =>
    s.classList.remove("active")
  );
  document.getElementById(id).classList.add("active");
}

/* ================= PERSISTÊNCIA ================= */
function salvarDados() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(dados));
  localStorage.setItem(STORAGE_COLS, JSON.stringify(colunas));
}

function carregarDados() {
  const dadosSalvos = localStorage.getItem(STORAGE_KEY);
  const colunasSalvas = localStorage.getItem(STORAGE_COLS);

  if (dadosSalvos && colunasSalvas) {
    dados = JSON.parse(dadosSalvos);
    colunas = JSON.parse(colunasSalvas);
    renderTabela();
  }
}

/* ================= LOGO ================= */
const logoImg = document.getElementById("logoImg");

const logoSalva = localStorage.getItem("logo");
if (logoSalva) {
  logoImg.src = logoSalva;
  logoImg.style.display = "block";
}

function salvarLogoURL() {
  const url = document.getElementById("logoUrl").value;
  if (!url) return alert("Informe a URL da logo");

  localStorage.setItem("logo", url);
  logoImg.src = url;
  logoImg.style.display = "block";
}

function salvarLogoArquivo(file) {
  if (!file) return;

  const reader = new FileReader();
  reader.onload = e => {
    localStorage.setItem("logo", e.target.result);
    logoImg.src = e.target.result;
    logoImg.style.display = "block";
  };
  reader.readAsDataURL(file);
}

/* ================= IMPORTAÇÃO ================= */
document.getElementById("fileInput").addEventListener("change", function () {
  if (!this.files.length) return;

  const reader = new FileReader();
  reader.onload = e => {
    const wb = XLSX.read(e.target.result, { type: "array" });
    const sheet = wb.Sheets[wb.SheetNames[0]];

    dados = XLSX.utils.sheet_to_json(sheet, { defval: "" });
    colunas = Object.keys(dados[0] || {});

    salvarDados();
    renderTabela();
    mostrar("dados");
  };

  reader.readAsArrayBuffer(this.files[0]);
});

/* ================= RENDERIZAÇÃO ================= */
function renderTabela() {
  const container = document.getElementById("tabela");
  container.innerHTML = "";

  if (!dados.length) {
    container.innerHTML = "<p>Nenhum dado carregado</p>";
    return;
  }

  const table = document.createElement("table");
  const thead = document.createElement("thead");
  const trHead = document.createElement("tr");

  colunas.forEach(c => {
    const th = document.createElement("th");
    th.textContent = c;
    trHead.appendChild(th);
  });

  const thAcoes = document.createElement("th");
  thAcoes.textContent = "Ações";
  trHead.appendChild(thAcoes);

  thead.appendChild(trHead);
  table.appendChild(thead);

  const tbody = document.createElement("tbody");

  dados.forEach((linha, i) => {
    const tr = document.createElement("tr");

    colunas.forEach(col => {
      const td = document.createElement("td");
      const input = document.createElement("input");

      input.value = linha[col];
      input.oninput = e => {
        dados[i][col] = e.target.value;
        salvarDados();
      };

      td.appendChild(input);
      tr.appendChild(td);
    });

    const tdAcao = document.createElement("td");
    const btn = document.createElement("button");
    btn.textContent = "🗑";
    btn.onclick = () => removerLinha(i);
    tdAcao.appendChild(btn);
    tr.appendChild(tdAcao);

    tbody.appendChild(tr);
  });

  table.appendChild(tbody);
  container.appendChild(table);
}

/* ================= CRUD ================= */
function adicionarLinha() {
  if (!colunas.length) {
    const qtd = prompt("Quantas colunas deseja criar?");
    if (!qtd) return;

    colunas = [];
    for (let i = 1; i <= qtd; i++) {
      const nome = prompt(`Nome da coluna ${i}`);
      if (nome) colunas.push(nome);
    }
  }

  const nova = {};
  colunas.forEach(c => nova[c] = "");

  dados.unshift(nova); // aparece no topo
  salvarDados();
  renderTabela();
}

function removerLinha(i) {
  if (!confirm("Remover este registro?")) return;

  dados.splice(i, 1);
  salvarDados();
  renderTabela();
}

/* ================= EXPORTAÇÃO ================= */
function exportarExcel() {
  if (!dados.length) {
    alert("Nenhum dado para exportar");
    return;
  }

  const ws = XLSX.utils.json_to_sheet(dados);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Dados");
  XLSX.writeFile(wb, "crud_exportado.xlsx");
}

/* ================= LIMPAR REGISTROS ================= */
function limparRegistros() {
  if (!confirm("ATENÇÃO: isso apagará TODOS os registros salvos. Continuar?")) return;

  dados = [];
  colunas = [];

  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(STORAGE_COLS);

  renderTabela();
  alert("Registros apagados com sucesso");
}

/* ================= INICIALIZAÇÃO ================= */
carregarDados();
