import { useState } from "react";
import styles from "./Conversor.module.css";
import SelectorUnidad from "./SelectorUnidad";
import unidadesMasa from "../data/masa";
import { convertirUnidades } from "../utils/conversiones";
import Equivalencias from "./Equivalencias";

function ConversorMasa() {
  const [valor, setValor] = useState("1");
  const [unidadOrigenId, setUnidadOrigenId] = useState("kilogramo");
  const [unidadDestinoId, setUnidadDestinoId] = useState("gramo");

  //buscamos las unidades seleccionadas dentro de la lista
  const unidadOrigen = unidadesMasa.find(
    (unidad) => unidad.id === unidadOrigenId,
  );

  const unidadDestino = unidadesMasa.find(
    (unidad) => unidad.id === unidadDestinoId,
  );

  //comprueba que el campo tenga un numero valido
  const entradaValida = valor.trim() !== "" && Number.isFinite(Number(valor));

  //calcula el resultado solamente si la entrada es valida
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
          unidades={unidadesMasa}
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
          unidades={unidadesMasa}
          valor={unidadDestinoId}
          onChange={setUnidadDestinoId}
        />
      </div>

      <div className={styles.campoValor}>
        <label htmlFor="valor-masa">Cantidad que querés convertir</label>

        <input
          id="valor-masa"
          type="number"
          step="any"
          value={valor}
          onChange={(evento) => setValor(evento.target.value)}
          placeholder="Ingresá una cantidad"
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
            Ingresá una cantidad válida para convertir.
          </p>
        )}
      </div>
      <Equivalencias
        valor={valor}
        unidades={unidadesMasa}
        unidadOrigen={unidadOrigen}
      />
    </section>
  );
}

export default ConversorMasa;
