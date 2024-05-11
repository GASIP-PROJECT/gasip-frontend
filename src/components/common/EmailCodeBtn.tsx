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
      <Text 
      disabled={disabled}
      style={styles.buttonText}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    height: 60,
    borderRadius: 16,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#9EA4AA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    justifyContent: 'center',
  },

  disabledButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    backgroundColor: '#ffffff',
  },
});

export default EmailCodeBtn;
