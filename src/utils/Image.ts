import { Book } from "../interfaces/interfaces";
import header from '../assets/wally_header.jpg';
import { aeropuerto } from "./Libros/Libro1/Niveles/aeropuerto";

const CREATED_BY = 'Martin Handford';

export const books: Book[] = [
    {
        number: 1,
        description: `Primer libro de la serie ¿Dónde está Wally? creado por el ilustrador Británico ${CREATED_BY} en el año 1987`,
        name: '¿Dónde está Wally?',
        createdBy: CREATED_BY,
        year: 1987,
        portrait: 'https://in1t-container.s3.eu-west-3.amazonaws.com/where-is-wally/Libros/libro-1/portada.jpg',
        scenarios: [
            aeropuerto,
            {
                id: 1,
                name: 'En la ciudad',
                image: header,
                portrait: 'https://in1t-container.s3.eu-west-3.amazonaws.com/where-is-wally/Libros/libro-1/1_city_portrait.jpg',
                areas: [],
                playable: false
            },
            {
                id: 2,
                name: 'En la playa',
                image: header,
                portrait: 'https://in1t-container.s3.eu-west-3.amazonaws.com/where-is-wally/Libros/libro-1/2_beach_portrait.jpg',
                areas: [],
                playable: false
            },
            {
                id: 3,
                name: 'Pista de esquí',
                image: header,
                portrait: 'https://in1t-container.s3.eu-west-3.amazonaws.com/where-is-wally/Libros/libro-1/3_snow_portrait.jpg',
                areas: [],
                playable: false
            },
            {
                id: 4,
                name: 'Camping',
                image: header,
                portrait: 'https://in1t-container.s3.eu-west-3.amazonaws.com/where-is-wally/Libros/libro-1/4_camping_portrait.jpg',
                areas: [],
                playable: false
            },
            {
                id: 5,
                name: 'Estación',
                image: header,
                portrait: 'https://in1t-container.s3.eu-west-3.amazonaws.com/where-is-wally/Libros/libro-1/5_station_portrait.jpg',
                areas: [],
                playable: false
            },
            {
                id: 7,
                name: 'Estadio',
                image: header,
                portrait: 'https://in1t-container.s3.eu-west-3.amazonaws.com/where-is-wally/Libros/libro-1/7_stadium_portrait.jpg',
                areas: [],
                playable: false
            },
            {
                id: 8,
                name: 'Museo',
                image: header,
                portrait: 'https://in1t-container.s3.eu-west-3.amazonaws.com/where-is-wally/Libros/libro-1/8_museum_portrait.jpg',
                areas: [],
                playable: false
            },
            {
                id: 9,
                name: 'En la mar',
                image: header,
                portrait: 'https://in1t-container.s3.eu-west-3.amazonaws.com/where-is-wally/Libros/libro-1/9_sea_portrait.jpg',
                areas: [],
                playable: false
            },
            {
                id: 10,
                name: 'Safari Park',
                image: header,
                portrait: 'https://in1t-container.s3.eu-west-3.amazonaws.com/where-is-wally/Libros/libro-1/10_safari_portrait.jpg',
                areas: [],
                playable: false
            },
            {
                id: 11,
                name: 'Grandes almacenes',
                image: header,
                portrait: 'https://in1t-container.s3.eu-west-3.amazonaws.com/where-is-wally/Libros/libro-1/11_store_portrait.jpg',
                areas: [],
                playable: false
            },
            {
                id: 12,
                name: 'Parque de atracciones',
                image: header,
                portrait: 'https://in1t-container.s3.eu-west-3.amazonaws.com/where-is-wally/Libros/libro-1/12_park_portrait.jpg',
                areas: [],
                playable: false
            },
        ],
        playable: true
    },
    {
        number: 2,
        description: `Segundo libro de la serie ¿Dónde está Wally? creado por el ilustrador Británico ${CREATED_BY} en el año 1988`,
        name: '¿Dónde está Wally ahora?',
        createdBy: CREATED_BY,
        year: 1988,
        portrait: 'https://in1t-container.s3.eu-west-3.amazonaws.com/where-is-wally/Libros/libro-2/portada.jpg',
        scenarios: [],
        playable: true
    },
    {
        number: 3,
        description: `Tercer libro de la serie ¿Dónde está Wally? creado por el ilustrador Británico ${CREATED_BY} en el año 1989`,
        name: '¿Dónde está Wally?: El viaje fantástico',
        createdBy: CREATED_BY,
        year: 1989,
        portrait: 'https://in1t-container.s3.eu-west-3.amazonaws.com/where-is-wally/Libros/libro-3/portada.jpg',
        scenarios: [],
        playable: true
    }
]