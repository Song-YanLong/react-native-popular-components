# react-native-popular-components

'...'

## Installation

npm
```sh
npm install react-native-popular-components
```
yarn
```sh
yarn add react-native-popular-components
```


## Usage

```js
import { multiply } from 'react-native-popular-components';

// ...计算乘法

const result = await multiply(3, 7);
```

```js
import { createStyle } from 'react-native-popular-components';

// ...样式

const style = createStyle({
  text: {
    font: 'fontSize fontColor fontWeight',
    padding: 'top right bottom left', //同css 可传1个、2个、3个、4个
    margin: 'top right bottom left', //同css 可传1个、2个、3个、4个
    border_radius: 'top right bottom left', //同css 可传1个、2个、3个、4个
    border: 'borderWidth borderColor borderStyle direction', //第四个参数可选（方向） 默认四周都加边框
  },
});

<Txet style={style.text}>样式<Text>
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
