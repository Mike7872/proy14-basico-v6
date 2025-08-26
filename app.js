function login()
{	let TK=`
	<form  id='F7'  class='axfrmmin'>
		<center>Autoidentificacion</center>
		<label>Email</label>
		<input name='email'  type='email'  required>
		<label>Contra</label>
		<input name='pwd'    type='password'>
		<section>
			<article>
				<button>Ingresar</button>
			</article>
			<article>
				<button type='button' onclick="personfrm()">Registro</button>
			</article>
		</section>
	</form>
	<section  id='C2'></section>`;
	axload('C1',TK);
	axelem('F7').addEventListener('submit',async e=>
	{	e.preventDefault();
		let data=await axdatapost(`api/login`,'F7');
		console.log(data);
		if(data.resp)
		{	axtokenset(data.num,`${data.nom} ${data.ap}`,'',[data.tipo]);
			cuenta();
			axmsgmin(data.msg);
		}
		else
		{	axmsgerr('Contra incorrecta');
		}
	});
}

async function panel()
{	let data=await axdataget(`api/panel`);
	console.log(data);
	let TK=`
	<center  class='axtitle'>Panel principal</center>
	<section id='G1'></section>`;
	axload('C2',TK);

	M=[
		['Masculino',Number(data.list[1].cant)],
		['Femenino',Number(data.list[0].cant)],
		['Ninguno',Number(data.list[2].cant)]
	];
	axgracake('G1','Genero','cantidad',M);
	//axgrabar('G1','Genero','cantidad',M);
}

function cuenta()
{	let tipo=axtokenget('aud')[0];
	let TK=`
	<header>
		<nav>
			<a>Lista de personas</a>
			<h2></h2>
			<button  class='axico421'  onclick="axlaymen('ML')"></button>
		</nav>
	</header>
	<main>
		<section class='axsec'>
			<nav  class='axmenmax' id='ML'>
				<article>
					<h2>${axtokenget('name')}</h2>
				</article>
				<center>${tipo}</center>
				<a onclick="panel()">Panel</a>`;
				if(tipo=='Gerente'){ TK+=`<a onclick="personfrm()">Registrar personas</a>`; }
				TK+=`
				<a onclick="personlist()">Lista de personas</a>
				<a onclick="pelilist()">Lista de peliculas</a>
				<label>Libro</label>
				<a onclick="librofrm()">Registrar Libro</a>
				<a onclick="librolist()">Lista de libros</a>
				<a onclick="axwinopen('V1')">abrir ventana</a>
				<a onclick="axtokendel('index.html')">Cerrar sesion</a>
			</nav>
			<article  id='C2'>
					<center  class='axtitle'>Bienvenido</center>
			</article>
		</section>
	</main>
	<footer>
		<section  id='V1'  class='axwinmed'>
			<article>
				<aside>
					<h2></h2>
					<a  class='axico76'  onclick="axwinclose('V1')"></a>
				</aside>
				<div  id='V1C'>
				</div>
			</article>
		</section>
	</footer>`;
	axload('C1',TK);
}

function personfrm()
{	let TK=`
	<form  id='F1'  class='axfrmmed'>
		<center>Registro de persona</center>
		<section>
			<article>
				<input  name='nom'   placeholder='Nombres'    required>
			</article>
			<article>
				<input  name='ap'    placeholder='Apellidos'  required>
			</article>
		</section>

		<section>
			<article>
				<label>Fecha de nacimiento</label>
				<input  name='fechn'  type='date'  required>
			</article>
			<article>
				<label>Genero</label>
				<select  name='gen'>
					<option  value='n'>Ninguno</option>
					<option  value='m'>Masculino</option>
					<option  value='f'>Femenino</option>
				</select>
			</article>
		</section>

		<input  name='email' placeholder='Email'      type='email' required>
		<input  name='pwd'   placeholder='Contraseña' type='password'>
		<button>Enviar</button>
	</form>`;
	axload('C2',TK);
	axelem('F1').addEventListener('submit',async e=>
	{	e.preventDefault();
		let data=await axdatapost(`api/personsave`,'F1');
		if(data.resp)
		{	axmsgok('Se guardo');
			axelem('F1').reset();
		}
		else
		{	axmsgerr('No se envio');	}
	})
}

async function personedit(num)
{	let data=await axdataget(`api/personinfo/${num}`);
	console.log(data);
	let TK=`
	<form  id='F2'  class='axfrmmed'>
		<center>Editar persona</center>
		<input  name='num'   value='${data.num}'  type='hidden'>
		<input  name='nom'   value='${data.nom}'   placeholder='Nombres'    required>
		<input  name='ap'    value='${data.ap}'    placeholder='Apellidos'  required>
		<input  name='email' value='${data.email}' placeholder='Email'      type='email' required>
		<input  name='pwd'   value='${data.pwd}'   placeholder='Contraseña' type='password'>
		<select name='tipo'>
			<option  ${data.tipo=='Gerente'?'selected':''}>Gerente</option>
			<option  ${data.tipo=='Contador'?'selected':''}>Contador</option>
			<option  ${data.tipo=='Pasante'?'selected':''}>Pasante</option>
		</select>
		<button>Aplicar cambios</button>
	</form>`;
	axload('C2',TK);
	axelem('F2').addEventListener('submit',async e=>
	{	e.preventDefault();
		let data=await axdatapost(`api/personup`,'F2');
		if(data.resp)
		{	axmsgok('Se guardo');	}
		else
		{	axmsgerr('No se envio');	}
	})
}

async function personlist()
{	let tipo=axtokenget('aud')[0];
	let data=await axdataget(`api/personlist`);
	console.log(data);
	let TK=`
	<center  class='axtitle'>Lista de personas</center>`;
	for(P=0; P<data.list.length; P++)
	{	TK+=`
		<section  id='PERSON${data.list[P].num}'  class='axtitlemin'>
			<h2 class='axa-l'>${data.list[P].nom}</h2>`;
			if(tipo=='Gerente')
			{	TK+=`<a  class='axico135'  onclick="persondel(${data.list[P].num})"></a>
				<a  class='axico131'  onclick="personedit(${data.list[P].num})"></a>`;
			}
			TK+=`
		</section>`;
	}
	axload('C2',TK);
}

function persondel(num)
{	axmsgconfirm('Estas seguro de eliminar')
	.then(async res=>
	{	if(res)
		{	let data=await axdataget(`api/persondel/${num}`);
			if(data.resp)
			{	axmsgmin('Se elimino');
				axelemhide(`PERSON${num}`);
			}
			else
			{	axmsgerr('No se elimino');	}
		}
	})
}


async function personselect(ide,cap,busq)
{	axwinopen('V1');
	axpreloadmin('V1C');
	let data=await axdataget(`api/personlist`);
	console.log(data);
	let TK=`
	<form  class='axbarmed'>
		<input>
	</form>`;
	for(P=0; P<data.list.length; P++)
	{	TK+=`
		<section  class='axlistmed'>
			<article>
				<h2 onclick="axelem('${ide}').value='${data.list[P].num}';  axelem('${cap}').innerHTML='${data.list[P].nom}'; axwinclose('V1'); ">${data.list[P].ap} ${data.list[P].nom}</h2>
			</article>
		</section>`;
	}
	axload('V1C',TK);
}

async function pelilist()
{	axpreloadmin('C2');
	let data=await axdataget(`https://apipelimax.globalnex.net/pelilist`);
	console.log(data);
	let TK=`
	<center  class='axtitle'>Lista de peliculas</center>
	<section  class='axcardmin'>`;
		for(P=0; P<data.list.length; P++)
		{	TK+=`
			<article>
				<figure style="background-image:url('${data.list[P].img}');">
				</figure>
				<h2>${data.list[P].nomp}</h2>
			</article>`;
		}
		TK+=`
	</section>`;
	axload('C2',TK);
}

function librofrm()
{	let TK=`
	<form  id='F3'  class='axfrmmed'>
		<center>Registro de libro</center>
		<input  id='codl'  name='codl'  required  value='${axcodunix()}' type=''>
		<section>
			<article>
				<input  name='noml'  placeholder='Nombre de libro' required>
			</article>
			<article>
				<input  name='fechp' type='date'>
			</article>
		</section>
		<label>Tipo</label>
		<select  name='tipo'>
			<option>otro</option>
			<option>novela</option>
			<option>ficcion</option>
			<option>bibliografia</option>
			<option>terror</option>
			<option>finanzas</option>
			<option>comedia</option>
		</select>
		<label>Descripcion</label>
		<textarea  name='des'  rows=5></textarea>
		<button>Enviar</button>
	</form>`;
	axload('C2',TK);
	axelem('F3').addEventListener('submit',async e=>
	{	e.preventDefault();
		let data=await axdatapost(`api/librosave`,'F3');
		if(data.resp)
		{	axmsgok('Se guardo');
			axelem('F3').reset();
			axelem('codl').value=axcodunix();
		}
		else
		{	axmsgerr('No se envio');	}
	})
}

async function librolist()
{	let tipo=axtokenget('aud')[0];
	let data=await axdataget(`api/librolist`);
	console.log(data);
	let TK=`
	<center  class='axtitle'>Lista de libros</center>`;
	for(P=0; P<data.list.length; P++)
	{	TK+=`
		<section  id='LIBRO${data.list[P].codl}'  class='axtitlemin'>
			<h2 class='axa-l'>${data.list[P].noml}</h2>`;
			if(tipo=='Gerente')
			{	TK+=`<a  class='axico135'  onclick="librodel('${data.list[P].codl}')"></a>`;
			}
			TK+=`
			<a  class='axico131'  onclick="libroedit('${data.list[P].codl}')"></a>
		</section>`;
	}
	axload('C2',TK);
}

function librodel(codl)
{	axmsgconfirm('Estas seguro de eliminar')
	.then(async res=>
	{	if(res)
		{	let data=await axdataget(`api/librodel/${codl}`);
			if(data.resp)
			{	axmsgmin('Se elimino');
				axelemhide(`LIBRO${codl}`);
			}
			else
			{	axmsgerr('No se elimino');	}
		}
	})
}

async function libroedit(codl)
{	let tipo=axtokenget('aud')[0];
	let data=await axdataget(`api/libroinfo/${codl}`);
	console.log(data);
	let TK=`
	<form  id='F4'  class='axfrmmed'>
		<center>Editar libro</center>
		<input  name='codl'  value='${data.codl}'  type='hidden'>
		<input  name='noml'  value='${data.noml}'  placeholder='Nombre'    required>
		<input  name='fechp' value='${data.fechp}' type='date'  required>
		<textarea name='des'>${data.des}</textarea>
		<button>Aplicar cambios</button>
	</form>
	<h2  class='axtitleline'>Autores</h2>`;
	
	for(P=0; P<data.autors.length; P++)
	{	TK+=`
		<legend  id='AUTOR${data.autors[P].numa}'  class='axtitlemin'>
			<h2 id='AUT${data.autors[P].numa}'>${data.autors[P].ap} ${data.autors[P].nom} (${data.autors[P].rela})</h2>`;
			if(tipo=='Gerente')
			{	TK+=`
				<a  class='axico135' onclick="autordel(${data.autors[P].numa})"></a>`;
			}
			TK+=`
			<a  class='axico131' onclick="autoredit(${data.autors[P].numa},'${data.autors[P].rela}','${data.autors[P].nom}')"></a>
		</legend>`;
	}

	TK+=`
	<form id='F5' class='axfrmmin'>
		<center>Nuevo autor</center>
		<input  name='codl'  value='${data.codl}'  type='hidden'>
		<aside>
			<input  id='numid' name='num'  type='hidden'>
			<h2 id='numcap'></h2>
			<a class='axico117' onclick="personselect('numid','numcap','')"></a>
		</aside>
		<select  name='rela'>
			<option>autor</option>
			<option>coautor</option>
		</select>
		<button>Guardar</button>
	</form>`;
	axload('C2',TK);

	axelem('F4').addEventListener('submit',async e=>
	{	e.preventDefault();
		let data=await axdatapost(`api/libroup`,'F4');
		if(data.resp)
		{	axmsgok('Se guardo');	}
		else
		{	axmsgerr('No se envio');	}
	})

	axelem('F5').addEventListener('submit',async e=>
	{	e.preventDefault();
		let data=await axdatapost(`api/autorsave`,'F5');
		if(data.resp)
		{	axmsgok('Se guardo');	}
		else
		{	axmsgerr('No se envio');	}
	})
}

function autordel(numa)
{	axmsgconfirm('Estas seguro de eliminar')
	.then(async res=>
	{	if(res)
		{	let data=await axdataget(`api/autordel/${numa}`);
			if(data.resp)
			{	axmsgmin('Se elimino');
				axelemhide(`AUTOR${numa}`);
			}
			else
			{	axmsgerr('No se elimino');	}
		}
	})
}

async function autoredit(numa,rela,nom)
{	axwinopen('V1');
	let TK=`
	<form  id='F6'  class='axfrmmed'>
		<center>Editar autor</center>
		<input name='numa'  value='${numa}'>
		<label>Nombre de autor</label>
		<input value='${nom}' disabled>
		<label>Relacion</label>
		<select name='rela'>
			<option ${rela=='autor'?'selected':''}>autor</option>
			<option ${rela=='coautor'?'selected':''}>coautor</option>
		</select>
		<button>Aplicar cambios</button>
	</form>`;
	axload('V1C',TK);
	axelem('F6').addEventListener('submit',async e=>
	{	e.preventDefault();
		let data=await axdatapost(`api/autorup`,'F6');
		if(data.resp)
		{	axmsgok('Se guardo');
			axload(`AUT${numa}`,`${nom} (${axfrmget('F6','rela')})`);
		}
		else
		{	axmsgerr('No se envio');	}
	})
}