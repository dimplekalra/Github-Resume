import React from 'react';
import {Row , Col} from 'react-bootstrap';

const LanguageList = (props) => {
  if (props.langslist) {
    {
      var totalcount =  Object.entries(props.langslist).map(([key,eachitem]) =>
        (eachitem.count)).reduce((pv, cv) => pv+cv, 0 ) }
    return (
        <Row> 
          {
            Object.entries(props.langslist).map(([key,eachitem]) =>
              <Col md={3} sm={6} xs={6} col={6} key={key}>
                <p>
                {eachitem.lang} - {Math.round(100*eachitem.count / totalcount)}%</p>
              </Col> ) }
        </Row>
      )
  } else { return null;}
  };

export default LanguageList;
