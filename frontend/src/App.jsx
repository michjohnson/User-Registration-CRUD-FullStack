import "./styles/styles.css";
import UserForm from"./components/UserForm";
import UserList from "./components/UserList";
import { useRef } from "react";

function App(){
  const userListRef = useRef();

  const handleUserAdded = (newUser)=>{
    console.log('New User Added:', newUser);
    if (userListRef.current) {
      userListRef.current.fetchUsers();
    }
  };
  return (
    <div className="container">
      <h1>User Registration CRUD</h1>
      <UserForm onUserAdded={handleUserAdded}/>
      <UserList ref={userListRef}/>
    </div>
  );
}
export default App;