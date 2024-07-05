import styled from "styled-components";
import { Area } from "../../interfaces/interfaces";
import { Alert, Toast } from "../../utils/alerts/customAlert";
import { Dispatch, SetStateAction } from "react";

interface AreasProps {
    imageAreas: Area[];
    setImageAreas: Dispatch<SetStateAction<Area[]>>;
}

const Areas = ({
    imageAreas,
    setImageAreas
}: AreasProps) => {
    const itemFound = (foundArea: Area) => {
        if(!foundArea.found){
            Alert.fire({
                html: `
                    <h2>Encontrado:</h2>
                    <i>"${foundArea.description}"</i>
                `,
                showConfirmButton: true,
                confirmButtonText: '¡Bien!'
            })

            setImageAreas((prevAreas) =>
                prevAreas.map((area) =>
                    area.alt === foundArea.alt ? { ...area, found: true } : area
                )
            );
        } else {
            Toast.fire({
                icon: 'warning',
                title: 'Already found!',
                position: 'top-end'
            })
        }
    }
    
    return (
        <map name="image-map">
            {
                imageAreas.map((area, i) =>
                    <InteractiveArea 
                        key={i}
                        alt={area.alt}
                        coords={area.coords}
                        shape={area.shape}
                        onClick={ () => itemFound(area) }
                    />
                )
            }
        </map>
    );
}

const InteractiveArea = styled.area`
    cursor: grab;

    &:hover {
        display: block;
    }
`;


export default Areas;