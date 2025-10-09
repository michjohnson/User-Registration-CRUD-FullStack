import { useEffect, useState } from "react";
import UserService from "../services/UserService";

function UserList() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", dob: "" });

  const fetchUsers = async () => {
    try {
      const response = await UserService.getUsers();
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await UserService.deleteUser(id);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error.response?.data || error.message);
      alert("Error deleting user");
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user.id);
    setFormData({ name: user.name, email: user.email, dob: user.dob });
  };

  const handleUpdate = async (id) => {
    try {
      const response = await UserService.updateUser(id, formData);
      setUsers(users.map((u) => (u.id === id ? response.data : u)));
      setEditingUser(null);
      setFormData({ name: "", email: "", dob: "" });
    } catch (error) {
      console.error("Error updating user:", error.response?.data || error.message);
      alert("Error updating user");
    }
  };

  const handleCancel = () => {
    setEditingUser(null);
    setFormData({ name: "", email: "", dob: "" });
  };

  return (
    <div>
      <h2>Registered Users</h2>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        users.map((user) => (
          <div className="user-card" key={user.id}>
            {editingUser === user.id ? (
              <div className="edit-form">
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                <input
                  type="date"
                  value={formData.dob}
                  onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                />
                <button className="edit-btn" onClick={() => handleUpdate(user.id)}>
                  Save
                </button>
                <button className="delete-btn" onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            ) : (
              <>
                <div className="user-info">
                  <strong>{user.name}</strong>
                  <span>{user.email}</span>
                  <span>{user.dob}</span>
                </div>
                <div>
                  <button className="edit-btn" onClick={() => handleEdit(user)}>
                    Edit
                  </button>
                  <button className="delete-btn" onClick={() => handleDelete(user.id)}>
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default UserList;
