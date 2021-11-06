import './App.css';
import { GlobalStoreContextProvider } from './store';
import TitleComponent from './components/TitleComponent';

function App() {
  return (
    <div id="app" className="App">
      <GlobalStoreContextProvider>
        <TitleComponent/>
      </GlobalStoreContextProvider>
    </div>
  );
}

export default App;
