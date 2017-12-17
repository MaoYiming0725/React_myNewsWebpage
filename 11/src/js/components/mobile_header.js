import React from 'react';
import { Menu,
         Icon,
         Tabs,
         message,
         Form,
         Input,
         Button,
         CheckBox,
         Modal
} from 'antd';
import {HashRouter as Router, Route, hashHistory, Link} from 'react-router-dom';
const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;
const TabPane = Tabs.TabPane;
const MenuItemGroup = Menu.ItemGroup;

class MobileHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current : 'top',
      modalVisible : false,
      hasLogedIn: false,
      userNickName: 'mym',
      userId: 0,
      action: 'login',
    };

  };

  setModalVisible(value){
    this.setState({modalVisible:value});
  }

  handleClick(e){
    this.setState({current: e.key});
    if(e.key === 'register'){
      this.setModalVisible(true);
    }
  }

  handleSubmit(e){
    e.preventDefault();
    var myFetchOptions = {
      method: 'GET',
    };
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const username = values.r_userName;
        const userid = 1;
        console.log('Received values of form: ', values);
        this.setState({userNickName: username, userId: userid});

        message.success('请求成功！');
        this.setModalVisible(false);
        if(this.state.action === 'login'){
          this.setState({hasLogedIn: true});
        }
      }else{
          //处理错误
      }
    });

  }

  callback(key){
    if(key == '1'){
      this.setState({action: 'login'});
    }else if(key == '2'){
      this.setState({action: 'register'});
    }
  }

  login(){
    this.setModalVisible(true);
  }

  render() {
    let {getFieldDecorator} = this.props.form;
    const userShow = this.state.hasLogedIn ?
      <Link to={`/usercenter`}>
        <Icon type="inbox" />
      </Link> :
      <Icon type="setting" onClick={() => this.login()} />
    return (
      <div id='mobileheader'>
        <header>
          <img src='./src/images/logo.png' alt='logo' />
          <span>ReactNews</span>
          {userShow}
        </header>
        <Modal title='用户中心' wrapClassName='vertical-center-modal' visible={this.state.modalVisible} onOk={() => this.setModalVisible(false)} onCancel={() => this.setModalVisible(false)} okText='关闭'>
          <Tabs type='card' onChange={(key) => {this.callback(key)}}>
            <TabPane tab="登录" key="1">
              <Form layout="horizontal" onSubmit={this.handleSubmit.bind(this)}>
                <FormItem label="账户">
                  {getFieldDecorator('r_userName')(
                    <Input placeholder="请输入您的账户"/>
                  )}
                </FormItem>
                <FormItem label="密码">
                  {getFieldDecorator('r_password')(
                    <Input type="password" placeholder="请输入您的密码"/>
                  )}
                </FormItem>
                <Button type="primary" htmlType="submit">登录</Button>
              </Form>
            </TabPane>
            <TabPane tab="注册" key="2">
              <Form layout="horizontal" onSubmit={this.handleSubmit.bind(this)}>
                <FormItem label="账户">
                  {getFieldDecorator('r_userName')(
                    <Input placeholder="请输入您的账户"/>
                  )}
                </FormItem>
                <FormItem label="密码">
                  {getFieldDecorator('r_password')(
                    <Input type="password" placeholder="请输入您的密码"/>
                  )}
                </FormItem>
                <FormItem label="确认密码">
                  {getFieldDecorator('r_confirmPassword')(
                    <Input type="password" placeholder="请再次输入你的密码"/>
                  )}
                </FormItem>
                <Button type="primary" htmlType="submit">注册</Button>
              </Form>
            </TabPane>
          </Tabs>
        </Modal>
      </div>

    );

  };

}
export default MobileHeader = Form.create()(MobileHeader);
