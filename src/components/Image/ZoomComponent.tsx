import styled from "styled-components";
import { BsZoomIn, BsZoomOut } from "react-icons/bs";
import { ZoomComponentProps } from "../../interfaces/interfaces";

function ZoomComponent({
    zoomIn,
    zoomOut,
    // maxScale,
    // minScale,
    // scale,
    // setScale
}: ZoomComponentProps) {

    const handleZoomIn = () => {
        zoomIn();
    };

    const handleZoomOut = () => {
        zoomOut();
    };

    return (
        <ZoomContainer>
            <Button onClick={handleZoomIn} disabled={ false } >
                <BsZoomIn />
            </Button>

            <StyledSeparator />

            <Button onClick={handleZoomOut} disabled={ false } >
                <BsZoomOut />
            </Button>
        </ZoomContainer>
    );
}

const ZoomContainer = styled.div`
    position: fixed;
    display: flex;
    flex-direction: column;
    bottom: 15px;
    right: 15px;
    z-index: 2;
    background-color: white;
    border-radius: 0.5rem;
    filter: drop-shadow(1px 1px 5px rgb(0 0 0 / 0.2));
    transform-origin: top right;
    transition: transform 0.3s ease;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
`;

const Button = styled.button<{ disabled: boolean }>`
    all: unset;
    color: ${props => props.disabled ? 'rgb(0 0 0 / 0.2)' : 'rgb(0 0 0 / 1)'};
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
    font-size: 20px;
    padding: 0.5rem 1rem;
`;

const StyledSeparator = styled.hr`
    padding: 0;
    margin: 0;
    border-top: 1px solid rgb(0 0 0 / 0.0);
`;

export default ZoomComponent;