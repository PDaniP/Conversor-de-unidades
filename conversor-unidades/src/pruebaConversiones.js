
import unidadesLongitud from "./data/unidades.js";
import { convertirUnidades } from "./utils/conversiones.js";

const metro = unidadesLongitud.find(
  (unidad) => unidad.id === "metro"
);

const kilometro = unidadesLongitud.find(
  (unidad) => unidad.id === "kilometro"
);

const centimetro = unidadesLongitud.find(
  (unidad) => unidad.id === "centimetro"
);

const milimetro = unidadesLongitud.find(
  (unidad) => unidad.id === "milimetro"
);

console.log("1 metro a centímetros:");
console.log(convertirUnidades(1, metro, centimetro));

console.log("1 metro a milímetros:");
console.log(convertirUnidades(1, metro, milimetro));

console.log("1 metro a kilómetros:");
console.log(convertirUnidades(1, metro, kilometro));

console.log("5 kilómetros a centímetros:");
console.log(convertirUnidades(5, kilometro, centimetro));
