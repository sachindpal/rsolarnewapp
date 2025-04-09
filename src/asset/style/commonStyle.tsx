import {StyleSheet} from 'react-native';

export const CommonStyle = StyleSheet.create({
  mainPadding: {
    paddingLeft: 8,
    paddingRight: 8,
  },

  mainView: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  mainViewWhite: {
    flex: 1,
    backgroundColor: '#ffff',
  },

  flex_dirRow_alignCenter_justifySpbtw: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  flex_dirRow_alignCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flex_dirRow_justifySpbtw: {
    flexDirection: 'row',

    justifyContent: 'space-between',
  },
  border6_width1_colorStroke: {
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(220, 224, 239, 1)',
  },
  dropDown: {
    marginLeft: 3,
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderBottomWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#999',
    transform: [{rotate: '180deg'}],
  },
  alignCenter_justifyCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerMainView: {
    marginBottom: 24,
    backgroundColor: '#242734',
    paddingLeft: 16,
    paddingRight: 16,
    height: 64,
  },
  badge: {
    width: 25,
    height: 25,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff0000',
    position: 'absolute',
    zIndex: 1,
    left: 10,
    top: -8,
  },
  sheet: {
    marginTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: 'white',
    flex: 1,
  },
  fotterButton: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    paddingHorizontal: 24,
    paddingBottom: 24,
    paddingTop: 8,
    elevation:1
  },
  button_Icon: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 11,
    paddingBottom: 11,
    paddingHorizontal: 16,
    height: 54,
    borderRadius: 6,
    backgroundColor: 'rgba(36, 39, 52, 1)',
    flexDirection: 'row',
    marginTop: 24,
    marginBottom: 20,
  },
  center_modal_view: {
    padding: 16,
    marginHorizontal: 8,
    backgroundColor: 'white',
    borderRadius: 6,
  },
  discountBadge: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(115, 190, 68, 1)',
    position: 'absolute',
    zIndex: 1,
    top: 8,
    left: 8,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export const commanRadius = {
  radi4: 4,
  radi6: 6,
};

export const ColorVariable = {
  blueBlack: 'rgba(36, 39, 52, 1)',
  farmkartGreen: 'rgba(115, 190, 68, 1)',
  white: 'rgba(255, 255, 255, 1)',
  errorRed: 'rgba(255, 82, 82, 1)',
  stroke: 'rgba(220, 224, 239, 1)',
  gray: 'rgba(126, 126, 126, 1)',
};
