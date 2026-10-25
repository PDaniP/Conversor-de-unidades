import styles from "./SelectorUnidad.module.css";

function SelectorUnidad({ etiqueta, unidades, valor, onChange }) {
  return (
    <label className={styles.contenedor}>
      <span className={styles.etiqueta}>{etiqueta}</span>

      <select
        className={styles.selector}
        value={valor}//esto hace que el selecctor refleje el estado de React
        onChange={(evento) => onChange(evento.target.value)}
      >
        {unidades.map((unidad) => (
          <option key={unidad.id} value={unidad.id}>
            {unidad.nombre} ({unidad.simbolo})
          </option>
        ))}
      </select>
    </label>
  );
}

export default SelectorUnidad;
