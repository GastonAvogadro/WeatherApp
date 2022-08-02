// VARIABLES

let ciudadSeleccionada = document.createElement('div');
let btnBuenosAires = document.getElementById('btn__buenosAires');
let btnTierraDelFuego = document.getElementById('btn__tierraDelFuego');
let btnSantaCruz = document.getElementById('btn__santaCruz');
let btnBrasilia = document.getElementById('btn__brasilia');
let btnSaoPaulo = document.getElementById('btn__saoPaulo');
let btnFozDoIguacu = document.getElementById('btn__fozDoIguacu');
let btnCiudadFria = document.getElementById('btn__ciudadFria');
let btnCiudadCalida = document.getElementById('btn__ciudadCalida');

const tempCalor = () => {
    return Math.round(Math.random() * 20 + 20);
};

const tempFrio = () => {
    return Math.round(Math.random() * 20);
};

// CIUDADES

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
    }
}

const ciudadesArgentina = [
    new Ciudad('Buenos Aires', 'Argentina', tempCalor(), 'Soleado'),
    new Ciudad('Tierra del Fuego', 'Argentina', tempFrio(), 'Chubascos de nieve'),
];

const ciudadesBrasil = [
    new Ciudad('Brasilia', 'Brasil', tempCalor(), 'Parcialmente nublado'),
    new Ciudad('São Paulo', 'Brasil', tempCalor(), 'Nublado'),
];

ciudadesArgentina.push(new Ciudad('Santa Cruz', 'Argentina', tempFrio(), 'Parcialmente nublado'));
ciudadesBrasil.push(new Ciudad('Foz do Iguaçu', 'Brasil', tempCalor(), 'Soleado'));

const ciudadesGlobal = ciudadesArgentina.concat(ciudadesBrasil);

ciudadesGlobal.sort((a, b) => {
    if (a.temperatura < b.temperatura) {
        return -1;
    }
    if (a.temperatura > b.temperatura) {
        return 1;
    }
    return 0;
});

// BOTONES

btnBuenosAires.addEventListener('click', () => {
    ciudadesArgentina[0].mostrar();
});

btnTierraDelFuego.addEventListener('click', () => {
    ciudadesArgentina[1].mostrar();
});

btnSantaCruz.addEventListener('click', () => {
    ciudadesArgentina[2].mostrar();
});

btnBrasilia.addEventListener('click', () => {
    ciudadesBrasil[0].mostrar();
});

btnSaoPaulo.addEventListener('click', () => {
    ciudadesBrasil[1].mostrar();
});

btnFozDoIguacu.addEventListener('click', () => {
    ciudadesBrasil[2].mostrar();
});

btnCiudadFria.addEventListener('click', () => {
    ciudadesGlobal[0].mostrar();
});

btnCiudadCalida.addEventListener('click', () => {
    ciudadesGlobal.at(-1).mostrar();
});
