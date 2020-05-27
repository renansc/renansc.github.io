 <html>
 <head>
 <link href="../estilos.css" rel="stylesheet" type="text/css">
 <link rel="icon" type="imagem/png" href="../imagens/icone.png" />
 <title>Pesquisa</title>
<script type="text/javascript">
	function submenuInicial(){
		document.getElementById("submenu").style.display="none";
	}
	function submenu(){
		document.getElementById("submenu").style.display="block";
	}
</script>
 </head>
 <body>
<figure>
  <a href="../index.php"><img src="../imagens/icone.png" alt="Icone do Sistema">
  <figcaption>Voltar a Página Inicial</figcaption></a>
</figure>
<h1>Sistema Apae Jaguapitã 2020</h1>
<h2>Página Inicial</h2>
<div  id="barramenu">
  <button  id="men1" class="menu" onmouseover="submenu();">Alunos</button>
  <div id="submenu" onmouseleave="submenuInicial();" 	>
	<button><a href="../consultas/consultas.php?tipo=alunos">dados alunos</a></button>
	<button><a href="../consultas/consultas.php?tipo=maes">mães de alunos</a></button>
	<button><a href="../consultas/consultas.php?tipo=pais">pais de alunos</a></button>
	<button><a href="../consultas/consultas.php?tipo=contatos">contatos dos alunos</a></button>
	<button><a href="../consultas/consultas.php?tipo=responsaveis">responsáveis dos alunos</a></button>
  </div>
  <button><a href="../consultas/consultas.php?tipo=funcionarios">Funcionários</a></button>
  <button><a href="../consultas/consultas.php?tipo=usuarios">Usuários</a></button>
</div>

<div id="tabela">
	<br>Sistema Criado por Renan Santos Coutinho
	<br>para uso interno consultas e atualizações dos dados
	<br>teste.
</div>
</body>
</html>
 
