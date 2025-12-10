import { Text } from 'react-native';

export default function CustomText(props) {
  return (
    <Text {...props} style={[{ fontFamily: 'font-principale' }, props.style]}>
      {props.children}
    </Text>
  );
}