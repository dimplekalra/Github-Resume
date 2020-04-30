import React from 'react';
import Moment from 'react-moment';
import { Row, Col, Panel } from 'react-bootstrap';


const SortedList = (props) => {
    if (props.repitems) {
      return (
          <div>
            {props.repitems.map((repitem, index) =>
                <Panel bsStyle="info" key={repitem.id}>
                  <Panel.Heading>
                      <Row className="show-grid">
                        <Col className="col-8" xs={12} md={9} sm={8}>
                          <Panel.Title componentClass="h5">
                          <a href={repitem.html_url} target="_blank">{repitem.name}</a>
                          </Panel.Title>
                        </Col>
                        <Col className="col-4" xs={12} md={3} sm={4}>
                          <p className="Repo-start-date">
                           <Moment format='YYYY' from={new Date()}>{repitem.created_at}</Moment> - 
                            <Moment format="YYYY" from={new Date()}>{repitem.pushed_at}</Moment></p>
                        </Col>
                      </Row>
  
                  </Panel.Heading>
                  <Panel.Body>
                    <div>
                      <p className="Repo-languages">{repitem.language} </p>
                    </div>
                    <div className="Repo-Description">
                      <p>Description: </p>
                      <p>This repository has {repitem.watchers_count} stars and {repitem.forks_count} forks. If you would like more information about this repository and my contributed code, please visit <a href={repitem.html_url}>the repo</a> on GitHub. </p>
                    </div>
                  </Panel.Body>
                </Panel>
            )}
          </div>
        )
    } else { return null;}
    };
  
  export default SortedList;
  