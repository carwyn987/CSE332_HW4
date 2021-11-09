import { createContext, useState } from 'react'
import data from '../data/data.csv';
import * as d3 from 'd3';


// THIS IS THE CONTEXT WE'LL USE TO SHARE OUR STORE
export const GlobalStoreContext = createContext({});

// THESE ARE ALL THE TYPES OF UPDATES TO OUR GLOBAL
// DATA STORE STATE THAT CAN BE PROCESSED
export const GlobalStoreActionType = {
    LOADINITIALDATA: "LOADINITIALDATA",
    PIECHARTCLICK: "PIECHARTCLICK",
    BRUSHDATA: "BRUSHDATA"
}

// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
function GlobalStoreContextProvider(props) {
    // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
    const [store, setStore] = useState({
        dataValues: loadData(),
        pieChartChoice: 0,
        color: "#228B22"
    });

    // store.loadInit = async function() {
    //     store.dataValues = await loadData();
    // }
    // store.loadInit();

    // HERE'S THE DATA STORE'S REDUCER, IT MUST
    // HANDLE EVERY TYPE OF STATE CHANGE
    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            // LIST UPDATE OF ITS NAME
            case GlobalStoreActionType.PIECHARTCLICK: {
                return setStore({
                    dataValues: payload.data,
                    pieChartChoice: payload.value,
                    color: payload.color
                });
            }
            case GlobalStoreActionType.LOADINITIALDATA: {
                return setStore({
                    dataValues: payload.data,
                    pieChartChoice: 0,
                    color: payload.color
                });
            }
            case GlobalStoreActionType.BRUSHDATA: {
                return setStore({
                    dataValues: payload.data,
                    pieChartChoice: store.pieChartChoice,
                    color: store.color
                });
            }
            default:
                return store;
        }
    }

    store.updatePieChartClick = async function (val, color) {
        let k = Promise.resolve(loadData());
        k.then(function(value) {
            if(val === 1){
                value = value.filter(obj => obj["Type"] == 1);
            }else if(val === 2){
                value = value.filter(obj => obj["Type"] == 0);
            }else{
                store.loadInitialData();
                return;
            }
            console.log(value)
        
            storeReducer({
                type: GlobalStoreActionType.PIECHARTCLICK,
                payload: {
                    value: val,
                    data: value,
                    color: color
                }
            });
        })
    }

    store.loadInitialData = async function () {
        let data = await loadData();
        console.log(data, store.dataValues)
        if(data != store.dataValues){
            storeReducer({
                type: GlobalStoreActionType.LOADINITIALDATA,
                payload: {
                    data: data,
                    color: "lightgreen"
                }
            });
        }
    }

    store.brushPCC = async function (data) {
        if(data != store.dataValues){
            storeReducer({
                type: GlobalStoreActionType.BRUSHDATA,
                payload: {
                    data: data
                }
            })
        }
    }

    async function loadData() {
      let d = await d3.csv(data);
      return d;
    }

    return (
        <GlobalStoreContext.Provider value={{
            store
        }}>
            {props.children}
        </GlobalStoreContext.Provider>
    );

}

export default GlobalStoreContext;
export { GlobalStoreContextProvider };