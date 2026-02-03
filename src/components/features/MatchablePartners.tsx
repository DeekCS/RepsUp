import { View, Text, Pressable } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SettingsIcon } from '@/src/components/icons';
import { PartnerCard, Partner } from './PartnerCard';

interface MatchablePartnersProps {
  partners: Partner[];
  onInvite: (partnerId: string) => void;
  onChat: (partnerId: string) => void;
  onSettings?: () => void;
}

export function MatchablePartners({ 
  partners, 
  onInvite, 
  onChat,
  onSettings 
}: MatchablePartnersProps) {
  const { t } = useTranslation();

  return (
    <View>
      {/* Header Section */}
      <View className="flex-row items-center justify-between mb-4">
        <Text 
          className="text-black text-base font-semibold"
          style={{ fontFamily: 'DMSans-Bold' }}
        >
          {t('matchablePartners.title', 'Find Matchable Partner')}
        </Text>
        
        {onSettings && (
          <Pressable 
            onPress={onSettings}
            className="active:opacity-70"
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <SettingsIcon width={24} height={24} color="#F99043" />
          </Pressable>
        )}
      </View>

      {/* Partners List */}
      <View style={{ gap: 12 }}>
        {partners.map((partner) => (
          <PartnerCard
            key={partner.id}
            partner={partner}
            onInvite={onInvite}
            onChat={onChat}
          />
        ))}
      </View>
    </View>
  );
}
