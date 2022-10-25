import { MenuItem, TextField } from '@mui/material'
import { alpha, styled } from '@mui/material/styles';



export const CustomSelect = styled(({
    handleInputChange,
    valor = '', nombre = '',
    destinos = [], label = '',
    labelFocusedColor = '#045c6f',
    id = 'id', border = '2px solid #e2e2e1', borderRadius = 2, bgcLight = '#f2f2f2', bgcDark = '#2b2b2b', bgcHover = '#e7e7e7', bgcFocused = '#f8f8f8', borderFocused = '2px solid #e2e2e1', textAlign = 'left', ancho = 200 }) => (
    <TextField
        SelectProps={{
            renderValue: (value) => value,
            disableUnderline: true
        }}
        id={id}
        variant="filled"
        select
        name={nombre}
        label={label}
        value={valor}
        onChange={handleInputChange}
        sx={{
            width: ancho,
            textAlign: textAlign,
            fontWeight: 'bold',
            "& label": {
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
        }}>
        {destinos.map(e => {
            return <MenuItem key={e.id} value={e.destino}>{e.destino}</MenuItem>
        })}
    </TextField>
))(({ theme }) => ({
    '& .MuiFilledInput-root': {

        transition: theme.transitions.create([
            'border',
            'background-color',
            'box-shadow',
        ]),

    },
}));

