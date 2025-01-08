import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useThemeContext } from './themeContext';
import colors from '../styles/colors';

interface Props {
  to: string;
  children: ReactNode;
}

const AppLink = ({ children, to }: Props) => {
  const { mode } = useThemeContext();
  return (
    <Link
      to={to}
      style={{
        textDecoration: 'none',
        color:
          mode === 'light'
            ? colors.lightModeTableText
            : colors.darkModeSoftText,
        fontWeight: 'bold',
      }}
    >
      {children}
    </Link>
  );
};

export default AppLink;
