// ELEMENTOS DEL DOM

const ciudad = document.querySelector('.ciudad'),
    horario = document.querySelector('.horario'),
    icono = document.querySelector('.icono'),
    temperatura = document.querySelector('.temperatura'),
    tempMin = document.querySelector('.tempMin'),
    tempMax = document.querySelector('.tempMax'),
    ciudadIngresada = document.querySelector('.inputBusqueda'),
    btnBusqueda = document.querySelector('.btnBusqueda'),
    main = document.querySelector('.main'),
    aside = document.querySelector('.aside'),
    btnMenu = document.querySelector('.btnMenu'),
    ultimaCiudad = document.querySelectorAll('.ultimaCiudad'),
    historialCiudades = document.querySelector('.historialCiudades'),
    limpiarHistorial = document.querySelector('.limpiarHistorial'),
    anchoPantalla = window.innerWidth;

// DEFAULT

window.addEventListener('load', () => {
    ciudad.innerHTML = `Consulte el clima`;
    temperatura.innerHTML = `<img src="./img/unknown.png" width="150rem">`;
    ciudadIngresada.value = '';
});

// HISTORIAL DE CIUDADES

const ciudadesGuardadas = [];

const datosLocalStorage = JSON.parse(localStorage.getItem('historialCiudades'));

if (datosLocalStorage != null) {
    for (const ciudad of datosLocalStorage) {
        ciudadesGuardadas.push(ciudad);
    }
    for (const ciudad of ciudadesGuardadas) {
        const li = `<li class="ultimaCiudad">${ciudad}</li>`;
        historialCiudades.innerHTML += li;
    }
}

// CREACION DE CIUDAD

function crearCiudad(data) {
    luxon.Settings.defaultZone = 'utc';
    let horaCiudad = luxon.DateTime.fromSeconds(luxon.DateTime.now().toUnixInteger() + data.timezone);
    let horaFormateada = horaCiudad.toFormat(`dd/LL T' hs'`);

    const nuevaCiudad = {
        ciudad: data.name,
        pais: data.sys.country,
        horario: horaFormateada,
        tempActual: Math.round(data.main.temp),
        tempMin: Math.round(data.main.temp_min),
        tempMax: Math.round(data.main.temp_max),
        icono: data.weather[0].icon,
    };

    ciudad.innerHTML = `${nuevaCiudad.ciudad}, ${nuevaCiudad.pais}`;
    horario.innerHTML = nuevaCiudad.horario;
    icono.innerHTML = `<img src="./img/${nuevaCiudad.icono}.png">`;
    temperatura.innerHTML = nuevaCiudad.tempActual + ' °c';
    tempMin.innerHTML = `min ${nuevaCiudad.tempMin} °c`;
    tempMax.innerHTML = `max ${nuevaCiudad.tempMax} °c`;
    ultimaCiudad.innerHTML = `${nuevaCiudad.ciudad}, ${nuevaCiudad.pais}`;

    if (nuevaCiudad.icono.includes('d')) {
        document.body.style.backgroundImage = `url('./img/dia.jpg')`;
    } else {
        document.body.style.backgroundImage = `url('./img/noche.jpg')`;
    }

    if(anchoPantalla < 576){
        btnMenu.classList.toggle('open');
        aside.classList.toggle('hide');
        main.classList.toggle('hide');
    }

    // GUARDADO DEL HISTORIAL Y POSICIONAMIENTO

    if (ciudadesGuardadas.length < 8 && !ciudadesGuardadas.includes(ciudad.innerHTML)) {
        ciudadesGuardadas.unshift(ciudad.innerHTML);
    } else if (ciudadesGuardadas.length === 8 && !ciudadesGuardadas.includes(ciudad.innerHTML)) {
        ciudadesGuardadas.pop();
        ciudadesGuardadas.unshift(ciudad.innerHTML);
    } else {
        let posicion = ciudadesGuardadas.indexOf(ciudad.innerHTML);
        ciudadesGuardadas.splice(posicion, 1);
        ciudadesGuardadas.unshift(ciudad.innerHTML);
    }

    historialCiudades.innerHTML = '';

    for (const ciudad of ciudadesGuardadas) {
        const li = `<li class="ultimaCiudad">${ciudad}</li>`;
        historialCiudades.innerHTML += li;
    }

    // GUARDADO EN LOCAL STORAGE

    localStorage.clear();
    localStorage.setItem('historialCiudades', JSON.stringify(ciudadesGuardadas));
}

// CONSULTA A LA API

function alerta(mensaje) {
    Toastify({
        text: mensaje,
        duration: 3200,
        position: 'center',
        className: 'toastifyClass',
        style: {
            background: 'rgb(206, 140, 104)',
        },
    }).showToast();
}

const buscarCiudad = async () => {
    const apiKey = '5e900ba172cd8945a01eb43f95d8bf7a';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudadIngresada.value}&appid=${apiKey}&units=metric`;
    if (ciudadIngresada.value != '') {
        const response = await fetch(url);
        if (response.status == 401) {
            alerta('Hubo un problema con el servidor');
            ciudadIngresada.value = '';
        } else if (response.status == 404) {
            alerta('Ingrese una ciudad correcta');
            ciudadIngresada.value = '';
        } else {
            const data = await response.json();
            crearCiudad(data);
        }
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

limpiarHistorial.addEventListener('click', () => {
    localStorage.clear();
    historialCiudades.innerHTML = '';
    ciudadesGuardadas.length = 0;
});

btnMenu.addEventListener('click', () => {
    btnMenu.classList.toggle('open');
    aside.classList.toggle('hide');
    main.classList.toggle('hide');
});
