const portalApps = [
  {
    slug: "cardioclin",
    nome: "CardioClin",
    descricao: "Acesso ao ambiente principal da CardioClin.",
    href: "https://cardioclin.onrender.com/",
    accent: "cyan",
    icon: "+",
    kicker: "Clinica",
    meta: "Render externo"
  },
  {
    slug: "riobranco",
    nome: "Rio Branco",
    descricao: "Entrada direta para o ambiente da unidade Rio Branco.",
    href: "https://206.62.65.68:80/",
    accent: "blue",
    icon: "R",
    kicker: "Hospital",
    meta: "Servidor externo"
  },
  {
    slug: "nanotech",
    nome: "Nanotech",
    descricao: "Portal operacional da Nanotech com submenu para os apps separados do site.",
    href: "https://nanotech-lvoz.onrender.com/",
    accent: "gold",
    icon: "N",
    kicker: "Operacao",
    meta: "Site + apps separados",
    children: [
      {
        nome: "Financeiro",
        href: "https://nanotech-lvoz.onrender.com/financeiro/"
      },
      {
        nome: "GPS Musical",
        href: "https://nanotech-lvoz.onrender.com/gpsmusical/"
      }
    ]
  },
  {
    slug: "laboratorio-santa-terezinha",
    nome: "Laboratorio Santa Terezinha",
    descricao: "Acesso ao ambiente completo do laboratorio Santa Terezinha.",
    href: "https://rispacsfull.onrender.com/",
    accent: "cyan",
    icon: "L",
    kicker: "Laboratorio",
    meta: "Render externo"
  }
];

const authScreen = document.getElementById("authScreen");
const portalShell = document.getElementById("portalShell");
const loginForm = document.getElementById("loginForm");
const passwordInput = document.getElementById("passwordInput");
const authFeedback = document.getElementById("authFeedback");
const logoutButton = document.getElementById("logoutButton");
const githubLoginButton = document.getElementById("githubLoginButton");
const oauthPanel = document.getElementById("oauthPanel");
const authDivider = document.getElementById("authDivider");
const passwordLoginButton = document.getElementById("passwordLoginButton");
const userPill = document.getElementById("userPill");

function authErrorMessage(code) {
  const messages = {
    github_access_denied: "O acesso com GitHub foi cancelado.",
    github_invalid_state: "A autenticacao GitHub expirou. Tente novamente.",
    github_missing_code: "O GitHub nao retornou o codigo de autorizacao.",
    github_user_not_allowed: "Sua conta GitHub nao esta autorizada neste portal.",
    github_auth_failed: "Nao foi possivel concluir o login com GitHub."
  };
  return messages[code] || "";
}

function readQueryError() {
  const params = new URLSearchParams(window.location.search);
  return params.get("auth_error") || "";
}

function clearQueryString() {
  if (window.location.search) {
    window.history.replaceState({}, document.title, window.location.pathname);
  }
}

function countLinks() {
  return portalApps.reduce((total, app) => total + 1 + (app.children?.length || 0), 0);
}

function renderMenu() {
  const menu = document.getElementById("menuLinks");
  menu.innerHTML = portalApps
    .map((app) => `<li><a href="${app.href}" target="_blank" rel="noreferrer">${app.nome}</a></li>`)
    .join("");
}

function renderCards() {
  const grid = document.getElementById("appsGrid");
  grid.innerHTML = portalApps
    .map((app) => {
      const submenu = Array.isArray(app.children) && app.children.length
        ? `
          <div class="submenu">
            <span class="submenu-title">Submenu Nanotech</span>
            <div class="submenu-links">
              ${app.children
                .map(
                  (child) => `
                    <a class="submenu-link" href="${child.href}" target="_blank" rel="noreferrer">
                      ${child.nome}
                    </a>
                  `
                )
                .join("")}
            </div>
          </div>
        `
        : "";

      return `
        <article class="app-card card reveal" data-accent="${app.accent}">
          <div>
            <div class="app-head">
              <span class="app-kicker">${app.kicker}</span>
              <div class="app-icon" aria-hidden="true">${app.icon}</div>
            </div>
            <h3>${app.nome}</h3>
            <p>${app.descricao}</p>
            ${submenu}
          </div>
          <div class="app-foot">
            <span class="app-meta">${app.meta}</span>
            <a class="app-link" href="${app.href}" target="_blank" rel="noreferrer">Abrir sistema</a>
          </div>
        </article>
      `;
    })
    .join("");
}

function refreshSummary() {
  const count = countLinks();
  const countElement = document.getElementById("appCount");
  const summary = document.getElementById("portalSummary");

  if (countElement) {
    countElement.textContent = String(count);
  }

  if (summary) {
    summary.textContent = `${count} atalhos liberados`;
  }
}

function updateAuthOptions(status) {
  const providers = status?.providers || {};
  const githubEnabled = Boolean(providers.github);
  const passwordEnabled = Boolean(providers.password);

  oauthPanel?.classList.toggle("is-hidden", !githubEnabled);
  authDivider?.classList.toggle("is-hidden", !(githubEnabled && passwordEnabled));

  if (passwordInput) {
    passwordInput.disabled = !passwordEnabled;
    passwordInput.parentElement?.classList.toggle("is-hidden", !passwordEnabled);
  }

  passwordLoginButton?.classList.toggle("is-hidden", !passwordEnabled);
  githubLoginButton?.classList.toggle("is-hidden", !githubEnabled);
}

function setUserPill(user) {
  if (!user || !user.login) {
    userPill?.classList.add("is-hidden");
    if (userPill) {
      userPill.textContent = "";
    }
    return;
  }

  userPill?.classList.remove("is-hidden");
  userPill.textContent = user.provider === "github" ? `GitHub: ${user.login}` : `Usuario: ${user.login}`;
}

function setAuthenticatedState(authenticated, user = null) {
  authScreen.classList.toggle("is-hidden", authenticated);
  portalShell.classList.toggle("is-hidden", !authenticated);
  setUserPill(user);

  if (authenticated) {
    authFeedback.textContent = "";
    passwordInput.value = "";
  }
}

async function loadAuthState() {
  try {
    const response = await fetch("/api/auth/status", {
      cache: "no-store",
      headers: { Accept: "application/json" }
    });
    const payload = await response.json();
    updateAuthOptions(payload);
    setAuthenticatedState(Boolean(payload.authenticated), payload.user || null);
  } catch (error) {
    authFeedback.textContent = "Nao foi possivel validar o acesso agora.";
  }
}

async function login(password) {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({ password })
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload.error || "Falha ao autenticar.");
  }

  return payload;
}

async function logout() {
  await fetch("/api/auth/logout", {
    method: "POST",
    headers: { Accept: "application/json" }
  });
  setAuthenticatedState(false);
}

loginForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const password = passwordInput.value.trim();
  if (!password) {
    authFeedback.textContent = "Informe a senha para continuar.";
    return;
  }

  authFeedback.textContent = "Validando acesso...";

  try {
    await login(password);
    setAuthenticatedState(true, { provider: "password", login: "local" });
  } catch (error) {
    authFeedback.textContent = error.message;
  }
});

logoutButton?.addEventListener("click", async () => {
  await logout();
});

renderMenu();
renderCards();
refreshSummary();
const queryError = readQueryError();
if (queryError) {
  authFeedback.textContent = authErrorMessage(queryError);
  clearQueryString();
}
loadAuthState();
