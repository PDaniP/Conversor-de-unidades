const unidadesEnergia = [
  {
    id: "joule",
    nombre: "Joule",
    simbolo: "J",
    factor: 1,
  },
  {
    id: "kilojoule",
    nombre: "Kilojoule",
    simbolo: "kJ",
    factor: 1000,
  },
  {
    id: "caloria",
    nombre: "Caloría",
    simbolo: "cal",
    factor: 4.184,
  },
  {
    id: "kilocaloria",
    nombre: "Kilocaloría",
    simbolo: "kcal",
    factor: 4184,
  },
  {
    id: "wattHora",
    nombre: "Vatio-hora",
    simbolo: "Wh",
    factor: 3600,
  },
  {
    id: "kilowattHora",
    nombre: "Kilovatio-hora",
    simbolo: "kWh",
    factor: 3600000,
  },
  {
    id: "electronvoltio",
    nombre: "Electronvoltio",
    simbolo: "eV",
    factor: 1.602176634e-19,
  },
];

// Exportamos las unidades para utilizarlas en el conversor.
export default unidadesEnergia;
