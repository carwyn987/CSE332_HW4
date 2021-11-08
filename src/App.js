import './App.css';
import { useContext } from "react";
import { GlobalStoreContextProvider } from './store';
import { GlobalStoreContext } from './store';
import TitleComponent from './components/TitleComponent';
import { Scatter } from './components/Scatter';
import { Histogram } from './components/Histogram';
import { ParallelCoordinate } from './components/ParallelCoordinate';
import { Reset } from './components/Reset'

function App() {

  // Set up context
  const { store } = useContext(GlobalStoreContext);

  return (
    <div id="app" className="App">
      <GlobalStoreContextProvider>
        <TitleComponent/>
        <Scatter>{store.dataValues}</Scatter>
        <Histogram>{store.dataValues}</Histogram>
        <ParallelCoordinate>{store.dataValues}</ParallelCoordinate>
        <Reset></Reset>
        <div id="credits">Design and implementation by Carwyn Collinsworth</div>
      </GlobalStoreContextProvider>
    </div>
  );
}

export default App;
