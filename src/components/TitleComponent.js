// Imports
import avocado from '../avocado.png';
import Pie from './Pie';

export default function TitleComponent() {

    return (
        <div id="title_section">
            <img id="titleImg" src={avocado}/>
            <Pie/>
        </div>
        
    );
}