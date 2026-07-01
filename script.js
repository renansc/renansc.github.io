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

const menuToggle = document.querySelector(".menu-toggle");
const menuPanel = document.getElementById("siteMenu");
const projectGrid = document.getElementById("projectsGrid");
const workCount = document.getElementById("workCount");

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

observeReveals();
loadProjects();
