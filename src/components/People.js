import React from "react";
import axios from "axios";

export default class People extends React.Component {
  state = {
    persons: [],
    personsAsync: [],
  };

  componentDidMount() {
    this.sendGetRequests();
    this.sendGetRequestAsync();
  }

  sendGetRequestAsync = async () => {
    try {
      const resp = await axios.get("https://swapi.dev/api/people");
      const personsAsync = resp.data.results;
      this.setState({ personsAsync });
    } catch (err) {
      console.error(err);
    }
  };

  sendGetRequests = () => {
    axios.get(`https://swapi.dev/api/people`).then((res) => {
      const persons = res.data.results;
      this.setState({ persons });
    });
  };

  render() {
    return (
      <div>
        <table>
          <tr>
            <th>Name</th>
            <th>Gender</th>
          </tr>
          {this.state.persons.map((person) => (
            <tr>
              <td>{person.name}</td>
              <td>{person.gender}</td>
            </tr>
          ))}
        </table>
        <ul>
          {this.state.personsAsync.map((person) => (
            <li key={person.id}>{person.name}</li>
          ))}
        </ul>
      </div>
    );
  }
}
