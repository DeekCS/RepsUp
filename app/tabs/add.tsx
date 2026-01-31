import { View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Button, Card } from "@/src/components/ui";
import { ScrollContainer } from "@/src/components/layout";

export default function AddScreen() {
  return (
    <View className="flex-1 bg-white">
      <StatusBar style="dark" />

      <ScrollContainer>
        <Card className="mb-4">
          <Text className="text-xl font-bold text-gray-900 mb-2">
            اضف جدولك هنا
          </Text>
          <Text className="text-gray-600 mb-4">اضافة </Text>
          <Button
            title="Start Empty Workout"
            onPress={() => console.log("Start workout")}
          />
        </Card>
      </ScrollContainer>
    </View>
  );
}
