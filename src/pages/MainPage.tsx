import styled from "styled-components";
import imageSrc from '../assets/wally-test.jpeg';
import InteractiveImage from "../components/Image/InteractiveImage";
import { Image } from "../interfaces/interfaces";

const MainPage = () => {
    const image: Image = {
        image: imageSrc,
        areas: [
            {   
                description: 'Wally',
                alt: 'wally',
                coords: '2119,1374,2162,1414',
                shape: 'rect',
                found: false
            },
            {
                description: 'Un soldado sosteniendo una diana entre la multitud',
                alt: 'soldado-diana',
                coords: '1646,1160,1721,1267',
                shape: 'rect',
                found: false
            },
            {
                description: 'Un grupo de soldados con el símbolo del dolar en sus escudos',
                alt: 'grupo-soldados-dolar',
                coords: '2464,1002,2575,1125',
                shape: 'rect',
                found: false
            },
            {
                description: 'Un grupo de soldados en cuyos escudo se lee HELP',
                alt: 'grupo-soldados-help',
                coords: '1054,486,1193,549',
                shape: 'rect',
                found: false
            },
            {
                description: 'Un grupo de soldados cuyos escudos forman el dibujo de una cara',
                alt: 'grupo-soldados-cara',
                coords: '653,1559,832,1702',
                shape: 'rect',
                found: false
            },
        ]
    }

    return (
        <MainPageContainer>
            <TextContainer>
                <h1>Find Wally / test</h1>
            </TextContainer>
        
            <InteractiveImage image={image} />
        </MainPageContainer>
    );
};

const MainPageContainer = styled.div`
    position: relative;
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
