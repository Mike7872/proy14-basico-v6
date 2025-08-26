<?php
header('Content-Type: application/json');
$BDD = new mysqli("localhost","root","Admin2025","biblio");

$tam=strlen(dirname($_SERVER["SCRIPT_NAME"]));
if($tam==1){$incre=0;}else{$incre=1;}
$ruta=explode("/",substr($_SERVER["REQUEST_URI"],$tam+$incre));

$data=array("resp"=>false,"ruta"=>$ruta);
switch($ruta[0])
{	case'login':
		$email=$_POST["email"];
		$pwd=sha1($_POST["pwd"]);
		$M=$BDD->query("select num,nom,ap,tipo from person where email='$email' and pwd='$pwd'  ");
		foreach($M as $V)
		{	$data=array("resp"=>true,"msg"=>"Se inicio la sesion","num"=>$V["num"],"nom"=>$V["nom"],"ap"=>$V["ap"],"tipo"=>$V["tipo"]);
		}
	break;

case'personsave':
	$nom=$_POST["nom"];
	$ap=$_POST["ap"];
	$email=$_POST["email"];
	$pwd=sha1($_POST["pwd"]);
	$std="act";
	$tipo="Pasante";
	$fechn=$_POST["fechn"];
	$gen=$_POST["gen"];
	$BDD->query("insert into person (nom,ap,email,pwd,std,tipo,fechn,gen) values ('$nom','$ap','$email','$pwd','$std','$tipo','$fechn','$gen') ");
	$data=array("resp"=>true,"msg"=>"se guardo");
break;

case'personup':
	$num=$_POST["num"];
	$nom=$_POST["nom"];
	$ap=$_POST["ap"];
	$email=$_POST["email"];
	$pwd=sha1($_POST["pwd"]);
	$tipo=$_POST["tipo"];
	$BDD->query("update person set nom='$nom', ap='$ap', email='$email', pwd='$pwd', tipo='$tipo' where num=$num  ");
	$data=array("resp"=>true,"msg"=>"se actualizo");
break;

case'personlist':
	$list=array();
	$M=$BDD->query("select num,nom,ap,email from person where std='act' ");
	foreach($M as $V)
	{	array_push($list,$V);
	}
	$data=array("resp"=>true,"list"=>$list);
break;

case'personinfo':
	$num=$ruta[1];
	$M=$BDD->query("select num,nom,ap,email,pwd,tipo from person where num=$num ");
	foreach($M as $V)
	{	$data=array("resp"=>true,"num"=>$V["num"],"nom"=>$V["nom"],"ap"=>$V["ap"],"email"=>$V["email"],"pwd"=>$V["pwd"],              "tipo"=>$V["tipo"]);
	}
break;

case'persondel':
	$num=$ruta[1];
	if($BDD->query("delete from person where num=$num"))
	{	$data=array("resp"=>true,"msg"=>"Se elimino");	}
	else
	{	$data=array("resp"=>false,"msg"=>"No, se elimino");	}
break;

case'librosave':
	$codl=$_POST["codl"];
	$noml=$_POST["noml"];
	$des=$_POST["des"];
	$fechp=$_POST["fechp"];
	$stdl="act";
	$tipo=$_POST["tipo"];
	$BDD->query("insert into libro (codl,noml,des,fechp,stdl,tipo) values        ('$codl','$noml','$des','$fechp','$stdl','$tipo')");
	$data=array("resp"=>true,"msg"=>"se guardo");
break;

case'librolist':
	$list=array();
	$M=$BDD->query("select codl,noml,stdl,des,fechp from libro where stdl='act' ");
	foreach($M as $V)
	{	array_push($list,$V);
	}
	$data=array("resp"=>true,"list"=>$list);
break;

case'librodel':
	$codl=$ruta[1];
	if($BDD->query("update libro set stdl='del' where codl='$codl'  "))
	{	$data=array("resp"=>true,"msg"=>"Se elimino");	}
	else
	{	$data=array("resp"=>false,"msg"=>"No, se elimino");	}
break;

case'libroinfo':
$codl=$ruta[1];
//Lista de autores
$autors=array();
$M2=$BDD->query("select numa,nom,ap,rela from person,autor where person.num=autor.num and codl='$codl' ");
foreach($M2 as $V2)
{	array_push($autors,$V2);
}
//datos del libro
$M=$BDD->query("select codl,noml,des,fechp from libro where codl='$codl' ");
foreach($M as $V)
{	$data=array("resp"=>true,"codl"=>$V["codl"],"noml"=>$V["noml"],         "des"=>$V["des"],"fechp"=>$V["fechp"],"autors"=>$autors);
}
break;

case'libroup':
$codl=$_POST["codl"];
$noml=$_POST["noml"];
$des=$_POST["des"];
$fechp=$_POST["fechp"];
$BDD->query("update libro set noml='$noml',des='$des',fechp='$fechp' where codl='$codl'  ");
$data=array("resp"=>true,"msg"=>"se guardo");
break;

case'autorsave':
$codl=$_POST["codl"];
$num=$_POST["num"];
$rela=$_POST["rela"];
$BDD->query("insert into autor (codl,num,rela) values                      ('$codl',$num,'$rela') ");
$data=array("resp"=>true,"msg"=>"se guardo");
break;

case'autordel':
	$numa=$ruta[1];
	if($BDD->query("delete from autor where numa=$numa"))
	{	$data=array("resp"=>true,"msg"=>"Se elimino");	}
	else
	{	$data=array("resp"=>false,"msg"=>"No, se elimino");	}
break;

case'autorup':
	$numa=$_POST["numa"];
	$rela=$_POST["rela"];
	$BDD->query("update autor set rela='$rela' where numa=$numa  ");
	$data=array("resp"=>true,"msg"=>"se actualizo");
break;

case'panel':
$list=array();
$M=$BDD->query("select gen,count(*) as cant from person group by gen ");
foreach($M as $V)
{	array_push($list,array("cant"=>$V["cant"],"gen"=>$V["gen"]));
}
$data=array("resp"=>true,"list"=>$list);
break;

}
echo json_encode($data);

?>