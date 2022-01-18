const transparent = 'transparent';
const orchestraColors = {
  primaryColor: '#191919',
  primaryColorLight: '#27272C',
  primaryColorLightest: '#454548',
  secondaryColor: '#FFD700',
  secondaryColorDark: '#BE8B00',
  secondaryColorLight: '#F2C037',
  textColor: '#FFFFFF',
  textColorDark: '#B8B8B8'
};

export default {
  ...orchestraColors,
  transparent,
  dark: {
    primaryText: orchestraColors.textColor,
    secondaryText: orchestraColors.textColorDark,
    background: orchestraColors.primaryColor,
    headerBackground: orchestraColors.primaryColorLight,
    tabIconSelected: orchestraColors.textColor,
    tabIconNonSelected: orchestraColors.textColorDark,
    bottomTabNav: orchestraColors.primaryColorLight,
    emptyViewIcon: orchestraColors.textColorDark
  },
  light: {
    primaryText: orchestraColors.textColor,
    secondaryText: orchestraColors.textColorDark,
    background: orchestraColors.primaryColor,
    headerBackground: orchestraColors.primaryColorLight,
    tabIconSelected: orchestraColors.textColor,
    tabIconNonSelected: orchestraColors.primaryColorLightest,
    bottomTabNav: orchestraColors.primaryColorLight,
    emptyViewIcon: orchestraColors.textColorDark
  }
};
