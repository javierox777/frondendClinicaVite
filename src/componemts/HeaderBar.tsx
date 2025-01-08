import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import { useThemeContext } from './themeContext';
import colors from '../styles/colors';

interface Props {
  title: string;
  button?: boolean;
  buttonTitle?: string;
  buttonFn?: CallableFunction;
}

const HeaderBar = ({ title, button, buttonTitle, buttonFn }: Props) => {
  const { mode } = useThemeContext();

  return (
    <AppBar position="static" className="mb-5">
      <Toolbar
        style={{
          backgroundColor:
            mode === 'light'
              ? colors.lightModeHeaderColor
              : colors.darkModeHeaderColor,
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="h6" className="capitalize">
          {title.toLowerCase()}
        </Typography>
        {button && buttonTitle && buttonFn && (
          <Button variant="contained" onClick={() => buttonFn()}>
            {buttonTitle}
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default HeaderBar;
