export const getMessageForBiometrics = (biometryType: string): string => {
  if (biometryType === 'Face ID') {
    return 'Scan your Face on the device to continue';
  } else {
    return 'Scan your Fingerprint on the device scanner to continue';
  }
};
