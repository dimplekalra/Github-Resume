import React from 'react';
import {Row , Col} from 'react-bootstrap';
import Moment from 'react-moment';

const imgStye = {
    borderRadius: "50%",
    width: "250px",
    height: "250px"
  };
  
  
  const ProfileDetails = (props) => {
      return (
            <div className="User-detail">
                <Col xs={12} md={12}>
                  <div className="User-name">
                    {props.infoclean.name ? <h1>{props.infoclean.name}</h1> : null }
                    <h2>A passionate Github User </h2>
                  </div>
                </Col>
                <Col xs={12} md={12}>
                  <div class="User-website">
                    {props.infoclean.blog ? <p><a href={
                      props.infoclean.blog.search("http") !== -1 ? props.infoclean.blog
                      : "http://" +  props.infoclean.blog } target="_blank">{props.infoclean.blog}</a></p> : null }
                  </div>
                </Col>
                <Col xs={12} md={12}>
                  <div className="User-location">
                    {props.infoclean.created_at ? <p>On Github since <Moment format="YYYY">{props.infoclean.created_at}</Moment> , {props.infoclean.name} is a developer based in {props.infoclean.location} with <span>{props.infoclean.public_repos} public repositories </span>and <span>{props.infoclean.followers} followers.</span> </p> : null }
                  </div>
                </Col>
            </div>
      )
    };
  
  export default ProfileDetails;
  