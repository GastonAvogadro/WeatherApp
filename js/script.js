let numeroIngresado = '';

function solicitarCiudad() {
    numeroIngresado = prompt(
        'Ingrese el número de la ciudad para conocer el clima actual:\n1- Buenos Aires\n2- Tierra del Fuego\n3- Santa Cruz\n4- Brasilia\n5- São Paulo\n6- Foz do Iguaçu\n7- (Ciudad más fría)\n8- (Ciudad más cálida)'
    );
}

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

solicitarCiudad();

while (true) {
    switch (numeroIngresado) {
        case '1':
            alert(
                'Buenos Aires:\ntemperatura actual ' +
                    ciudadesArgentina[0].temperatura +
                    '°C' +
                    '\nclima ' +
                    ciudadesArgentina[0].clima
            );
            break;
        case '2':
            alert(
                'Tierra del Fuego:\ntemperatura actual ' +
                    ciudadesArgentina[1].temperatura +
                    '°C' +
                    '\nclima ' +
                    ciudadesArgentina[1].clima
            );
            break;
        case '3':
            alert(
                'Santa Cruz:\ntemperatura actual ' +
                    ciudadesArgentina[2].temperatura +
                    '°C' +
                    '\nclima ' +
                    ciudadesArgentina[2].clima
            );
            break;
        case '4':
            alert(
                'Brasilia:\ntemperatura actual ' +
                    ciudadesBrasil[0].temperatura +
                    '°C' +
                    '\nclima ' +
                    ciudadesBrasil[0].clima
            );
            break;
        case '5':
            alert(
                'São Paulo:\ntemperatura actual ' +
                    ciudadesBrasil[1].temperatura +
                    '°C' +
                    '\nclima ' +
                    ciudadesBrasil[1].clima
            );
            break;
        case '6':
            alert(
                'Foz do Iguaçu:\ntemperatura actual ' +
                    ciudadesBrasil[2].temperatura +
                    '°C' +
                    '\nclima ' +
                    ciudadesBrasil[2].clima
            );
            break;
        case '7':
            alert(
                ciudadesGlobal[0].ciudad +
                    ':\ntemperatura actual ' +
                    ciudadesGlobal[0].temperatura +
                    '°C' +
                    '\nclima ' +
                    ciudadesGlobal[0].clima
            );
            break;
        case '8':
            alert(
                ciudadesGlobal.at(-1).ciudad +
                    ':\ntemperatura actual ' +
                    ciudadesGlobal.at(-1).temperatura +
                    '°C' +
                    '\nclima ' +
                    ciudadesGlobal.at(-1).clima
            );
            break;
        default:
            alert('Ingrese un número correcto por favor');
            break;
    }

    solicitarCiudad();
}
