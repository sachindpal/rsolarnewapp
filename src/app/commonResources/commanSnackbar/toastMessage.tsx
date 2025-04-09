import Toast from 'react-native-toast-message';

/**
 * Show a toast message.
 *
 * @param {string} type - The type of the message (success, error, info).
 * @param {string} message - The message to be displayed.
 * @param {object} options - Additional options for the toast.
 */
export const showToast = (type:any, message:any, options = {}) => {
  Toast.show({
    type,
    text1: message,
    position:  'top', // Default position is top
    visibilityTime:  4000, // Default visibility time is 4000ms
    autoHide:  true,
    topOffset: 30, // Default top offset
    bottomOffset:  40, // Default bottom offset
    ...options,
  });
};
