import React from 'react';
import MobileHeader from './mobile_header';
import MobileFooter from './mobile_footer';
import {Row, Col} from 'antd';
import { Menu,
         Icon,
         Tabs,
         message,
         Form,
         Input,
         Button,
         CheckBox,
         Modal,
         Upload,
         Card
} from 'antd';
const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;
const TabPane = Tabs.TabPane;
const MenuItemGroup = Menu.ItemGroup;

export default class MobileUserCenter extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      userCollection: '',
      userComments: '',
      previewImage: '',
      previewVisible: false,
    };
  }
  componentWillMount(){
    document.title = "个人中心 - React News | React 新闻平台";
  }

  componentDidMount(){
    const myFetchOptions = {
      method: 'GET'
    };
    fetch('http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid=' + localStorage.userid, myFetchOptions)
    .then(response => response.json())
    .then(json => this.setState({userCollection: json}));

    fetch('http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid=' + localStorage.userid, myFetchOptions)
    .then(response => response.json())
    .then(json => this.setState({userComments: json}));
  }

  handleCancle() {
    this.setState({previewVisible: false});
  }

  render() {
    const props = {
      action: 'http://newsapi.gugujiankong.com/Handler.ashx',
      header: {
        "Allow-Control-Allow-Origin": "*"
      },
      listType: 'picture-card',
      defaultFileList: [{
        uid: -1,
        name: 'xxx.png',
        status: 'done',
        url: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png'
      }],
      onPreview: (file) => {
        this.setState({
          previewImage: file.url,
          previewVisible:true
        });
      },
    };

    const {userCollection, userComments} = this.state;
    const userCollectionList = userCollection.length
    ? userCollection.map((uc, index) => (
      <Card key={index} title={uc.uniquekey} extra={<a href={`/#/detail/${uc.uniquekey}`}>查看</a>}>
        {uc.Title}
      </Card>
    ))
    : '没有任何已收藏的文章';

    const userCommentsList = userComments.length
    ? userComments.map((comment, index) => (
      <Card key={index} title={`您于 ${comment.datetime} 评论了文章`} extra={<a href={`/#/detail/${comment.uniquekey}`}>查看</a>}>
        {comment.Comments}
      </Card>
    ))
    : '没有任何评论';

    return (
      <div class='MobileUserCenter'>
        <MobileHeader></MobileHeader>
        <Row>
          <Col span={24}>
            <Tabs>
              <TabPane tab="我的收藏列表" key="1">
                <Row>
                  <Col span={24}>
                    {userCollectionList}
                  </Col>
                </Row>
              </TabPane>
              <TabPane tab="我的评论列表" key="2">
                <Row>
                  <Col span={24}>
                    {userCommentsList}
                  </Col>
                </Row>
              </TabPane>
              <TabPane tab="头像设置" key="3">
                <Upload {...props}>
                  <div>
                    <Icon type='plus'/>
                    <div>上传头像</div>
                  </div>
                </Upload>
                <Modal className='mobilePortraitSetting' visible={this.state.previewVisible} title='预览' onCancel={this.handleCancle.bind(this)} onOk={this.handleCancle.bind(this)}>
                  <img src={this.state.previewImage} alt='预览'/>
                </Modal>
              </TabPane>
            </Tabs>
          </Col>
        </Row>
        <MobileFooter></MobileFooter>
      </div>
    );
  }
}
