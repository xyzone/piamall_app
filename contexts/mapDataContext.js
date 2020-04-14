import React, {useReducer} from 'react';

export default (reducer, statename, actions, defaultValues) => {
    const TempContext = React.createContext()
    const TempProvider = ({children}) => {
        const [state, dispatch] = useReducer(reducer, defaultValues);
        var boundActions = {}
        for(let key in actions){
            boundActions[key]= actions[key](dispatch)
        } 
        var stateDict = {}
        stateDict[statename] = state
        
        return(
            <TempContext.Provider value={{...stateDict, ...boundActions}}>
                {children}
            </TempContext.Provider>
        )
    }
    return {Context: TempContext, Provider: TempProvider}

}