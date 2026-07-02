const RENDER_BASE_URL = "https://nanotechsoft.onrender.com";
const MENU_APPS_FILE = "menuapps.txt";

const fallbackProjects = [
  {
    nome: "Automacao",
    empresa: "NanotechSoft",
    origem: "filesystem",
    href: `${RENDER_BASE_URL}/apps/automacao/original/`,
    tipo: "full"
  },
  {
    nome: "Financeiro",
    empresa: "NanotechSoft",
    origem: "filesystem",
    href: `${RENDER_BASE_URL}/apps/financeiro/original`,
    tipo: "full"
  },
  {
    nome: "NanoPonto",
    empresa: "NanotechSoft",
    origem: "filesystem",
    href: `${RENDER_BASE_URL}/apps/nanoponto/original`,
    tipo: "full"
  },
  {
    nome: "Zap",
    empresa: "NanotechSoft",
    origem: "filesystem",
    href: `${RENDER_BASE_URL}/apps/zap/original`,
    tipo: "full"
  },
  {
    nome: "NanoStore",
    empresa: "NanotechSoft",
    origem: "filesystem",
    href: `${RENDER_BASE_URL}/apps/nanostore/original`,
    tipo: "full"
  },
  {
    nome: "GPS Musical",
    empresa: "NanotechSoft",
    origem: "filesystem",
    href: `${RENDER_BASE_URL}/apps/gpsmusical/original`,
    tipo: "full"
  },
  {
    nome: "BPA",
    empresa: "NanotechSoft",
    origem: "filesystem",
    href: `${RENDER_BASE_URL}/apps/bpa/original`,
    tipo: "full"
  },
  {
    nome: "Tatoo",
    empresa: "NanotechSoft",
    origem: "filesystem",
    href: `${RENDER_BASE_URL}/apps/tatoo/original`,
    tipo: "full"
  },
  {
    nome: "RioB",
    empresa: "NanotechSoft",
    origem: "filesystem",
    href: `${RENDER_BASE_URL}/apps/riob`,
    tipo: "full"
  },
  {
    nome: "Cameras RioB",
    empresa: "NanotechSoft",
    origem: "filesystem",
    href: `${RENDER_BASE_URL}/apps/riob-cameras/riob`,
    tipo: "full"
  },
  {
    nome: "Telefonia RioB",
    empresa: "NanotechSoft",
    origem: "filesystem",
    href: `${RENDER_BASE_URL}/apps/riob-telefonia/riob`,
    tipo: "full"
  },
  {
    nome: "Chat IA RioB",
    empresa: "NanotechSoft",
    origem: "filesystem",
    href: `${RENDER_BASE_URL}/apps/riob-chat-ia/riob`,
    tipo: "full"
  },
  {
    nome: "Chat RioB",
    empresa: "NanotechSoft",
    origem: "filesystem",
    href: `${RENDER_BASE_URL}/apps/riob-chat/riob`,
    tipo: "full"
  },
  {
    nome: "E-mail RioB",
    empresa: "NanotechSoft",
    origem: "filesystem",
    href: `${RENDER_BASE_URL}/apps/riob-email/riob`,
    tipo: "full"
  },
  {
    nome: "ESXi RioB",
    empresa: "NanotechSoft",
    origem: "filesystem",
    href: `${RENDER_BASE_URL}/apps/riob-esxi/riob`,
    tipo: "full"
  },
  {
    nome: "Importar XML RioB",
    empresa: "NanotechSoft",
    origem: "filesystem",
    href: `${RENDER_BASE_URL}/apps/riob-xml/riob`,
    tipo: "full"
  }
];

const descriptions = {
  automacao: "Monitoramento industrial e sensores importado do sensoresMonitor.",
  financeiro: "Gestao financeira Nanotech integrada ao NanotechSoft com dados em MySQL.",
  "gps-musical": "Repertorio musical com biblioteca, editor, audio local, YouTube, Spotify e backup JSON.",
  gpsmusical: "Repertorio musical com biblioteca, editor, audio local, YouTube, Spotify e backup JSON.",
  zap: "Atendimento WhatsApp com kanban, agenda, etiquetas e configuracoes de integracao.",
  nanoponto: "Registro de ponto REP-P, banco de horas, justificativas e relatórios fiscais.",
  nanostore: "ERP de farmácia com estoque, compras, vendas e financeiro.",
  bpa: "Prontuario ambulatorial e explorador de tabelas BPA.",
  tatoo: "Gestao de estudio com clientes, agenda, consentimentos, financeiro e assinatura digital.",
  riob: "Aplicacao RioB completa integrada como backend operacional.",
  "cameras-riob": "Painel de cameras e cadastro de streams do RioB.",
  "telefonia-riob": "Configuracao SIP/WebRTC, FreePBX e chamadas pelo chat RioB.",
  "chat-ia-riob": "Agent IA e conversa assistida por IA do RioB.",
  "chat-riob": "Chat convencional interno do RioB com anexos e contatos.",
  "e-mail-riob": "Gestor de e-mails e anexos legado do RioB.",
  "esxi-riob": "Cliente ESXi/vSphere integrado pelo RioB.",
  "importar-xml-riob": "Importador XML de estoque e abastecimentos do RioB."
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

const courseModules = [
  {
    id: "lpic-bash",
    number: "01",
    badge: "LPIC-1 / Bash",
    title: "LPIC-1, Bash e terminal Linux",
    mapTitle: "Subgrupos LPIC-1",
    mapText: "Escolha uma área e revise os comandos essenciais para terminal Linux, automação e suporte.",
    groups: courseGroups
  },
  {
    id: "uteis-velocidade",
    number: "02",
    badge: "Windows / Velocidade",
    title: "Comandos úteis, velocidade e manutenção",
    mapTitle: "Subgrupos Windows e rede",
    mapText: "Diagnóstico de disco, desempenho, reparo do sistema, licença legítima e testes de portas.",
    groups: [
      {
        id: "win-velocidade",
        number: "02.1",
        title: "Velocidade e score de disco",
        summary: "Comandos para medir desempenho de disco e localizar o relatório WinSAT do Windows.",
        commands: [
          ["winsat disk -drive c", "Executa teste de desempenho do disco C: pelo Windows System Assessment Tool."],
          ["C:\\Windows\\Performance\\WinSAT\\DataStore", "Pasta onde ficam os relatórios XML do WinSAT."],
          ["Score WinSAT", "Procure o resultado no XML; normalmente a escala aparece de 1,0 a 9,9."]
        ]
      },
      {
        id: "win-disco",
        number: "02.2",
        title: "Saúde e reparo de disco",
        summary: "Verificações rápidas para status físico e correção de erros no sistema de arquivos.",
        commands: [
          ["wmic diskdrive get status", "Mostra o status SMART resumido dos discos reconhecidos pelo Windows."],
          ["chkdsk c: /f /r /x", "Agenda correção de erros, busca setores defeituosos e desmonta o volume quando possível."],
          ["PowerShell como administrador", "Use estes comandos em terminal elevado e faça backup antes de reparos demorados."]
        ]
      },
      {
        id: "win-sistema",
        number: "02.3",
        title: "Integridade do Windows",
        summary: "Comandos para reparar arquivos do sistema e investigar problemas após travamentos ou lentidão.",
        commands: [
          ["sfc /scannow", "Verifica e repara arquivos protegidos do Windows."],
          ["DISM /Online /Cleanup-Image /RestoreHealth", "Repara a imagem do Windows usada pelo SFC quando há corrupção."],
          ["reiniciar e testar", "Após reparos, reinicie e valide desempenho, disco e serviços afetados."]
        ]
      },
      {
        id: "win-licenca",
        number: "02.4",
        title: "Licença Windows e Office",
        summary: "Consulta de status e chave original. Ativação deve usar chave válida, conta Microsoft ou contrato oficial.",
        commands: [
          ["slmgr /dli", "Mostra informações básicas da licença do Windows."],
          ["slmgr /dlv", "Mostra informações detalhadas da licença do Windows."],
          ["slmgr /ipk XXXXX-XXXXX-XXXXX-XXXXX-XXXXX", "Instala uma chave de produto válida do Windows."],
          ["slmgr /ato", "Solicita ativação online após instalar uma chave válida."],
          ["wmic path softwareLicensingService get OA3xOriginalProductKey", "Localiza chave OEM gravada na BIOS/UEFI, quando existir."],
          ["Windows: Configurações > Sistema > Ativação", "Caminho seguro para licença digital vinculada ao hardware ou conta Microsoft."],
          ["Office: Arquivo > Conta", "Local seguro para verificar status de ativação do Microsoft Office."]
        ]
      },
      {
        id: "rede-portas",
        number: "02.5",
        title: "Teste de portas pelo Bash",
        summary: "Teste simples de conectividade TCP usando nmap em Linux, WSL ou ambiente com Bash.",
        commands: [
          ["nmap -sT -p porta ip", "Testa conexão TCP em uma porta específica de um IP."],
          ["nmap -sT -p 3389 192.168.0.10", "Exemplo para testar RDP em um host da rede local."],
          ["autorização primeiro", "Execute varreduras apenas em redes e equipamentos que você administra ou tem permissão para testar."]
        ]
      }
    ]
  }
];

const menuToggle = document.querySelector(".menu-toggle");
const menuPanel = document.getElementById("siteMenu");
const projectGrid = document.getElementById("projectsGrid");
const workCount = document.getElementById("workCount");
const courseModuleTabs = document.getElementById("courseModuleTabs");
const courseModuleBadge = document.getElementById("courseModuleBadge");
const courseMapTitle = document.getElementById("courseMapTitle");
const courseMapText = document.getElementById("courseMapText");
const courseTabs = document.getElementById("courseTabs");
const coursePanel = document.getElementById("coursePanel");

let activeCourseModuleId = courseModules[0]?.id;

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
      origem: columns.length > 3 ? columns[columns.length - 2] : "",
      href,
      tipo: section
    });
  }

  return projects;
}

function projectMeta(project) {
  if (project.href.includes("nanotechsoft.onrender.com")) return "OnRender / app";
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
    workCount.textContent = "Veja alguns projetos nossos";
  }

  if (!projectGrid) return;

  projectGrid.innerHTML = normalized
    .map((project, index) => {
      const accent = accents[index % accents.length];
      const nome = escapeHtml(project.nome);
      const origem = escapeHtml(project.origem || project.empresa);
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
            <small>${origem}</small>
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

  const activeModule = courseModules.find((module) => module.id === activeCourseModuleId) || courseModules[0];
  const group = activeModule?.groups.find((item) => item.id === groupId) || activeModule?.groups[0];
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
  const activeModule = courseModules.find((module) => module.id === activeCourseModuleId) || courseModules[0];
  const activeGroup = activeModule?.groups.find((group) => group.id === groupId) || activeModule?.groups[0];
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

  const activeModule = courseModules.find((module) => module.id === activeCourseModuleId) || courseModules[0];
  const groups = activeModule?.groups || [];

  if (courseModuleBadge && activeModule) {
    courseModuleBadge.textContent = activeModule.badge;
  }

  if (courseMapTitle && activeModule) {
    courseMapTitle.textContent = activeModule.mapTitle;
  }

  if (courseMapText && activeModule) {
    courseMapText.textContent = activeModule.mapText;
  }

  courseTabs.innerHTML = groups
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

  setActiveCourse(groups[0]?.id);
}

function setActiveModule(moduleId) {
  const activeModule = courseModules.find((module) => module.id === moduleId) || courseModules[0];
  if (!activeModule) return;

  activeCourseModuleId = activeModule.id;

  courseModuleTabs?.querySelectorAll("[data-course-module]").forEach((button) => {
    const isActive = button.dataset.courseModule === activeModule.id;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  });

  renderCourseTabs();
}

function renderCourseModules() {
  if (!courseModuleTabs) {
    renderCourseTabs();
    return;
  }

  courseModuleTabs.innerHTML = courseModules
    .map((module, index) => {
      const active = index === 0;

      return `
        <button
          class="course-module-tab${active ? " is-active" : ""}"
          type="button"
          role="tab"
          aria-selected="${active}"
          data-course-module="${escapeHtml(module.id)}"
        >
          <span>Módulo ${escapeHtml(module.number)}</span>
          ${escapeHtml(module.title)}
        </button>
      `;
    })
    .join("");

  setActiveModule(courseModules[0]?.id);
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

courseModuleTabs?.addEventListener("click", (event) => {
  const button = event.target.closest("[data-course-module]");
  if (!(button instanceof HTMLButtonElement)) return;
  setActiveModule(button.dataset.courseModule);
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

renderCourseModules();
observeReveals();
loadProjects();
