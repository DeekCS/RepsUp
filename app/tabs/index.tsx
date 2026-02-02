import { View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { Button, Card } from "@/src/components/ui";
import { LanguageSwitcher } from "@/src/components/features/LanguageSwitcher";
import { HeroBanner } from "@/src/components/features/HeroBanner";
import { ScrollContainer, TopBar } from "@/src/components/layout";

export default function WorkoutsScreen() {
  const { t } = useTranslation();

  return (
    <View className="flex-1" style={{ backgroundColor: "#FEF3F6" }}>
      <StatusBar style="light" />

      {/* Top Navigation Bar */}
      <TopBar
        locationTitle={t("home.location")}
        locationSubtitle={t("home.locationSubtitle")}
        onLocationPress={() => console.log("Location pressed")}
        onMessagePress={() => console.log("Messages pressed")}
        onFavoritePress={() => console.log("Favorites pressed")}
        onProfilePress={() => router.push("/tabs/profile")}
      />

      <ScrollContainer>
        {/* Hero Banner */}
        <HeroBanner
          greeting={t("home.greeting")}
          name={t("home.name")}
          message={t("home.heroMessage")}
          image={require("@/assets/images/header/fitness-man-with-barbell1.png")}
        />

      </ScrollContainer>
    </View>
  );
}
