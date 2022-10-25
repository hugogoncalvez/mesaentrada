import { alpha, styled } from '@mui/material/styles';

import TextField from '@mui/material/TextField';


export const CustomTextField = styled(({onFocus, onClick, llave, handleInputChange, valor = '', nombre = '', label = '', labelFocusedColor = '#045c6f', id = 'id', mt = 0, mb = 0, ml = 0, mr = 0, border = '2px solid #e2e2e1', borderRadius = 2, bgcLight = '#f2f2f2', bgcDark = '#2b2b2b', bgcHover = '#e7e7e7', bgcFocused = '', borderFocused = '2px solid #e2e2e1', rows = 0, fullWidth = false, labelAlign = 'left', tipo = 'text', textAlign = 'left', textTransform = 'none', ancho = 300 }) => (
  <TextField
    onClick={onClick}
    onFocus={onFocus}
    key={llave}
    onChange={handleInputChange}
    label={label}
    id={id}
    value={valor}
    variant="filled"
    style={{ marginTop: mt, marginBottom: mb, marginLeft: ml, marginRigth: mr }}
    sx={{
      width: ancho,
      "& label": {
        width: "100%",
        textAlign: labelAlign,
        transformOrigin: "center",
        fontWeight: 'bold',
        "&.Mui-focused": {
          color: labelFocusedColor
        }
      },
      '& .MuiFilledInput-root': {
        border: border,
        overflow: 'hidden',
        borderRadius: borderRadius,
        backgroundColor: bgcLight,

        '&:hover': {
          backgroundColor: bgcHover,
        },
        '&.Mui-focused': {
          backgroundColor: bgcFocused,
          boxShadow: `${alpha('#e7e7e7', 0.35)} 1px 3px 2px 2px`,
          border: borderFocused
        }
      },
    }}
    fullWidth={fullWidth}
    multiline
    rows={rows}
    type={tipo}
    name={nombre}
    InputProps={{
      inputProps: {
        with: '100px',
        style: { textAlign: textAlign, textTransform: textTransform },
      },
      disableUnderline: true
    }}

  />
))(({ theme }) => ({
  '& .MuiFilledInput-root': {

    transition: theme.transitions.create([
      'border',
      'background-color',
      'box-shadow',
    ]),

  },
}));



