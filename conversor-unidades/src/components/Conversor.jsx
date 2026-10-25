import { useState } from "react";
import styles from "./Conversor.module.css";
import SelectorUnidad from "./SelectorUnidad";
import unidadesLongitud from "../data/unidades";
import { convertirUnidades } from "../utils/conversiones";
import Equivalencias from "./Equivalencias";

function Conversor() {
  const [valor, setValor] = useState("1");
  const [unidadOrigenId, setUnidadOrigenId] = useState("metro");
  const [unidadDestinoId, setUnidadDestinoId] = useState("centimetro");

  const unidadOrigen = unidadesLongitud.find(
    (unidad) => unidad.id === unidadOrigenId,
  );

  const unidadDestino = unidadesLongitud.find(
    (unidad) => unidad.id === unidadDestinoId,
  );

  const entradaValida = valor.trim() !== "" && Number.isFinite(Number(valor));

  //calculo automatico, cuando cambia unvalor o unidad, se vuelve a ejecutar el componente
  //y se calcula nuevamente con lso ddatos actuales.
  const resultado = entradaValida
    ? convertirUnidades(Number(valor), unidadOrigen, unidadDestino)
    : null;

  //con esto adaptamos el formato
  const formatoNumero = new Intl.NumberFormat("es-AR", {
    maximumFractionDigits: 10,
  });

  //intercambiamos el origen y el destino,
  //si tenemos metros a centimetors podemos pasar de centimetros a metros
  function intercambiarUnidades() {
    setUnidadOrigenId(unidadDestinoId);
    setUnidadDestinoId(unidadOrigenId);
  }

  return (
    <section className={styles.conversor}>
      <div className={styles.filaUnidades}>
        <SelectorUnidad
          etiqueta="De"
          unidades={unidadesLongitud}
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
          unidades={unidadesLongitud}
          valor={unidadDestinoId}
          onChange={setUnidadDestinoId}
        />
      </div>

      <div className={styles.campoValor}>
        <label htmlFor="valor-conversion">Valor que querés convertir</label>

        <input
          id="valor-conversion"
          type="number"
          value={valor}
          onChange={(evento) => setValor(evento.target.value)}
          placeholder="Ingresá un valor"
          step="any"
        />
      </div>

      <div className={styles.resultado}>
        <span className={styles.etiquetaResultado}>Resultado</span>

        {resultado !== null ? (
          <p className={styles.valorResultado}>
            {formatoNumero.format(resultado)}{" "}
            <span>{unidadDestino.simbolo}</span>
          </p>
        ) : (
          <p className={styles.mensajeError}>
            Ingresá un número válido para convertir.
          </p>
        )}

        {resultado !== null && (
          <p className={styles.detalleResultado}>
            {formatoNumero.format(Number(valor))} {unidadOrigen.simbolo}{" "}
            equivalen a {formatoNumero.format(resultado)}{" "}
            {unidadDestino.simbolo}.
          </p>
        )}
      </div>
      <Equivalencias
        valor={valor}
        unidades={unidadesLongitud}
        unidadOrigen={unidadOrigen}
      />
    </section>
  );
}

export default Conversor;
