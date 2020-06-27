export const light = {
  type: 'light',
  primary: 'powderblue',
  primaryText: 'black',
  secondary: 'mediumseagreen',
  secondaryText: 'whitesmoke',
  neutral: '#B1B1B1',
  coolNeutral: '#CBD2D9',
  warmNeutral: '#A39E93',
  warning: 'orange',
  success: 'green',
  background: '#E1E1E1',
  paper: 'white',
  text: 'black',
  error: 'red',
  maxWidth: 1440,
  mobileWidth: 1280,
};

export const dark = {
  ...light,
  primary: '#9575CD',
  primaryText: '#E0E0E0',
  secondary: '#102A43',
  text: '#E0E0E0',
  warmNeutral: '#857F72',
  coolNeutral: '#616E7C',
  background: '#121212',
  paper: '#0f0f0f',
  type: 'dark',
};

export default {
  light,
  dark,
};
