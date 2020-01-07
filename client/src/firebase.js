const app = require("firebase");
const config = require("../src/components/loginScreen/config.js");

class Firebase {
	constructor() {
    app.initializeApp(config.default);
    this.auth = app.auth();
    // this.db = app.firestore();
  }

  login(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  signOut() {
    return this.auth.signOut();
  }

  

  register(name, email, password) {
    const reg = new Promise((resolve, reject) => {
      resolve(this.auth.createUserWithEmailAndPassword(email, password));
    }).then(()=>{
      const newId = this.auth.currentUser.uid;
      return newId;
    })
      .catch(error => {
        console.log("Code: ", error.code, "/n", "Message", error.message);
      });
  }
}

export default new Firebase();
