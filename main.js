// Para obetenr el nombre del pais y realizar la petición
document.getElementById('pais').addEventListener('submit', function(event) {
    event.preventDefault();

    const nombre_pais = document.getElementById('nombre_pais').value.trim();
    const url = `https://restcountries.com/v3.1/name/${nombre_pais}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data && data.length > 0) {
                const pais = data[0];
                infoPais(pais);
            } else {
                alert('No se encontraron datos para el país ingresado.');
            }
        })
        .catch(error => {
            console.error('Error al obtener los datos:', error);
            alert('Ocurrió un error al consultar la información.');
        });
});

// Para mostrar los datos del pais consultado
function infoPais(country) {
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = `
        <h2>Información sobre ${country.name.common}</h2>
        <p><strong>Nombre común:</strong> ${country.name.common}</p>
        <p><strong>Nombre oficial:</strong> ${country.name.official}</p>
        <p><strong>Moneda:</strong> ${Object.values(country.currencies)[0].name}</p>
        <p><strong>Región:</strong> ${country.region}</p>
        <p><strong>Capital:</strong> ${country.capital}</p>
        <p><strong>Área:</strong> ${country.area} km²</p>
    `;

    if (country.maps && country.maps.googleMaps) {
        const mapFrame = `
            <iframe
            width="800"
            height="600"
            style="border:0"
            loading="lazy"
            allowfullscreen
            referrerpolicy="no-referrer-when-downgrade"
            src="https://www.bing.com/maps/embed?h=600&w=800&cp=${country.latlng[0]}~${country.latlng[1]}&lvl=6">
            </iframe>
            `;
        document.getElementById('mapa').innerHTML = mapFrame;
    } else {
        document.getElementById('mapa').innerHTML = '<p>No se encuentra un mapa disponible.</p>';
    }
}