import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [carrinho, setCarrinho] = useState([]);

    return (
        <AppContext.Provider value={{ carrinho, setCarrinho }}>
            {children}
        </AppContext.Provider>
    );
};
