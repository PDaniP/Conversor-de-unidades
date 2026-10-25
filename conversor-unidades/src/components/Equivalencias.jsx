import styles from "./Equivalencias.module.css";
import { convertirUnidades } from "../utils/conversiones";

function Equivalencias({ valor, unidades, unidadOrigen }) {
  const numero = Number(valor);

  const entradaValida = valor.trim() !== "" && Number.isFinite(numero);

  const formatoNumero = new Intl.NumberFormat("es-AR", {
    maximumFractionDigits: 10,
  });

  if (!entradaValida) {
    return null;
  }

  return (
    <section className={styles.contenedor}>
      <h3 className={styles.titulo}>Equivalencias en otras unidades</h3>

      <p className={styles.descripcion}>
        {formatoNumero.format(numero)} {unidadOrigen.nombre.toLowerCase()}{" "}
        equivale a:
      </p>

      <div className={styles.lista}>
        {unidades.map((unidad) => {
          const resultado = convertirUnidades(numero, unidadOrigen, unidad);

          return (
            <div key={unidad.id} className={styles.elemento}>
              <span className={styles.nombre}>
                {unidad.nombre}
                <span className={styles.simbolo}> ({unidad.simbolo})</span>
              </span>

              <span className={styles.valor}>
                {formatoNumero.format(resultado)} {unidad.simbolo}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Equivalencias;
