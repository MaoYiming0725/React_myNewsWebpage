import React from 'react';
import {Row, Col} from 'antd';
import {Tabs, Carousel} from 'antd';
import PCNewsBlock from './pc_news_block';
import PCNewsImageBlock from './pc_news_image_block';

const TabPane = Tabs.TabPane;
export default class PCNewsContainer extends React.Component {
  render(){
    return (
      <div>
        <Row>
          <Col span='2'></Col>
          <Col span='20' class='container'>
            <div class='leftContainer clearfix'>
              <div class='carousel'>
                <Carousel autoplay>
                  <img src='./src/images/carousel_1.jpg' />
                  <img src='./src/images/carousel_2.jpg' />
                  <img src='./src/images/carousel_3.jpg' />
                  <img src='./src/images/carousel_4.jpg' />
                </Carousel>
              </div>
              <PCNewsImageBlock type='guoji' count={6} cardTitle='国际头条' width='400px' imgWidth='132px'/>
            </div>
            <Tabs class='tabs_news'>
              <TabPane tab='头条' key='1'>
                <PCNewsBlock type='top' count={20} width='100%' bordered='false' />
              </TabPane>
              <TabPane tab='国际' key='2'>
                <PCNewsBlock type='guoji' count={2} />
              </TabPane>
            </Tabs>
            <div>
              <PCNewsImageBlock type='guonei' count={7} cardTitle='国内新闻' width='100%' imgWidth='132px' bordered='false' />
              <PCNewsImageBlock type='yule' count={7} cardTitle='娱乐新闻' width='100%' imgWidth='132px' bordered='false' />
            </div>
          </Col>
          <Col span='2'></Col>
        </Row>
      </div>
    );
  };


}
