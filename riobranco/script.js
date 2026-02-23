const API = "http://localhost:8080/api";

let dados = {
config:{logo:""}
};

//////////////////////////// CONFIG ////////////////////////////

function salvarLocal(){localStorage.setItem("configSistema",JSON.stringify(dados.config));}

function aplicarLogo(){
let img=document.getElementById("logoSistema");
if(!img)return;
if(!dados.config.logo){img.style.display="none";return;}
img.src=dados.config.logo+"?v="+Date.now();
img.style.display="block";
}

function salvarLogo(){
dados.config.logo=logo_url.value.trim();
salvarLocal();
aplicarLogo();
}

function verificarStatusBD(){
fetch(API+"/status-bd")
.then(r=>r.json())
.then(res=>{
let el=statusBD;
if(res.status==="online"){el.innerHTML="🟢 Banco conectado";el.style.color="green";}
else{el.innerHTML="🔴 "+res.erro;el.style.color="red";}
})
.catch(()=>statusBD.innerHTML="🔴 API offline");
}

//////////////////////////// TABS ////////////////////////////

function showTab(tab,el){
document.querySelectorAll('.section').forEach(s=>s.classList.remove('activeSection'));
document.getElementById(tab).classList.add('activeSection');
document.querySelectorAll('.menu-item').forEach(m=>m.classList.remove('active'));
el.classList.add('active');
if(tab==="config") setTimeout(verificarStatusBD,300);
}

//////////////////////////// FROTA ////////////////////////////

function carregarFrota(){
fetch(API+"/frota")
.then(r=>r.json())
.then(lista=>{
tabelaFrota.innerHTML=lista.map(v=>`
<tr>
<td>${v.placa}</td>
<td>${v.modelo}</td>
<td>${v.km_atual}</td>
<td>${v.km_ultimo_oleo||'-'}</td>
</tr>`).join('');

manut_veiculo.innerHTML=lista.map(v=>`<option value="${v.id}">${v.placa}</option>`).join('');
oleo_veiculo.innerHTML=manut_veiculo.innerHTML;
});
}

function addVeiculoFrota(){
fetch(API+"/frota",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({placa:frota_placa.value,modelo:frota_modelo.value,km:frota_km.value})
}).then(()=>carregarFrota());
}

function addManutencao(){
fetch(API+"/manutencao",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({
veiculo_id:manut_veiculo.value,
tipo:manut_tipo.value,
km:manut_km.value,
valor:manut_valor.value
})
}).then(()=>carregarFrota());
}

function addTrocaOleo(){
fetch(API+"/oleo",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({
veiculo_id:oleo_veiculo.value,
tipo:oleo_tipo.value,
km:oleo_km.value
})
}).then(()=>carregarFrota());
}

//////////////////////////// CADASTROS ////////////////////////////

function carregarLista(tipo,el){
fetch(API+"/"+tipo)
.then(r=>r.json())
.then(lista=>{
el.innerHTML=lista.map(i=>`<li>${i.nome}</li>`).join('');
});
}

function addCadastro(tipo){
let nome=prompt("Nome:");
if(!nome)return;
fetch(API+"/"+tipo,{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({nome})
}).then(()=>initCadastros());
}

function initCadastros(){
carregarLista("motoristas",listaMotoristas);
carregarLista("veiculos",listaVeiculos);
carregarLista("conferentes",listaConferentes);
carregarLista("cargas",listaCargas);
}

//////////////////////////// FRETES ////////////////////////////

function carregarFretes(){
fetch(API+"/fretes")
.then(r=>r.json())
.then(lista=>{
document.querySelectorAll('.col').forEach(col=>{
let st=col.dataset.status;
col.innerHTML="<h3>"+st+"</h3>";
lista.filter(f=>f.status===st).forEach(f=>{
col.innerHTML+=`<div class="card">${f.nome}<br>${f.motorista||''}</div>`;
});
});
});
}

function novoFrete(){
let nome=prompt("Descrição:");
if(!nome)return;
fetch(API+"/fretes",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({nome,motorista:"",veiculo:"",carga:""})
}).then(()=>carregarFretes());
}

//////////////////////////// DEVOLUÇÕES ////////////////////////////

function addDevolucao(){
fetch(API+"/devolucoes",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({
frete:dev_frete.value,
numero:dev_numero.value,
veiculo:dev_veiculo.value,
p600:dev_600.value,
c24:dev_c24.value,
c48:dev_c48.value,
pet2l:dev_pet2l.value,
pet600:dev_pet600.value,
pet200:dev_pet200.value,
conf:dev_conf.value
})
}).then(()=>alert("Salvo no banco"));
}

//////////////////////////// INIT ////////////////////////////

window.onload=()=>{
let ls=localStorage.getItem("configSistema");
if(ls) dados.config=JSON.parse(ls);
aplicarLogo();
initCadastros();
carregarFrota();
carregarFretes();
};
