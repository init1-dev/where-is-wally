import { Image } from "../interfaces/interfaces";

export const image: Image = {
    image: 'https://in1t-container.s3.eu-west-3.amazonaws.com/where-is-wally/wally-test.jpeg',
    areas: [
        {   
            description: 'Wally entre la multitud',
            alt: 'wally',
            coords: '2119,1374,2162,1414',
            shape: 'rect',
            found: false
        },
        {
            description: 'Un soldado sosteniendo una diana entre la multitud',
            alt: 'soldado-diana',
            coords: '1646,1160,1721,1267',
            shape: 'rect',
            found: false
        },
        {
            description: 'Un grupo de soldados con el símbolo del dolar en sus escudos',
            alt: 'grupo-soldados-dolar',
            coords: '2464,1002,2575,1125',
            shape: 'rect',
            found: false
        },
        {
            description: 'Un grupo de soldados en cuyos escudo se lee HELP',
            alt: 'grupo-soldados-help',
            coords: '1054,486,1193,549',
            shape: 'rect',
            found: false
        },
        {
            description: 'Un grupo de soldados cuyos escudos forman el dibujo de una cara',
            alt: 'grupo-soldados-cara',
            coords: '653,1559,832,1702',
            shape: 'rect',
            found: false
        },
    ]
}