import { NativeModules, Platform } from 'react-native';
export { createStyle, rem } from './createStyle';
const LINKING_ERROR =
  `The package 'react-native-popular-components' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';
const PopularComponents = NativeModules.PopularComponents
  ? NativeModules.PopularComponents
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export function multiply(a: number, b: number): Promise<number> {
  return PopularComponents.multiply(a, b);
}
