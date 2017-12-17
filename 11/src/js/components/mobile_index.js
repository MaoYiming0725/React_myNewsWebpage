import React from 'react';
import MobileHeader from './mobile_header';
import MobileFooter from './mobile_footer';
import MobileList from './mobile_list';
import {Tabs, Carousel} from 'antd';
const TabPane = Tabs.TabPane;


export default class MobileIndex extends React.Component {
  render() {
    return (
      <div>
        <MobileHeader />
        <Tabs>
          <TabPane tab="头条" key="1">
            <div class='carousel'>
              <Carousel autoplay>
                <img src='./src/images/carousel_1.jpg' />
                <img src='./src/images/carousel_2.jpg' />
                <img src='./src/images/carousel_3.jpg' />
                <img src='./src/images/carousel_4.jpg' />
              </Carousel>
            </div>
            <MobileList type='top' count={20} />
          </TabPane>
          <TabPane tab="社会" key="2">
            <MobileList type='top' count={20} />
          </TabPane>
          <TabPane tab="国内" key="3">
            <MobileList type='guonei' count={20} />
          </TabPane>
          <TabPane tab="娱乐" key="4">
            <MobileList type='yule' count={20} />
          </TabPane>
          <TabPane tab="体育" key="5">
            <MobileList type='tiyu' count={20} />
          </TabPane>
          <TabPane tab="科技" key="6">
            <MobileList type='keji' count={20} />
          </TabPane>
        </Tabs>
        <MobileFooter />
      </div>
    );
  };

}
