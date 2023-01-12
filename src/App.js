import CrudApp from "./components/CrudApp";
import "./styles.css";
import CrudApi from "./components/CrudApi";
import songSearch from "./components/songSearch";

export default function App() {
  return (
    <>
      <h1>Ejercicios con React</h1>
      <CrudApp />
      <hr />
      <CrudApi />
      <hr />
      <songSearch />
    </>
  );
}
