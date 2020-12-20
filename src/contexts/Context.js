import React, {createContext, Component} from 'react';

export const Context = createContext()

export default class ContextProvider extends Component {
    state = { 
        user: "user"

     }

     setUser = (user) => {
         this.setState( {user: user} )
     }


    render() { 
        return (  
            <Context.Provider value={{...this.state, setUser: this.setUser}}>
                {this.props.children}
            </Context.Provider>
        );
    }
}
 