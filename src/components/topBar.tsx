import { router } from "expo-router";
import { Appbar } from "react-native-paper";

interface TopBarProps {
  title: string;
  backButton?: boolean;
}

const TopBar = ({ title, backButton }: TopBarProps) => (
  <Appbar.Header>
    {backButton ? (
      <Appbar.BackAction
        onPress={() => {
          router.back();
        }}
      />
    ) : (
      <Appbar.Action icon="menu" onPress={() => {}} />
    )}
    <Appbar.Content title={title} />
    <Appbar.Action icon="theme-light-dark" onPress={() => {}} />
  </Appbar.Header>
);

export default TopBar;
