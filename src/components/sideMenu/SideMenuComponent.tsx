import styled from "styled-components";
import { Area } from "../../interfaces/interfaces";
import { useState } from "react";
import { RiCloseLargeFill } from "react-icons/ri";
import { LuBookMarked } from "react-icons/lu";
import { StyledCircleButton } from "../../styled/Button";

interface SideMenuProps {
    imageAreas: Area[];
}

const SideMenuComponent = ({
    imageAreas
}: SideMenuProps) => {
    const [ isOpen, setIsOpen ] = useState(false);

    return (
        <>
            <SideMenu $isOpen={isOpen}>
                <Title>
                    ¿Dónde está Wally?

                    <StyledCircleButton onClick={ () => setIsOpen(prev => !prev) } >
                        <RiCloseLargeFill />
                    </StyledCircleButton>
                </Title>

                <hr />

                <List>
                    {
                        imageAreas.map((area, i) =>
                            <ListItem key={i}>
                                <SmallText $found={area.found}>
                                    {area.description}
                                </SmallText>
                            </ListItem>
                        )
                    }
                </List>
            </SideMenu>

            <ToggleButton $isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}>
                {
                    isOpen
                        ? <RiCloseLargeFill style={{fontSize:'20px'}} />
                        : <LuBookMarked style={{fontSize:'20px'}} />
                }
            </ToggleButton>
        </>
    );
}

const SideMenu = styled.div<{ $isOpen: boolean }>`
    max-width: 100%;
    margin-right: 5px;
    position: absolute;
    top: 10px;
    right: 20px;
    z-index: 1;
    background-color: white;
    user-select: unset;
    border-radius: 0.5rem;
    filter: drop-shadow(1px 1px 5px rgb(0 0 0 / 0.2));
    transform: scale(${props => (props.$isOpen ? 1 : 0)});
    transform-origin: top right;
    transition: transform 0.3s ease;
`;

const Title = styled.h2`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
    margin: 0.5rem 1rem 0 1rem;
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

const ToggleButton = styled(StyledCircleButton)<{ $isOpen: boolean }>`
    display: ${props => (props.$isOpen ? 'none' : 'flex')};
    position: absolute;
    top: 20px;
    right: 40px;
    z-index: 2;
`;

export default SideMenuComponent;