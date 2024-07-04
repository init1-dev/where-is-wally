import styled from "styled-components";
import InteractiveImage from "../components/Image/InteractiveImage";
import { image } from "../utils/Image";
import { useState } from "react";

const MainPage = () => {
    const [ imageAreas, setImageAreas ] = useState(image.areas);
    // const foundImages = imageAreas.
    // const completed = image.areas.length === imageAreas

    return (
        <MainPageContainer>
            <TextContainer>
                <Title>Where is Wally / test</Title>

                <hr />

                <List>
                    {
                        imageAreas.map((area, i) =>
                            <ListItem key={i}>
                                <SmallText $found={area.found}>{area.description}</SmallText>
                            </ListItem>
                        )
                    }
                </List>
            </TextContainer>
        
            <InteractiveImage image={image.image} imageAreas={imageAreas} setImageAreas={setImageAreas} />
        </MainPageContainer>
    );
};

const MainPageContainer = styled.div`
    position: relative;
`;

const TextContainer = styled.div`
    max-width: 100%;
    margin-right: 5px;
    position: absolute;
    top: 5px;
    left: 5px;
    z-index: 1;
    background-color: white;
    user-select: unset;
    pointer-events: none;
    border-radius: 0.5rem;
`;

const Title = styled.h2`
    margin: 0;
    padding: 0;
    color: black;
`;

const List = styled.ul`
    margin: 1rem 1rem 1rem 0;
    text-align: left;
`;

const ListItem = styled.li`
    color: #5c5c5c;
`;

const SmallText = styled.small<{ $found: boolean }>`
    text-decoration: ${props => (props.$found ? 'line-through' : '')};
`;

export default MainPage;
