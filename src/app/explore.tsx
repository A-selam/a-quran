import { router, useLocalSearchParams } from "expo-router";
import { Button, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const params = useLocalSearchParams();
  const goBack = () => {
    router.back();
  };
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text>Hello this is kinda explore</Text>;
        <Text>Name: {params.name}</Text>
        <Text>Age: {params.age}</Text>
        <Button title="go back" onPress={goBack} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    backgroundColor: "red",
    height: 100,
  },
});
