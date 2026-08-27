import { Card, Icon } from "react-native-paper";
import AvatarImageComponent from "./avatarImage";

interface ReciterCardComponentProps {
  id: string;
  title: string;
  recitationStyle: string;
  translation?: string;
  onPressHandler: Function;
}

const ReciterCardComponent = ({
  id,
  title,
  translation,
  recitationStyle,
  onPressHandler,
}: ReciterCardComponentProps) => (
  <Card onPress={() => onPressHandler(id)}>
    <Card.Title
      title={translation}
      subtitle={title}
      left={() => <AvatarImageComponent />}
      // right={() => <Text variant="titleMedium">{translation}</Text>}
      right={() => <Icon source="chevron-right" size={30} color="black" />}
    />
  </Card>
);

export default ReciterCardComponent;
