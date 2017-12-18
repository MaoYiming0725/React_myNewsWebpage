import React from 'react';
import {Row, Col} from 'antd';
import MobileHeader from './mobile_header';
import MobileFooter from './mobile_footer';
import CommonComment from './common_comment';

export default class MobileNewsDetail extends React.Component {
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
      <div class='mobileNewsDetail'>
        <MobileHeader></MobileHeader>
        <Row>
          <Col span={24} className='detailContainer'>
            <div class='newsArticle' dangerouslySetInnerHTML={this.createMarkup()} />
            <hr/>
            <CommonComment uniquekey={this.props.match.params.uniquekey} />
          </Col>
        </Row>
        <MobileFooter></MobileFooter>
      </div>
    );
  };
}
