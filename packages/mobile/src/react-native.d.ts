import 'react-native';

declare module 'react-native' {
  interface ScrollViewProps {
    keyboardShouldPersistTaps?: 'always' | 'never' | 'handled';
  }
}
