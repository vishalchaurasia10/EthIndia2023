import { useState } from 'react';
import TypeContext from './typeContext';

const TypeState = (props) => {

    const [userType, setUserType] = useState('doctor')

    return (
        <TypeContext.Provider value={{ userType, setUserType }}>
            {props.children}
        </TypeContext.Provider>
    );
}

export default TypeState;