import {
  ImageStyle,
  TextStyle,
  ViewStyle,
  StyleSheet,
  Dimensions,
} from 'react-native';

const DEVICE_WIDTH_DP = Dimensions.get('window').width;
const UI_WIDTH_PX = 375;

/**
 * @description:    dp转换成rem
 * @param {Number}  uiPx 设计稿宽度
 * @return {Number} 计算后的宽度
 */

const rem = (uiPx: any): number => {
  return (uiPx * DEVICE_WIDTH_DP) / UI_WIDTH_PX;
};

const styleType = (prefix: string): string[] => {
  return [`${prefix}Top`, `${prefix}Right`, `${prefix}Bottom`, `${prefix}Left`];
};

const borderRadiusType = (): string[] => {
  return [
    'borderTopLeftRadius',
    'borderTopRightRadius',
    'borderBottomRightRadius',
    'borderBottomLeftRadius',
  ];
};

const fontStyle = (): string[] => {
  return ['fontSize', 'color', 'fontWeight'];
};

const borderStyle = (direction?: string): string[] => {
  return [`border${direction}Width`, 'borderColor', 'borderStyle'];
};

interface fontStyle extends TextStyle {
  font?: string;
}
interface viewStyle extends ViewStyle {
  border?: string;
  border_radius?: string;
}

type NamedStyles<T> = { [P in keyof T]: viewStyle | fontStyle | ImageStyle };

/**
 * padding: number 'top right bottom left'
 * margin: number 'top right bottom left'
 * border_radius: number 'top right bottom left'
 * font: 'fontSize color fontWeight'
 * border: 'width color type direction'
 */

function createStyle<T extends NamedStyles<T> | NamedStyles<any>>(
  style: T | NamedStyles<T>
): T | NamedStyles<T> {
  if (style.constructor !== Object) {
    return style;
  }
  Object.values(style).forEach((item: any) => {
    for (const key in item) {
      const valueList = item[key];
      if (typeof valueList === 'number') {
        item[key] = rem(valueList);
      }
      if (
        (key === 'padding' || key === 'margin' || key === 'border_radius') &&
        typeof valueList === 'string'
      ) {
        // eslint-disable-next-line @typescript-eslint/no-shadow
        let value = valueList.split(' ').map((item: string) => Number(item));
        switch (value.length) {
          case 3:
            value.splice(3, 0, value[1] as number);
            break;
          case 2:
            value = value.concat(value);
            break;
          case 1:
            value = new Array(4).fill(value[0]);
            break;
        }
        for (const index in value) {
          if (key === 'border_radius') {
            item[borderRadiusType()[index] as string] = rem(value[index]);
          } else {
            item[styleType(key)[index] as string] = rem(value[index]);
          }
        }
        delete item[key];
      } else if (key === 'font') {
        valueList.split(' ').forEach((el: string, index: number) => {
          if (el) {
            item[fontStyle()[index] as string] = !index ? rem(Number(el)) : el;
          }
        });
        delete item[key];
      } else if (key === 'border') {
        let styleList = valueList.split(' ');
        styleList.forEach((el: string, index: number) => {
          if (el && index !== 3) {
            item[borderStyle(styleList?.[3] || '')[index] as string] = !index
              ? rem(Number(el))
              : el;
          }
        });
        delete item[key];
      }
    }
  });
  return StyleSheet.create(style);
}
export { createStyle, rem };
