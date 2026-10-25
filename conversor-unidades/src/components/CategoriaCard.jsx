import styles from "./CategoriaCard.module.css";

function CategoriaCard({ simbolo, titulo, descripcion, onClick }) {
  //se reciben 3 props
  return (
    <button type="button" className={styles.tarjeta} onClick={onClick}>
      <span className={styles.icono}>{simbolo}</span>

      <span className={styles.titulo}>{titulo}</span>

      <span className={styles.descripcion}>{descripcion}</span>

      <span className={styles.enlace}>
        Explorar unidades
        <span aria-hidden="true"> →</span>
      </span>
    </button>
  );
}

export default CategoriaCard;
