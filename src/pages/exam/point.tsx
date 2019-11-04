import { PureComponent } from '@tarojs/taro';
import { View } from '@tarojs/components';

import './point.scss';

export default class Point extends PureComponent {

  render() {
    const { active = false } = this.props;
    const boxOuterClass = `box-outer ${active?'active':''}`;
    const boxInnerClass = `box-inner ${active?'active':''}`;

    return (
      <View className='point'>
        <View className={boxOuterClass}>
          <View className={boxInnerClass} />
        </View>
      </View>
    )
  }
}