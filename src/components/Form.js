import React from 'react';
import { Row, Col} from 'react-bootstrap';



const Form = (props) => {
  return (
    <Row className="show-grid">
      <Col lg={12} xs={12} sm={12} md={12} className="text-center">
          <div className="Form-section">
            <form onSubmit={(event) => props.handleUserFormSubmit(event)}>
                <p className="">Github Username</p>
                <div className="Input-box">
                  <label>
                    <input
                      className="form-control"
                      name="username"
                      type="text"
                      placeholder="Enter Github User"
                      required
                      value={props.formData.username}
                      onChange={props.handleFormChange}
                    />
                  </label>
                  <span className="Search-button">
                    <input type="submit" value="Generieren" className="btn" />
                  </span>
                </div>  
                
                  
            </form>
          </div>
       </Col> 
    </Row>
  )};

export default Form;
