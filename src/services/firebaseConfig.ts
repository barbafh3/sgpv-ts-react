import * as Firebase from "firebase/app";
import "firebase/database";

const config = {
  apiKey: "AIzaSyDP19Nkg4MqRj2WaYmR13m1ZO50FxUFaSQ",
  authDomain: "sgpv-b.firebaseapp.com",
  databaseURL: "https://sgpv-b.firebaseio.com",
  projectId: "sgpv-b",
  storageBucket: "sgpv-b.appspot.com",
  messagingSenderId: "245774103202"
};

Firebase.initializeApp(config);
export default Firebase.database();
