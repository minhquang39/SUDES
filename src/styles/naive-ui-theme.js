import { lightTheme, darkTheme } from 'naive-ui'

export const customLightTheme = {
  name: 'custom-light',
  common: {
    ...lightTheme.common,
    primaryColor: '#052b21',
    primaryColorHover: '#064730',
    primaryColorPressed: '#031611',
    primaryColorSuppl: '#0a5a42',
    fontFamily: '"Montserrat", sans-serif',
    fontFamilyMono: '"Montserrat", sans-serif',
  },
  // Kế thừa các thành phần khác từ lightTheme
  ...lightTheme,
}

export const customDarkTheme = {
  name: 'custom-dark',
  common: {
    ...darkTheme.common,
    primaryColor: '#052b21',
    primaryColorHover: '#064730',
    primaryColorPressed: '#031611',
    primaryColorSuppl: '#0a5a42',
    fontFamily: '"Montserrat", sans-serif',
    fontFamilyMono: '"Montserrat", sans-serif',
  },
  // Kế thừa các thành phần khác từ darkTheme
  ...darkTheme,
}
