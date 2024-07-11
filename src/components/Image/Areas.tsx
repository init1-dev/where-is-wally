import styled from "styled-components";
import { Area, AreasProps } from "../../interfaces/interfaces";
import { Alert } from "../../utils/alerts/customAlert";

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
                timer: 2500,
                timerProgressBar: true,
                showCloseButton: false,
                showConfirmButton: true,
                confirmButtonText: '¡Bien!',
                didOpen: (toast) => {
                    toast.onmouseenter = Alert.stopTimer;
                    toast.onmouseleave = Alert.resumeTimer;
                }
            })

            setImageAreas((prevAreas) =>
                prevAreas.map((area) =>
                    area.alt === foundArea.alt ? { ...area, found: true } : area
                )
            );
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
    cursor: pointer;

    &:hover {
        display: block;
    }
`;


export default Areas;