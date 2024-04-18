import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface EmailCodeBtnProps {
  onPress: () => void;
  disabled?: boolean;
  style?: any; 
  children?: React.ReactNode; 
}

const EmailCodeBtn: React.FC<EmailCodeBtnProps> = ({ onPress, disabled = false, style, children }) => {
  return (
    <TouchableOpacity
      style={[styles.button, style, disabled && styles.disabledButton]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.buttonText}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#4490D8',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  disabledButton: {
    backgroundColor: 'gray',
  },
});

export default EmailCodeBtn;
