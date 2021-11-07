import './App.css';
import * as d3 from 'd3';
import { useContext } from "react";
import dat from './dat/data.csv';
import { GlobalStoreContextProvider } from './store';
import { GlobalStoreContext } from './store';
import TitleComponent from './components/TitleComponent';
import {Scatter} from './components/Scatter';
import {Histogram} from './components/Histogram';


function App() {

  // Set up context
  const { store } = useContext(GlobalStoreContext);

  return (
    <div id="app" className="App">
      <GlobalStoreContextProvider>
        <TitleComponent/>
        <Scatter>{store.dataValues}</Scatter>
        <Histogram>{store.dataValues}</Histogram>
      </GlobalStoreContextProvider>
    </div>
  );
}

export default App;
