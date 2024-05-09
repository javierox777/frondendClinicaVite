import { Close } from '@mui/icons-material';
import {
  Dialog,
  Toolbar,
  Paper,
  IconButton,
  Container,
  Typography,
  Slide,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import React from 'react';

interface Props {
  open: boolean;
  onClose: CallableFunction;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const BudgetForm = ({ onClose, open }: Props) => {
  const handleSubmit = () => {
    console.log('submitted');
  };

  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        onClose={() => onClose()}
        fullScreen
      >
        <form onSubmit={handleSubmit}>
          <Toolbar
            component={Paper}
            elevation={3}
            style={{ backgroundColor: 'teal' }}
          >
            <IconButton onClick={() => onClose()}>
              <Close />
            </IconButton>
          </Toolbar>
          <Container>
            <Typography className="p-3">
              Rellene los datos para generar un nuevo presupuesto.
            </Typography>
          </Container>
        </form>
      </Dialog>
    </>
  );
};

export default BudgetForm;
