import React, { Component } from 'react';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';
import Fecth from '../../utils/fetch.js';
import {observer} from 'mobx-react';
import store from './registStore.js';
import {Helmet} from "react-helmet";
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;

const residences = store.residences;


@observer class CaptchaButton extends Component{
  render(){
    let {timer} = store;
    return (
        <span>
          <Button size="large" onClick={()=>{
            store.getCaptcha();
          }} >{timer!==0?`${timer}秒后重新发送`:"获取验证码"}</Button>
        </span>
      )
  }
}

@observer class WebSite extends Component{

  render(){
    const websiteOptions = store.autoCompleteResult.map(website => (
      <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    ));
    return (
        <AutoComplete
          dataSource={websiteOptions}
          onChange={this.handleWebsiteChange}
          placeholder="website"
        >
          <Input />
        </AutoComplete>
      )
  }
   handleWebsiteChange (value){
    store.webSiteAutoComplete(value);
    store.website=value;
  }

}


class RegistrationForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        values.website=store.website;
        console.log('Received values of form: ', values);
        let retVal={message:'注册成功'}
        Fecth.post('regist',retVal).then((result)=>{
          window.location.href="/";
        })
      }
    });
  }
  handleConfirmBlur = (e) => {
    const value = e.target.value;
    store.changeConfirmDirty(value);
  }
  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('两次输入的密码不一致!');
    } else {
      callback();
    }
  }
  checkConfirm = (rule, value, callback) => {
    const form = this.props.form;
    if (value && store.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }
  checkUser = (rule, value, callback) => {
    if(value){
      let retVal=value==='songyunze'?{exist:true}:{exist:false};
      Fecth.post('userExist',{userName:value},retVal).then((result)=>{
        if(result.exist){
          callback("用户名已经被占用，请换一个用户名！");
        }else{
          callback();
        }
      })
    }else{
      callback();
    }
  }

  checkCaptcha = (rule, value, callback) => {
    if(!store.captcha){
      callback("请先获取验证码！");
      return;
    }

    if(value.length>=6&&value!==store.captcha){
      callback("您输入的验证码有误！");
      return;
    }
    callback();
   
  }

  checkWebsite(rule, value, callback){
    if(!store.website){
      callback('个人网址不能为空！')
    }else{
      callback();
    }
  }


  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 14,
          offset: 6,
        },
      },
    };
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86',
    })(
      <Select style={{ width: 60 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    );

     

    return (
      <Form onSubmit={this.handleSubmit}>

        <FormItem
          {...formItemLayout}
          label="用户名"
          hasFeedback
        >
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: '用户名不能为空!' }, {
              validator: this.checkUser,
            }],
            initialValue:store.userName
          })(
            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="用户名" />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="电子邮箱"
          hasFeedback
        >
          {getFieldDecorator('email', {
            rules: [{
              type: 'email', message: '不是有效的电子邮箱！',
            }, {
              required: true, message: '请输入您的电子邮箱！',
            }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="密码"
          hasFeedback
        >
          {getFieldDecorator('password', {
            rules: [{
              required: true, message: '请输入您的密码!',
            }, {
              validator: this.checkConfirm,
            }],
          })(
            <Input type="password" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="确认密码"
          hasFeedback
        >
          {getFieldDecorator('confirm', {
            rules: [{
              required: true, message: '请确认您的密码!',
            }, {
              validator: this.checkPassword,
            }],
          })(
            <Input type="password" onBlur={this.handleConfirmBlur} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={(
            <span>
              昵称&nbsp;
              <Tooltip title="您的昵称是?">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          )}
          hasFeedback
        >
          {getFieldDecorator('nickname', {
            rules: [{ required: true, message: '请输入您的昵称!', whitespace: true }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="注册地"
        >
          {getFieldDecorator('residence', {
            initialValue: ['zhejiang', 'hangzhou', 'xihu'],
            rules: [{ type: 'array', required: true, message: '请确认您的地址!' }],
          })(
            <Cascader options={residences} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="电话号码"
        >
          {getFieldDecorator('phone', {
            rules: [{ required: true, message: '请输入您的电话号码!' }],
          })(
            <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="个人网址"
        >
          {getFieldDecorator('website', {
            rules: [{ validator:this.checkWebsite }],
          })(
            <WebSite/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="验证码"
          extra="请输入验证码确认是本人操作."
        >
          <Row gutter={8}>
            <Col span={12}>
              {getFieldDecorator('captcha', {
                rules: [{ required: true, message: '请输入您获得的验证码!' },{validator:this.checkCaptcha}],
              })(
                <Input size="large" />
              )}
            </Col>
            <Col span={12}>
              <CaptchaButton />
            </Col>
          </Row>
        </FormItem>
        <FormItem {...tailFormItemLayout} style={{ marginBottom: 8 }}>
          {getFieldDecorator('agreement', {
            valuePropName: 'checked',
          })(
            <Checkbox>我已经阅读并同意 <a href="">注册须知</a></Checkbox>
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">注册</Button>
        </FormItem>
      </Form>
    );
  }
}

class Regist extends Component {
  render(){
    return (<div>
          <Helmet>
						<title>注册</title>
						<meta name="description" content="React mobx project" />
					</Helmet>
        <div style={{height:window.innerHeight,overflow:'hidden'}} > 
          <img style={{width:'100%'}}  src={require('../../imgs/SoftBlue.jpg')} alt="" />
        </div>

        <div style={{position:'fixed',width:'50%',left:'25%',top:80}} >
            <RegistForm/>
          </div>
        </div>
        )
    }
  componentWillMount(){
    store.userName=window.history.state?window.history.state.state.userName:'';
  }
}


const RegistForm = Form.create()(RegistrationForm);

export default Regist;