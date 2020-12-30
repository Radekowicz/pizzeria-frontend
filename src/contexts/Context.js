import React, {createContext, Component} from 'react';

export const Context = createContext()

export default class ContextProvider extends Component {
    state = { 
        user: "user",
        logged: false
     }

     setUser = (user) => {
         this.setState({user: user})
     }

     setLogged = (logged) => {
         this.setState({logged: logged})
     }


    render() { 
        return (  
            <Context.Provider value={{...this.state, setUser: this.setUser, setLogged: this.setLogged}}>
                {this.props.children}
            </Context.Provider>
        );
    }
}
 