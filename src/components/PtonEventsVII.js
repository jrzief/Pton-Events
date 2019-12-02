import React, { Component } from 'react';
//import events from '../data/events.json';
import * as d3 from 'd3';
import _ from 'lodash';
import chroma from 'chroma-js';
//import d3Scale from 'd3-scale-chromatic';
//import ModalPopup from './ModalPopup';
import Modal from './Modal';
import Button from './Button';
import './events.css';

class PtonEventsVII extends Component {
  state = {
    creating: false,
    events: [],
    shuffledEvents: [],
    filteredEvents: [],
    group: 'All Events',
    groupColor: '',
    color: 'black',
    modalOpen: false,
    eventName: '',
    eventDescription: '',
    eventUrl: '',
    shuffled: true,
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
        events: data,
        shuffledEvents: _.shuffle(data)
      })
    );
    //this.allEvents();
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
    // console.log(this.state.eventData, this.state.eventUrl);
    /*  return (
      <ModalPopup
        isOpen={this.state.modalOpen}
        winner={this.state.eventData}
        close={() => this.setState({ modalOpen: false })}
        description={this.state.eventDescription}
      />
    ); */
  };
  //reshuff = _.shuffle(this.state.events);

  allEvents = async () => {
    const allEvts = _.shuffle(this.state.events);
    this.setState({
      shuffledEvents: allEvts,
      group: 'All Events',
      groupColor: '#567b99',
      color: 'black',
      shuffled: true
    });
    console.log(this.state.shuffledEvents);
  };

  // if (this.state.group === 'All Events') {
  //   // const shuffledevents = _.shuffle(this.state.events);
  //   // console.log('Shuffled', shuffledevents);
  //   eventList = this.state.shuffledEvents;
  // } else {
  //   eventList = this.state.filteredEvents;
  //   //this.setState({ shuffled: false });
  // }
  // if (!eventList) {
  //   console.log('Loading');
  // } else {
  //   console.log('EventList', eventList);
  // }

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
      //group: 'Music Events',
      group: 'Music',
      groupColor: '#d62d24',
      color: 'black',
      shuffled: false
    });
  };
  classicalEvents = () => {
    const classicalEvts = this.state.events.filter(
      classical => classical.tags === 'Classical Music'
    );
    this.setState({
      filteredEvents: classicalEvts,
      group: 'Classical Music',
      groupColor: '#d62d24',
      color: 'black',
      shuffled: false
    });
  };
  jazzEvents = () => {
    const jazzEvts = this.state.events.filter(
      jazz => jazz.tags === 'Jazz and Blues'
    );
    this.setState({
      filteredEvents: jazzEvts,
      group: 'Jazz/Blues',
      groupColor: '#d62d24',
      color: 'black',
      shuffled: false
    });
  };
  folkEvents = () => {
    const folkEvts = this.state.events.filter(
      folk => folk.tags === 'Folk Music'
    );
    this.setState({
      filteredEvents: folkEvts,
      group: 'Folk',
      groupColor: '#d62d24',
      color: 'black',
      shuffled: false
    });
  };
  popEvents = () => {
    const popEvts = this.state.events.filter(pop => pop.tags === 'Pop Music');
    this.setState({
      filteredEvents: popEvts,
      group: 'Pop Music',
      groupColor: '#d62d24',
      color: 'black',
      shuffled: false
    });
  };
  artEvents = () => {
    const artEvts = this.state.events.filter(art => art.tags === 'Art');
    this.setState({
      filteredEvents: artEvts,
      group: 'Art',
      color: 'black',
      groupColor: '#e5eeeb'
    });
  };
  /*  wwsEvents = () => {
    const wwsEvts = this.state.events.filter(
      wws =>
        wws.tags === 'Policy' ||
        wws.tags === 'Finance, Fiscal Policy, Foreign Policy'
    );
    this.setState({
      filteredEvents: wwsEvts,
      group: 'Woodrow Wilson School Events',
      shuffled: false
    });
  }; */
  theaterEvents = () => {
    const theaterEvts = this.state.events.filter(
      theater => theater.tags === 'On Stage'
    );
    this.setState({
      filteredEvents: theaterEvts,
      group: 'Theater',
      groupColor: '#f2c968',
      color: 'black',
      shuffled: false
    });
  };
  lifestyleEvents = () => {
    const lifestyleEvts = this.state.events.filter(
      lifestyle =>
        lifestyle.tags === 'Wellness' ||
        lifestyle.tags === 'Dancing' ||
        lifestyle.tags === 'Socials'
    );
    this.setState({
      filteredEvents: lifestyleEvts,
      group: 'Lifestyle',
      groupColor: '#130409',
      color: 'white',
      shuffled: false
    });
  };
  /*  historyEvents = () => {
    const historyEvts = this.state.events.filter(
      hist => hist.tags === 'History'
    );
    this.setState({
      filteredEvents: historyEvts,
      group: 'History Events',
      shuffled: false
    });
  }; */
  specialEvents = () => {
    const specialEvts = this.state.events.filter(
      special =>
        special.tags === 'Special Events' ||
        special.tags === 'Exhibitions' ||
        special.tages === 'Fairs and Festivals'
    );
    this.setState({
      filteredEvents: specialEvts,
      group: 'Special Events',
      groupColor: '#fcfde7',
      color: 'black',
      shuffled: false
    });
  };
  exhibitionEvents = () => {
    const exhibitionEvts = this.state.events.filter(
      exhib => exhib.tags === 'Exhibitions'
    );
    this.setState({
      filteredEvents: exhibitionEvts,
      group: 'Exhibitions',
      shuffled: false
    });
  };
  businessEvents = () => {
    const businessEvts = this.state.events.filter(
      busi => busi.tags === 'Business Meetings'
    );
    this.setState({
      filteredEvents: businessEvts,
      group: 'Business Events',
      shuffled: false
    });
  };
  lectureEvents = () => {
    const lectureEvts = this.state.events.filter(
      lect =>
        lect.tags === 'Lectures' ||
        lect.tags === 'Policy' ||
        lect.tags === 'Finance, Fiscal Policy, Foreign Policy' ||
        lect.tags === 'History'
    );
    this.setState({
      filteredEvents: lectureEvts,
      group: 'Lectures',
      groupColor: '#241785',
      color: 'white',
      shuffled: false
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
    console.log('Line207', this.state.events);
    console.log('Line208', this.state.shuffledEvents);
    let eventList1, eventList2;
    const { filteredEvents, shuffledEvents } = this.state;
    if (this.state.group === 'All Events') {
      // const shuffledevents = _.shuffle(this.state.events);
      // console.log('Shuffle this.state.shuffledEvents;
      eventList1 = shuffledEvents;
    } else {
      eventList2 = filteredEvents;
      //this.setState({ shuffled: false });
    }
    if (!eventList1) {
      console.log('Loading');
    } else {
      console.log('EventList1', eventList1);
    }

    const groupedEvents = _.groupBy(filteredEvents, 'tags');
    //const shuffEvents = this.state.shuffledEvents;

    const chColor = chroma.brewer.PuBu;
    //const colord3 = d3Scale.scaleOrdinal(d3Scale.schemeCategory20c);

    const scaleLch = chroma
      .scale(['#fafa6e', '#2A4858'])
      .mode('lch')
      .colors(18);

    const myGroupColor = {
      // 'All Events': '#D92AAD',
      Art: '#e5eeeb',
      Theater: '#f2c968',
      Lectures: '#241785',
      Music: '#d62d24',
      'Classical Music': '#d62d24',
      'Jazz/Blues': '#d62d24',
      Folk: '#d62d24',
      'Pop Music': '#d62d24',
      Lifestyle: '#130409',
      'Special Events': '#fcfde7'
    };

    const myCharColor = {
      'All Events': 'rgba(0, 0, 0, 0.897',
      Art: 'rgba(0, 0, 0, 0.897',
      Theater: 'rgba(0, 0, 0, 0.897',
      Lectures: 'white',
      'Classical Music': 'rgba(0, 0, 0, 0.897',
      'Music Events': 'rgba(0, 0, 0, 0.897',
      'Special Events': 'rgba(0, 0, 0, 0.897',
      Lifestyle: 'white'
    };

    const myAllEventsColor = {
      'All Events': 'rgba(0, 0, 0, 0.897',
      Art: 'rgba(0, 0, 0, 0.897',
      Theater: 'rgba(0, 0, 0, 0.897',
      'History Events': 'rgba(0, 0, 0, 0.897',
      'Woodrow Wilson School Events': 'rgba(0, 0, 0, 0.897',
      Lectures: 'rgba(0, 0, 0, 0.897',
      'Classical Music': 'rgba(0, 0, 0, 0.897',
      'Music Events': 'rgba(0, 0, 0, 0.897',
      'Fairs and Festivals': 'rgba(0, 0, 0, 0.897',
      'Special Events': 'rgba(0, 0, 0, 0.897',
      'Business Meetings': 'rgba(0, 0, 0, 0.897',
      Exhibitions: 'rgba(0, 0, 0, 0.897',
      Dancing: 'rgba(0, 0, 0, 0.897',
      Literati: 'rgba(0, 0, 0, 0.897',
      Wellness: 'rgba(0, 0, 0, 0.897',
      Socials: 'white',
      Policy: 'white',
      'Live Music': '#d62d24',
      Sports: 'rgba(0, 0, 0, 0.897',
      Lifestyle: 'white'
    };

    const mycolor = {
      'All Events': '#D92AAD',
      Art: '#e5eeeb',
      Theater: '#f2c968',
      'History Events': '#241785',
      'Woodrow Wilson School Events': '#241785',
      Lectures: '#241785',
      'Classical Music': '#d62d24',
      'Music Events': '#d62d24',
      'Fairs and Festivals': '#fcfde7',
      'Special Events': '#fcfde7',
      'Business Meetings': '#0171C5',
      Exhibitions: '#fcfde7',
      Dancing: '#130409',
      Literati: '#241785',
      Wellness: '#130409',
      Socials: '#130409',
      Policy: '#241785',
      'Live Music': '#d62d24',
      Sports: '#D92AAD',
      Lifestyle: '#130409'
    };
    const myGroupColorArr = Object.keys(myGroupColor);
    const myCharColorArr = Object.keys(myCharColor);
    const mycolorArr = Object.keys(mycolor);
    const myAllEventsColorArr = Object.keys(myAllEventsColor);
    console.log(mycolorArr);
    console.log(this.state.group);
    console.log('Color', mycolorArr.indexOf(this.state.group));
    const myRealColor =
      mycolor[mycolorArr[mycolorArr.indexOf(this.state.group)]];
    console.log('RealColor', myRealColor);
    const getRealColor = () =>
      mycolor[mycolorArr[mycolorArr.indexOf(this.state.group)]] || 'white';
    const getRealGroupColor = () =>
      myGroupColor[
        myGroupColorArr[myGroupColorArr.indexOf(this.state.group)]
      ] || 'white';
    const getRealCharColor = () =>
      myCharColor[myCharColorArr[myCharColorArr.indexOf(this.state.group)]] ||
      'white';
    //const getRealAllEventsColor = () =>
    //  myAllEventsColor[myAllEventsColorArr[myAllEventsColorArr.indexOf(item.tags)]] || 'white';
    console.log(getRealColor());
    console.log(getRealGroupColor());
    console.log(getRealCharColor());

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

        <br />
        <br />
        <div className="mondr1">
          <ul>
            <li className="lbox" onClick={this.artEvents}>
              Art
            </li>
            <li></li>
            <li className="lbox" onClick={this.theaterEvents}>
              Theater
            </li>
            <li>
              <span className="lbox text4" onClick={this.specialEvents}>
                Special Events
              </span>
            </li>
            <li></li>
            <li>
              <div className="allmusic lbox text5" onClick={this.musicEvents}>
                MUSIC
              </div>
              <div className="lbox classical" onClick={this.classicalEvents}>
                Classical
              </div>
              <div className="lbox jazz" onClick={this.jazzEvents}>
                Jazz / Blues
              </div>
              <div className="lbox folk" onClick={this.folkEvents}>
                Folk
              </div>
              <div className="lbox live" onClick={this.popEvents}>
                Pop
              </div>
            </li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li className="lbox" onClick={this.lifestyleEvents}>
              Lifestyle
            </li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li className="lbox" onClick={this.lectureEvents}>
              Lectures
            </li>
            <li className="lbox"></li>
            {/*<li>18</li>
            <li>19</li>
            <li className="lbox">20 Special Events</li> */}
          </ul>
          <div className="allEvents" onClick={this.allEvents}>
            All Events
          </div>
        </div>

        <br />

        {/*  <div className="events-control">
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
        </div> */}
        <div
          className="text-phrases"
          style={{
            backgroundColor: this.state.groupColor || 'white',
            color: this.state.color

            /* mycolor[mycolorArr[mycolorArr.indexOf(this.state.group)]] ||
              'white' */
          }}
        >
          <h2>
            {' '}
            <p>{this.state.group}</p>
          </h2>
        </div>
        <div>
          {this.state.shuffled && (
            /*  (!this.eventList ? (
              <div>Loading</div>
            ) :  */
            <div className="itemContainer">
              {shuffledEvents.map((item, i) => (
                <div
                  className="eventItems"
                  onClick={() =>
                    this.getModal(item.name, item.description, item.url)
                  }
                  key={i}
                  style={{
                    backgroundColor:
                      mycolor[mycolorArr[mycolorArr.indexOf(item.tags)]] ||
                      'white',
                    fontWeight: 500
                  }}
                >
                  <div
                    style={{
                      color:
                        myAllEventsColor[
                          myAllEventsColorArr[
                            myAllEventsColorArr.indexOf(item.tags)
                          ]
                        ] || 'white'
                    }}
                  >
                    {item.name}
                  </div>
                  <div>
                    {' '}
                    <a href={item.url}>Event link</a>
                  </div>
                </div>
              ))}
              <Modal
                show={this.state.showMap}
                onCancel={this.closeModalHandler}
                header={this.state.eventName}
                contentClass="place-item__modal-content"
                footerClass="place-item__modal-actions"
                footer={<Button onClick={this.closeModalHandler}>CLOSE</Button>}
              >
                <div className="map-container">
                  <h3>{this.state.eventDescription}</h3>
                  <a href={this.state.eventUrl}>Event link</a>
                  <h2>View The Map!</h2>
                </div>
              </Modal>
            </div>
          )}
          {!this.state.shuffled &&
            Object.entries(groupedEvents).map(([key, value], i) => {
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
                              this.getModal(
                                item.name,
                                item.description,
                                item.url
                              )
                            //this.openModalHandler()
                          }
                          className="eventItems"
                          key={j}
                          style={{
                            backgroundColor:
                              myGroupColor[
                                myGroupColorArr[
                                  myGroupColorArr.indexOf(this.state.group)
                                ]
                              ] || 'white'
                            /* mycolor[
                                mycolorArr[mycolorArr.indexOf(item.tags)]
                              ] || 'white' */
                          }}
                        >
                          {/*  <ModalPopup
                          isOpen={this.state.modalOpen}
                          winner={this.state.eventData}
                          close={() => this.setState({ modalOpen: false })}
                          description={this.state.eventDescription}
                        /> */}
                          {/* <div className="dateColor">{item.date}</div> */}
                          <div style={{ color: this.state.color }}>
                            {item.name}
                          </div>
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
//}

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
