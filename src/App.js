import React, { Component } from "react";
import AddAppointments from "./components/AddAppointments";
import ListAppointments from "./components/ListAppointments";
import SearchAppointments from "./components/SearchAppointments";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      myAppointments: [],
      lastIndex: 0,
    };
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
                <ListAppointments appointments={this.state.myAppointments} />
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}
