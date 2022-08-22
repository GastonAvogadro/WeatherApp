const apiKey = '5e900ba172cd8945a01eb43f95d8bf7a',
    ciudad = document.querySelector('.ciudad'),
    icono = document.querySelector('.icono'),
    temperatura = document.querySelector('.temperatura'),
    btnBusqueda = document.querySelector('.btnBusqueda'),
    ciudadIngresada = document.querySelector('.inputBusqueda'),
    ultimaCiudad = document.querySelector('.ultimaCiudad'),
    tempMin = document.querySelector('.tempMin'),
    tempMax = document.querySelector('.tempMax');

if ('ciudadGuardada' in localStorage) {
    ultimaCiudad.innerHTML = JSON.parse(localStorage.getItem('ciudadGuardada'));
}

function crearCiudad(data) {
    ciudad.innerHTML = `${data.name}, ${data.sys.country}`;
    temperatura.innerHTML = Math.round(data.main.temp) + ' °c';
    tempMin.innerHTML = `min ${Math.round(data.main.temp_min)} °c`;
    tempMax.innerHTML = `max ${Math.round(data.main.temp_max)} °c`;
    icono.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png">`;
    ultimaCiudad.innerHTML = `${data.name}, ${data.sys.country}`;
    localStorage.setItem('ciudadGuardada', JSON.stringify(`${data.name}, ${data.sys.country}`));
    if (data.weather[0].icon.includes('d')) {
        document.body.style.backgroundImage = `url('../img/dia.jpg')`;
    } else {
        document.body.style.backgroundImage = `url('../img/noche.jpg')`;
    }
}

const buscarCiudad = () => {
    if (ciudadIngresada.value != '') {
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
                document.body.style.backgroundImage = `url('../img/default.jpg')`;
            });
    }
};

btnBusqueda.addEventListener('click', () => {
    buscarCiudad();
});

ciudadIngresada.addEventListener('keypress', (event) => {
    event.key === 'Enter' && buscarCiudad();
});

ultimaCiudad.addEventListener('click', () => {
    ciudadIngresada.value = ultimaCiudad.innerHTML;
    buscarCiudad();
});
