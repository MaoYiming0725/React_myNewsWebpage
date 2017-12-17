import React from 'react';
import PCHeader from './pc_header';
import PCFooter from './pc_footer';
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
         Upload
} from 'antd';
const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;
const TabPane = Tabs.TabPane;
const MenuItemGroup = Menu.ItemGroup;

export default class PCUserCenter extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      previewImage: '',
      previewVisible: false,
    };
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

    return (
      <div class='PCUserCenter'>
        <PCHeader></PCHeader>
        <Row>
          <Col span={2}></Col>
          <Col span={20}>
            <Tabs>
              <TabPane tab="我的收藏列表" key="1"></TabPane>
              <TabPane tab="我的评论列表" key="2"></TabPane>
              <TabPane tab="头像设置" key="3">
                <Upload {...props}>
                  <div>
                    <Icon type='plus'/>
                    <div>上传头像</div>
                  </div>
                </Upload>
                <Modal className='PCPortraitSetting' visible={this.state.previewVisible} title='预览' onCancel={this.handleCancle.bind(this)} onOk={this.handleCancle.bind(this)}>
                  <img src={this.state.previewImage} alt='预览'/>
                </Modal>
              </TabPane>
            </Tabs>
          </Col>
          <Col span={2}></Col>
        </Row>
        <PCFooter></PCFooter>
      </div>
    );
  }
}
