import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
} from '@mui/material';
import React from 'react';
import { Diente } from '../../interfaces/Diente';
import Tooth from '../../componemts/Tooth';

interface Props {
  open: boolean;
  setOpen: CallableFunction;
  tooth: Diente | undefined;
}

const ToothDetails = ({ open, setOpen, tooth }: Props) => {
  console.log('aca lo q busco', tooth);

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      PaperProps={{
        component: 'form',
        // onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
        //   event.preventDefault();
        //   const formData = new FormData(event.currentTarget);
        //   const formJson = Object.fromEntries((formData as any).entries());
        //   const email = formJson.email;
        //   console.log(email);
        //   handleClose();
        // },
      }}
    >
      <DialogTitle>Pieza {tooth?.pieza}</DialogTitle>
      <DialogContent>
        <Tooth />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen()} variant="contained" color="inherit">
          Cancel
        </Button>
        <Button type="submit" variant="contained" color="success">
          Guardar Cambios
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ToothDetails;
