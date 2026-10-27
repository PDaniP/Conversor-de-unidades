import { useState } from "react";
import styles from "./App.module.css";
import CategoriaCard from "./components/CategoriaCard";
import ConversorPage from "./pages/ConversorPage";
import categorias from "./data/Categorias";

function App() {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);

  function seleccionarCategoria(categoria){
    setCategoriaSeleccionada(categoria);
  }

  function volverACategorias(){
    setCategoriaSeleccionada(null)
  }

  if (categoriaSeleccionada !== null) {
    return (
      <div className={styles.app}>
        <ConversorPage
          categoria={categoriaSeleccionada}
          onVolver={volverACategorias}
        />
      </div>
    );
  }



  return (
    <div className={styles.app}>
      <main className={styles.contenido}>
        <header className={styles.encabezado}>
          <h1 className={styles.titulo}>Conversor de unidades</h1>
        </header>

        <section className={styles.seccionCategorias}>
          <div className={styles.encabezadoCategorias}>

            <p className={styles.descripcionGeneral}>
              Selecciona una categoria para comenzar
            </p>
          </div>

          <div className={styles.grillaCategorias}>
            {/*recorremos la lista y genero una tarjeta por cada categoria*/}
            {categorias.map((categoria) => (
              <CategoriaCard
                key={categoria.id}
                simbolo={categoria.simbolo}
                titulo={categoria.titulo}
                descripcion={categoria.descripcion}
                onClick={() => seleccionarCategoria(categoria)}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
