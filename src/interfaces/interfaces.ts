import { Dispatch, SetStateAction } from "react";

export interface Area {
    description: string;
    alt: string;
    coords: string;
    shape: string;
    found: boolean;
    onClick?: () => void;
}

export interface Image {
    image: string;
    areas: Area[]
}

export interface IntectiveImageProps {
    image: string;
    imageAreas: Area[];
    setImageAreas: Dispatch<SetStateAction<Area[]>>
}