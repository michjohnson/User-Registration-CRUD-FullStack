import { useState, useEffect } from "react";
import UserService from "../services/UserService";

function UserForm({ user, onUserAdded, isEdit = false, onCancel }) {
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [dob, setDob] = useState(user?.dob || "");

  // Update form when editing a different user
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setDob(user.dob);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = { ...user, name, email, dob };

    try {
      if (isEdit) {
        await UserService.updateUser(userData.id, userData);
        onUserAdded(userData); // update parent
      } else {
        const response = await UserService.createUser(userData);
        onUserAdded(response.data);
      }
      setName("");
      setEmail("");
      setDob("");
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      alert(error.response?.data || "Error saving user");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{isEdit ? "Edit User" : "Add New User"}</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="date"
        placeholder="Date of Birth"
        value={dob}
        onChange={(e) => setDob(e.target.value)}
        required
      />
      <div style={{ display: "flex", gap: "10px" }}>
        <button type="submit">{isEdit ? "Update User" : "Add User"}</button>
        {isEdit && <button type="button" onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  );
}

export default UserForm;
