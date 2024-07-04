import styled from "styled-components";
import InteractiveImage from "../components/Image/InteractiveImage";
import { image } from "../utils/Image";
import { useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";

const LevelComponent = () => {
    const [ imageAreas, setImageAreas ] = useState(image.areas);

    return (
        <MainPageContainer>
            <TextContainer>
                <Title>
                    <StyledButtonNoBg as={Link} to={'/main'}>
                        <IoMdArrowBack style={{marginLeft:'1rem'}}/>
                    </StyledButtonNoBg>

                    ¿Dónde está Wally?
                </Title>

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
    top: 10px;
    left: 10px;
    z-index: 1;
    background-color: white;
    user-select: unset;
    border-radius: 0.5rem;
    filter: drop-shadow(1px 1px 5px rgb(0 0 0 / 0.2));
`;

const Title = styled.h2`
    display: flex;
    align-items: center;
    gap: 2rem;
    margin: 0.5rem 0 0 0;
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

const StyledButtonNoBg = styled.button`
    color: black;
`;

export default LevelComponent;
