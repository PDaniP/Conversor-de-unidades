import styles from "./ConversorPage.module.css";
import Conversor from "../components/Conversor";
import ConversorTemperatura from "../components/ConversorTemperatura";
import ConversorMasa from "../components/ConversorMasa";
import ConversorVolumen from "../components/ConversorVolumen";
import ConversorArea from "../components/ConversorArea";
import ConversorTiempo from "../components/ConversorTiempo";
import ConversorVelocidad from "../components/ConversorVelocidad";
import ConversorFuerza from "../components/ConversorFuerza";
import ConversorEnergia from "../components/ConversorEnergia";
import ConversorPresion from "../components/ConversorPresion";
import ConversorFrecuencia from "../components/ConversorFrecuencia";
import ConversorDatosDigitales from "../components/ConversorDatosDigitales";

function ConversorPage({ categoria, onVolver }) {
    return (
        <main className={styles.contenido}>
            <button
                type="button"
                className={styles.botonVolver}
                onClick={onVolver}
            >
                ← Volver a categorias
            </button>

            <header className={styles.encabezado}>
                <span className={styles.simbolo}>
                    {categoria.simbolo}
                </span>

                <div>
                    <p className={styles.etiqueta}>
                        Categoria seleccionada
                    </p>

                    <h1 className={styles.titulo}>
                        {categoria.titulo}
                    </h1>

                    <p className={styles.descripcion}>
                        {categoria.descripcion}
                    </p>
                </div>
            </header>

            <section className={styles.panel}>
                <h2>Conversor de {categoria.titulo.toLowerCase()}</h2>

                {categoria.id === "longitud" ? (
                    <Conversor />
                ) : categoria.id === "temperatura" ? (
                    <ConversorTemperatura />
                ) : categoria.id === "masa" ? (
                    <ConversorMasa />
                ) : categoria.id === "volumen" ? (
                    <ConversorVolumen />
                ) : categoria.id === "area" ? (
                    <ConversorArea />
                ) : categoria.id === "tiempo" ? (
                    <ConversorTiempo />
                ) : categoria.id === "velocidad" ? (
                    <ConversorVelocidad />
                ) : categoria.id === "fuerza" ? (
                    <ConversorFuerza />
                ) : categoria.id === "energia" ? (
                    <ConversorEnergia />
                ) : categoria.id === "presion" ? (
                    <ConversorPresion />
                ) : categoria.id === "frecuencia" ? (
                    <ConversorFrecuencia />
                ) : categoria.id === "datosDigitales" ? (
                    <ConversorDatosDigitales />
                ) : null}
            </section>
        </main>
    );
}

export default ConversorPage;