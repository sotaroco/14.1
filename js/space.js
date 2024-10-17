// Selección de elementos
const inputBuscar = document.getElementById("inputBuscar");
const btnBuscar = document.getElementById("btnBuscar");
const contenedor = document.getElementById("contenedor");

// Función para buscar imágenes
const buscarImagenes = async (query) => {
try {
// Hacer la solicitud a la API con el término de búsqueda ingresado por el usuario
    const response = await fetch(`https://images-api.nasa.gov/search?q=${query}`);
    const data = await response.json();

    // Extraer los resultados de la búsqueda
    const resultados = data.collection.items;
    // Limpiar el contenedor antes de mostrar los nuevos resultados
    contenedor.innerHTML = "";

    // Recorrer los resultados y generar tarjetas
    resultados.forEach(item => {
    const { title, description, date_created } = item.data[0];
    const imageLink = item.links[0].href;

      // Crear una tarjeta para cada resultado
    const tarjeta = document.createElement("div");
    tarjeta.classList.add("card", "mb-4", "col-md-4");
    tarjeta.innerHTML = `
        <img src="${imageLink}" class="card-img-top" alt="${title}">
        <div class="card-body">
        <h5 class="card-title">${title}</h5>
        <p class="card-text">${description || 'Sin descripción disponible'}</p>
        <p class="card-text"><small class="text-muted">Fecha: ${new Date(date_created).toLocaleDateString()}</small></p>
        </div>
    `;
    contenedor.appendChild(tarjeta);
    });
} catch (error) {
    console.error("Error fetching data:", error);
    contenedor.innerHTML = "<p>No se pudo cargar la información. Inténtelo de nuevo.</p>";
}
};

// Agregar el evento al botón de búsqueda
btnBuscar.addEventListener("click", () => {
const query = inputBuscar.value.trim();
if (query) {
    buscarImagenes(query);
} else {
    alert("Por favor, ingrese un término de búsqueda.");
}
});