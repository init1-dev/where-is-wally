import { Dispatch, SetStateAction } from "react";

export interface Area {
    description: string;
    alt: string;
    coords: string;
    shape: string;
    found: boolean;
}

export interface Image {
    image: string;
    areas: Area[]
}

export interface InteractiveImageProps {
    image: string;
    imageAreas: Area[];
    setImageAreas: Dispatch<SetStateAction<Area[]>> | undefined;
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