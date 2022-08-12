// CIUDADES (Database)

const tempCalor = () => {
    return Math.round(Math.random() * 20 + 20);
};

const tempFrio = () => {
    return Math.round(Math.random() * 20);
};

function cambiarInfo(valor) {
    navInfo.innerHTML = valor;
}

class Ciudad {
    constructor(ciudad, pais, temperatura, clima) {
        this.ciudad = ciudad;
        this.pais = pais;
        this.temperatura = temperatura;
        this.clima = clima;
    }
    mostrar() {
        ciudadSeleccionada.innerHTML = `<div class="card" style="width: 25rem">
        <img src="./img/${this.ciudad}.jpg" class="card-img-top img-fluid">
        <div class="card-body">
          <p class="card-text">${this.ciudad}:</p>
          <p class="card-text">temperatura actual ${this.temperatura}°C</p>
          <p class="card-text">clima ${this.clima}</p>
        </div>
        </div>`;
        main__container.append(ciudadSeleccionada);
        cambiarInfo('');
    }
}

const ciudadesArgentina = [
    new Ciudad('Buenos Aires', 'Argentina', tempCalor(), 'Soleado'),
    new Ciudad('Tierra del Fuego', 'Argentina', tempFrio(), 'Chubascos de nieve'),
];

const ciudadesBrasil = [
    new Ciudad('Brasilia', 'Brasil', tempCalor(), 'Parcialmente nublado'),
    new Ciudad('Sao Paulo', 'Brasil', tempCalor(), 'Nublado'),
];

ciudadesArgentina.push(new Ciudad('Santa Cruz', 'Argentina', tempFrio(), 'Parcialmente nublado'));
ciudadesBrasil.push(new Ciudad('Foz do Iguacu', 'Brasil', tempCalor(), 'Soleado'));

const ciudadesGlobal = [...ciudadesArgentina, ...ciudadesBrasil];

ciudadesGlobal.sort((a, b) => {
    if (a.temperatura < b.temperatura) {
        return -1;
    }
    if (a.temperatura > b.temperatura) {
        return 1;
    }
    return 0;
});

// BOTONES y DOM

const ciudadSeleccionada = document.createElement('div'),
    btnCiudadFria = document.getElementById('btn__ciudadFria'),
    btnCiudadCalida = document.getElementById('btn__ciudadCalida'),
    btnRecuperarCiudad = document.getElementById('btn__recuperarCiudad'),
    btnGuardarCiudad = document.getElementById('btn__guardarCiudad'),
    btnBorrarCiudad = document.getElementById('btn__borrarCiudad'),
    inputCiudad = document.getElementById('input__ciudad'),
    btnBuscar = document.getElementById('btn__buscar'),
    navInfo = document.getElementById('nav__info');

let busqueda;

function guardarDatos() {
    localStorage.setItem('ciudadGuardada', JSON.stringify(busqueda));
    cambiarInfo(`Ciudad guardada`);
}

function borrarDatos() {
    localStorage.clear();
    sessionStorage.clear();
    cambiarInfo(`Datos eliminados`);
}

btnBorrarCiudad.addEventListener('click', () => {
    localStorage.ciudadGuardada ? borrarDatos() : cambiarInfo('No hay datos preexistentes');
});

btnCiudadFria.addEventListener('click', () => {
    ciudadesGlobal[0].mostrar();
    inputCiudad.value = ciudadesGlobal[0].ciudad;
    busqueda = ciudadesGlobal[0];
});

btnCiudadCalida.addEventListener('click', () => {
    ciudadesGlobal.at(-1).mostrar();
    inputCiudad.value = ciudadesGlobal.at(-1).ciudad;
    busqueda = ciudadesGlobal.at(-1);
});

btnBuscar.addEventListener('click', () => {
    busqueda = ciudadesGlobal.find((ciudadBuscada) => ciudadBuscada.ciudad === inputCiudad.value);
    if (busqueda != undefined) {
        busqueda.mostrar();
    } else {
        inputCiudad.value = '';
        ciudadSeleccionada.innerHTML = '';
        cambiarInfo(`Ingrese una ciudad correcta`);
    }
});

btnGuardarCiudad.addEventListener('click', () => {
    busqueda != undefined ? guardarDatos() : cambiarInfo(`No hay una ciudad seleccionada`);
});

btnRecuperarCiudad.addEventListener('click', () => {
    if (localStorage.ciudadGuardada) {
        cambiarInfo('');
        busqueda = JSON.parse(localStorage.getItem('ciudadGuardada'));
        const ciudadRecuperada = new Ciudad(
            busqueda.ciudad,
            busqueda.pais,
            busqueda.temperatura,
            busqueda.clima
        );
        ciudadRecuperada.mostrar();
        inputCiudad.value = ciudadRecuperada.ciudad;
    } else {
        cambiarInfo('No hay una ciudad guardada');
    }
});
