import { View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { Button, Card } from "@/src/components/ui";
import { LanguageSwitcher } from "@/src/components/features/LanguageSwitcher";
import { HeroBanner } from "@/src/components/features/HeroBanner";
import { ScrollContainer, TopBar } from "@/src/components/layout";

export default function WorkoutsScreen() {
  return (
    <View className="flex-1" style={{ backgroundColor: "#FEF3F6" }}>
      <StatusBar style="light" />

      {/* Top Navigation Bar */}
      <TopBar
        locationTitle="6th Cross Rd"
        locationSubtitle="HAL 2nd Stage, Indiranagar..."
        onLocationPress={() => console.log("Location pressed")}
        onMessagePress={() => console.log("Messages pressed")}
        onFavoritePress={() => console.log("Favorites pressed")}
        onProfilePress={() => console.log("Profile pressed")}
      />

      <ScrollContainer>
        {/* Hero Banner */}
        <HeroBanner
          greeting="Hey !"
          name="Buddy"
          message="Workouts are more fun and motivating with a partner by your side"
          image={require("@/assets/images/header/fitness-man-with-barbell1.png")}
        />
      </ScrollContainer>
    </View>
  );
}
