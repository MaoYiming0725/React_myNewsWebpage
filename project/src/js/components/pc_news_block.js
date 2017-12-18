import React from 'react';
import {HashRouter as Router, Route, hashHistory, Switch, Link} from 'react-router-dom';
import {Card} from 'antd';
import PCNewsDetail from './pc_news_detail';
import PCIndex from './pc_index';

export default class PCNewsBlock extends React.Component {
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
          <li key={index} class='newsTitle'>
            <Link to={`/detail/${newsItem.uniquekey}`} >
    						{newsItem.title}
            </Link>
          </li>
        )) :
        '没有加载到任何新闻';
      return (
        <div class='topNewsList'>
          <Card>
                <ul>
                  {newsList}
                </ul>
          </Card>
        </div>
      );
  };
}
