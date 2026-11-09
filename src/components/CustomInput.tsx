
import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Pressable,
} from 'react-native';

interface CustomInputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  onToggleSecure?: () => void;
  keyboardType?: 'default' | 'email-address';
  error?: string;
  autoCapitalize?: 'none' | 'words' | 'sentences';
}

export default function CustomInput({
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  onToggleSecure,
  keyboardType = 'default',
  error,
  autoCapitalize = 'none',
}: CustomInputProps) {
  return (
    <View style={styles.wrapper}>
      <View style={[
        styles.inputContainer,
        error ? styles.inputError : null,
      ]}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#9292A5"
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          autoCorrect={false}
        />

        {onToggleSecure && (
          <Pressable
            onPress={onToggleSecure}
            style={styles.toggleButton}
            accessibilityRole="button"
            accessibilityLabel={
              secureTextEntry ? 'Show password' : 'Hide password'
            }
          >
            <Text style={styles.toggleText}>
              {secureTextEntry ? 'Show' : 'Hide'}
            </Text>
          </Pressable>
        )}
      </View>

      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  inputContainer: {
    height: 54,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5EF',
    borderRadius: 13,
    backgroundColor: '#FFFFFF',
  },
  input: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 16,
    fontSize: 14,
    color: '#17172B',
  },
  inputError: {
    borderColor: '#EF4444',
  },
  toggleButton: {
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  toggleText: {
    color: '#635BDB',
    fontSize: 12,
    fontWeight: '700',
  },
  errorText: {
    color: '#EF4444',
    fontSize: 12,
    marginTop: 5,
    marginLeft: 4,
  },
});
