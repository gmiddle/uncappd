import { createContext, useContext, useState } from 'react';

export const BeerSelectedContext = createContext();

export const BeerSelectedProvider = ({ children }) => {
    const [ beerSelected, setBeerSelected ] = useState(false);
    
    return (
        <BeerSelectedContext.Provider value={{
            beerSelected, setBeerSelected
        }}>
            { children }
        </BeerSelectedContext.Provider>
    )
}

export const useBeerSelected = () => useContext(BeerSelectedContext)
