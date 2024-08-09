import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { OdontogramInterface } from '../../interfaces/Odontogram';
import { Diente } from '../../interfaces/Diente';

import diente11 from '../../assets/dientes/diente11.png';
import diente12 from '../../assets/dientes/diente12.png';
import diente13 from '../../assets/dientes/diente13.png';
import diente14 from '../../assets/dientes/diente14.png';
import diente15 from '../../assets/dientes/diente15.png';
import diente16 from '../../assets/dientes/diente16.png';
import diente17 from '../../assets/dientes/diente17.png';
import diente18 from '../../assets/dientes/diente18.png';
import diente21 from '../../assets/dientes/diente21.png';
import diente22 from '../../assets/dientes/diente22.png';
import diente23 from '../../assets/dientes/diente23.png';
import diente24 from '../../assets/dientes/diente24.png';
import diente25 from '../../assets/dientes/diente25.png';
import diente26 from '../../assets/dientes/diente26.png';
import diente27 from '../../assets/dientes/diente27.png';
import diente28 from '../../assets/dientes/diente28.png';
import diente31 from '../../assets/dientes/diente31.png';
import diente32 from '../../assets/dientes/diente32.png';
import diente33 from '../../assets/dientes/diente33.png';
import diente34 from '../../assets/dientes/diente34.png';
import diente35 from '../../assets/dientes/diente35.png';
import diente36 from '../../assets/dientes/diente36.png';
import diente37 from '../../assets/dientes/diente37.png';
import diente38 from '../../assets/dientes/diente38.png';
import diente42 from '../../assets/dientes/diente42.png';
import diente41 from '../../assets/dientes/diente41.png';
import diente43 from '../../assets/dientes/diente43.png';
import diente44 from '../../assets/dientes/diente44.png';
import diente45 from '../../assets/dientes/diente45.png';
import diente46 from '../../assets/dientes/diente46.png';
import diente47 from '../../assets/dientes/diente47.png';
import diente48 from '../../assets/dientes/diente48.png';
import ToothDetails from './ToothDetails';
import { Close } from '@mui/icons-material';

type DienteKeys =
  `diente${11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48}`;

const dientesImages: Record<DienteKeys, string> = {
  diente11: diente11,
  diente12: diente12,
  diente13: diente13,
  diente14: diente14,
  diente15: diente15,
  diente16: diente16,
  diente17: diente17,
  diente18: diente18,
  diente21: diente21,
  diente22: diente22,
  diente23: diente23,
  diente24: diente24,
  diente25: diente25,
  diente26: diente26,
  diente27: diente27,
  diente28: diente28,
  diente31: diente31,
  diente32: diente32,
  diente33: diente33,
  diente34: diente34,
  diente35: diente35,
  diente36: diente36,
  diente37: diente37,
  diente38: diente38,
  diente41: diente41,
  diente42: diente42,
  diente43: diente43,
  diente44: diente44,
  diente45: diente45,
  diente46: diente46,
  diente47: diente47,
  diente48: diente48,
};

interface Props {
  odontogram: OdontogramInterface | undefined;
}

const Odontogram = ({ odontogram }: Props) => {
  const [open, setOpen] = useState(false);
  const [selectedTooth, setTooth] = useState<Diente>();

  if (!odontogram) return null;

  return (
    <>
      <Container>
        <Grid container spacing={1}>
          {odontogram.dientes
            .filter((d) => parseInt(d.pieza) < 31)
            .map((d: Diente) => {
              const dienteKey = `diente${d.pieza}` as DienteKeys;
              return (
                <Grid item xs key={d.pieza}>
                  <Grid container justifyContent={'center'}>
                    <Grid item>
                      <Typography style={{ textAlign: 'center' }}>
                        {d.pieza}
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      className="hover:scale-[1.05] cursor-pointer transition-all relative"
                      onClick={() => {
                        setTooth(d);
                        setOpen(true);
                      }}
                    >
                      {!d.activo && (
                        <div className="absolute">
                          <Close color="error" />
                        </div>
                      )}
                      <img
                        src={dientesImages[dienteKey]}
                        height={200}
                        width={50}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              );
            })}
        </Grid>
        <Grid container spacing={1} alignItems={'baseline'}>
          {odontogram.dientes
            .filter((d) => parseInt(d.pieza) >= 31)
            .map((d: Diente) => {
              const dienteKey = `diente${d.pieza}` as DienteKeys;
              return (
                <Grid item xs key={d.pieza}>
                  <Grid container justifyContent={'center'}>
                    <Grid
                      item
                      className="hover:scale-[1.05] cursor-pointer transition-all relative"
                      onClick={() => {
                        setTooth(d);
                        setOpen(true);
                      }}
                    >
                      {!d.activo && (
                        <div className="absolute">
                          <Close color="error" />
                        </div>
                      )}
                      <img
                        src={dientesImages[dienteKey]}
                        height={200}
                        width={50}
                      />
                    </Grid>
                    <Grid item>
                      <Typography style={{ textAlign: 'center' }}>
                        {d.pieza}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              );
            })}
        </Grid>
      </Container>
      <ToothDetails
        open={open}
        setOpen={() => setOpen(false)}
        tooth={selectedTooth}
      />
    </>
  );
};

export default Odontogram;
