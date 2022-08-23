// ELEMENTOS DEL DOM

const ciudad = document.querySelector('.ciudad'),
    icono = document.querySelector('.icono'),
    temperatura = document.querySelector('.temperatura'),
    btnBusqueda = document.querySelector('.btnBusqueda'),
    ciudadIngresada = document.querySelector('.inputBusqueda'),
    ultimaCiudad = document.querySelectorAll('.ultimaCiudad'),
    tempMin = document.querySelector('.tempMin'),
    tempMax = document.querySelector('.tempMax'),
    historialCiudades = document.querySelector('.historialCiudades');

// HISTORIAL DE CIUDADES

ciudadIngresada.value = '';

const ciudadesGuardadas = [];

const datosLocalStorage = JSON.parse(localStorage.getItem('historialCiudades'));

if (datosLocalStorage != null) {
    for (const ciudad of datosLocalStorage) {
        ciudadesGuardadas.push(ciudad);
    }
}

for (const ciudad of ciudadesGuardadas) {
    const li = `<li class="ultimaCiudad">${ciudad}</li>`;
    historialCiudades.innerHTML += li;
}

// CREACION DE CIUDAD

function crearCiudad(data) {
    ciudad.innerHTML = `${data.name}, ${data.sys.country}`;
    temperatura.innerHTML = Math.round(data.main.temp) + ' °c';
    tempMin.innerHTML = `min ${Math.round(data.main.temp_min)} °c`;
    tempMax.innerHTML = `max ${Math.round(data.main.temp_max)} °c`;
    icono.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png">`;
    ultimaCiudad.innerHTML = `${data.name}, ${data.sys.country}`;

    if (data.weather[0].icon.includes('d')) {
        document.body.style.backgroundImage = `url('./img/dia.jpg')`;
    } else {
        document.body.style.backgroundImage = `url('./img/noche.jpg')`;
    }

    // GUARDADO EN HISTORIAL

    if (ciudadesGuardadas.length < 5 && !ciudadesGuardadas.includes(ciudad.innerHTML)) {
        ciudadesGuardadas.unshift(ciudad.innerHTML);
    } else if (ciudadesGuardadas.length === 5 && !ciudadesGuardadas.includes(ciudad.innerHTML)) {
        ciudadesGuardadas.pop();
        ciudadesGuardadas.unshift(ciudad.innerHTML);
    } else {
        let posicion = ciudadesGuardadas.indexOf(ciudad.innerHTML);
        ciudadesGuardadas.splice(posicion, 1);
        ciudadesGuardadas.unshift(ciudad.innerHTML);
    }

    historialCiudades.innerHTML = 'Historial de ciudades';

    for (const ciudad of ciudadesGuardadas) {
        const li = `<li class="ultimaCiudad">${ciudad}</li>`;
        historialCiudades.innerHTML += li;
    }

    // GUARDADO EN STORAGE

    localStorage.clear();
    localStorage.setItem('historialCiudades', JSON.stringify(ciudadesGuardadas));
}

// CONSULTA A LA API

const buscarCiudad = () => {
    if (ciudadIngresada.value != '') {
        const apiKey = '5e900ba172cd8945a01eb43f95d8bf7a';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudadIngresada.value}&appid=${apiKey}&units=metric`;
        fetch(url)
            .then((response) => response.json())
            .then((data) => crearCiudad(data))
            .catch(() => {
                ciudad.innerHTML = 'Ingrese una ciudad válida';
                temperatura.innerHTML = '';
                tempMin.innerHTML = '';
                tempMax.innerHTML = '';
                icono.innerHTML = '';
                document.body.style.backgroundImage = `url('./img/default.jpg')`;
            });
    }
};

// BOTONES Y ACCIONES

btnBusqueda.addEventListener('click', () => {
    buscarCiudad();
});

ciudadIngresada.addEventListener('keypress', (event) => {
    event.key === 'Enter' && buscarCiudad();
});

document.body.addEventListener('click', function (e) {
    if (e.target.classList.contains('ultimaCiudad')) {
        ciudadIngresada.value = e.target.innerHTML;
        buscarCiudad();
    }
});
