import Taro, { PureComponent } from '@tarojs/taro';
import { View } from '@tarojs/components';

import './index.scss';

interface IProps {
  disabled: boolean,
  useButtonSlot: boolean,
  activeColor: string,
  inactiveColor: string,
  max: number,
  min: number,
  step: number,
  value: number,
  barHeight: string
}

export default class MySlider extends PureComponent<IProps, S> {

  state = {
    barStyle: ''
  }

  static defaultProps = {
    disabled: false,
    useButtonSlot: true,
    activeColor: '#69f',
    inactiveColor: '#eee',
    max: 100,
    min: 0,
    step: 1,
    value: 20,
    barHeight: '6px'
  }

  componentDidMount() {
    this.updateValue(this.props.value, false);
  }

  onClick = (event): void => {
    if (this.props.disabled) return;

    this.getRect(rect => {
      const value = (event.detail.x - rect.left) / rect.width * 100;
      this.updateValue(value, true);
    });
  }

  onTouchStart = (event): void => {
    if (this.props.disabled) return;
    console.warn('ontouch-start');
    
    this.touchStart(event);
    this.startValue = this.formatValue(this.props.value);
  }

  onTouchMove = (event): void => {
    if (this.props.disabled) return;
    console.warn('ontouch-move');

    this.touchMove(event);
    this.getRect(rect => {
      const diff = this.deltaX / rect.width * 100;
      this.newValue = this.startValue + diff;
      this.updateValue(this.newValue, false, true);
    });
  }

  onTouchEnd = (): void => {
    if (this.props.disabled) return;
    console.warn('ontouch-end');

    this.updateValue(this.newValue, true);
  }

  touchStart(event) {
    const touch = event.touches[0];
    this.direction = '';
    this.deltaX = 0;
    this.deltaY = 0;
    this.offsetX = 0;
    this.offsetY = 0;
    this.startX = touch.clientX;
    this.startY = touch.clientY;
  }

  touchMove(event) {
    const touch = event.touches[0];
    this.deltaX = touch.clientX - this.startX;
    this.deltaY = touch.clientY - this.startY;
    this.offsetX = Math.abs(this.deltaX);
    this.offsetY = Math.abs(this.deltaY);
    this.direction =
      this.offsetX > this.offsetY
        ? 'horizontal'
        : this.offsetX < this.offsetY
          ? 'vertical'
          : '';
  }


  getRect(next) {
    Taro.createSelectorQuery()
      .in(this.$scope)
      .select('.van-slider')
      .boundingClientRect(res => {
        next(res);
      })
      .exec();
  }

  updateValue(value: number, end: boolean, drag?: boolean): void {
    value = this.formatValue(value);

    this.setState({
      value,
      barStyle: `width: ${value}%; height: ${this.props.barHeight};`
    });

    if (drag) {
      this.props.onDrag(value);
    }

    if (end) {
      this.props.onChange(value);
    }
  }

  formatValue(value: number): number {
    const { max, min, step } = this.props;
    return Math.round(Math.max(min, Math.min(value, max)) / step) * step;
  }

  render() {
    const useButtonSlot = true;
    const { barStyle } = this.state;
    
    return (
      <View 
        className='custom-class van-slider' 
        onClick={this.onClick}
        style={{background: '#eee'}}
      >
        <View 
          className='van-slider__bar'
          style={barStyle}
        >
          <View 
            className='van-slider__button-wrapper'
            onTouchStart={this.onTouchStart}
            onTouchMove={this.onTouchMove}
            onTouchEnd={this.onTouchEnd}
            onTouchCancel={this.onTouchEnd}
          >
            {useButtonSlot ? (
              // TODO
              <View className='custom-button'>
                50
              </View>
            ) : (
              <View className='van-slider__button' />
            )}
          </View>
        </View>
      </View>
    )
  }
}