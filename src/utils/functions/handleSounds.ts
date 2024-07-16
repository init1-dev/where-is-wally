import { MutableRefObject } from "react";
import { Area } from "../../interfaces/interfaces";
import { NavigateFunction } from "react-router-dom";
import { PlaySound } from "../playSound";
import { clap, found, start, tada } from "../../assets/sounds";
import { Alert } from "../alerts/customAlert";

export const handleSounds = (
    isFirstRender: MutableRefObject<boolean>,
    checkAllFound: (imageAreas: Area[]) => boolean,
    navigate: NavigateFunction,
    imageAreas: Area[]
) => {
    if(isFirstRender.current){
        PlaySound(start);
        isFirstRender.current = false;
    } else {
        const isAllFound = checkAllFound(imageAreas);

        if(isAllFound) {
            PlaySound(tada)
            PlaySound(clap);

            Alert.fire({
                icon: 'success',
                html: `
                    <h1>¡Enhorabuena!</h1>
                    <p>Has encontrado todas las pistas</p>
                    <small>¡Gracias por probar esta demo!</small>
                `,
                showCloseButton: false,
                allowOutsideClick: false,
                showConfirmButton: true,
                confirmButtonText: 'Volver'
            }).then((result) => {
                if(result.isConfirmed){
                    navigate(-1)
                }
            })
        } else {
            PlaySound(found);
        }
    }
}

export default handleSounds;