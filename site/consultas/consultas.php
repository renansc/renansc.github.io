 <!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=Edge">
  <link href="../estilos.css" rel="stylesheet" type="text/css"> 
  <link rel="icon" type="imagem/png" href="../imagens/icone.png" />
<script type="text/javascript">
	function enviar(){
		var filtro=document.getElementById("filtro");
		var busca=document.getElementById("busca").value;
		var end="http://localhost:8080/consultas/consultas.php?tipo=funcionarios&filtro="+filtro.options[filtro.selectedIndex].value+"&busca="+busca;
		alert(end);
		window.location.href=end;
	}
</script>
 <title>Pesquisa</title>
 </head>
 <body>
<?php
	$tipo=$_GET['tipo'];
	$arquivo=fopen("../modulosbd/$tipo.txt","r");
	$linha=fgets($arquivo);
	$linha=explode(",",$linha);	
	 array_pop($linha);	
	#var_dump($linha);
?>
 <!-- Criando tabela e cabeçalho de dados: -->
<figure>
  <a href="../index.php"><img src="../imagens/icone.png" alt="Icone do Sistema">
  <figcaption>Voltar a Página Inicial</figcaption></a>
</figure>
<h1>Sistema Apae Jaguapitã 2020</h1>
<h2>módulo de consultas</h2><br>Filtros - 
<select id="filtro">
<?php
	foreach($linha as $coluna){
		echo "<option value='".$coluna."'>".$coluna."</option>";
	}
?>
</select>
<input id="busca">
<span onclick="enviar( );">Enviar</span>
<div id="tabela">
 <table>
 <tr>
	<?php
	echo "<th class='title'>Num</th>";
	foreach($linha as $coluna){
		echo "<th class='title'>".$coluna."</th>";
	}
	?>

 </tr>
 
 <!-- Preenchendo a tabela com os dados do banco: -->
 <?php
$mysqli = new mysqli("localhost", "renan", "hacker", "apae");
$filtro=$_GET['filtro'];
$busca=$_GET['busca'];
if($filtro != ""){
	$sql="SELECT * FROM $tipo WHERE $filtro= '$busca'";
}else{
	$sql="SELECT * FROM $tipo";
}
if ($resultado = $mysqli->query($sql)) {
	echo("<br>Foi encontrado "); 
	echo($resultado->num_rows);
	echo" resultados!";
	$cont=0;
	while ($exibe = mysqlI_fetch_assoc($resultado) ) { // Obtém os dados da linha atual e avança para o próximo registro  
		$cont+=1;
		echo "<tr><th>$cont</th>";                  
		foreach($linha as $coluna){
			echo "<th>",utf8_encode($exibe[$coluna])."</th>";
		}
		echo "</tr>";
	}
    $resultado->close();
}
?>
</table>
</div>
</body>
</html>
