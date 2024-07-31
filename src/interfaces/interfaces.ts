import { FormEvent, RefObject } from "react";

export interface Area {
    description: string;
    alt: string;
    coords: string;
    shape: string;
    found: boolean;
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

export interface LoadErrorProps {
    reloadImg: () => void;
}

export interface NewLevel {
    name: string;
    image: string;
    portrait: string;
} 