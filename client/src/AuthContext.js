import React, { createContext, Component } from "react";
import { getSessionCookie, setSessionCookie } from "./components/Cookies";
export const AuthContext = createContext(getSessionCookie());
export default class AuthContextProvider extends Component {
  state = {
    isAuth: false,
    uid: ""
  };
  componentDidMount() {
    this.setState(getSessionCookie());
  }
  // componentWillMount(){
  //   this.loggedOut()
  // }
  loggedIn = uid => {
    this.setState({ isAuth: true, uid: uid });
    setSessionCookie(this.state);
  };
  loggedOut = () => {
    
    // this.setState({ isAuth: false, uid: "" });
    
    setSessionCookie({ isAuth: false, uid: "" });
    // console.log("After",this.state)
  };

  render() {
    return (
      <AuthContext.Provider
        value={{
          ...this.state,
          loggedIn: this.loggedIn,
          loggedOut: this.loggedOut
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}
// export const AppProviderConsumer = AppProviderContext.Consumer;
