import styled from "styled-components";
import { AreasProps } from "../../interfaces/interfaces";
import { itemFound } from "../../utils/functionsModule";

const Areas = ({
    imageAreas,
    setImageAreas,
    setFound
}: AreasProps) => {
    
    return (
        <map name="image-map">
            {
                imageAreas.map((area, i) =>
                    <InteractiveArea 
                        key={i}
                        alt={area.alt}
                        coords={area.coords}
                        shape={area.shape}
                        onClick={ () => itemFound(area, setImageAreas, setFound) }
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