import { Area } from "../../interfaces/interfaces";

export const checkAllFound = (imageAreas: Area[]) => {
    return imageAreas.every(area => area.found);
};

export default checkAllFound;