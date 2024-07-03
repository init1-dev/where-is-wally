import React, { useState } from "react";
import styled from "styled-components";

const MainPage = () => {
    const [dragging, setDragging] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });

    const handleStart = (clientX: number, clientY: number) => {
        setDragging(true);
        setStartPosition({
            x: clientX - position.x,
            y: clientY - position.y
        });
    };

    const handleMove = (clientX: number, clientY: number) => {
        if (dragging) {
            setPosition({
                x: clientX - startPosition.x,
                y: clientY - startPosition.y
            });
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
        <ImageContainer>
            <TextContainer>
                <h1>Find Wally / test</h1>
            </TextContainer>
            <StyledImage
                src="wally-test.jpeg"
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
                <InteractiveArea alt="wally" coords="2151,1410,2127,1379" shape="rect" onClick={() => alert('You found Wally, ¡Congrats!')} />
            </map>
        </ImageContainer>
    );
};

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

const TextContainer = styled.div`
    position: absolute;
    top: 5px;
    left: 5px;
    z-index: 1;
    padding: 0.5rem;
    background-color: white;
    user-select: unset;
    pointer-events: none;
    border-radius: 0.5rem;

    h1 {
        margin: 0;
        padding: 0;
        color: black;
    }
`;

export default MainPage;
