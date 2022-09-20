var url = "https://g15818280b7960e-i2zhnr44m9y53z9a.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/client/client"
// var url2 = "https://g15818280b7960e-i2zhnr44m9y53z9a.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/client/client/:id"
alert("Bienvenidos a la lista de clientes")
function leerClientes() {
	//FUNCION GET
	$.ajax({
		url: url,
		type: 'GET',
		dataType: 'json',

		success: function (clientes) {
			let cs = clientes.items;
			$("#listaClientes").empty();
			for (i = 0; i < cs.length; i++) {
				$("#listaClientes").append(cs[i].id + " <b>" + cs[i].name + "</b> " + cs[i].email + " " + cs[i].age);
				$("#listaClientes").append(" <b>" + "<button onclick='borrarCliente(" + cs[i].id + ")'>Borrar</button><br>");
				// console.log(clientes)
			}
		},
		error: function (xhr, status) {
			alert('ha sucedido un problema');
		}
	});
}
function traerId() {
	let idCliente = $("#idCliente").val();
		$.ajax({
			url: url,
			type: 'GET',
			dataType: 'json',
			
			success: function (clientes) {
			let cs = clientes.items;
			console.log(cs);
			console.log(cs[0]);
			$("#listaClientes").empty();
			for (i = 0; i < cs.length; i++) {
				// console.log([i])
				if(idCliente == cs[i].id) {
					// debugger;
					$("#listaClientes").append(cs[i].id + " <b>" + cs[i].name + "</b> " + cs[i].email + " " + cs[i].age);
					$("#listaClientes").append(" <b>" + "<button onclick='borrarCliente(" + cs[i].id + ")'>Borrar</button><br>");
				}
			}
		},
		error: function (xhr, status) {
			alert('ha sucedido un problema');
		}
	});
}

function guardarCliente() {
	let idCliente = $("#idCliente").val();
	let nombre = $("#nombreCliente").val();
	let mailCliente = $("#mailCliente").val();
	let edad = $("#edadCliente").val();

	let data = {
		id: idCliente,
		name: nombre,
		email: mailCliente,
		age: edad
	};

	let dataToSend = JSON.stringify(data);
	//console.log(dataToSend);
	-

		$.ajax({
			url: url,
			type: 'POST',
			//   dataType : 'json',
			data: dataToSend,
			contentType: 'application/json',
			success: function (clientes) {
				$("#idCliente").val("");
				$("#nombreCliente").val("");
				$("#mailCliente").val("");
				$("#edadCliente").val("");
			},
			error: function (xhr, status) {
				//     alert('ha sucedido un problema');
			},
			complete: function () {
				leerClientes();
			}
		});


}


function editarCliente() {
	let idCliente = $("#idCliente").val();
	let nombre = $("#nombreCliente").val();
	let mailCliente = $("#mailCliente").val();
	let edad = $("#edadCliente").val();

	let data = {
		id: idCliente,
		name: nombre,
		email: mailCliente,
		age: edad
	};
	let dataToSend = JSON.stringify(data);
	//console.log(dataToSend);
	$.ajax({
		url: url,
		type: 'PUT',
		//   dataType : 'json',
		data: dataToSend,
		contentType: 'application/json',
		success: function (clientes) {
			$("#idCliente").val("");
			$("#nombreCliente").val("");
			$("#mailCliente").val("");
			$("#edadCliente").val("");
		},
		error: function (xhr, status) {
			//     alert('ha sucedido un problema');
		},
		complete: function () {
			leerClientes();
		}
	});

}

function borrarCliente(idCliente) {
	let data = {
		id: idCliente
	};
	let dataToSend = JSON.stringify(data);
	//console.log(dataToSend);
	$.ajax({
		url: url,
		type: 'DELETE',
		//   dataType : 'json',
		data: dataToSend,
		contentType: 'application/json',
		success: function (pepito) {
			$("#idCliente").val("");
			$("#nombreCliente").val("");
			$("#mailCliente").val("");
			$("#edadCliente").val("");
		},
		error: function (xhr, status) {
			//     alert('ha sucedido un problema');
		},
		complete: function () {
			leerClientes();
		}
	});

}