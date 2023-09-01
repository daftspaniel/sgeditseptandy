import "./App.css";
import Palette from "./Components/Palette";

const App = () => {
  return (
    <div>
      <h1>SG-Edit SepTandy 2023</h1>
      <div className="card">
        <Palette range={{ start: 128, end: 256 }} />
      </div>
      <div className="card">
        <Palette range={{ start: 0, end: 128 }} />
      </div>
    </div>
  );
};

export default App;
