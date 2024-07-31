import React, { Dispatch, SetStateAction, useState } from 'react';
import styled from "styled-components";
import { itemFound } from "../../utils/functionsModule";
import { Area } from '../../interfaces/interfaces';

interface AreasProps {
    imageAreas: Area[];
    setImageAreas: Dispatch<SetStateAction<Area[]>>;
    setFound: Dispatch<SetStateAction<number>>;
}

const Areas = ({
    imageAreas,
    setImageAreas,
    setFound
}: AreasProps) => {
    const [mouseDownPosition, setMouseDownPosition] = useState<{ x: number, y: number } | null>(null);

    const handleMouseDown = (event: React.MouseEvent) => {
        setMouseDownPosition({ x: event.clientX, y: event.clientY });
    };

    const handleMouseUp = (event: React.MouseEvent, area: any) => {
        if (mouseDownPosition) {
            const deltaX = Math.abs(event.clientX - mouseDownPosition.x);
            const deltaY = Math.abs(event.clientY - mouseDownPosition.y);

            const DRAG_THRESHOLD = 5;

            if (deltaX < DRAG_THRESHOLD && deltaY < DRAG_THRESHOLD) {
                itemFound(area, setImageAreas, setFound);
            }
        }
        setMouseDownPosition(null);
    };

    return (
        <map name="image-map">
            {
                imageAreas.map((area, i) =>
                    <InteractiveArea 
                        key={i}
                        alt={area.alt}
                        coords={area.coords}
                        shape={area.shape}
                        onMouseDown={handleMouseDown}
                        onMouseUp={(event) => handleMouseUp(event, area)}
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
