import React, { Component } from 'react';
//import events from '../data/events.json';
import * as d3 from 'd3';
import _ from 'lodash';
import chroma from 'chroma-js';
//import d3Scale from 'd3-scale-chromatic';
//import ModalPopup from './ModalPopup';
import Modal from './Modal';
import Button from './Button';

class PtonEventsVII extends Component {
  state = {
    creating: false,
    events: null,
    filteredEvents: [],
    group: 'All Events',
    modalOpen: false,
    eventName: '',
    eventDescription: '',
    eventUrl: '',
    showMap: false
  };
  //const [modalOpen, setModalOpen] = useState(false);

  componentDidMount() {
    d3.json('/events.json', d => ({
      id: d.id,
      source: d.source,
      date: new Date(d.date),
      name: d.name,
      description: d.description,
      tags: d.tags,
      url: d.url
    })).then(data =>
      this.setState({
        events: data
      })
    );
    //console.log(this.state.events);
  }

  openModalHandler = () => this.setState({ showMap: true });

  closeModalHandler = () => this.setState({ showMap: false });

  getModal = (itemname, itemdescription, itemurl) => {
    this.setState({
      modalOpen: true,
      eventName: itemname,
      eventDescription: itemdescription,
      eventUrl: itemurl,
      showMap: true
    });
    console.log(this.state.eventData, this.state.eventUrl);
    /*  return (
      <ModalPopup
        isOpen={this.state.modalOpen}
        winner={this.state.eventData}
        close={() => this.setState({ modalOpen: false })}
        description={this.state.eventDescription}
      />
    ); */
  };

  allEvents = () => {
    const allEvts = this.state.events;
    this.setState({ filteredEvents: allEvts, group: 'All Events' });
    console.log(this.state.events);
  };

  //console.log(allEvents);

  musicEvents = () => {
    const musicEvts = this.state.events.filter(
      music =>
        music.tags === 'Live Music' ||
        music.tags === 'Classical Music' ||
        music.tags === 'Pop Music' ||
        music.tags === 'Jazz and Blues' ||
        music.tags === 'Folk Music'
    );
    this.setState({
      filteredEvents: musicEvts,
      group: 'Music Events'
    });
  };
  artEvents = () => {
    const artEvts = this.state.events.filter(art => art.tags === 'Art');
    this.setState({ filteredEvents: artEvts, group: 'Art' });
  };
  wwsEvents = () => {
    const wwsEvts = this.state.events.filter(
      wws =>
        wws.tags === 'Policy' ||
        wws.tags === 'Finance, Fiscal Policy, Foreign Policy'
    );
    this.setState({
      filteredEvents: wwsEvts,
      group: 'Woodrow Wilson School Events'
    });
  };
  theaterEvents = () => {
    const theaterEvts = this.state.events.filter(
      theater => theater.tags === 'On Stage'
    );
    this.setState({ filteredEvents: theaterEvts, group: 'Theater' });
  };
  historyEvents = () => {
    const historyEvts = this.state.events.filter(
      hist => hist.tags === 'History'
    );
    this.setState({
      filteredEvents: historyEvts,
      group: 'History Events'
    });
  };
  exhibitionEvents = () => {
    const exhibitionEvts = this.state.events.filter(
      exhib => exhib.tags === 'Exhibitions'
    );
    this.setState({
      filteredEvents: exhibitionEvts,
      group: 'Exhibitions'
    });
  };
  businessEvents = () => {
    const businessEvts = this.state.events.filter(
      busi => busi.tags === 'Business Meetings'
    );
    this.setState({
      filteredEvents: businessEvts,
      group: 'Business Events'
    });
  };
  lectureEvents = () => {
    const lectureEvts = this.state.events.filter(
      lect => lect.tags === 'Lectures'
    );
    this.setState({
      filteredEvents: lectureEvts,
      group: 'Lectures'
    });
  };

  bkgcolor = () =>
    d3
      .scaleOrdinal()
      .domain([
        'Art',
        'On Stage',
        'History',
        'wws',
        'Lectures',
        'Special Events',
        'Classical Music',
        'Business Meetings',
        'Jazz and Blues',
        'Fairs and Festivals'
      ])
      .range([
        '#009933',
        '#0091BD',
        '#A3AAAE',
        '#d30909',
        '#F4ABAA',
        '#FA0505',
        '#1F70C1',
        '#0171C5',
        '#7FBA02',
        '#008DD2'
        /* '#14149F',
          '#77B900',
          '#F70000',
          '#034EA1',
          '#7F7F7F',
          '#FF0000',
          '#D92AAD' */
      ]);

  //};
  render() {
    let eventList;
    if (this.state.group === 'All Events') {
      eventList = this.state.events;
    } else {
      eventList = this.state.filteredEvents;
    }
    const groupedEvents = _.groupBy(eventList, 'tags');

    const chColor = chroma.brewer.PuBu;
    //const colord3 = d3Scale.scaleOrdinal(d3Scale.schemeCategory20c);

    const scaleLch = chroma
      .scale(['#fafa6e', '#2A4858'])
      .mode('lch')
      .colors(18);

    const mycolor = {
      'All Events': '#D92AAD',
      Art: '#009933',
      Theater: '#0091BD',
      'History Events': '#A3AAAE',
      'Woodrow Wilson School Events': '#d30909',
      Lectures: '#F4ABAA',
      'Classical Music': '#1F70C1',
      'Music Events': '#7FBA02',
      'Fairs and Festivals': '#008DD2',
      'Special Events': '#FA0505',
      'Business Meetings': '#0171C5',
      Exhibitions: '#14149F',
      Dancing: '#77B900',
      Literati: '#F70000',
      Wellness: '#034EA1',
      Socials: '#7F7F7F',
      Policy: '#d30909',
      'Live Music': '#FF0000',
      Sports: '#D92AAD'
    };

    const mycolorArr = Object.keys(mycolor);
    console.log(mycolorArr);
    console.log(this.state.group);
    console.log('Color', mycolorArr.indexOf(this.state.group));
    const myRealColor =
      mycolor[mycolorArr[mycolorArr.indexOf(this.state.group)]];
    console.log('RealColor', myRealColor);
    const getRealColor = () =>
      mycolor[mycolorArr[mycolorArr.indexOf(this.state.group)]] || 'white';
    console.log(getRealColor);

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
        {/*  <div className="outer">
          <div className="menuContainer">
            <button className="mbox artBtn">Art</button>
            <button className="mbox theaterBtn">Theater</button>
            <button className="mbox festivalsBtn">Festivals</button>
            <div className="mbox musicBtn">
              Live Music
              <button className="mbox classicalBtn">Classical</button>
              <button className="mbox jazzBtn">Jazz</button>
              <button className="mbox folkBtn">Folk</button>
            </div>
            <button className="mbox wwsBtn">WWS</button>
            <button className="mbox historyBtn">History</button>
            <button className="mbox lecturesBtn">Lectures</button>
            <button className="mbox literatiBtn">Literati</button>
            <button className="mbox businessBtn">Business</button>
            <button className="mbox exhibitBtn">Exhibitions</button>
            <button className="mbox specialsBtn">Special Events</button>
          </div>
        </div> */}
        <br />
        <br />
        <div className="mondr1">
          <ul>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
        {/*  <ul>
            <li>Art</li>
            <li>Theater</li>
            <li>Festivals</li>
            <li>WWS</li>
            <li>History</li>
            <li className="musicBtn">
              Live Music
              <div className="lbox classicalBtn">Classical</div>
              <div className="lbox jazzBtn">Jazz</div>
              <div className="lbox folkBtn">Folk</div>
            </li>
            <li>Sports</li>
            <li>Business</li>
            <li>Literati</li>
            <li>Exhibits</li>
            <li>Special Events</li>
          </ul> */}

        <br />
        <br />

        {/*  <div className="shape2-outer">
          <div className="shapeContainer">
            <div className="gbox artB">Art</div>
            <div className="gbox theaterB">Theater</div>
            <div className="gbox festivalsB">Festivals</div>
            <div className="gbox livemusicB">Live Music</div>
            <div className="gbox classicalB">Classical</div>
            <div className="gbox jazzB">Jazz</div>
            <div className="gbox folkB">Folk</div>
            <div className="gbox wwsB">WWS</div>
            <div className="gbox historyB">History</div>
            <div className="gbox lecturesB">Lectures</div>
            <div className="gbox literatiB">Literati</div>
            <div className="gbox businessB">Business</div>
            <div className="gbox exhibitB">Exhibitions</div>
            <div className="gbox specialsB">Special Events</div>
            <div className="gbox wellnessB">Wellness</div>
            <div className="gbox dancingB">Dancing</div>
          </div>
        </div>
 */}
        <div className="events-control">
          <button
            className="btn"
            onClick={this.allEvents}
            style={{ backgroundColor: '#f14e4e' }}
          >
            All Events
          </button>
          <button
            className="btn"
            onClick={this.musicEvents}
            style={{ backgroundColor: '#9a4ef1' }}
          >
            Music
          </button>
          <button
            className="btn"
            onClick={this.artEvents}
            style={{ backgroundColor: '#f1bb4e' }}
          >
            Art
          </button>
          <button
            className="btn"
            onClick={this.wwsEvents}
            style={{ backgroundColor: '#84f14e' }}
          >
            WWS
          </button>
          <button
            className="btn"
            onClick={this.theaterEvents}
            style={{ backgroundColor: '#4ef18f' }}
          >
            Theater
          </button>
          <button
            className="btn"
            onClick={this.historyEvents}
            style={{ backgroundColor: '#4e9af1' }}
          >
            History
          </button>
          <button
            className="btn"
            onClick={this.exhibitionEvents}
            style={{ backgroundColor: ' #f14ebd' }}
          >
            Exhibitions
          </button>
          <button
            className="btn"
            onClick={this.businessEvents}
            style={{ backgroundColor: '#84f14e' }}
          >
            Business
          </button>
          <button
            className="btn"
            onClick={this.lectureEvents}
            style={{ backgroundColor: '#6219d6' }}
          >
            Lectures
          </button>
        </div>
        <div
          className="text-phrases"
          style={{
            color:
              mycolor[mycolorArr[mycolorArr.indexOf(this.state.group)]] ||
              'white'
          }}
        >
          <h2>
            {' '}
            <p>{this.state.group}</p>
          </h2>
        </div>
        <div>
          {Object.entries(groupedEvents).map(([key, value], i) => {
            return (
              <div key={i}>
                {/* <div
                  className="text-phrase"
                  style={{
                    color:
                      mycolor[
                        mycolorArr[mycolorArr.indexOf(this.state.group)]
                      ] || 'white'
                  }}
                >
                  {this.state.group}
                </div> */}
                {/* <hr /> */}
                <br />
                <br />
                <div className="itemContainer">
                  {value.map((item, j) => (
                    <>
                      <div
                        onClick={
                          () =>
                            this.getModal(item.name, item.description, item.url)
                          //this.openModalHandler()
                        }
                        className="eventItems"
                        key={j}
                        style={{
                          backgroundColor:
                            mycolor[
                              mycolorArr[mycolorArr.indexOf(item.tags)]
                            ] || 'white'
                        }}
                      >
                        {/*  <ModalPopup
                          isOpen={this.state.modalOpen}
                          winner={this.state.eventData}
                          close={() => this.setState({ modalOpen: false })}
                          description={this.state.eventDescription}
                        /> */}
                        {/* <div className="dateColor">{item.date}</div> */}
                        <div>{item.name}</div>
                        <div>
                          {' '}
                          <a href={item.url}>Event link</a>
                        </div>
                        {/* <p className="descriptionFont">{item.description}</p>
                          <hr className="style-one" /> */}
                        {/* <button
                          onClick={() =>
                            this.getModal(item.name, item.description, item.url)
                          }
                        > 
                          Modal
                        </button>*/}
                      </div>
                    </>
                  ))}
                  <Modal
                    show={this.state.showMap}
                    onCancel={this.closeModalHandler}
                    header={this.state.eventName}
                    contentClass="place-item__modal-content"
                    footerClass="place-item__modal-actions"
                    footer={
                      <Button onClick={this.closeModalHandler}>CLOSE</Button>
                    }
                  >
                    <div className="map-container">
                      <h3>{this.state.eventDescription}</h3>
                      <a href={this.state.eventUrl}>Event link</a>
                      <h2>View The Map!</h2>
                    </div>
                  </Modal>
                  {/*  <ModalPopup
                    isOpen={this.state.modalOpen}
                    winner={this.state.eventData}
                    close={() => this.setState({ modalOpen: false })}
                    description={this.state.eventDescription}
                  /> */}
                </div>
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

export default PtonEventsVII;
