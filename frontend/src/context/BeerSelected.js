import { createContext, useContext, useState } from 'react';

export const BeerSelectedContext = createContext();

// TODO - setCurrentBeer, setShowReviewModal, setPrevHost?
export const BeerSelectedProvider = ({ children }) => {
    const [ beerSelected, setBeerSelected ] = useState(false);
    const [ currentBeer, setCurrentBeer ] = useState(false);
    const [showReviewModal, setShowReviewModal] = useState(false);

    
    return (
        <BeerSelectedContext.Provider value={{
            beerSelected, setBeerSelected,
            currentBeer, setCurrentBeer,
            showReviewModal, setShowReviewModal
        }}>
            { children }
        </BeerSelectedContext.Provider>
    )
}

export const useBeerSelected = () => useContext(BeerSelectedContext)
