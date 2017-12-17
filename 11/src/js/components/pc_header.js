import React from 'react';
import {Row, Col} from 'antd';
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

class PCHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current : 'top',
      modalVisible : false,
      hasLogedIn: false,
      userNickName: '',
      userId: 0,
      action: 'login',
    };
  };

  componentWillMount(){
    if(localStorage.username != ''){
      this.setState({hasLogedIn: true});
      this.setState({userNickName: localStorage.username, userId: localStorage.userid});

    }
  }

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
        localStorage.username = username;
        localStorage.userId = userid;

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

  logout(){
    localStorage.username = '';
    localStorage.userId = 0;
    this.setState({hasLogedIn: false});
  }

  render() {
    let {getFieldDecorator} = this.props.form;
    const userShow = this.state.hasLogedIn ?
      <Menu.Item key='logout'>
        <Button type="primary" htmlType='button'>{this.state.userNickName}</Button>
        &nbsp;&nbsp;
        <Link to={`/usercenter`} className='centerButton'>
          <Button type="dashed" htmlType='button'>个人中心</Button>
        </Link>
        &nbsp;&nbsp;
        <Button ghost htmlType='button' onClick = {() => {this.logout()}}>退出</Button>
      </Menu.Item> :
      <Menu.Item key='register'>
        <Icon type='appstore' />注册/登录
      </Menu.Item>;

    return (
      <header class='PCHeader'>
        <Row>
          <Col span={2}></Col>
          <Col span={4}>
            <a href='/' class='logo'>
              <img src='./src/images/logo.png' alt='logo' />
              <span>ReactNews</span>
            </a>
          </Col>
          <Col span={16}>
            <Menu mode='horizontal' selectedKeys={[this.state.current]} onClick={this.handleClick.bind(this)}>
              <Menu.Item key='top'><Icon type='appstore' />头条</Menu.Item>
              <Menu.Item key='shehui'><Icon type='appstore' />社会</Menu.Item>
              <Menu.Item key='guonei'><Icon type='appstore' />国内</Menu.Item>
              <Menu.Item key='yule'><Icon type='appstore' />娱乐</Menu.Item>
              <Menu.Item key='tiyu'><Icon type='appstore' />体育</Menu.Item>
              <Menu.Item key='keji'><Icon type='appstore' />科技</Menu.Item>
              <Menu.Item key='shishang'><Icon type='appstore' />时尚</Menu.Item>
              {userShow}
            </Menu>
            <Modal title='用户中心' wrapClassName='vertical-center-modal' visible={this.state.modalVisible} onOk={() => this.setModalVisible(false)} onCancel={() => this.setModalVisible(false)} okText='关闭'>
              <Tabs type='card' onChange = {this.callback.bind(this)}>
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
          </Col>
          <Col span={2}></Col>
        </Row>
      </header>
    );

  };

}

export default PCHeader = Form.create()(PCHeader);
