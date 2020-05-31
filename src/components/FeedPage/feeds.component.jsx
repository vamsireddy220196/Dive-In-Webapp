/* eslint-disable no-unused-expressions */
import React, { useState, useReducer, Fragment, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import {
  Row, Label, Input, Container,
  Button, Col, Dropdown, DropdownToggle,
  DropdownMenu, DropdownItem
} from 'reactstrap';
import { Link } from 'react-router-dom';
import {
  useHistory,
  useLocation
} from "react-router-dom";
import './feed.css';
import axios from 'axios';
import * as _ from 'lodash';


export default function FeedsPage() {
  let history = useHistory();
  const [availableTopics, updateAvailableTopics] = useState([]);
  const [currentTopic, updateCurrentTopic] = useState({});
  const [availableArticles, updateAvailableArticles] = useState([]);
  const [currentArticle, updateCurrentArticle] = useState({});
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // const [newSelectedTopics, updateNewSelectedTopics] = useState([])

  const toggleDropdown = () => setIsDropdownOpen(prevState => !prevState);

  async function getAvailableTopicsAsync() {
    await getTopics();
  }
  async function getAvailableArticlesAsync() {
    await getArticles();
  }
  useEffect(() => {
    getAvailableTopicsAsync();
  }, [])
  useEffect(() => {
    getAvailableArticlesAsync();
  }, currentTopic)
  const user = JSON.parse(sessionStorage.getItem('user'))

  async function getTopics() {
    try {
      const response = await axios.get
        (`https://xandar.pinnium.in/api/dive-in/categories?userId=${user.userId}`);
      console.log(response);
      if (response.data.success) {
        debugger
        const topics = response.data.result;
        topics.push({
          _id: 'all',
          name: 'All'
        })
        const userSelectedTopics = []
        updateAvailableTopics(topics);
        updateCurrentTopic(topics[0])
      }
    } catch (error) {
      console.error(error);
    }
  }
  async function getArticles() {
    try {
      let url = `https://xandar.pinnium.in/api/dive-in/categories?userId=${user.userId}`;
      if (currentTopic && currentTopic._id != 'all') {
        url = `url&categoryId=${currentTopic._id}`;
      }
      const response = await axios.get(url);
      console.log(response);
      if (response.data.success) {
        debugger
        const articles = response.data.result;
        const currentArticle = articles[0];
        updateAvailableArticles(articles);
        updateCurrentArticle(currentArticle)
      }
    } catch (error) {
      console.error(error);
    }
  }
  // const saveSelectedTopics = () => {
  //   const categoryIds = _.map((selectedTopics), topic => topic._id)
  //   axios({
  //     method: 'post',
  //     url: 'https://xandar.pinnium.in/api/dive-in/categories/set',
  //     data: {
  //       userId: user.userId,
  //       categoryIds
  //     }
  //   }).then((resp) => {
  //     console.log(resp)
  //   }).catch((ex) => {

  //   });
  // }

  // const addSelectedTopic = (topic) => {
  //   debugger;
  //   // const newlySelectedTopics = [...selectedTopics];
  //   // newlySelectedTopics.push(topic);
  //   updateSelectedTopics({
  //     type: "add",
  //     payload: {
  //       topic: topic
  //     }
  //   });
  // }
  // const removeSelectedTopic = (topic) => {
  //   debugger;
  //   // const newlySelectedTopics = [...selectedTopics];
  //   // _.remove(newlySelectedTopics, (selectedTopic) => selectedTopic.id === topic.id);
  //   updateSelectedTopics({
  //     type: "remove",
  //     payload: {
  //       topic: topic
  //     }
  //   });
  // }
  return (
    <Fragment>
      <div>
        <div className='logo'></div>
        <div className='body'>
          <div className='feed-body'>
            <Container>
              <h4>Diving Into:
                <Dropdown isOpen={isDropdownOpen} toggle={toggleDropdown}>
                  <DropdownToggle caret>
                    {currentTopic.label}
                  </DropdownToggle>
                  <DropdownMenu>
                    {
                      _.map((availableTopics, (topic) => {
                        return (
                          <DropdownItem active={topic._id === currentTopic._id} onClick={() => updateCurrentTopic(topic)}>
                            {topic.name}
                          </DropdownItem>
                        );
                      }))
                    }
                  </DropdownMenu>
                </Dropdown>
                <button onClick={() => history.push('/topics')}>
                  <FontAwesomeIcon icon={faPlusCircle} />
                </button>
              </h4>
              <br />
              <Row>
                <Col xs={1}>
                  <FontAwesomeIcon icon={faChevronLeft} />
                </Col>
                <Col className='topic-wrapper' xs={10}>
                  Show topic here
                </Col>
                <Col xs={1}>
                  <FontAwesomeIcon icon={faChevronRight} />
                </Col>
              </Row>
              <Row>
                <Col xs={12}>
                  <button className='btn btn-success next-btn' onClick={() => { }}>Suggest an Article</button>
                </Col>
              </Row>
            </Container>

          </div>
        </div>
      </div >
    </Fragment >
  )
}