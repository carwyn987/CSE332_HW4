import './App.css';
import * as d3 from 'd3';
import dat from './dat/data.csv';
import { GlobalStoreContextProvider } from './store';
import TitleComponent from './components/TitleComponent';
import {Scatter} from './components/Scatter';


function App() {

  // Load data into window
  async function loadData() {
    let d = await d3.csv(dat);
    return d;
  }

  let d = loadData();

  return (
    <div id="app" className="App">
      <GlobalStoreContextProvider>
        <TitleComponent/>
        <Scatter>
          {d}
        </Scatter>
      </GlobalStoreContextProvider>
    </div>
  );
}

export default App;
