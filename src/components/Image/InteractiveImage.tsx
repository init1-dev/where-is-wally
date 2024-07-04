import { useRef, useState } from "react";
import styled from "styled-components";
import { IntectiveImageProps } from "../../interfaces/interfaces";

const IntectiveImage = ({
    image
}: IntectiveImageProps) => {
    const [dragging, setDragging] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
    const imageRef = useRef<HTMLImageElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleStart = (clientX: number, clientY: number) => {
        setDragging(true);
        setStartPosition({
            x: clientX - position.x,
            y: clientY - position.y
        });
    };

    const handleMove = (clientX: number, clientY: number) => {
        if (dragging) {
            const container = containerRef.current;
            const image = imageRef.current;

            if (container && image) {
                const newX = clientX - startPosition.x;
                const newY = clientY - startPosition.y;

                const maxX = container.offsetWidth - image.offsetWidth;
                const maxY = container.offsetHeight - image.offsetHeight;

                const boundedX = Math.min(0, Math.max(newX, maxX));
                const boundedY = Math.min(0, Math.max(newY, maxY));

                setPosition({ x: boundedX, y: boundedY });
            }
        }
    };

    const handleEnd = () => {
        setDragging(false);
    };

    const handleMouseDown = (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        handleStart(event.clientX, event.clientY);
    };

    const handleMouseMove = (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        handleMove(event.clientX, event.clientY);
    };

    const handleMouseUp = () => {
        handleEnd();
    };

    const handleTouchStart = (event: React.TouchEvent<HTMLImageElement>) => {
        const touch = event.touches[0];
        handleStart(touch.clientX, touch.clientY);
    };

    const handleTouchMove = (event: React.TouchEvent<HTMLImageElement>) => {
        const touch = event.touches[0];
        handleMove(touch.clientX, touch.clientY);
    };

    const handleTouchEnd = () => {
        handleEnd();
    };

    return (
        <ImageContainer ref={containerRef}>
            <StyledImage
                ref={imageRef}
                src={image.image}
                useMap="#image-map"
                alt="Wally"
                draggable="false"
                $isDragging={dragging}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                style={{ top: position.y, left: position.x }}
            />

            <map name="image-map">
                {
                    image.areas.map((area, i) => {
                        return <InteractiveArea key={i} alt={area.alt} coords={area.coords} shape={area.shape} onClick={() => alert('You found Wally, ¡Congrats!')} />
                    })
                }
            </map>
        </ImageContainer>
    );
}

const ImageContainer = styled.div`
    width: 100vw;
    height: calc(100vh - 16px);
    overflow: hidden;
    position: relative;
`;

const StyledImage = styled.img<{ $isDragging: boolean}>`
    width: auto;
    height: auto;
    max-width: none;
    max-height: none;
    position: absolute;
    user-select: none;
    cursor: ${props => (props.$isDragging ? "grabbing" : "grab")};
`;

const InteractiveArea = styled.area`
    cursor: grab;

    &:hover {
        display: block;
    }
`;

export default IntectiveImage;