export function convertirUnidades(valor, unidadOrigen, unidadDestino) {
    const numero = Number(valor)

    if (!Number.isFinite(numero)){
        throw new Error("El valor debe ser un numero valido");
    }

    if (!unidadOrigen || !unidadDestino) {
        throw new Error("Se debe elegir las dos unidades")
    }

    if (
        !Number.isFinite(unidadOrigen.factor) ||
        !Number.isFinite(unidadDestino.factor) ||
        unidadOrigen.factor <= 0 ||
        unidadDestino.factor <= 0
    ) {
        throw new Error("Los factores de conversion no son validos");
    }
    //realizamos la conversion a la unidad de referencia
    const valorEnUnidadBase = numero * unidadOrigen.factor;
    //devolvemos el resultado en la unidad elegida
    return valorEnUnidadBase / unidadDestino.factor;
}

//funcion para convertir temperatura
export function convertirTemperatura(valor, unidadOrigen, unidadDestino) {
    const numero = Number(valor);

    //valido que el valor sea un numero valido
    if (!Number.isFinite(numero)) {
        throw new Error("La temperatura debe ser un nuemro valido");
    }

    //convertir temp ingresada a celsius
    let celsius;

    switch (unidadOrigen) {
        case "celsius":
            celsius = numero;
            break;
        
        case "fahrenheit":
            celsius = (numero - 32) * (5/9);
            break;
        
        case "kelvin":
            celsius = numero - 273.15;
            break;

        default:
            throw new Error("La unidad de origen no es valida");
    }

    if (celsius < -273.15) {
        throw new Error("La temperatura no puede ser menos del cero absoluto");
    }

    //convertimos de celsius a la unidad seleccionada
    switch (unidadDestino) {
        case "celsius":
            return celsius;

        case "fahrenheit":
            return celsius * (9/5) + 32;

        case "kelvin":
            return celsius + 273.15;

        default:
            throw new Error("La unidad de destino no es valida");
    }
}