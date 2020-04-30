import React, {Component} from 'react';
import './App.css';
import axios from 'axios';
import logo from './logo.png';
import Form from './components/Form.js';
import SortedList from './components/SortedList.js';
import ProfileDetails from './components/ProfileDetails.js';
import LanguageList from './components/LanguageList.js';
import RepoStats from './components/RepoStats.js';
import Keywords from './components/Keywords.js';

import footer from './footer-small.png';

import lda from './lda';

import { Alert} from 'react-bootstrap';

import { Row, Col} from 'react-bootstrap';



class App extends Component{
  constructor(){
    super();
    this.state = {
      gitun : 'No username',
      infoclean : '',
      info : null,
      formData : {
        username : '',
      },
      repitems : null,
      staritems : null,
      replanguagecount : {},
      keywords : null,
      
    }
    this.handleUserFormSubmit = this.handleUserFormSubmit.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
  }
  
  handleUserFormSubmit(event) {
    event.preventDefault();
    axios.get('https://api.github.com/users/'+this.state.formData.username)
    .then(response => this.setState({
      gitun: response.data.login,
      infoclean: response.data,
      info : JSON.stringify(response.data, undefined, 2)
    })).catch((err) => { console.log(err); });

    axios.get('https://api.github.com/users/'+this.state.formData.username+'/repos')
    .then(response => {

      this.setState({
        replanguagecount: null
      })

      var itemsWithFalseForks = response.data.filter(item => item.fork === false)

      var sortedItems = itemsWithFalseForks.sort((b,a) => {
        if((a.watchers_count +  a.forks_count) < (b.forks_count + b.watchers_count)){
          return -1
        }else if ((a.watchers_count +  a.forks_count) > (b.forks_count + b.watchers_count)){
          return 1
        }else {
          return 0
        }
      })

      let totalforks = 0;
      let totalwatchers = 0;
      let dictrlc = Object.assign({}, this.state.replanguagecount);
      for (var i = 0; i < itemsWithFalseForks.length; i++) {
          dictrlc[itemsWithFalseForks[i]['language']] = -~ dictrlc[itemsWithFalseForks[i]['language']]
          totalforks = totalforks + itemsWithFalseForks[i]['forks_count']
          totalwatchers = totalwatchers + itemsWithFalseForks[i]['watchers_count']
      }

      let dictrlcclean = [];
      let iterarray = Object.entries(dictrlc)
      for (var n = 0; n < iterarray.length; n++) {
        dictrlcclean.push(
          Object.assign({},
          {lang: iterarray[n][0], count: iterarray[n][1]}))
      }

      var dictrlccleansorted = dictrlcclean.sort((b,a) => {
        if (a.count < b.count) {
          return -1
        }else if (a.count > b.count){
          return 1
        }else {
          return 0
        }
      })

      this.setState({
        repitems: sortedItems.slice(0,10),
        replanguagecount: dictrlccleansorted,
        totalforks: totalforks,
        totalwatchers: totalwatchers
      })

    }).catch((err) => { console.log(err); })

    axios.get('https://api.github.com/users/'+this.state.formData.username+'/starred')
    .then(response => {

      var itemsWithFalseForks = response.data.filter(item => item.fork === false)

      var sortedItems = itemsWithFalseForks.sort((b,a) => {
        if((a.watchers_count +  a.forks_count) < (b.forks_count + b.watchers_count)){
          return -1
        }else if ((a.watchers_count +  a.forks_count) > (b.forks_count + b.watchers_count)){
          return 1
        }else {
          return 0
        }
      })
      
      var documents = []
      for (var i = 0; i < response.data.length; i++) {
          var descr = response.data[i]['description']
          if (descr != null) {
            var newtext = descr.match(/[^.!?]+[.!?]+/g)
            if (newtext != null) {
              documents = documents.concat(newtext)
            }
          }
      }
      var result = lda(documents, 3, 3);
      var keywords = new Set()
      for (var k = 0; k < 3; k++) {
        for (var j = 0; j < 3; j++) {
          keywords = keywords.add(result[k][j]['term']);
        }
      }

      this.setState({
        staritems: sortedItems.slice(0,10),
        keywords: Array.from(keywords)
      })

      // console.log(Array.from(keywords))

    }).catch((err) => { console.log(err); })
  };
  
  handleFormChange(event) {
    const obj = this.state.formData;
    obj[event.target.name] = event.target.value;
    this.setState(obj);
  };

  render(){
    return(
      
        <div className ="App">
          <header className="App-header">
            <img src={logo} class="img-responsive"/>
          </header>

          <div class="container App-body"> 
            <Row>
              <Col md={12}>
                <h1 className="Resume-title">My Github Resume</h1>
              </Col>
            </Row>
            <Form
              formData={this.state.formData}
              handleUserFormSubmit={this.handleUserFormSubmit}
              handleFormChange={this.handleFormChange}
            />
            
            {
            this.state.info != null ? <Row className="show-grid">
              <Col lg={9} xs={12} md={12} sm={12} className="center-block">
                  <ProfileDetails infoclean={this.state.infoclean}/>
                  <div className="User-Languages">
                    <Col xs={12} md={12}>
                      <h4>Languages</h4>
                      <LanguageList langslist={this.state.replanguagecount}/>
                      {/* <RepoStats totalforks={this.state.totalforks}
                      totalwatchers={this.state.totalwatchers}/> */}
                    </Col>
                  </div>
                  <div className="Popular-user-repos">
                    <Col xs={12} md={12} >
                      <h4>Popular Repositories</h4>
                      <SortedList repitems={this.state.staritems}/>
                    </Col>
                  </div>
                </Col>
              </Row>

            
          : <h4 className="text-center"></h4>
         }
         
          </div>
          <footer className="footer">
                <img src={footer} className="img-responsive" />
            </footer>
        </div>
        
      
    );
  }
}
export default App;
