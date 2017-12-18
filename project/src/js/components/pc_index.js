import React from 'react';
import PCHeader from './pc_header';
import PCFooter from './pc_footer';
import PCNewsContainer from './pc_newscontainer';

export default class PCIndex extends React.Component {
  componentWillMount(){
    document.title = "React News | React 新闻平台";
  }
  render() {
    return (
      <div>
        <PCHeader />
        <PCNewsContainer />
        <PCFooter />
      </div>
    );
  };

}
