import React from 'react';
import {HashRoute as Route, Router, Link, hashHistory} from 'react-router-dom';
import {Row, Col} from 'antd';

export default class MobileList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      news: '',
    };
  };

  componentWillMount (){
    const myFetchOptions = {
      method: 'GET',
    }
    fetch('http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=' + this.props.type + '&count=' + this.props.count, myFetchOptions).
    then(response => response.json()).
    then(json => this.setState({news: json}));
    //console.log(this.state.news);
  }

  render() {
      const {news} = this.state;
      const newsList = news.length ?
        news.map((newsItem, index) => (
          <section key={index} class='m_news_block clearfix'>
            <Link to={`/detail/${newsItem.uniquekey}`}>
              <div class='m_img_block'>
                <img src={newsItem.thumbnail_pic_s} alt={newsItem.title} />
              </div>
              <div class='m_info_block'>
                <div class='m_info_title'>
                  <span>{newsItem.title}</span>
                </div>
                <div class='m_info_desc clearfix'>
                  <span class='m_info_type'>{newsItem.realtype}</span>
                  <span class='m_info_date'>{newsItem.date}</span>
                </div>
              </div>
           </Link>
         </section>
        )) :
        '没有加载到任何新闻';
      return (
        <div>
            <Row>
              <Col span={24}>
                {newsList}
              </Col>
            </Row>
        </div>
      );
  };
}
