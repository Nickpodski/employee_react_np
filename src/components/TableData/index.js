import React, { Component } from 'react';
import API from "../../utils/api";
import TableHtml from "../TableHtml";
import Wrapper from '../Wrapper';
import Navbar from '../Navbar';

class TableData extends Component {
  // const [rows, setRows] = useState([[]]);
  // const [headings] = useState(["Picture", "Name", "Email", "Phone", "DOB"]);
  // const [search, setSearch] = useState("");
  state = {
    rows: [[]],
    headings: ["Picture", "Name", "Email", "Phone", "DOB"],
    format: "",
    search: "",
    filteredUsers: [{}],
    backupRows: [[]]
  };

  componentDidMount = () => {
    this.searchEmployee();
  }

  searchEmployee = () => {
    API.getEmployee()
      .then(employees => {
        // const data = employees.data.results;
        // const newData = data.map(date => { return new Date(date.dob.date).getDate() + "-" + (new Date(date.dob.date).getMonth() + 1) +
        // "-" + new Date(date.dob.date).getFullYear()});
        const rows = employees.data.results.map(employee => {
          return [<img src={employee.picture.medium} className="rounded-circle" alt={employee.name}></img>, `${employee.name.first} ${employee.name.last}`, employee.email, employee.phone, (new Date(employee.dob.date).getMonth() + 1) + "/" + (new Date(employee.dob.date).getDate() + "/" + (new Date(employee.dob.date).getFullYear()))]
        })
        this.setState({ rows, filteredUsers: employees.data, backupRows: rows })
      })
      .catch(err => console.log(err));
  };

  // useEffect(() => {
  //   API.getEmployee()
  //     .then(employees => {
  //       const data = employees.data.results.map(employee => {
  //         return [employee.picture.thumbnail, `${employee.name.first} ${employee.name.last}`, employee.email, employee.phone, employee.dob]
  //       })
  //       setRows(data);
  //       console.log(data)
  //     })
  //     .catch(err => console.log(err));
  // })

  // const handleInputChange = event => {
  //   const value = event.target.value;
  //   const name = event.target.name;
  //   this.setState({
  //     [name]: value
  //   })
  // };

  handleFormSubmit = (event) => {
    event.preventDefault();
    // let currentRows = this.state.rows;
    // let oldRows = this.state.backupRows;
    const search = event.target.getAttribute("value");
    if (search === "") {
      this.setState({ rows: this.state.backupRows });
      return;
    } 
    let sortRows = this.state.backupRows;
    console.log(sortRows);
    sortRows = sortRows.filter(i => { return i[1].includes(search) });
    this.setState({ rows: sortRows });
    return;
  };

  render() {
    return (
      <Wrapper>
        <Navbar
          onSubmit={this.handleFormSubmit}
          rows={this.state.rows}
        />
        <TableHtml
          headings={this.state.headings}
          rows={this.state.rows}
          format={this.state.format}
        />
      </Wrapper>

    )
  };
}

export default TableData;