import { GlobalStoreContext } from '../store';
import { useContext } from "react";

export const Reset = () => {

    // Set up context
    const { store } = useContext(GlobalStoreContext);

    function resetData() {
        store.loadInitialData();
    }

    return (
        <button id="reset" onClick={resetData}>Reset</button>
    );
}