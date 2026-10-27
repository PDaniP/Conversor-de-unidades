
import styles from "./Equivalencias.module.css";
import { convertirTemperatura } from "../utils/conversiones";

function EquivalenciasTemperatura({ valor, unidades, unidadOrigen }) {
  const numero = Number(valor);

  const entradaValida =
    valor.trim() !== "" && Number.isFinite(numero);

  const formatoNumero = new Intl.NumberFormat("es-AR", {
    maximumFractionDigits: 10,
  });

  //si la entrada esta vacia ocultamos el panel.
  if (!entradaValida) {
    return null;
  }

  //calculo cada equivalencia
  let resultados;

  try {
    resultados = unidades.map((unidad) => ({
      unidad,
      valor: convertirTemperatura(
        numero,
        unidadOrigen.id,
        unidad.id
      ),
    }));
  } catch {
    return null;
  }

  return (
    <section className={styles.contenedor}>
      <h3 className={styles.titulo}>
        Equivalencias en otras unidades
      </h3>

      <p className={styles.descripcion}>
        {formatoNumero.format(numero)}{" "}
        {unidadOrigen.simbolo} equivale a:
      </p>

      <div className={styles.lista}>
        {resultados.map(({ unidad, valor }) => (
          <div
            key={unidad.id}
            className={styles.elemento}
          >
            <span className={styles.nombre}>
              {unidad.nombre}
              <span className={styles.simbolo}>
                {" "}({unidad.simbolo})
              </span>
            </span>

            <span className={styles.valor}>
              {formatoNumero.format(valor)}{" "}
              {unidad.simbolo}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default EquivalenciasTemperatura;
