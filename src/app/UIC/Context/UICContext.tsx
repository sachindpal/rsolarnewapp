import React, { createContext, FC, ReactNode, useState } from 'react';


// Initiate context

const UICContext = createContext<any>({});

const UICProvider: FC<{ children: ReactNode }> = ({ children }) => {

    const [selectedCrop, setselectedCrop] = useState([])
    const [addedNewCrop, setaddCrop] = useState([])

    const selectCropFunct = (value: any) => {
        setselectedCrop(value)
    }
    const selectAddCropFunct = (value: any) => {
        setaddCrop(value)
    }

console.log("context add crop=============>",addedNewCrop)

    return (
        <UICContext.Provider value={{ selectedCrop, selectCropFunct,selectAddCropFunct
        ,addedNewCrop }}>
            {children}
        </UICContext.Provider>
    );
};

export { UICContext, UICProvider };