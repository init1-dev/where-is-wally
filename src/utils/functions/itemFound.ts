import { Dispatch, SetStateAction } from "react";
import { Area } from "../../interfaces/interfaces";
import { Alert } from "../alerts/customAlert";

export const itemFound = (
    foundArea: Area, 
    setImageAreas: Dispatch<SetStateAction<Area[]>>,
    setFound: Dispatch<SetStateAction<number>>
) => {
    if(!foundArea.found){
        setFound(prev => prev + 1);
        
        Alert.fire({
            html: `
                <h2 style="margin:0px 2rem 1rem 2rem;">Encontrado:</h2>
                <i>"${foundArea.description}"</i>
            `,
            timer: 2500,
            width: 'auto',
            timerProgressBar: true,
            showCloseButton: true,
            didOpen: (toast) => {
                toast.onmouseenter = Alert.stopTimer;
                toast.onmouseleave = Alert.resumeTimer;
            }
        })

        setImageAreas((prevAreas) =>
            prevAreas.map((area) =>
                area.alt === foundArea.alt ? { ...area, found: true } : area
            )
        );
    }
};

export default itemFound;