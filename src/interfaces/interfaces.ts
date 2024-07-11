import { PanzoomObject } from "@panzoom/panzoom";
import { Dispatch, FormEvent, RefObject, SetStateAction } from "react";

export interface Area {
    description: string;
    alt: string;
    coords: string;
    shape: string;
    found: boolean;
}

export interface InteractiveImageProps {
    image: string;
    imageAreas: Area[];
    setImageAreas: Dispatch<SetStateAction<Area[]>> | undefined;
    levelName: string;
}

export interface Scenario {
    id: number;
    name: string;
    image: string;
    areas: Area[];
    playable: boolean;
    portrait?: string;
}

export interface Book {
    number: number;
    description: string;
    name: string;
    createdBy: string;
    year: number;
    portrait: string;
    scenarios: Scenario[];
    playable: boolean;
}

export interface InputStateProps {
    ref: RefObject<HTMLInputElement>;
    touched: boolean;
    value: string;
}

interface LabelProps {
    htmlFor:  string;
    label: string;
}

export interface CustomFileInputProps {
    inputState: InputStateProps;
    isFileSet: boolean;
    handleChange: (e: FormEvent<HTMLInputElement>) => void;
    handleClearInput: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    label: LabelProps;
    required?: boolean;
}

export interface ImageProps {
    image: string;
    imageAreas: Area[];
    setImageAreas: Dispatch<SetStateAction<Area[]>>;
    imgRef: RefObject<HTMLImageElement>;
}

export interface AreasProps {
    imageAreas: Area[];
    setImageAreas: Dispatch<SetStateAction<Area[]>>;
}

export interface LoadErrorProps {
    reloadImg: () => void;
}

export interface ZoomComponentProps {
    panzoom: PanzoomObject | null;
    maxScale: number;
    minScale: number;
    scale: number;
    setScale: Dispatch<SetStateAction<number>>;
}

export interface ThemeButtonProps {
    theme: string;
    handleToggleTheme: () => void;
}

export interface SideMenuProps {
    imageAreas: Area[];
    PlaySound: (sound: string, volume?: number) => void;
    levelName: string;
}

export interface NewLevel {
    name: string;
    image: string;
    portrait: string;
} 