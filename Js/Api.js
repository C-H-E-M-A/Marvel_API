// Función para cargar personajes desde la API de Marvel
const cargarPeliculas = async () => {
	try {
		// Realiza una solicitud a la API de Marvel utilizando Fetch
		const respuesta = await fetch(`https://gateway.marvel.com/v1/public/characters?ts=1&apikey=02212fdf2402ae13353f657c0ec94866&hash=bab6c04aad8ccfb77321aded8d1d3910`);

		// Muestra la respuesta en la consola
		console.log(respuesta);

		// Verifica si la solicitud fue exitosa 
		if (respuesta.status === 200) {
			// Convierte la respuesta en formato JSON
			const datos = await respuesta.json();
			console.log("datos de json", datos);

			// Verifica si los resultados existen en los datos obtenidos
			if (datos.data.results) {
				let personajes = ''; // Variable para almacenar el HTML generado

				// Itera sobre cada personaje obtenido de los datos
				datos.data.results.forEach(personaje => {
					// URL de la imagen del personaje
					const imagen = `${personaje.thumbnail.path}.${personaje.thumbnail.extension}`;

					// Agrega el HTML para cada personaje
					personajes += `
					<div class="personajes">
				
						<img class="imagen" src="${imagen}"></img>
						<h3 class="Titulo">${personaje.name}</h3>
						<P class="Descripcion">${personaje.description}</P>
					</div>
					`;
				});

				// Inserta el HTML generado dentro del contenedor especificado en el documento
				document.getElementById('contenedor').innerHTML = personajes;
			}
		} else if (respuesta.status === 401) {
			//la clave API es incorrecta
			console.log('Pusiste la llave mal');
		} else if (respuesta.status === 404) {
			// recurso no encontrado
			console.log('La pelicula que buscas no existe');
		} else {
			// Otros errore
			console.log('Hubo un error y no sabemos que paso');
		}
	} catch (error) {
		// Captura cualquier error durante la ejecucion
		console.log(error);
	}
};

// Llama a la función para cargar los personajes
cargarPeliculas();
