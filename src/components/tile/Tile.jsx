import './Tile.css';
import {Link} from "react-router-dom";

function Tile(props) {

    return (
        <Link to={props.path} className="tile-link">
        <div>
            <h1>{props.text}</h1>
        </div>
        </Link>
    );
}

export default Tile;