import { without, findIndex } from "lodash";
import React, { Component } from "react";
import AddAppointments from "./components/AddAppointments";
import ListAppointments from "./components/ListAppointments";
import SearchAppointments from "./components/SearchAppointments";
import "./css/App.css";
export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      myAppointments: [],
      lastIndex: 0,
      formDisplay: false,
      orderBy: "petName",
      orderDir: "asc",
      queryText: "",
    };
    //we are binding the this key word for our constructure, so it can be used in the method we specify
    this.deleteAppointment = this.deleteAppointment.bind(this);
    //so when deleteApp uses the this key word its able to use this object

    this.toggleForm = this.toggleForm.bind(this);
    this.addAppointment = this.addAppointment.bind(this);
    this.changeOrder = this.changeOrder.bind(this);
    this.searchApts = this.searchApts.bind(this);
    this.updateInfo = this.updateInfo.bind(this);
  }

  toggleForm() {
    this.setState({
      formDisplay: !this.state.formDisplay,
    });
  }

  searchApts(query) {
    this.setState({ queryText: query });
  }

  changeOrder(order, dir) {
    this.setState({
      orderBy: order,
      orderDir: dir,
    });
  }

  deleteAppointment(apt) {
    let tempApts = this.state.myAppointments;
    //lodash methoid without
    //take an array feed, it a recored with something you want to delete.
    tempApts = without(tempApts, apt);

    this.setState({ myAppointments: tempApts });
  }

  addAppointment(apt) {
    let tempApts = this.state.myAppointments;
    apt.aptId = this.state.lastIndex;
    //push element into the array
    tempApts.unshift(apt); //unshift will pull apt at begining of array
    this.setState({
      myAppointments: tempApts, //new version of our array
      lastIndex: this.state.lastIndex + 1, //update that index
    });
  }
  updateInfo(name, value, id) {
    let tempApts = this.state.myAppointments;
    let aptIndex = findIndex(this.state.myAppointments, {
      aptId: id,
    });
    tempApts[aptIndex][name] = value;
    this.setState({
      myAppointments: tempApts,
    });
  }

  componentDidMount() {
    fetch("./data.json")
      .then((response) => response.json())
      .then((result) => {
        const apts = result.map((item) => {
          item.aptId = this.state.lastIndex;
          this.setState({ lastIndex: this.state.lastIndex + 1 });
          return item;
        });
        this.setState({
          myAppointments: apts,
        });
      });
  }

  render() {
    {
      /*
    
        const listItems = this.state.myAppointments.map((item) => (
      <div>
        <p>Pet Name: {item.petName}</p>

        <p>Owners Name: {item.ownerName}</p>
        <br />
      </div>
    ));
    
    
    
        */
    }

    let order;
    let filteredApts = this.state.myAppointments;
    if (this.state.orderDir === "asc") {
      order = 1;
    } else {
      order = -1;
    }

    filteredApts = filteredApts
      .sort((a, b) => {
        if (
          a[this.state.orderBy].toLowerCase() <
          b[this.state.orderBy].toLowerCase()
        ) {
          return -1 * order;
        } else {
          return 1 * order;
        }
      })
      .filter((eachItem) => {
        return (
          eachItem["petName"]
            .toLowerCase()
            .includes(this.state.queryText.toLowerCase()) ||
          eachItem["ownerName"]
            .toLowerCase()
            .includes(this.state.queryText.toLowerCase()) ||
          eachItem["aptNotes"]
            .toLowerCase()
            .includes(this.state.queryText.toLowerCase())
        );
      });

    return (
      <main className="page bg-white" id="petratings">
        <div className="container">
          <div className="row">
            <div className="col-md-12 bg-white">
              <div className="container">
                <AddAppointments
                  formDisplay={this.state.formDisplay}
                  toggleForm={this.toggleForm}
                  addAppointment={this.addAppointment}
                />
                <SearchAppointments
                  orderBy={this.state.orderBy}
                  orderDir={this.state.orderDir}
                  changeOrder={this.changeOrder}
                  searchApts={this.searchApts}
                />
                <ListAppointments
                  appointments={filteredApts}
                  deleteAppointment={this.deleteAppointment}
                  updateInfo={this.updateInfo}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}
