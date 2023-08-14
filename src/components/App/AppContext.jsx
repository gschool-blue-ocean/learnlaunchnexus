import {useState, createContext} from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {

    //state
    const [userEmail, setUserEmail ] = useState("");
    const [user, setUser ] = useState({});
    

    //functions

    return ( <AppContext.Provider value={{ userEmail, setUserEmail, user, setUser }}> {children}
    </AppContext.Provider>
    );
};

export default AppContext;
