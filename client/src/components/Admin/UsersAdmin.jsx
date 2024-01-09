import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import axios from "axios";
import HeaderAdmin from "./HeaderAdmin";
function UsersAdmin() {
  const baseUrl = "http://localhost:3001/api/v1";
  const [users, setUsers] = useState([]);
  const getUsers = () => {
    axios
      .get(`${baseUrl}/users`)
      .then((res) => setUsers(res.data.users))
      .catch((err) => console.log(err));
  };

  const handleToggleBlock = (id) => {
    axios
      .patch(`${baseUrl}/users/${id}`)
      .then((res) => {
        console.log(res.data);
        getUsers();
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getUsers();
  }, []);
  const filteredUsers = users.filter((user) => user.roles === 0);
  return (
    <div>
      <HeaderAdmin />
      <h1>List User</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>UserId</th>
            <th>Username</th>
            <th>Email</th>
            <th>Password</th>
            <th>Roles</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, i) => (
            <tr key={i}>
              <td>{i}</td>
              <td>{user.userId}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>{user.roles}</td>
              <td>
                <Button
                  variant={user.block === 0 ? "success" : "danger"}
                  onClick={() => handleToggleBlock(user.userId)}
                >
                  {user.block === 0 ? "Unblock" : "Block"}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default UsersAdmin;
