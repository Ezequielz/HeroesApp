import { heroes } from '../data/heroes';

export const getHeroesByPublisher = ( publisher ) => {

    const valisPublishers = ['DC Comics', 'Marvel Comics'];

    if ( !valisPublishers.includes( publisher ) ){
        throw new Error(`Publisher"${ publisher }" no es correcto `)
    }

    return heroes.filter( hero => hero.publisher === publisher );

}