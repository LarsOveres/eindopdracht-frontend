import "./Library.css"
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useState} from "react";
import button from "../../components/button/Button.jsx";

function Library() {

    // zoekbalk -------------------

    const [searchInput, setSearchInput] = useState("");

    const handleSearch = (event) => {
        setSearchInput(event.target.value);
    }

    // zoekknop -------------------

    const [clicked, toggleClicked] = useState("");

    const handleClicks = (event) => {
        toggleClicked(event.target.value);
        console.log(searchResult);
    }

    // result naar lowercase ------

    const searchResult = searchInput.trim().toLowerCase();

    // ----------------------------

    return (
        <>
            <div className="search-container">
            <input type="text" placeholder="Zoeken" className="search-bar" value={searchInput} onChange={handleSearch} />
                <button type="button" className="search-button" value={clicked} onClick={handleClicks}>
            <FontAwesomeIcon icon={faMagnifyingGlass}/>
                </button>
            </div>

        </>
    )
}

export default Library