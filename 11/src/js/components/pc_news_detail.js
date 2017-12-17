import React from 'react';
import {Row, Col} from 'antd';
import PCHeader from './pc_header';
import PCFooter from './pc_footer';
import PCNewsImageBlock from './pc_news_image_block';
import CommonComment from './common_comment';

export default class PCNewsDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newsItem: '',
    };
  }

  componentDidMount() {
    const myFetchOptions = {
      method: 'GET'
    };
    fetch('http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey='+this.props.match.params.uniquekey,myFetchOptions)
    .then(response => response.json())
    .then(json => {
      this.setState({newsItem:json});
      document.title = json.title + " - React News | React 驱动的新闻平台";
    });
  }

  createMarkup(){
    //console.log('1');
    //console.log(this.state.newsItem.pagecontent);
    return {__html:this.state.newsItem.pagecontent};
  }

  render() {
    return (
      <div class='PCNewsDetail'>
        <PCHeader></PCHeader>
        <Row>
          <Col span={2}></Col>
          <Col span={14} className='detailContainer'>
            <div class='newsArticle' dangerouslySetInnerHTML={this.createMarkup()} />
            <hr/>
            <CommonComment uniquekey={this.props.match.params.uniquekey} />
          </Col>
          <Col span={6}>
            <PCNewsImageBlock type='top' count={40} cardTitle='相关新闻' width='100%' imgWidth='100px' bordered='false' />
          </Col>
          <Col span={2}></Col>
        </Row>
        <PCFooter></PCFooter>
      </div>
    );
  };
}
