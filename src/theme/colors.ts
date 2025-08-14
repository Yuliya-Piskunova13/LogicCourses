export const colors = {
  primary: {
    main: '#007bff',
    light: '#e3f2fd',
    dark: '#1976d2',
  },
  secondary: {
    main: 'rgba(92, 187, 115, 1)',
    light: '#81c784',
    dark: '#388e3c',
  },
  background: {
    primary: '#f8f9fa',
    secondary: '#ffffff',
    thirdly: 'rgba(116, 70, 238, 1)',
  },
  purple: {
    primary: '#6b3fa0',
  },
  text: {
    white: 'rgba(255, 255, 255, 1)',
    primary: 'rgba(90, 87, 118, 1)',
    secondary: 'rgba(57, 65, 75, 1)',
    disabled: '#999999',
  },
  border: {
    light: '#e9ecef',
    medium: 'rgba(197, 208, 230, 1)',
  },
  error: {
    main: '#dc3545',
  },
  success: {
    main: '#28a745',
  },
  shadow: {
    color: '#000000',
  },
  loading: {
    indicator: '#007bff',
  },
  transparent: {
    primary: 'rgba(0, 0, 0, 0.2)',
  },
} as const;

export type Colors = typeof colors;
