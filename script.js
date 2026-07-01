const RENDER_BASE_URL = "https://nanotech-lvoz.onrender.com";
const MENU_APPS_FILE = "menuapps.txt";

const fallbackProjects = [
  {
    nome: "RIS+PACS",
    empresa: "LAB.STA TEREZINHA",
    href: "https://rispacsfull.onrender.com/",
    tipo: "direto"
  },
  {
    nome: "RIS+CLN",
    empresa: "CARDIO CLIN",
    href: "https://cardioclin.onrender.com/",
    tipo: "direto"
  },
  {
    nome: "Financeiro",
    empresa: "srv/financeiro",
    href: `${RENDER_BASE_URL}/financeiro`,
    tipo: "full"
  },
  {
    nome: "GPSMusical",
    empresa: "srv/gpsmusical",
    href: `${RENDER_BASE_URL}/gpsmusical`,
    tipo: "full"
  },
  {
    nome: "Zap",
    empresa: "srv/zap",
    href: `${RENDER_BASE_URL}/zap/`,
    tipo: "full"
  },
  {
    nome: "NanoPonto",
    empresa: "srv/NanoPonto",
    href: `${RENDER_BASE_URL}/nanoponto/`,
    tipo: "full"
  }
];

const descriptions = {
  "ris-pacs": "Ambiente de imagem e fluxo RIS/PACS para laboratório.",
  "ris-cln": "Sistema clínico para atendimento, agenda e rotina operacional.",
  "crm-voip-cam": "Integração de atendimento, telefonia, CRM e câmera.",
  "ris-bpa": "Rota interna para prontuário, atendimentos e BPA.",
  financeiro: "Controle financeiro com contas, categorias, compras e conciliação.",
  gpsmusical: "Organização de repertório, músicas, letras e blocos.",
  zap: "Fluxo de atendimento e automação para WhatsApp.",
  nanoponto: "Controle de presença e registro de ponto eletrônico."
};

const accents = ["cyan", "magenta", "lime", "amber"];

const courseGroups = [
  {
    id: "shell",
    number: "01",
    title: "Shell e operadores",
    summary: "Primeiros comandos para entender como o Bash interpreta nomes, atalhos, saídas e decisões simples.",
    commands: [
      ["type", "Mostra se um nome é comando interno, alias, função ou executável."],
      ["alias", "Cria atalhos para comandos usados com frequência."],
      ["chsh", "Troca o shell padrão do usuário."],
      ["&&", "Executa o próximo comando apenas se o anterior terminou com sucesso."],
      ["||", "Executa o próximo comando quando o anterior falha."],
      ["echo", "Imprime texto, variáveis e resultados simples no terminal."],
      ["quoting", "Controla aspas simples, aspas duplas, escape e expansão de variáveis."]
    ]
  },
  {
    id: "ambiente",
    number: "02",
    title: "Ambiente e sistema",
    summary: "Comandos para ver variáveis, estado da sessão, sistema operacional e diretório atual.",
    commands: [
      ["env", "Lista variáveis de ambiente disponíveis para processos."],
      ["set", "Mostra variáveis e opções da sessão do shell."],
      ["unset", "Remove variáveis ou funções da sessão."],
      ["export", "Torna uma variável disponível para processos filhos."],
      ["uname", "Exibe informações do kernel e da arquitetura."],
      ["pwd", "Mostra o caminho do diretório atual."]
    ]
  },
  {
    id: "ajuda",
    number: "03",
    title: "Ajuda e descoberta",
    summary: "Ferramentas para pesquisar documentação e descobrir onde comandos e manuais vivem no sistema.",
    commands: [
      ["man", "Abre o manual de comandos e arquivos de configuração."],
      ["whatis", "Mostra uma descrição curta de um comando."],
      ["apropos", "Pesquisa manuais por assunto ou palavra-chave."],
      ["whereis", "Localiza binários, fontes e páginas de manual."]
    ]
  },
  {
    id: "texto",
    number: "04",
    title: "Texto e filtros",
    summary: "Leitura, contagem, ordenação e transformação de arquivos texto, logs e saídas de comandos.",
    commands: [
      ["cat", "Exibe ou concatena arquivos."],
      ["wc", "Conta linhas, palavras e bytes."],
      ["nl", "Numera linhas de um arquivo."],
      ["sort", "Ordena linhas de texto."],
      ["less", "Navega por arquivos longos sem carregá-los inteiros na tela."],
      ["head", "Mostra o começo de um arquivo."],
      ["tail", "Mostra o final de um arquivo, muito usado com logs."],
      ["uniq", "Remove ou conta linhas repetidas consecutivas."],
      ["od", "Inspeciona conteúdo em formatos como octal e hexadecimal."],
      ["tr", "Traduz, remove ou comprime caracteres."],
      ["cut", "Extrai colunas ou campos."],
      ["split", "Divide arquivos grandes em partes menores."],
      ["paste", "Combina linhas de arquivos lado a lado."]
    ]
  },
  {
    id: "checksums",
    number: "05",
    title: "Checksums e arquivos compactados",
    summary: "Validação de integridade e leitura rápida de conteúdo comprimido sem precisar extrair tudo antes.",
    commands: [
      ["md5sum", "Gera ou confere hash MD5."],
      ["sha256sum", "Gera ou confere hash SHA-256."],
      ["sha512sum", "Gera ou confere hash SHA-512."],
      ["bzcat", "Lê arquivos bzip2 direto no terminal."],
      ["xzcat", "Lê arquivos xz direto no terminal."],
      ["zcat", "Lê arquivos gzip direto no terminal."]
    ]
  },
  {
    id: "arquivos",
    number: "06",
    title: "Arquivos e diretórios",
    summary: "Navegação, criação, cópia, movimentação, remoção e busca no sistema de arquivos.",
    commands: [
      ["cd", "Muda o diretório atual."],
      ["ls", "Lista arquivos e diretórios."],
      ["file", "Identifica o tipo de arquivo."],
      ["touch", "Cria arquivo vazio ou atualiza data de modificação."],
      ["cp", "Copia arquivos e diretórios."],
      ["mv", "Move ou renomeia arquivos."],
      ["mkdir", "Cria diretórios."],
      ["rm", "Remove arquivos e diretórios."],
      ["rmdir", "Remove diretórios vazios."],
      ["find", "Pesquisa arquivos por nome, tipo, data, tamanho e ações."]
    ]
  },
  {
    id: "arquivo-pacote",
    number: "07",
    title: "Empacotamento, compressão e disco",
    summary: "Criação de pacotes, compressão, extração e cópias de baixo nível para backup ou manutenção.",
    commands: [
      ["tar", "Empacota e extrai coleções de arquivos."],
      ["gzip", "Compacta arquivos no formato gzip."],
      ["gunzip", "Descompacta arquivos gzip."],
      ["bzip2", "Compacta usando bzip2."],
      ["bunzip2", "Descompacta arquivos bzip2."],
      ["xz", "Compacta usando xz."],
      ["unxz", "Descompacta arquivos xz."],
      ["cpio", "Copia arquivos de e para arquivos de pacote."],
      ["dd", "Copia dados em blocos, útil para imagens e dispositivos."]
    ]
  },
  {
    id: "redirecionamento",
    number: "08",
    title: "Redirecionamento e pipelines",
    summary: "Controle de entrada, saída, erros e encadeamento de comandos para montar fluxos de trabalho.",
    commands: [
      ["stdin < arquivo", "Usa arquivo como entrada padrão."],
      ["stdout > arquivo", "Grava a saída padrão em arquivo."],
      ["stderr 2> arquivo", "Grava erros em arquivo separado."],
      ["pipe |", "Envia a saída de um comando para a entrada de outro."],
      ["&", "Executa comando em segundo plano quando usado ao final da linha."],
      ["xargs", "Transforma entrada em argumentos para outro comando."],
      ["tee", "Mostra a saída na tela e grava em arquivo ao mesmo tempo."]
    ]
  },
  {
    id: "processos",
    number: "09",
    title: "Processos e jobs",
    summary: "Visualização, busca, finalização e controle de programas em execução no terminal.",
    commands: [
      ["ps", "Lista processos."],
      ["pstree", "Mostra processos em árvore."],
      ["top", "Monitora processos em tempo real."],
      ["pgrep", "Busca processos por nome ou critério."],
      ["pidof", "Mostra o PID de um programa."],
      ["kill", "Envia sinais para processos."],
      ["pkill", "Finaliza processos por nome ou padrão."],
      ["killall", "Finaliza processos pelo nome do comando."],
      ["bg", "Retoma um job em segundo plano."],
      ["fg", "Traz um job para o primeiro plano."],
      ["jobs", "Lista jobs da sessão atual."],
      ["nohup", "Mantém comando rodando mesmo após sair da sessão."]
    ]
  },
  {
    id: "sessoes",
    number: "10",
    title: "Recursos e sessões",
    summary: "Comandos para observar recursos, repetir tarefas e manter várias sessões de terminal.",
    commands: [
      ["free", "Mostra uso de memória."],
      ["uptime", "Exibe tempo ligado, usuários e carga do sistema."],
      ["watch -n", "Executa um comando a cada intervalo de segundos."],
      ["screen", "Mantém sessões de terminal persistentes."],
      ["tmux", "Emula vários terminais, painéis e abas na mesma sessão."],
      ["Ctrl+B W", "No tmux, visualiza sessões, janelas e navegação multiabas."]
    ]
  }
];

const menuToggle = document.querySelector(".menu-toggle");
const menuPanel = document.getElementById("siteMenu");
const projectGrid = document.getElementById("projectsGrid");
const workCount = document.getElementById("workCount");
const courseTabs = document.getElementById("courseTabs");
const coursePanel = document.getElementById("coursePanel");

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function slugify(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function parseMenuApps(text) {
  const lines = String(text || "").split(/\r?\n/);
  let section = "direto";
  const projects = [];

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line || line.startsWith("APP")) continue;

    if (line === "[menuapps]") {
      section = "full";
      continue;
    }

    const columns = rawLine
      .split(/\t+/)
      .map((item) => item.trim())
      .filter(Boolean);

    if (columns.length < 2) continue;

    const href = columns[columns.length - 1];
    if (!href || !href.startsWith("http")) continue;

    projects.push({
      nome: columns[0],
      empresa: columns[1] || "",
      href,
      tipo: section
    });
  }

  return projects;
}

function projectMeta(project) {
  if (project.tipo === "full") return "Render / rota interna";
  if (project.href.includes("onrender.com")) return "Deploy Render";
  return "Link direto";
}

function projectDescription(project) {
  const slug = slugify(project.nome);
  return descriptions[slug] || "Projeto publicado para acesso rápido, validação e demonstração.";
}

function projectIcon(project) {
  return String(project.nome || "NT")
    .replace(/[^a-zA-Z0-9]/g, "")
    .slice(0, 2)
    .toUpperCase() || "NT";
}

function renderProjects(projects) {
  const normalized = projects.length ? projects : fallbackProjects;

  if (workCount) {
    const fullCount = normalized.filter((project) => project.tipo === "full").length;
    workCount.textContent = `${normalized.length} projetos, ${fullCount} rotas no Render`;
  }

  if (!projectGrid) return;

  projectGrid.innerHTML = normalized
    .map((project, index) => {
      const accent = accents[index % accents.length];
      const nome = escapeHtml(project.nome);
      const empresa = escapeHtml(project.empresa);
      const href = escapeHtml(project.href);
      const meta = escapeHtml(projectMeta(project));
      const descricao = escapeHtml(projectDescription(project));
      const icon = escapeHtml(projectIcon(project));

      return `
        <article class="project-card reveal" data-accent="${accent}">
          <div>
            <div class="project-top">
              <span class="project-tag">${meta}</span>
              <span class="project-icon" aria-hidden="true">${icon}</span>
            </div>
            <h3>${nome}</h3>
            <p>${descricao}</p>
          </div>
          <div class="project-footer">
            <small>${empresa}</small>
            <a href="${href}" target="_blank" rel="noreferrer">Abrir</a>
          </div>
        </article>
      `;
    })
    .join("");

  observeReveals();
}

async function loadProjects() {
  try {
    const response = await fetch(MENU_APPS_FILE, { cache: "no-store" });
    if (!response.ok) throw new Error("menuapps indisponível");

    const projects = parseMenuApps(await response.text());
    renderProjects(projects);
  } catch (error) {
    renderProjects(fallbackProjects);
  }
}

function renderCourseGroup(groupId) {
  if (!coursePanel) return;

  const group = courseGroups.find((item) => item.id === groupId) || courseGroups[0];
  if (!group) return;

  const commandCards = group.commands
    .map(([command, note]) => {
      return `
        <article class="command-card">
          <code>${escapeHtml(command)}</code>
          <span>${escapeHtml(note)}</span>
        </article>
      `;
    })
    .join("");

  coursePanel.innerHTML = `
    <div class="course-panel-head">
      <span class="course-badge">Subgrupo ${escapeHtml(group.number)}</span>
      <span>${group.commands.length} comandos</span>
    </div>
    <h3>${escapeHtml(group.title)}</h3>
    <p>${escapeHtml(group.summary)}</p>
    <div class="command-grid">${commandCards}</div>
  `;
}

function setActiveCourse(groupId) {
  const activeGroup = courseGroups.find((group) => group.id === groupId) || courseGroups[0];
  if (!activeGroup) return;

  courseTabs?.querySelectorAll("[data-course-target]").forEach((button) => {
    const isActive = button.dataset.courseTarget === activeGroup.id;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  });

  renderCourseGroup(activeGroup.id);
}

function renderCourseTabs() {
  if (!courseTabs) return;

  courseTabs.innerHTML = courseGroups
    .map((group, index) => {
      const active = index === 0;

      return `
        <button
          class="course-tab${active ? " is-active" : ""}"
          type="button"
          role="tab"
          aria-selected="${active}"
          data-course-target="${escapeHtml(group.id)}"
        >
          <span>${escapeHtml(group.number)}</span>
          ${escapeHtml(group.title)}
        </button>
      `;
    })
    .join("");

  setActiveCourse(courseGroups[0]?.id);
}

function setMenuOpen(open) {
  if (!menuToggle || !menuPanel) return;
  menuToggle.setAttribute("aria-expanded", String(open));
  menuPanel.hidden = !open;
}

menuToggle?.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  setMenuOpen(!isOpen);
});

menuPanel?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    setMenuOpen(false);
  }
});

courseTabs?.addEventListener("click", (event) => {
  const button = event.target.closest("[data-course-target]");
  if (!(button instanceof HTMLButtonElement)) return;
  setActiveCourse(button.dataset.courseTarget);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setMenuOpen(false);
  }
});

let revealObserver;

function observeReveals() {
  const reveals = document.querySelectorAll(".reveal:not(.is-observed)");

  if (!("IntersectionObserver" in window)) {
    reveals.forEach((element) => element.classList.add("is-visible", "is-observed"));
    return;
  }

  if (!revealObserver) {
    revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
  }

  reveals.forEach((element) => {
    element.classList.add("is-observed");
    revealObserver.observe(element);
  });
}

renderCourseTabs();
observeReveals();
loadProjects();
