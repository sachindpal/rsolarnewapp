import Snackbar from "react-native-snackbar";
import { ColorVariable } from "../../../asset/style/commonStyle";

export const showSnackbar = (message: any, type: string, barDuration: number = Snackbar.LENGTH_LONG, barLine: number = 4) => {
    let backgroundColor;
    let textColor;
  
    switch (type) {
      case 'success':
        backgroundColor = ColorVariable.blueBlack;
        textColor = ColorVariable.white;
        break;
      case 'error':
        backgroundColor = ColorVariable.blueBlack;
        textColor = ColorVariable.white;
        break;
      case 'warning':
        backgroundColor = ColorVariable.blueBlack;
        textColor = ColorVariable.white;
        break;
      case 'info':
        backgroundColor = ColorVariable.blueBlack;
        textColor = ColorVariable.white;
        break;
      default:
        backgroundColor = ColorVariable.blueBlack;
        textColor = ColorVariable.white;
        break;
    }
  
    Snackbar.show({
      text: message,
      backgroundColor,
      textColor,
      fontFamily: "Avenir Medium",
      duration: barDuration,
      numberOfLines: barLine
    });
  };