import styled from "styled-components";
import { Area } from "../../interfaces/interfaces";
import { Alert, Toast } from "../../utils/alerts/customAlert";
import { Dispatch, SetStateAction } from "react";
import tada from '../../assets/tada.mp3';

interface AreasProps {
    PlaySound: (sound: string) => void;
    imageAreas: Area[];
    setImageAreas: Dispatch<SetStateAction<Area[]>>;
}

const Areas = ({
    PlaySound,
    imageAreas,
    setImageAreas,
}: AreasProps) => {
    const itemFound = (foundArea: Area) => {
        if(!foundArea.found){
            Alert.fire({
                icon: 'success',
                title: 'Enhorabuena!',
                html: `Encontraste: <i>${foundArea.description}</i>`,
            })

            PlaySound(tada);
    
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