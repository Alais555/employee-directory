import React, { Component } from "react";
import axios from "axios";
import { Table, Spinner } from "react-bootstrap";
import TableRow from "../TableRow";
import TableInputs from "../TableInputs";

class EmployeeTable extends Component {
  state = {
    isLoaded: false,
    users: [],
    allUsers: [],
  };

  componentDidMount() {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        this.setState({
          isLoaded: true,
          users: response.data,
          allUsers: response.data,
        });
      })
      .catch((err) => console.error(err));
  }

  handleFilterChange = (event) => {
    const { allUsers } = this.state;

    const filterString = event.target.value.toLowerCase();

    const filteredUsers = allUsers.filter((user) => {
      return (
        user.name.toLowerCase().includes(filterString) ||
        user.email.toLowerCase().includes(filterString)
      );
    });

    this.setState({ users: filteredUsers });
  };

  handleSortChange = (event) => {
    const { users } = this.state;

    const sortString = event.target.value;

    const sortedUsers =
      sortString === "id"
        ? users.sort((user1, user2) => user1.id - user2.id)
        : users.sort((user1, user2) =>
            user1[sortString] > user2[sortString] ? 1 : -1
          );

    this.setState({ users: sortedUsers });
  };

  render() {
    const { isLoaded, users } = this.state;

    if (isLoaded) {
      return (
        <div>
          <h1>Employee Directory</h1>
          <TableInputs
            handleFilterChange={this.handleFilterChange}
            handleSortChange={this.handleSortChange}
          />
          <Table variant="dark">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                return (
                  <TableRow
                    key={user.id}
                    id={user.id}
                    name={user.name}
                    email={user.email}
                    phone={user.phone}
                  />
                );
              })}
            </tbody>
          </Table>
        </div>
      );
    } else {
      return (
        <div>
          <h1>Employee Directory</h1>
          <div className="mt-5 text-center">
            <Spinner animation="border" />
          </div>
        </div>
      );
    }
  }
}

export default EmployeeTable;