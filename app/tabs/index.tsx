import { View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { Button, Card } from "@/src/components/ui";
import { LanguageSwitcher } from "@/src/components/features/LanguageSwitcher";
import { HeroBanner } from "@/src/components/features/HeroBanner";
import { MatchablePartners, Partner } from "@/src/components/features";
import { ScrollContainer, TopBar } from "@/src/components/layout";

// Mock data for matchable partners
const mockPartners: Partner[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    age: 24,
    location: 'New York, NY',
    image: require('@/assets/images/header/fitness-man-with-barbell1.png'),
  },
  {
    id: '2',
    name: 'Mike Thompson',
    age: 28,
    location: 'Los Angeles, CA',
    image: require('@/assets/images/header/fitness-man-with-barbell1.png'),
  },
  {
    id: '3',
    name: 'Emily Davis',
    age: 22,
    location: 'Chicago, IL',
    image: require('@/assets/images/header/fitness-man-with-barbell1.png'),
  },
];

export default function WorkoutsScreen() {
  const { t } = useTranslation();

  const handleInvite = (partnerId: string) => {
    console.log('Invite partner:', partnerId);
    // TODO: Implement invite logic
  };

  const handleChat = (partnerId: string) => {
    console.log('Chat with partner:', partnerId);
    // TODO: Navigate to chat screen
  };

  const handleSettings = () => {
    console.log('Settings pressed');
    // TODO: Navigate to partner settings/filters
  };

  return (
    <View className="flex-1" style={{ backgroundColor: "#FFF" }}>
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

        {/* Matchable Partners Section */}
        <MatchablePartners
          partners={mockPartners}
          onInvite={handleInvite}
          onChat={handleChat}
          onSettings={handleSettings}
        />
      </ScrollContainer>
    </View>
  );
}
