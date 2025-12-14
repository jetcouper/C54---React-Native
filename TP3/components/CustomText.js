import { Text } from 'react-native';

export default function CustomText(props) {
  return (
    // Composant personnalisé pour le texte avec le font spécifique
    <Text {...props} style={[{ fontFamily: 'font-principale' }, props.style]}>
      {props.children}
    </Text>
  );
}