import React, { useState } from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Image } from 'expo-image';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useRTL } from '@/src/hooks';
import { Container, Spacer, Button, SocialButton, PhoneInput } from '../../src/components/ui';

export default function LoginScreen() {
  const { t } = useTranslation();
  const { isRTL, getTextAlign } = useRTL();
  const [phoneNumber, setPhoneNumber] = useState('');
  const router = useRouter();

  const handleSendOTP = () => {
    // Simple static login - navigate to verify OTP
    if (phoneNumber.length >= 10) {
      router.push({
        pathname: '/auth/verify-otp',
        params: { phone: phoneNumber }
      });
    }
  };

  const handleGoogleLogin = () => {
    // Static login - navigate to tabs
    router.replace('/tabs');
  };

  const handleFacebookLogin = () => {
    // Static login - navigate to tabs
    router.replace('/tabs');
  };

  return (
    <View className="flex-1">
      <StatusBar style="light" />
      <Image
        source={require('../../assets/images/login/1.jpg')}
        style={{ position: 'absolute', width: '100%', height: '100%' }}
        contentFit="cover"
        cachePolicy="memory-disk"
        priority="high"
      />
      
      {/* Dark overlay */}
      <View className="flex-1 bg-black/40">
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className="flex-1"
          >
            <ScrollView
              contentContainerStyle={{ flexGrow: 1 }}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              <Container className="flex-1 justify-between pt-20 pb-10">
                {/* Header */}
                <View>
                  <Text className="text-white text-2xl
                  ">
                    {t('auth.login.title')}
                  </Text>
                </View>

                {/* Bottom Section */}
                <View>
                  {/* Motivational Text */}
                  <Text className="text-white text-2xl font-bold text-center mb-8 leading-tight">
                    {t('auth.login.motivationalText')}
                  </Text>

                  {/* Phone Input */}
                  <PhoneInput
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    placeholder={t('auth.login.phonePlaceholder')}
                    countryFlag="🇯🇴"
                    countryCode="+962"
                  />

                  <Spacer size={5} />

                  {/* Send OTP Button */}
                  <Button
                    title={t('auth.login.continueButton')}
                    onPress={handleSendOTP}
                    variant="primary"
                    size="lg"
                    rounded='3xl'
                    fullWidth
                  />

                  <Spacer size={6} />

                  {/* Divider */}
                  <View className="flex-row items-center">
                    <View className="flex-1 h-[1px] bg-white/30" />
                    <Text className="text-white mx-4 text-base" style={{ writingDirection: isRTL ? 'rtl' : 'ltr' }}>
                      {t('auth.login.socialLogin') || 'Or'}
                    </Text>
                    <View className="flex-1 h-[1px] bg-white/30" />
                  </View>

                  <Spacer size={6} />

                  {/* Social Login Buttons */}
                  <View className="flex-row justify-center gap-6">
                    <SocialButton
                      provider="google"
                      onPress={handleGoogleLogin}
                    />
                    <SocialButton
                      provider="facebook"
                      onPress={handleFacebookLogin}
                    />
                  </View>

                  <Spacer size={8} />

                  {/* Terms and Privacy */}
                  <Text className="text-white text-center text-sm">
                    {t('auth.login.termsText')}
                  </Text>
                </View>
              </Container>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
    </View>
  );
}
