import { Avatar } from "react-native-paper";

interface AvatarTextComponentProps {
  label: string;
}

const AvatarTextComponent = ({ label }: AvatarTextComponentProps) => (
  <Avatar.Text size={24} label={label} />
);

export default AvatarTextComponent;
