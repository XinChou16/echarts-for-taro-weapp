import Taro, { Component } from '@tarojs/taro';
import { View, Image, PickerView, PickerViewColumn } from '@tarojs/components';

import Point from './point';
import humanBg from '../../common/image/human.png';
import './index.scss';

export default class Human extends Component {
  state = {
    selector: ['美国', '中国', '巴西', '日本', 'e', 'f', 'g', 'h'],
    years: [2009, 2010, 2011]
  }

  componentDidMount() {
    // Taro.showActionSheet({
    //   itemList: ['a', 'b', 'c', 'd', 'e', 'f']
    // })
  }

  render() {
    return (
      <View className='page'>
        <View className="man">
        {/* <PickerView indicatorStyle='height: 50px;' style='width: 100%; height: 300px;' value={this.state.value}>
          <PickerViewColumn>
            {this.state.years.map(item => {
              return (
                <View key={item}>{item}年</View>
              );
            })}
          </PickerViewColumn>
        </PickerView> */}

          <Image src={humanBg} className='human-bg'/>
          <View className='point left-hand-1'>
            <Point active />
          </View>

          <View className='point left-hand-2'>
            <Point />
          </View>

          <View className='point left-hand-3'>
            <Point active />
          </View>

        </View>
      </View>
    )
  }
}