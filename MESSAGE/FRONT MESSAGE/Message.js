var url = "https://g15818280b7960e-i2zhnr44m9y53z9a.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/message/message"
alert("Bienvenidos a la lista de Message")
function leerMessage() {
	//FUNCION GET
	$.ajax({
		url: url,
		type: 'GET',
		dataType: 'json',

		success: function (mensaje) {
			let msj = mensaje.items;
			$("#listaMessage").empty();
			for (i = 0; i < msj.length; i++) {
				$("#listaMessage").append(msj[i].id + " <b>" + msj[i].messagetext);
				$("#listaMessage").append(" <b>" + "<button onclick='borrarMessage(" + msj[i].id + ")'>Borrar</button><br>");
				// console.log(clientes)
			}
		},
		error: function (xhr, status) {
			alert('ha sucedido un problema');
		}
	});
}
function traerId() {
	let idMensaje = $("#idMensaje").val();
	$.ajax({
		url: url,
		type: 'GET',
		dataType: 'json',

		success: function (mensaje) {
			let msj = mensaje.items;
			console.log(msj);
			console.log(msj[0]);
			$("#listaMessage").empty();
			for (i = 0; i < msj.length; i++) {
				// console.log([i])
				if (idMensaje == msj[i].id) {
					// debugger;
					$("#listaMessage").append(msj[i].id + " <b>" + msj[i].messagetext);
					$("#listaMessage").append(" <b>" + "<button onclick='borrarMessage(" + msj[i].id + ")'>Borrar</button><br>");
				}
			}
		},
		error: function (xhr, status) {
			alert('ha sucedido un problema');
		}
	});
}

function guardarMessage() {
	let idMensaje = $("#idMensaje").val();
	let textMessage = $("#textMensaje").val();

	let data = {
		id: idMensaje,
		messagetext: textMessage,
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
			success: function (mensaje) {
				$("#idMensaje").val("");
				$("#textMensaje").val("");
			},
			error: function (xhr, status) {
				alert('ha sucedido un problema');
			},
			complete: function () {
				leerMessage();
			}
		});


}
function editarMessage() {
	let idMensaje = $("#idMensaje").val();
	let textMessage = $("#textMensaje").val();

	let data = {
		id: idMensaje,
		messagetext: textMessage,
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
			$("#idMensaje").val("");
			$("#textMensaje").val("");
		},
		error: function (xhr, status) {
			alert('ha sucedido un problema');
		},
		complete: function () {
			leerMessage();
		}
	});

}

function borrarMessage(idMensaje) {
	let data = {
		id: idMensaje
	};
	let dataToSend = JSON.stringify(data);
	//console.log(dataToSend);
	$.ajax({
		url: url,
		type: 'DELETE',
		//   dataType : 'json',
		data: dataToSend,
		contentType: 'application/json',
		success: function (mensaje) {
			$("#idMensaje").val("");
			$("#textMensaje").val("");
		},
		error: function (xhr, status) {
			alert('ha sucedido un problema');
		},
		complete: function () {
			leerMessage();
		}
	});

}