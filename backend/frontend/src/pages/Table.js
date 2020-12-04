import React from "react";
import Axios from "axios";
import Row from "../components/TableRow";
import Message from "../components/Message";
import Search from "../components/SerchField";
import ProgressBar from "../components/ProgressBar";
import "../css/Table.css";
class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: null,
      list: [],
      id_list: [],
      select_all_flag: false,
      csv_status: null,
      department_list: [],
      changes_list: [],
      save_status: null,
      search_text: "",
      csv_loading: false,
      csv_error: null,
    };
  }
  componentDidMount() {
    Axios.get("http://127.0.0.1:8000/api/employee/")
      .then((response) => {
        this.setState({ list: response.data, loading: false });
      })
      .catch((error) => {
        this.setState({ error: error.message, loading: false });
      });

    Axios.get("http://127.0.0.1:8000/api/department/")
      .then((response) => {
        this.setState({ department_list: response.data });
      })
      .catch((error) => {
        this.setState({ error: "Something wrong with department list" });
      });
  }

  onCheck = (event, id) => {
    const index = this.state.id_list.indexOf(id);
    if (event.target.checked) {
      this.setState((state) => ({ id_list: state.id_list.concat(id) }));
    } else {
      this.state.id_list.splice(index, 1);
    }
  };

  createCSV = () => {
    this.setState({ csv_loading: true });
    Axios.post("http://127.0.0.1:8000/api/employee/create-csv/", {
      list: this.state.id_list,
    })
      .then((response) => {
        this.setState({ csv_status: response.data, csv_loading: false });
      })
      .catch((error) => {
        this.setState({ csv_loading: false, error: error.message });
        alert(error.message);
      });
  };

  cancelCSVCreation = () => {
    document.getElementsByName("select_box").forEach((item) => {
      item.checked = false;
    });
    this.setState({ id_list: [], select_all_flag: false });
  };

  selectAll = (event) => {
    if (event.target.checked) {
      const new_id_list = this.state.list.map((item) => item.id);
      this.setState((state) => ({
        id_list: new_id_list,
        select_all_flag: true,
      }));
    } else {
      this.setState((state) => ({ id_list: [], select_all_flag: false }));
    }
  };

  handleChangeObjects = (obj) => {
    console.log(obj);
    this.setState((state) => ({
      changes_list: state.changes_list.concat(obj),
    }));
  };

  saveChanges = () => {
    Axios.post("http://127.0.0.1:8000/api/employee/save-changes/", {
      list: this.state.changes_list,
    })
      .then((response) => {
        alert("Changes are saved successfully");
        this.setState({ save_status: response.data, changes_list: [] });
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  handleCancel = () => {
    this.setState({ changes_list: [] });
  };

  handleSearch = (e) => {
    this.setState({ search_text: e.target.value });
    Axios.get(`http://127.0.0.1:8000/api/employee/search/?data=${e.target.value}`).then(response => {
      this.setState({list: response.data})
      console.log(response.data)
    }).catch(error => {
      this.setState({error: error.message})
    })
  };

  handleSearchClick = (e) => {
    e.preventDefault();
    if (this.state.search_text) {
      console.log(this.state.search_text);

      this.setState({ search_text: "" });
    } else {
      console.log("No query");
    }
  };

  render() {
    const {
      loading,
      error,
      list,
      id_list,
      select_all_flag,
      csv_status,
      department_list,
      changes_list,
      search_text,
      csv_loading,
      csv_error,
    } = this.state;
    const result = loading ? (
      <div>Loading....</div>
    ) : error ? (
      <div>{error}</div>
    ) : list ? (
      list.map((item) => (
        <Row
          data={item}
          onCheck={this.onCheck}
          select_all={select_all_flag}
          department_list={department_list}
          handleChangeObjects={this.handleChangeObjects}
          key={item.id}
        />
      ))
    ) : (
      <div>There is no data</div>
    );
    const message = csv_loading ? (
      <ProgressBar />
    ) : csv_error ? (
      <Message message={csv_error} type="danger" />
    ) : csv_status ? (
      csv_status.status === "success" ? (
        <Message message={csv_status.message} type="dark" />
      ) : (
        <Message message={csv_status.message} type="success" />
      )
    ) : null;

    const change_actions =
      changes_list.length > 0 ? (
        <>
          <div className="col">
            <button
              type="button"
              className="btn btn-dark"
              onClick={this.saveChanges}
            >
              Save changes
            </button>
          </div>

          <div className="col">
            <button className="btn btn-danger" onClick={this.handleCancel}>
              Cancel
            </button>
          </div>
          <div className="col-md-4"></div>
        </>
      ) : null;

    const csv_actions =
      id_list.length > 0 ? (
        <>
          <div className="col">
            <button
              type="button"
              className="btn btn-dark"
              onClick={this.createCSV}
            >
              Create CSV
            </button>
          </div>
          <div className="col">
            <button
              type="button"
              className="btn btn-danger"
              onClick={this.cancelCSVCreation}
            >
              Cancel
            </button>
          </div>
        </>
      ) : null;

    return (
      <div>
        <div className="row header">
          <div className="col-md-4"></div>
          <div className="col-md-4"></div>
          <div className="col-md-4 search-field">
            <Search
              changeValue={search_text}
              changeFunction={this.handleSearch}
              clickFunction={this.handleSearchClick}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">{message}</div>
        </div>
        <table className="table table-hover table-dark">
          <thead>
            <tr>
              <th scope="col">
                <input type="checkbox" checked={select_all_flag} onClick={(e) => this.selectAll(e)} />
              </th>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Department</th>
              <th scope="col">Designation</th>
              <th scope="col">Contact Nubmer</th>
              <th scope="col">Stipend</th>
              <th scope="col">Joining Date</th>
            </tr>
          </thead>
          <tbody>{result}</tbody>
        </table>
        <div className="row">{csv_actions}</div>
        <div className="row">{change_actions}</div>
      </div>
    );
  }
}

export default Table;
