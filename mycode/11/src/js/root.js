import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router, Route, hashHistory, Link} from 'react-router-dom';
import PCIndex from './components/pc_index';
import PCNewsDetail from './components/pc_news_detail';
import PCUserCenter from './components/pc_usercenter';
import MobileIndex from './components/mobile_index';
import MobileNewsDetail from './components/mobile_news_detail';
import MobileUserCenter from './components/mobile_usercenter';
import 'antd/dist/antd.css';
import MediaQuery from 'react-responsive';

export default class Root extends React.Component{
  render() {
    return (
      <div>
        <MediaQuery query='(min-device-width:1224px)'>
          <Router>
            <div>
                <Route path='/' exact component={PCIndex}></Route>
                <Route path='/detail/:uniquekey' component={PCNewsDetail}></Route>
                <Route path='/usercenter' component={PCUserCenter}></Route>
            </div>
          </Router>
        </MediaQuery>
        <MediaQuery query='(max-device-width:1224px)'>
          <Router>
            <div>
                <Route path='/' exact component={MobileIndex}></Route>
                <Route path='/detail/:uniquekey' component={MobileNewsDetail}></Route>
                <Route path='/usercenter' component={MobileUserCenter}></Route>
            </div>
          </Router>
        </MediaQuery>
      </div>
    );
  };
}
ReactDOM.render(
	<Root/>,
	document.getElementById('mainContainer')
);
