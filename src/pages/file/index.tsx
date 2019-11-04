import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, Slider, Text } from '@tarojs/components'
import { AtSlider } from 'taro-ui';
import { connect } from '@tarojs/redux'
import MySlider from './components/MySlider';

import { add, minus, asyncAdd } from '../../actions/counter'

import './index.scss'

// #region 书写注意
// 
// 目前 typescript 版本还无法在装饰器模式下将 Props 注入到 Taro.Component 中的 props 属性
// 需要显示声明 connect 的参数类型并通过 interface 的方式指定 Taro.Component 子类的 props
// 这样才能完成类型检查和 IDE 的自动提示
// 使用函数模式则无此限制
// ref: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20796
//
// #endregion

type PageStateProps = {
  counter: {
    num: number
  }
}

type PageDispatchProps = {
  add: () => void
  dec: () => void
  asyncAdd: () => any
}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Index {
  props: IProps;
}

@connect(({ counter }) => ({
  counter
}), (dispatch) => ({
  add () {
    dispatch(add())
  },
  dec () {
    dispatch(minus())
  },
  asyncAdd () {
    dispatch(asyncAdd())
  }
}))
class Index extends Component {
    config: Config = {
    navigationBarTitleText: '首页'
  }

  state = {
    imgSrc: ''
  }

  componentWillMount () {
    this.downloadFile();
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  async downloadFile() {
    const res = await Taro.downloadFile({
      url: 'http://attach.bbs.miui.com/forum/201308/11/120728a3237qmw2c1k2y3k.jpg'
    });
    
    Taro.saveFile({
      tempFilePath: res.tempFilePath
    }).then(res => {
      this.setState({ 
        imgSrc: res.savedFilePath
      });
      console.warn(res);
    })
    // const FileSystem = wx.getFileSystemManager();
    Taro.getSavedFileList().then(res => {
      console.warn('res');
      console.warn(res);
    })

  }

  render () {
    return (
      <View className='index'>
        <View>fiel save</View>
        <Image src={this.state.imgSrc} mode='aspectFill' />
        <Text>设置 step</Text>
        <Slider step={1} value={50}/>
        <Text>显示当前 value</Text>
        <Slider step={1} value={50} showValue/>
        <Text>设置最小/最大值</Text>
        <Slider step={1} value={100} showValue min={50} max={200}/>
        <AtSlider step={1} value={50} activeColor='#4285F4' backgroundColor='#BDBDBD' blockColor='#666666' blockSize={20}></AtSlider>
        <MySlider />
      </View>
    )
  }
}

// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion

export default Index as ComponentClass<PageOwnProps, PageState>
