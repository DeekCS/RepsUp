import { View, Text, Image, Pressable, ImageSourcePropType } from 'react-native';
import { LocationIcon, ChatIcon } from '@/src/components/icons';

export interface Partner {
  id: string;
  name: string;
  age: number;
  location: string;
  image: ImageSourcePropType;
}

interface PartnerCardProps {
  partner: Partner;
  onInvite: (partnerId: string) => void;
  onChat: (partnerId: string) => void;
}

export function PartnerCard({ partner, onInvite, onChat }: PartnerCardProps) {
  return (
    <View className="bg-[#FBF6F3] rounded-lg flex-row items-center w-full" style={{ height: 85, paddingHorizontal: 16, paddingVertical: 12 }}>
      {/* Left Section: Profile Image */}
      <Image
        source={partner.image}
        className="rounded-full"
        style={{ width: 60, height: 60, marginRight: 12 }}
        resizeMode="cover"
      />

      {/* Right Section: Info and Actions (2 rows) */}
      <View className="flex-1">
        {/* Row 1: Name and Chat Icon */}
        <View className="flex-row items-center justify-between" >
          <Text 
            className="text-[#362D26] font-medium flex-1"
            style={{ fontFamily: 'DMSans-Medium', fontSize: 14, lineHeight: 18 }}
          >
            {partner.name}
          </Text>
          
          <Pressable
            onPress={() => onChat(partner.id)}
            className="items-center justify-center active:opacity-70"
            style={{ width: 32, height: 32 }}
          >
            <ChatIcon width={20} height={20} color="#362D26" />
          </Pressable>
        </View>

        {/* Row 2: Age & Location and Invite Button */}
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center flex-1">
            <Text 
              className="text-[#A39A95]"
              style={{ fontFamily: 'DMSans-Regular', fontSize: 12, lineHeight: 16 }}
            >
              Age: {partner.age}
            </Text>
            
            <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: '#A39A95', marginHorizontal: 6 }} />
            
            <LocationIcon width={12} height={12} color="#F99043" />
            <Text 
              className="text-[#A39A95]"
              style={{ fontFamily: 'DMSans-Regular', fontSize: 12, lineHeight: 16, marginLeft: 4 }}
            >
              {partner.location}
            </Text>
          </View>

          <Pressable
            onPress={() => onInvite(partner.id)}
            className="bg-[#F99043] rounded-lg items-center justify-center active:opacity-80"
            style={{ width: 80, height: 32 }}
          >
            <Text 
              className="text-white font-semibold"
              style={{ fontFamily: 'DMSans-Bold', fontSize: 12 }}
            >
              Invite
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
