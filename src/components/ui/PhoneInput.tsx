import React from "react";
import {
  View,
  Text,
  TextInput,
  TextInputProps,
  I18nManager,
  StyleSheet,
} from "react-native";

interface PhoneInputProps extends Omit<TextInputProps, "keyboardType"> {
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
  placeholder = "Enter phone number",
  countryFlag = "🇯🇴",
  countryCode = "+962",
  className = "",
  ...props
}: PhoneInputProps) {
  return (
    <View
      className={`bg-white rounded-3xl px-5 ${className}`}
      style={[styles.container, { flexDirection: "row" }]}
    >
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#A79D95"
        value={value}
        onChangeText={onChangeText}
        keyboardType="phone-pad"
        className="flex-1 text-base text-birch"
        maxLength={10}
        // Force LTR layout regardless of current I18nManager state so the cursor starts at the left
        style={[styles.input, { textAlign: 'left', writingDirection: 'ltr' }]}
        {...props}
      />
      <View className="w-[1px] h-5 bg-gray-200" style={styles.divider} />
      <Text className="text-xl" style={{ lineHeight: 20 }}>
        {countryFlag}
      </Text>
      <Text
        className="text-base text-birch font-medium"
        style={[{ lineHeight: 20 }]}
      >
        {countryCode}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 56,
    alignItems: "center",
  },
  countryCode: {
    marginStart: 8, // Logical property for RTL support
  },
  divider: {
    marginStart: 12, // Logical property for RTL support
  },
  input: {
    lineHeight: 17,
    padding: 0,
    includeFontPadding: false,
    marginStart: 12, // Logical property for RTL support
  },
});
