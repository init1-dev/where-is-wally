import styled from "styled-components";
import { useState } from "react";
import { RiCloseLargeFill } from "react-icons/ri";
import { LuBookMarked } from "react-icons/lu";
import { click } from "../../assets/sounds";
import { FlexCenteredContainer, FlexContainer, H2, StyledCircleButton } from "../../styles/GeneralStyles";
import { Area } from "../../interfaces/interfaces";

interface SideMenuProps {
    imageAreas: Area[];
    PlaySound: (sound: string, volume?: number) => void;
    levelName: string;
    found: number;
}

const SideMenuComponent = ({
    imageAreas,
    PlaySound,
    levelName,
    found
}: SideMenuProps) => {
    const [ isOpen, setIsOpen ] = useState(true);

    const handleOpen = () => {
        setIsOpen(prev => !prev);
        PlaySound(click, 0.25);
    }

    return (
        <>
            <SideMenu $isOpen={isOpen}>
                <TopBar>
                    <TopBarTextContainer>
                        <H2>{levelName}</H2>

                        <small>({`${found}/${imageAreas.length}`})</small>
                    </TopBarTextContainer>

                    <StyledCircleButton onClick={handleOpen} >
                        <RiCloseLargeFill />
                    </StyledCircleButton>
                </TopBar>

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

            <ToggleButton $isOpen={isOpen} onClick={handleOpen}>
                {
                    isOpen
                        ? <RiCloseLargeFill style={{fontSize:'20px'}} />
                        : <LuBookMarked style={{fontSize:'20px'}} />
                }
            </ToggleButton>
        </>
    );
}

const SideMenu = styled(FlexContainer)<{ $isOpen: boolean }>`
    position: fixed;
    top: 10px;
    right: 10px;
    z-index: 2;
    flex-direction: column;
    margin-left: 10px;
    max-height: 80%;
    background-color: white;
    border-radius: 0.5rem;
    filter: drop-shadow(1px 1px 5px rgb(0 0 0 / 0.2));
    transform: scale(${props => (props.$isOpen ? 1 : 0)});
    transform-origin: top right;
    transition: transform 0.3s ease;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;

    hr {
        width: 99.5%;
        border-top: 1px solid rgba(0, 0, 0, 0.2);
    }
`;

const TopBar = styled(FlexContainer)`
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
    padding-left: 1rem;
    margin: 0.5rem;
    color: black;
`;

const TopBarTextContainer = styled(FlexCenteredContainer)`
    gap: 1rem;

    small {
        font-size: 16px;
    }
`;

const List = styled.ul`
    flex-grow: 1;
    padding-left: 2.5rem;
    margin: 0.25rem 0.5rem 1rem 0;
    text-align: left;
    overflow-y: auto;
    padding-right: 1rem;
`;

const ListItem = styled.li`
    color: #5c5c5c;
`;

const SmallText = styled.small<{ $found: boolean }>`
    color: ${props => (props.$found ? 'green' : '#5c5c5c')};
    text-decoration: ${props => (props.$found ? 'line-through' : '')};
`;

const ToggleButton = styled(StyledCircleButton)<{ $isOpen: boolean }>`
    display: ${props => (props.$isOpen ? 'none' : 'flex')};
    position: absolute;
    top: 15px;
    right: 15px;
    z-index: 1;
`;

export default SideMenuComponent;