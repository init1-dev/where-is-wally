import styled from "styled-components";
import InteractiveImage from "../components/Image/InteractiveImage";
import { books } from "../utils/Image";
import { useEffect, useMemo, useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { StyledCircleButton } from "../styles/GeneralStyles";
import { click } from "../assets/sounds";
import { Area } from "../interfaces/interfaces";
import { PlaySound } from "../utils/playSound";
import NotFoundComponent from "./NotFound";
import SideMenuComponent from "../components/sideMenu/SideMenuComponent";
import Loader from "../components/Image/Loader";
import { SlSizeFullscreen } from "react-icons/sl";
import { BsFullscreenExit } from "react-icons/bs";

const LevelComponent = () => {
    const { bookId, levelId } = useParams<{bookId: string, levelId: string}>();
    const [ imageAreas, setImageAreas ] = useState<Area[]>([]);
    const [ found, setFound ] = useState<number>(0);
    const [ isFullScreen, setIsFullScreen ] = useState<boolean>(true);
    // const [imageUrl, setImageUrl] = useState<string | null>(null);
    
    const navigate = useNavigate();

    const { book, currentScenario, initialImageAreas } = useMemo(() => {
        if (bookId && levelId) {
            const bookNumber = parseInt(bookId, 10);
            const scenarioNumber = parseInt(levelId, 10);

            if (!isNaN(bookNumber) && !isNaN(scenarioNumber)) {
                const foundBook = books.find((book) => book.number === bookNumber);
                if (foundBook) {
                    const foundScenario = foundBook.scenarios.find((scenario) => scenario.id === scenarioNumber);
                    return {
                        book: foundBook,
                        currentScenario: foundScenario || null,
                        initialImageAreas: foundScenario?.areas || [],
                    };
                }
            }
        }
        return { book: undefined, currentScenario: null, initialImageAreas: [] };
    }, [bookId, levelId, navigate]);

    useEffect(() => {
        setImageAreas(initialImageAreas);
    }, [initialImageAreas]);

    const handleReturn = () => {
        PlaySound(click, 0.25);
        navigate(`/book/${bookId}`, {replace:true});
        document.exitFullscreen();
    }

    // useEffect(() => {
    //     const loadImage = async () => {
    //         try {
    //             const response = await fetch(currentScenario!.image);

    //             if (!response.ok) {
    //                 throw new Error('Failed to load image');
    //             }
    //             const blob = await response.blob();
    //             setImageUrl(URL.createObjectURL(blob));
    //         } catch (error) {
    //             console.error('Error loading image:', error);
    //         }
    //     };
    
    //     if (currentScenario && currentScenario.image) {
    //         loadImage();
    //     }

    //     return () => {
    //         if(imageUrl) {
    //             URL.revokeObjectURL(imageUrl);
    //         }
    //     };
    // }, [currentScenario]);

    const handleFullscreen = () => {
        if (document.fullscreenEnabled) {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen().catch((err) => {
                    console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
                });
                setIsFullScreen(true);
            } else {
                document.exitFullscreen();
                setIsFullScreen(false);
            }
        }
    }

    if (!book || !currentScenario) {
        return <NotFoundComponent />;
    }

    return (
        currentScenario && imageAreas.length > 0
            ?   <MainPageContainer>
                    <TextContainer>
                        <StyledCircleButton onClick={handleReturn}>
                            <IoMdArrowBack style={{fontSize:'20px'}} />
                        </StyledCircleButton>

                        <Button onClick={handleFullscreen}>
                            {
                                isFullScreen
                                    ? <BsFullscreenExit style={{fontSize:'20px'}} />
                                    : <SlSizeFullscreen style={{fontSize:'20px'}} />
                            }
                        </Button>
                    </TextContainer>
                
                    <InteractiveImage 
                        image={currentScenario.image}
                        imageAreas={imageAreas} 
                        setImageAreas={setImageAreas}
                        setFound={setFound}
                    />

                    <SideMenuComponent 
                        imageAreas={imageAreas} 
                        PlaySound={PlaySound} 
                        levelName={currentScenario.name} 
                        found={found}
                    />
                </MainPageContainer>
            :   <LoaderBox>
                    <Loader />
                </LoaderBox>
    );
};

const MainPageContainer = styled.div`
    position: relative;
`;

const TextContainer = styled.div`
    position: fixed;
    display: flex;
    flex-direction: row;
    gap: 1rem;
    top: 15px;
    left: 15px;
    z-index: 1;
    border-radius: 0.5rem;
    filter: drop-shadow(1px 1px 5px rgb(0 0 0 / 0.2));
`;

const Button = styled(StyledCircleButton)`
    &:focus, &:focus-visible {
        box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 2px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -2px 0px inset;
    }
`;

const LoaderBox = styled.div`
    width: 100vw;
    height: 100vh;
`;

export default LevelComponent;
