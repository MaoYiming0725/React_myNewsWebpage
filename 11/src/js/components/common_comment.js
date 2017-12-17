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
         Modal,
         Card,
         notification
} from 'antd';
const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;
const TabPane = Tabs.TabPane;
const MenuItemGroup = Menu.ItemGroup;

class CommonComment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: ''
    };
  }

  componentDidMount() {
    const myFetchOptions = {
      method: 'GET'
    };
    fetch('http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey='+ this.props.uniquekey,myFetchOptions)
    .then(response => {
      //console.log(response);
      return response.json();
    })
    .then(json => this.setState({
      comment: json
    }));
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        var script = document.createElement("script");
        script.src = 'http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid=' + localStorage.userId + "&uniquekey=" + this.props.uniquekey + "&commnet=" + values.comment,+ '&callback=handleResponse';
        document.body.appendChild(script);
        //this.componentDidMount();
      }else{
          //处理错误
      }
    });
  }

  addUserCollection(){
    const myFetchOptions = {
      method: 'GET'
    };
    fetch('http://newsapi.gugujiankong.com/Handler.ashx?action=uc&userid=' + localStorage.userId + "&uniquekey=" + this.props.uniquekey,myFetchOptions)
    .then(response => response.json())
    .then(json => {
      notification['success']({message:'ReactNews提醒', description:'收藏此文章成功！'});
    });
  }

  render() {
    let {getFieldDecorator} = this.props.form;
    const {comment} = this.state;
    const commentList = comment.length
    ? comment.map((commentItem, index) => (
      <Card key={index} title={commentItem.UserName} extra={<a href='#'>{commentItem.datetime}</a>}>
        <div class='comment'>
          {commentItem.Comments}
        </div>
      </Card>
    ))
    : '没有任何评论';
    return (
      <div class='commentContainer'>
        <Row>
          <Col span={24}>
            {commentList}
            <Form onSubmit={this.handleSubmit.bind(this)}>
              <FormItem label="您的评论">
                {getFieldDecorator('comment')(
                  <Input type='textarea' placeholder="请输入您的评论" />
                )}
              </FormItem>
              <Button type="primary" htmlType="submit">发表评论</Button>
              &nbsp;&nbsp;
              <Button type="primary" htmlType="button" onClick={this.addUserCollection.bind(this)}>收藏此文章</Button>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}

export default CommonComment = Form.create()(CommonComment);
