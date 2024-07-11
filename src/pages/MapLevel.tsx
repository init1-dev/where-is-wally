import { useLocation } from "react-router-dom";
import { Book, NewLevel } from "../interfaces/interfaces";

const MapLevel = () => {
    const location = useLocation();
    const { book, newLevel } = location.state as { book: Book, newLevel: NewLevel } || { book: null, newLevel: null }
    const { name, image, portrait } = newLevel;
    
    return (
        <>
            <h1>Mapeo de nivel</h1>

            {
                newLevel
                    ? (
                        <div>
                            <p>Nombre del libro: { book.name }</p>

                            <p>Nombre del nivel: { name }</p>
                            <p>Imagen del nivel: { image }</p>
                            <p>Portada del nivel: { portrait }</p>
                        </div>
                    )
                    : (
                        <p>Book not found</p>
                    )
            }
        </>
    );
}

export default MapLevel;