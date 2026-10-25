import { useState } from "react";
import styles from "./Conversor.module.css";
import SelectorUnidad from "./SelectorUnidad";
import unidadesVolumen from "../data/volumen";
import { convertirUnidades } from "../utils/conversiones";
import Equivalencias from "./Equivalencias";

function ConversorVolumen() {
  const [valor, setValor] = useState("1");
  const [unidadOrigenId, setUnidadOrigenId] = useState("litro");
  const [unidadDestinoId, setUnidadDestinoId] = useState("mililitro");

  //obtengo los objetos completos de las unidades elegidas
  const unidadOrigen = unidadesVolumen.find(
    (unidad) => unidad.id === unidadOrigenId,
  );

  const unidadDestino = unidadesVolumen.find(
    (unidad) => unidad.id === unidadDestinoId,
  );

  //verificar que el campo contenga un numero valido
  const entradaValida = valor.trim() !== "" && Number.isFinite(Number(valor));

  const resultado = entradaValida
    ? convertirUnidades(Number(valor), unidadOrigen, unidadDestino)
    : null;

  const formatoNumero = new Intl.NumberFormat("es-AR", {
    maximumFractionDigits: 10,
  });

  //para intercambiar unidades de origen y destino
  function intercambiarUnidades() {
    setUnidadOrigenId(unidadDestinoId);
    setUnidadDestinoId(unidadOrigenId);
  }

  return (
    <section className={styles.conversor}>
      <div className={styles.filaUnidades}>
        <SelectorUnidad
          etiqueta="De"
          unidades={unidadesVolumen}
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
          unidades={unidadesVolumen}
          valor={unidadDestinoId}
          onChange={setUnidadDestinoId}
        />
      </div>

      <div className={styles.campoValor}>
        <label htmlFor="valor-volumen">Volumen que querés convertir</label>

        <input
          id="valor-volumen"
          type="number"
          step="any"
          value={valor}
          onChange={(evento) => setValor(evento.target.value)}
          placeholder="Ingresá un volumen"
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
            Ingresá un volumen válido para convertir.
          </p>
        )}
      </div>

      <Equivalencias
        valor={valor}
        unidades={unidadesVolumen}
        unidadOrigen={unidadOrigen}
      />
    </section>
  );
}

export default ConversorVolumen;
