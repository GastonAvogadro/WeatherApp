let numeroIngresado = '';
let ciudadSeleccionada = document.createElement('div');

const tempCalor = () => {
    return Math.round(Math.random() * 20 + 20);
};

const tempFrio = () => {
    return Math.round(Math.random() * 20);
};

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
        listaCiudades.remove();
    }
}

// CIUDADES ACTUALES

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

// COMIENZO DEL SIMULADOR

switch (numeroIngresado) {
    case '1':
        ciudadesArgentina[0].mostrar();
        break;
    case '2':
        ciudadesArgentina[1].mostrar();
        break;
    case '3':
        ciudadesArgentina[2].mostrar();
        break;
    case '4':
        ciudadesBrasil[0].mostrar();
        break;
    case '5':
        ciudadesBrasil[1].mostrar();
        break;
    case '6':
        ciudadesBrasil[2].mostrar();
        break;
    case '7':
        ciudadesGlobal[0].mostrar();
        break;
    case '8':
        ciudadesGlobal.at(-1).mostrar();
        break;
    default:
        break;
}
