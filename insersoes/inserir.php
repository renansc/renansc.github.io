 <html>
 <head>
 <link href="../estilos.css" rel="stylesheet" type="text/css">
<link rel="icon" type="imagem/png" href="../imagens/icone.png" />
 <title>Inserir</title>
 </head>
 <body>
<figure>
  <a href="../index.php"><img src="../imagens/icone.png" alt="Icone do Sistema">
  <figcaption>Voltar a Página Inicial</figcaption></a>
</figure>
<h1>Sistema Apae Jaguapitã 2020</h1>
<h2>Módulo de Insersão</h2>
<div id="tabela">
<table>
<form class="formulario" action="../insersoes/inserir.php" method="GET">
	<?php
		$tipo=$_GET['tipo'];
		$arquivo=fopen("../modulosbd/$tipo.txt","r");
		$linha=fgets($arquivo);
		$linha=explode(",",$linha);
		array_pop($linha);
		echo "<tr><th class='title'>Campo</th><th class='title'>Valor</th></tr>";
		foreach($linha as $coluna){
			echo "<tr style='width:30%'><th>".$coluna."</th><th><input name='".$coluna."'></th></tr>";
		}
	?>
		<tr><th colspan="2"><input type="submit" value="Confirma"></th></tr>
</table>
</form>
</div>
	
 <!-- Preenchendo a tabela com os dados do banco: -->
 <?php
if($_GET["CGM"]==""){
	echo "<br>...";
}else{
	$mysqli = new mysqli("localhost", "renan", "hacker", "apae");
	$sql="INSERT INTO `alunos`(";
	foreach($linha as $coluna){
		$sql=$sql."`".$coluna."`,";
	}
	$sql=rtrim($sql,',');
	$sql=$sql.") VALUES (";
	foreach($linha as $coluna){
		$sql=$sql.'"'.$_GET[$coluna].'",';
	}
	$sql=rtrim($sql,',');
	$sql=$sql.")";
	echo "<br>".$sql;
	mysqli_query($mysqli,$sql) or die("<br>"."Erro ao tentar cadastrar registro!");
	echo "<br> cadastrado com sucesso!";
}
?>
</body>
</html>
