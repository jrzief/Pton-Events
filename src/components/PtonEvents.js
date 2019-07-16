import React, { Component } from "react";
import events from "../data/events.json";
import _ from "lodash";

class PtonEvents extends Component {
  state = {
    creating: false,
    events: events,
    filteredEvents: [],
    group: "All Events"
  };

  allEvents = () => {
    const allEvts = this.state.events;
    this.setState({ filteredEvents: allEvts, group: "All Events" });
  };
  musicEvents = () => {
    const musicEvts = this.state.events.filter(
      music =>
        music.tags === "Live Music" ||
        music.tags === "Classical Music" ||
        music.tags === "Pop Music" ||
        music.tags === "Jazz and Blues" ||
        music.tags === "Folk Music"
    );
    this.setState({
      filteredEvents: musicEvts,
      group: "Music Events"
    });
  };
  artEvents = () => {
    const artEvts = this.state.events.filter(art => art.tags === "Art");
    this.setState({ filteredEvents: artEvts, group: "Art" });
  };
  wwsEvents = () => {
    const wwsEvts = this.state.events.filter(
      wws =>
        wws.tags === "Policy" ||
        wws.tags === "Finance, Fiscal Policy, Foreign Policy"
    );
    this.setState({
      filteredEvents: wwsEvts,
      group: "Woodrow Wison School Events"
    });
  };
  theaterEvents = () => {
    const theaterEvts = this.state.events.filter(
      theater => theater.tags === "On Stage"
    );
    this.setState({ filteredEvents: theaterEvts, group: "Theater" });
  };
  historyEvents = () => {
    const historyEvts = this.state.events.filter(
      hist => hist.tags === "History"
    );
    this.setState({
      filteredEvents: historyEvts,
      group: "History Events"
    });
  };
  exhibitionEvents = () => {
    const exhibitionEvts = this.state.events.filter(
      exhib => exhib.tags === "Exhibitions"
    );
    this.setState({
      filteredEvents: exhibitionEvts,
      group: "Exhibitions"
    });
  };
  businessEvents = () => {
    const businessEvts = this.state.events.filter(
      busi => busi.tags === "Business Meetings"
    );
    this.setState({
      filteredEvents: businessEvts,
      group: "Business Events"
    });
  };
  lectureEvents = () => {
    const lectureEvts = this.state.events.filter(
      lect => lect.tags === "Lectures"
    );
    this.setState({
      filteredEvents: lectureEvts,
      group: "Lectures"
    });
  };

  render() {
    let eventList;
    if (this.state.group === "All Events") {
      eventList = this.state.events;
    } else {
      eventList = this.state.filteredEvents;
    }
    const groupedEvents = _.groupBy(eventList, "tags");

    /* const eventList = this.state.events.map(event => {
      return (
        <li key={event.id} className="events__list-item">
          {event.source}
          {event.tags}
        </li>
      );
    }); */
    return (
      <React.Fragment>
        <div className="text-phrases">
          <h1>Princeton Events Today</h1>
        </div>
        <div className="events-control">
          <button
            className="btn"
            onClick={this.allEvents}
            style={{ backgroundColor: "#f14e4e" }}
          >
            All Events
          </button>
          <button
            className="btn"
            onClick={this.musicEvents}
            style={{ backgroundColor: "#9a4ef1" }}
          >
            Music
          </button>
          <button
            className="btn"
            onClick={this.artEvents}
            style={{ backgroundColor: "#f1bb4e" }}
          >
            Art
          </button>
          <button
            className="btn"
            onClick={this.wwsEvents}
            style={{ backgroundColor: "#84f14e" }}
          >
            WWS
          </button>
          <button
            className="btn"
            onClick={this.theaterEvents}
            style={{ backgroundColor: "#4ef18f" }}
          >
            Theater
          </button>
          <button
            className="btn"
            onClick={this.historyEvents}
            style={{ backgroundColor: "#4e9af1" }}
          >
            History
          </button>
          <button
            className="btn"
            onClick={this.exhibitionEvents}
            style={{ backgroundColor: " #f14ebd" }}
          >
            Exhibitions
          </button>
          <button
            className="btn"
            onClick={this.businessEvents}
            style={{ backgroundColor: "#84f14e" }}
          >
            Business
          </button>
          <button
            className="btn"
            onClick={this.lectureEvents}
            style={{ backgroundColor: "#6219d6" }}
          >
            Lectures
          </button>
        </div>
        <div className="text-phrases">
          <h2>
            {" "}
            <p>{this.state.group}</p>{" "}
          </h2>
        </div>
        <div>
          {Object.entries(groupedEvents).map(([key, value], i) => {
            return (
              <div key={i}>
                <div className="listKey">{key}</div>
                <hr />
                {value.map((item, j) => (
                  <div className="list-items" key={j}>
                    <ul>
                      <li className="dateColor">{item.date}</li>
                      <li>{item.name}</li>
                      <li>
                        {" "}
                        <a href={item.url}>Event link</a>
                      </li>
                      <p className="descriptionFont">{item.description}</p>
                      <hr className="style-one" />
                    </ul>
                  </div>
                ))}
              </div>
            );
          })}
        </div>

        {/* <ul className="events__list">{eventList}</ul> */}
      </React.Fragment>
    );
  }
}

/* const ComplexList = () => (
  <ul>
    {mydata2.map(item => (
      <li key={item.id}>
        <div>{item.tags}</div>
        <div>{item.id}</div>
        <div>{item.source}</div>
        <div>{item.date}</div>
        <div>{item.name}</div>
      </li>
    ))}
  </ul>
); */

export default PtonEvents;
