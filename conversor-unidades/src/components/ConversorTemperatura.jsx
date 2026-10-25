import { useState } from "react";
import styles from "./Conversor.module.css";
import SelectorUnidad from "./SelectorUnidad";
import unidadesTemperatura from "../data/temperatura";
import { convertirTemperatura } from "../utils/conversiones";
import EquivalenciasTemperatura from "./EquivalenciasTemperatura";

function ConversorTemperatura() {
  const [valor, setValor] = useState("25");
  const [unidadOrigenId, setUnidadOrigenId] = useState("celsius");
  const [unidadDestinoId, setUnidadDestinoId] = useState("fahrenheit");

  //busco los objetos correspondientes a las unidades elegidas
  const unidadOrigen = unidadesTemperatura.find(
    (unidad) => unidad.id === unidadOrigenId,
  );

  const unidadDestino = unidadesTemperatura.find(
    (unidad) => unidad.id === unidadDestinoId,
  );

  //compruebo que el campo contenga un numero
  const entradaValida = valor.trim() !== "" && Number.isFinite(Number(valor));

  //calculo el resultado
  let resultado = null;
  let mensajeError = "";

  if (entradaValida) {
    try {
      resultado = convertirTemperatura(
        Number(valor),
        unidadOrigenId,
        unidadDestinoId,
      );
    } catch (error) {
      mensajeError = error.message;
    }
  }

  //formato los numeros con la configuración regional argentina
  const formatoNumero = new Intl.NumberFormat("es-AR", {
    maximumFractionDigits: 10,
  });

  //intercambio las unidades de origen y destino
  function intercambiarUnidades() {
    setUnidadOrigenId(unidadDestinoId);
    setUnidadDestinoId(unidadOrigenId);
  }

  return (
    <section className={styles.conversor}>
      <div className={styles.filaUnidades}>
        <SelectorUnidad
          etiqueta="De"
          unidades={unidadesTemperatura}
          valor={unidadOrigenId}
          onChange={setUnidadOrigenId}
        />

        <button
          type="button"
          className={styles.botonIntercambiar}
          onClick={intercambiarUnidades}
          aria-label="Intercambiar unidades"
          title="Intercambiar unidades"
        >
          ⇄
        </button>

        <SelectorUnidad
          etiqueta="A"
          unidades={unidadesTemperatura}
          valor={unidadDestinoId}
          onChange={setUnidadDestinoId}
        />
      </div>

      <div className={styles.campoValor}>
        <label htmlFor="valor-temperatura">
          Temperatura que querés convertir
        </label>

        <input
          id="valor-temperatura"
          type="number"
          step="any"
          value={valor}
          onChange={(evento) => setValor(evento.target.value)}
          placeholder="Ingresá una temperatura"
        />
      </div>

      <div className={styles.resultado}>
        <span className={styles.etiquetaResultado}>Resultado</span>

        {resultado !== null && (
          <p className={styles.valorResultado}>
            {formatoNumero.format(resultado)}{" "}
            <span>{unidadDestino.simbolo}</span>
          </p>
        )}

        {mensajeError && <p className={styles.mensajeError}>{mensajeError}</p>}

        {!entradaValida && (
          <p className={styles.mensajeError}>Ingresá una temperatura válida.</p>
        )}

        {resultado !== null && (
          <p className={styles.detalleResultado}>
            {formatoNumero.format(Number(valor))} {unidadOrigen.simbolo}{" "}
            equivalen a {formatoNumero.format(resultado)}{" "}
            {unidadDestino.simbolo}.
          </p>
        )}
      </div>
      <EquivalenciasTemperatura
        valor={valor}
        unidades={unidadesTemperatura}
        unidadOrigen={unidadOrigen}
      />
    </section>
  );
}

export default ConversorTemperatura;
