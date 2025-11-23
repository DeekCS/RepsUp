import React from 'react';
import { View, Text, TextInput, TextInputProps } from 'react-native';

interface PhoneInputProps extends Omit<TextInputProps, 'keyboardType'> {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  countryFlag?: string;
  countryCode?: string;
  className?: string;
}

export function PhoneInput({
  value,
  onChangeText,
  placeholder = 'Enter phone number',
  countryFlag = '🇯🇴',
  countryCode = '+962',
  className = '',
  ...props
}: PhoneInputProps) {
  return (
    <View className={`bg-white rounded-3xl px-5 ${className}`} style={{ height: 56, flexDirection: 'row', alignItems: 'center' }}>
      <Text className="text-xl" style={{ lineHeight: 20 }}>{countryFlag}</Text>
      {countryCode && (
        <Text className="text-base text-birch ml-2 font-medium" style={{ lineHeight: 20 }}>{countryCode}</Text>
      )}
    <View className="w-[1px] h-5 bg-gray-200 ml-3" />
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#A79D95"
        value={value}
        onChangeText={onChangeText}
        keyboardType="phone-pad"
        className="flex-1 text-base text-birch ml-3"
        maxLength={10}
        style={{ 
          lineHeight: 17,
          padding: 0,
          includeFontPadding: false,
        }}
        {...props}
      />
    </View>
  );
}
