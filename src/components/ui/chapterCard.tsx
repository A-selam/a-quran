import { Card, Icon } from "react-native-paper";
import AvatarTextComponent from "./avatarText";

interface CardComponentProps {
  id: string;
  title: string;
  translation: string;
  totalVerses: number;
  type: string;
  onPressHandler: Function;
}

const ChapterCardComponent = ({
  id,
  title,
  translation,
  totalVerses,
  type,
  onPressHandler,
}: CardComponentProps) => (
  <Card onPress={() => onPressHandler(id)}>
    <Card.Title
      title={`${id}. ${title}`}
      subtitle={`${translation} • ${totalVerses} verses • ${type}`}
      left={() => <AvatarTextComponent label={id} />}
      right={() => <Icon source="chevron-right" size={30} color="black" />}
    />
  </Card>
);

export default ChapterCardComponent;
