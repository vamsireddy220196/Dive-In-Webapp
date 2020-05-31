/* eslint-disable no-unused-expressions */
import React, { useState, useReducer, Fragment, useEffect } from 'react';
import { Row, Label, Input, Container, Button, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import {
  useHistory,
  useLocation
} from "react-router-dom";
import './topic-selection-page.css';
import axios from 'axios';
import * as _ from 'lodash';

export default function TopicSelectionPage() {
  const [allTopics, updateAllTopics] = useState([]);
  const [selectedTopics, updateSelectedTopics] = useReducer(
    (selectedTopics, { type, payload }) => {
      switch (type) {
        case "add":
          return [...selectedTopics, payload.topic];
        case "remove":
          return _.filter(selectedTopics, (selectedTopic) => selectedTopic._id !== payload.topic._id);
        case "set_to":
          return payload.topics
        default:
          return selectedTopics;
      }
    }, []);
  // const [newSelectedTopics, updateNewSelectedTopics] = useState([])
  useEffect(() => {
    async function getTopicsAsync() {
      await getTopics();
    }
    getTopicsAsync();
  }, [])
  const user = JSON.parse(sessionStorage.getItem('user'))

  async function getTopics() {
    try {
      const response = await axios.get
        (`https://xandar.pinnium.in/api/dive-in/categories?userId=${user.userId}`);
      console.log(response);
      if (response.data.success) {
        debugger
        const topics = response.data.result;
        const userSelectedTopics = []
        updateAllTopics(topics);
        _.forEach(topics, topic => {
          if (topic.isSelected) userSelectedTopics.push(topic);
        });
        updateSelectedTopics({
          type: "set_to",
          payload: {
            topics: userSelectedTopics
          }
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  const saveSelectedTopics = () => {
    const categoryIds = _.map((selectedTopics), topic => topic._id)
    axios({
      method: 'post',
      url: 'https://xandar.pinnium.in/api/dive-in/categories/set',
      data: {
        userId: user.userId,
        categoryIds
      }
    }).then((resp) => {
      console.log(resp)
    }).catch((ex) => {

    });
  }

  const addSelectedTopic = (topic) => {
    debugger;
    // const newlySelectedTopics = [...selectedTopics];
    // newlySelectedTopics.push(topic);
    updateSelectedTopics({
      type: "add",
      payload: {
        topic: topic
      }
    });
  }
  const removeSelectedTopic = (topic) => {
    debugger;
    // const newlySelectedTopics = [...selectedTopics];
    // _.remove(newlySelectedTopics, (selectedTopic) => selectedTopic.id === topic.id);
    updateSelectedTopics({
      type: "remove",
      payload: {
        topic: topic
      }
    });
  }
  console.log(selectedTopics);
  console.log(allTopics);
  return (
    <Fragment>
      <div>
        <div className='logo'></div>
        <div className='body'>
          <div className='topic-selection-body'>
            <Container>
              <h4>Dive In!</h4>
              <h5>Start Learning Right Away</h5>
              <br />
              <h5>Select Topics</h5>
              {_.map(allTopics, (topic) => {
                return (
                  <Row>
                    <Col className='topic-wrapper' xs={12}>
                      {
                        (_.find(selectedTopics, (selectedTopic) => (selectedTopic._id === topic._id)) !== undefined)?
                          (
                            <div className='selected-topic' onClick={() => removeSelectedTopic(topic)}>
                              <p>
                                {topic.name}
                              </p>
                            </div>
                          ) :
                          (
                            <div className='topic' onClick={() => addSelectedTopic(topic)}>
                              <p>
                                {topic.name}
                              </p>
                            </div>
                          )
                      }
                    </Col>
                  </Row>)
              })}
              <Row>
                <Col xs={12}>
                  <button className='btn btn-success next-btn' onClick={() => saveSelectedTopics()}>Next</button>
                </Col>
              </Row>
            </Container>

          </div>
        </div>
      </div >
    </Fragment >

  )


}