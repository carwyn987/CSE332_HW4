// Imports
import avocado from '../avocado.png';
import PieChartComponent from './PieChartComponent';

export default function TitleComponent() {

    return (
        <div id="title_section">
            <img id="titleImg" src={avocado}/>
            <PieChartComponent/>
        </div>
        
    );
}