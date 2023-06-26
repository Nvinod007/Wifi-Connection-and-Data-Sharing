
export const securedSignalStrengthIcon = (level: number) => {
  if (level >= -50) {
    return 'wifi-strength-4-lock';
    // return 'wifi-strength-4';
  } else if (level >= -60) {
    return 'wifi-strength-3-lock';
  } else if (level >= -70) {
    return 'wifi-strength-2-lock';
  } else if (level >= -80){
    return 'wifi-strength-1-lock';
  }else{
    return 'wifi-strength-lock-outline'
  }
};
export const signalStrengthIcon = (level: number) => {
  if (level >= -50) {
    return 'wifi-strength-4';
    // return 'wifi-strength-4';
  } else if (level >= -60) {
    return 'wifi-strength-3';
  } else if (level >= -70) {
    return 'wifi-strength-2';
  } else if (level >= -80){
    return 'wifi-strength-1';
  }else{
    return 'wifi-strength-outline'
  }

};
