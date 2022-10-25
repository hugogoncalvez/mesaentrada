import { styled } from '@mui/material/styles';
import { createTheme } from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';


const StyledTableCell = styled(TableCell)(({ theme }) => ({


    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#553044',
        color: theme.palette.common.white,
        fontSize: 14,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 13,
        borderRight: '1px solid #acacac',
    },

}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: '#dfebed'//theme.palette.action.hover,
    },
    // hide last border
    // '&:last-child td, &:last-child th': {
    //     border: 0,
    // },
}));

const theme = createTheme({
    status: {
        danger: '#FECF19',
    },
    palette: {
        pago: {
            main: '#598453',
            darker: '#053e85',
        },
        editar: {
            main: '#651f71',
            contrastText: '#fff',
        },
        hijos: {
            main: '#182747',
            contrastText: '#fff',
        }
    },
});

export { StyledTableCell, StyledTableRow, theme }