import React from 'react';
import {Route, Router, Link, browserHistory} from 'react-router';
import {Card} from 'antd';

export default class PCNewsImageBlock extends React.Component {
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
  }

  render() {
      const imgStyle = {
        display:'block',
        width:this.props.imgWidth,
        height:'90px',
      };
      const h3Style = {
        width:this.props.imgWidth,
        whiteSpace:'nowrap',
        overflow:'hidden',
        textOverflow: 'ellipsis',
      };
      const authorStyle = {
        width:this.props.imgWidth,
        whiteSpace:'nowrap',
        overflow:'hidden',
        textOverflow: 'ellipsis',
      };    
      const news = this.state.news;
      const newsList = news.length ?
        news.map((newsItem, index) => (
          <div key={index} class='newsItem'>
            <div class='custom_image'>
              <img src={newsItem.thumbnail_pic_s} style={imgStyle} />
            </div>
            <div class='custom_card'>
              <h3 style={h3Style}>{newsItem.title}</h3>
              <div style={authorStyle}>{newsItem.author_name}</div>
            </div>
          </div>
        )) :
        '没有加载到任何新闻';
      return (
        <div class='topNewsList'>
          <Card title={this.props.cardTitle}>
            <ul>
              {newsList}
            </ul>
          </Card>
        </div>
      );
  };
}
