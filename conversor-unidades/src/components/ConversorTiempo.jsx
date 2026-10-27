import { useState } from "react";
import styles from "./Conversor.module.css";
import SelectorUnidad from "./SelectorUnidad";
import unidadesTiempo from "../data/tiempo";
import { convertirUnidades } from "../utils/conversiones";
import Equivalencias from "./Equivalencias";

function ConversorTiempo() {
  const [valor, setValor] = useState("1");
  const [unidadOrigenId, setUnidadOrigenId] = useState("hora");
  const [unidadDestinoId, setUnidadDestinoId] = useState("minuto");

  //buscamos las unidades seleccionadas dentro de la lista
  const unidadOrigen = unidadesTiempo.find(
    (unidad) => unidad.id === unidadOrigenId,
  );

  const unidadDestino = unidadesTiempo.find(
    (unidad) => unidad.id === unidadDestinoId,
  );

  //compruebo que el campo contenga un numero valido
  const entradaValida = valor.trim() !== "" && Number.isFinite(Number(valor));

  //calcula el resultado solo si la entrada es valida
  const resultado = entradaValida
    ? convertirUnidades(Number(valor), unidadOrigen, unidadDestino)
    : null;

  //se da formato segun region argentina
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
          unidades={unidadesTiempo}
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
          unidades={unidadesTiempo}
          valor={unidadDestinoId}
          onChange={setUnidadDestinoId}
        />
      </div>

      <div className={styles.campoValor}>
        <label htmlFor="valor-tiempo">Tiempo que querés convertir</label>

        <input
          id="valor-tiempo"
          type="number"
          step="any"
          value={valor}
          onChange={(evento) => setValor(evento.target.value)}
          placeholder="Ingresá un tiempo"
        />
      </div>

      <div className={styles.resultado}>
        <span className={styles.etiquetaResultado}>Resultado</span>

        {resultado !== null ? (
          <>
            <p className={styles.valorResultado}>
              {formatoNumero.format(resultado)}{" "}
              <span>{unidadDestino.simbolo}</span>
            </p>

            <p className={styles.detalleResultado}>
              {formatoNumero.format(Number(valor))} {unidadOrigen.simbolo}{" "}
              equivalen a {formatoNumero.format(resultado)}{" "}
              {unidadDestino.simbolo}.
            </p>
          </>
        ) : (
          <p className={styles.mensajeError}>
            Ingresá un tiempo válido para convertir.
          </p>
        )}
      </div>

      <Equivalencias
        valor={valor}
        unidades={unidadesTiempo}
        unidadOrigen={unidadOrigen}
      />
    </section>
  );
}

export default ConversorTiempo;