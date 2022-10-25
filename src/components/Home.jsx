import axios from "axios";
import moment from "moment";
import Swal from 'sweetalert2'
import io from "socket.io-client";


import { useFilter } from '../hooks/useFilter';
//import Comprobante from "./pdf/Comprobante.js";
import useAuth from "../hooks/useAuth";
import { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { StyledTableCell, StyledTableRow, theme } from "./elements/styles";
import { destinos, tipos } from "./elements/constantes";
import { useForm } from "../hooks/useForm";
import { CustomTextField } from './elements/CustomTextField';
import { CustomSelect } from './elements/CustomSelect';

import { ThemeProvider } from '@mui/material/styles';
import { Button, Container, Divider, Fab, Tooltip } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CancelIcon from '@mui/icons-material/Cancel';

import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ToolTip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import PrintIcon from '@mui/icons-material/Print';
import FilterListOffIcon from '@mui/icons-material/FilterListOff';
import LogoutIcon from '@mui/icons-material/Logout';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PrintTable from "./pdf/PrintTable";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


// const socket = io("http://localhost:3001");
const socket = io("/");

//https://stackoverflow.com/questions/28889826/how-to-set-focus-on-an-input-field-after-rendering/28890330#28890330

moment.locale()
const URI = `http://${window.location.hostname}:8000`;



//let intervalID



export const Home = () => {



    const receiveMessage = () => {
        getNotas()
    };

    const { setAuth } = useAuth();

    let sinFojas = '-.'
    let fcha = ''
    let hs = ''

    const [notas, setNotas] = useState([])
    const [notasFiltradas, handleFilter, resetFilter] = useFilter()

    const [values, handleInputChange, reset, setValues] = useForm()
    const { tipo, numero, letra, fecha, fechaPdf, horas, firmante, destino, extracto, fojas, filtroFirmante, filtroExtracto } = values
    const [hora, setHora] = useState('')
    const [hoy, setHoy] = useState('')
    const [textbuttGuardar, setTextbuttGuardar] = useState('Guardar')
    const [id, setId] = useState('')


    


    // desabilita el boton back del navegador

    window.history.pushState(null, null, window.location.href);
    window.onpopstate = function () {
        window.history.go(1);
    }

    useLayoutEffect(() => {
        document.body.style.backgroundColor = "#eae5ec"
    });


    useEffect(() => {

        window.scrollTo({ top: 0, behavior: 'smooth' });

        getNotas()

        fechaHora()

        const intervalID = setInterval(() => {
            fechaHora()
        }, 60000);

        socket.on("message", receiveMessage);


    }, [])

    function debounce(cb, delay = 1000) {

        let timeout

        return (...args) => {

            clearTimeout(timeout)
            timeout = setTimeout(() => {
                cb(...args)
            }, delay)
        }
    }

    useEffect(() => {
        debounceFilter('firmante', filtroFirmante)
    }, [filtroFirmante])

    const debounceFilter = debounce((buscarPor, texto) => {
        handleFilter(buscarPor, texto, notas, values)
    })

    useEffect(() => {
        debounceFilter('extracto', filtroExtracto)
    }, [filtroExtracto])

    const numeroNota = () => {
        setValues({
            ...values,
            numero: parseInt(notas[0].numero) + 1,
        })
    }


    const getNotas = async () => {

        const res = await axios.get(`${URI}/notas/`);

        setNotas(res.data);

        return () => {
            socket.off("message", receiveMessage);
        };
    };

    function fechaHora() {
        fcha = moment().format('DD/MM/YYYY')
        hs = moment().format('HH:mm')
        setHoy(fcha)
        setHora(hs)
    }

    const handleSubmit = async () => {
        try {
            await axios.post(`${URI}/nota/create`, {
                tipo: tipo,
                numero: numero,
                fojas: (fojas) ? ('0' + fojas + '.') : sinFojas,
                letra: letra.toUpperCase(),
                fecha: (fecha) ? fecha : hoy,
                hora: (horas) ? horas : hora,
                firmante: (firmante).replace(/(^\w|\s\w)/g, (m) => m.toUpperCase()).trim(),
                extracto: extracto,
                para: destino,
                usuario: sessionStorage.getItem('user')
            }).then(
                Swal.fire({
                    icon: 'success',
                    iconColor: '#377D71',
                    title: 'Mesa de Entrada',
                    text: 'Se ha guardado con éxito !',
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    },
                    background: '#CDF0EA',
                    timer: 5000,
                    timerProgressBar: true
                }).then(
                    reset,
                    setTimeout(() => {
                        socket.emit("message")
                    }, 300)
                )
            );
            getNotas()
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Mesa de Entrada',
                text: `Se ha producido un error, vuelva a intentarlo por favor.`,
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                },
                background: '#FFD1D1',
                timer: 5000,
                timerProgressBar: true
            })
        }
    }

    const handleEdit = (id, tipo, numero, letra, fojas, fecha, hora, firmante, extracto, para) => {
        setValues({
            tipo: tipo,
            numero: numero,
            letra: letra,
            fojas: fojas,
            fecha: fecha,
            horas: hora,
            firmante: firmante,
            extracto: extracto,
            destino: para
        })
        setTextbuttGuardar('Actualizar')
        setId(id)
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    const handleUpdate = async () => {
        try {
            await axios.put(`${URI}/nota/${id}`, {
                tipo: tipo,
                numero: numero,
                letra: letra.toUpperCase(),
                fojas: (fojas) ? ('0' + fojas + '.') : sinFojas,
                fecha: (fecha) ? fecha : hoy,
                hora: horas || hora,
                firmante: (firmante).replace(/(^\w|\s\w)/g, (m) => m.toUpperCase()).trim(),
                extracto: extracto,
                para: destino,
                usuario: sessionStorage.getItem('user')
            }).then(
                Swal.fire({
                    icon: 'success',
                    iconColor: '#377D71',
                    title: 'Mesa de Entrada',
                    text: 'Se ha guardado con éxito !',
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    },
                    background: '#CDF0EA',
                    timer: 5000,
                    timerProgressBar: true
                }).then(
                    reset,
                    setTimeout(() => {
                        socket.emit("message")
                    }, 300)
                )
            );
            getNotas()
            setTextbuttGuardar('Guardar')
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Mesa de Entrada',
                text: `Se ha producido un error, vuelva a intentarlo por favor.`,
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                },
                background: '#FFD1D1',
                timer: 5000,
                timerProgressBar: true
            })
        }
    }

    const handleDelete = (idDel) => {
        Swal.fire({
            title: 'Está seguro que desea eliminar?',
            showDenyButton: true,
            confirmButtonText: 'Eliminar',
            denyButtonText: `Cancelar`,
        }).then(async (result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                try {
                    await axios.delete(`${URI}/nota/${idDel}`)
                        .then(
                            Swal.fire({
                                icon: 'success',
                                iconColor: '#377D71',
                                title: 'Mesa de Entrada',
                                text: 'Se ha eliminad con éxito !',
                                showClass: {
                                    popup: 'animate__animated animate__fadeInDown'
                                },
                                hideClass: {
                                    popup: 'animate__animated animate__fadeOutUp'
                                },
                                background: '#CDF0EA',
                                timer: 5000,
                                timerProgressBar: true
                            }).then(
                                reset,
                                setTimeout(() => {
                                    socket.emit("message")
                                }, 300)
                            )
                        );
                } catch (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Mesa de Entrada',
                        text: `Se ha producido un error, vuelva a intentarlo por favor.`,
                        showClass: {
                            popup: 'animate__animated animate__fadeInDown'
                        },
                        hideClass: {
                            popup: 'animate__animated animate__fadeOutUp'
                        },
                        background: '#FFD1D1',
                        timer: 5000,
                        timerProgressBar: true
                    })
                }
                getNotas()
            } else if (result.isDenied) {
                Swal.fire({
                    icon: 'info',
                    iconColor: '#377D71',
                    title: 'Mesa de Entrada',
                    text: 'No se ha eliminad nada !',
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    },
                    background: '#CDF0EA',
                    timer: 5000,
                    timerProgressBar: true
                })
            }
        })
    }



    const logOut = () => {
        sessionStorage.removeItem('auth')
        sessionStorage.removeItem('user')
        setAuth(false)
    }

    return (
        < >
            <Tooltip title='Inicio'>
                <Fab aria-label="add" sx={{ position: 'fixed', bottom: 16, right: 12, backgroundColor: '#0d3b66' }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    <KeyboardArrowUpIcon />
                </Fab>
            </Tooltip>
            {/* className='animate__animated animate__fadeInLeft' */}
            <Box
                noValidate
                sx={{
                    display: 'flex',
                    justifyContent: 'right',
                    width: '90%',
                    margin: '0 auto'
                }}>
                <Tooltip title='Salir del Sistema'>
                    <IconButton color={'error'} onClick={() => logOut()} >
                        <LogoutIcon />
                    </IconButton>
                </Tooltip>
            </Box>
            <Container maxWidth='md' >
                {/* className='animate__animated animate__backInDown' */}
                <Box sx={{ bgcolor: '#271d2e', borderRadius: 2 }} >
                    <Typography variant="h2" gutterBottom sx={{ color: "white", textAlign: "center", mb: '50px', boxShadow: 5, borderRadius: 2 }}>
                        Mesa de Entrada y  Salidas
                    </Typography>

                </Box>

            </Container>
            <Container maxWidth='xl' >
                {/* className='animate__animated animate__fadeInDown' */}
                <Box

                    noValidate
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '90%',
                        margin: '0 auto',
                        gridTemplateColumns: { md: 'repeat(3, 1fr)' }
                    }}
                >
                    <CustomSelect llave='tipo' valor={tipo} label='Tipo:' nombre='tipo' destinos={tipos} textAlign='center' bgcLight='#f7efed' bgcFocused='#AEBDCA' bgcHover='#AEBDCA' handleInputChange={handleInputChange} ancho={150} />
                    <CustomTextField onClick={() => numeroNota()} onFocus={() => numeroNota()} llave='numero' valor={numero} label='Nº:' nombre='numero' mb={16} textAlign='center' textTransform='uppercase' ancho={100} bgcLight='#f7efed' bgcFocused='#AEBDCA' bgcHover='#AEBDCA' handleInputChange={handleInputChange} />
                    <CustomTextField llave='fojas' valor={fojas || sinFojas} label='Fojas:' nombre='fojas' textAlign='center' textTransform='uppercase' ancho={80} bgcLight='#f7efed' bgcFocused='#AEBDCA' bgcHover='#AEBDCA' handleInputChange={handleInputChange} />
                    <CustomTextField llave='letra' valor={letra} label='Letra:' nombre='letra' textAlign='center' textTransform='uppercase' ancho={80} bgcLight='#f7efed' bgcFocused='#AEBDCA' bgcHover='#AEBDCA' handleInputChange={handleInputChange} />
                    <CustomTextField llave='fecha' valor={fecha || hoy} label='Fecha:' nombre='fecha' textAlign='center' ancho={120} bgcLight='#f7efed' bgcFocused='#AEBDCA' bgcHover='#AEBDCA' handleInputChange={handleInputChange} />
                    <CustomTextField llave='horas' valor={horas || hora} label='Hora:' nombre='horas' textAlign='center' ancho={120} bgcLight='#f7efed' bgcFocused='#AEBDCA' bgcHover='#AEBDCA' handleInputChange={handleInputChange} />
                    <CustomTextField llave='firmante' valor={firmante} label='Presentado por:' nombre='firmante' mb={16} textAlign='center' textTransform='capitalize' bgcLight='#f7efed' bgcFocused='#AEBDCA' bgcHover='#AEBDCA' handleInputChange={handleInputChange} />
                    <CustomSelect llave='destino' valor={destino} label='Dirigido a:' nombre='destino' destinos={destinos} textAlign='center' bgcLight='#f7efed' bgcFocused='#AEBDCA' bgcHover='#AEBDCA' handleInputChange={handleInputChange} />

                </Box>
                {/* className='animate__animated animate__fadeInDown' */}
                <Box

                    noValidate
                    sx={{
                        display: 'flex',
                        // gridTemplateColumns: { md: 'repeat(3, 1fr)' },
                        justifyContent: 'center',
                        width: '90%',
                        margin: '0 auto',
                    }}
                >
                    <CustomTextField llave='extracto' valor={extracto} label='Extracto:' nombre='extracto' rows={4} labelAlign='center' ancho={'100%'} bgcLight='#f7efed' bgcFocused='#AEBDCA' bgcHover='#AEBDCA' handleInputChange={handleInputChange} />
                </Box>
            </Container>
            <Container maxWidth='sm'>
                <Box

                    display='flex'
                    justifyContent='space-evenly'
                    sx={{ mt: 3, mb: 3 }}
                >
                    {/* className='animate__animated animate__fadeInLeft' */}
                    <Button

                        onClick={() => { reset(); setTextbuttGuardar('Guardar') }}
                        variant="outlined"
                        disabled={false}
                        size="large"
                        startIcon={<CancelIcon />}
                        color='error'
                    >
                        Cancelar
                    </Button>
                    {/* className='animate__animated animate__fadeInRight' */}
                    <Button

                        type="buttom"
                        onClick={() => textbuttGuardar === 'Guardar' ? handleSubmit() : handleUpdate()}
                        variant="outlined"
                        size="large"
                        startIcon={<SaveOutlinedIcon />}
                        color='success'
                    >
                        {textbuttGuardar}
                    </Button>
                </Box>
            </Container>

            <Divider />

            {/* disableGutters	bool	false	If true, the left and right padding is removed. */}
            <Container maxWidth='sm' >
                {/* className='animate__animated animate__backInUp' */}
                <Box sx={{ bgcolor: '#271d2e', borderRadius: 2 }} >
                    <Typography variant="h2" gutterBottom sx={{ color: 'white', textAlign: "center", mt: '20px', mb: '20px', boxShadow: 5, borderRadius: 2 }}>
                        Buscar
                    </Typography>
                </Box>
            </Container>
            <Container maxWidth='lg'>
                {/* className='animate__animated animate__fadeInUp' */}
                <Box display='flex' justifyContent='center' >
                    {/* <CustomSelect llave='filtroTipo' valor={filtroTipo} label='Tipo:' nombre='filtroTipo' destinos={tipos} textAlign='center' bgcLight='#7895B2' bgcFocused='#AEBDCA' bgcHover='#AEBDCA' handleInputChange={handleInputChange} ancho={150} />
                    <CustomSelect llave='filtroDestino' valor={filtroDestino} label='Dirigido a:' nombre='filtroDestino' destinos={destinos} textAlign='center' bgcLight='#7895B2' bgcFocused='#AEBDCA' bgcHover='#AEBDCA' handleInputChange={handleInputChange} /> */}
                    <CustomTextField llave='filtroFirmante' valor={filtroFirmante} label='Presentado por:' nombre='filtroFirmante' mb={16} textAlign='center' textTransform='capitalize' bgcLight='#f7efed' bgcFocused='#AEBDCA' bgcHover='#AEBDCA' handleInputChange={handleInputChange} />
                    <CustomTextField llave='filtroExtracto' valor={filtroExtracto} label='Extracto:' nombre='filtroExtracto' rows={0} ancho={'20%'} bgcLight='#f7efed' bgcFocused='#AEBDCA' bgcHover='#AEBDCA' handleInputChange={handleInputChange} />
                </Box>
                <Box
                    display='flex' justifyContent='center'
                // className='animate__animated animate__fadeInDown'

                >
                    <Button
                        onClick={() => { resetFilter(); reset() }}
                        variant="outlined"
                        disabled={false}
                        size="large"
                        startIcon={<FilterListOffIcon />}
                        color='error'
                        sx={{ mb: 3 }}
                    >
                        Limpiar Filtros
                    </Button>

                </Box>
            </Container>

            <Divider sx={{ mb: 3 }} />
            <Container maxWidth='lg'>
                <Box
                    display='flex' justifyContent='center'
                // className='animate__animated animate__fadeInDown'

                >
                    <CustomTextField llave='fechaPdf' valor={fechaPdf || hoy} label='Fecha:' nombre='fechaPdf' textAlign='center' ancho={120} bgcLight='#f7efed' bgcFocused='#AEBDCA' bgcHover='#AEBDCA' handleInputChange={handleInputChange} />
                    <ThemeProvider theme={theme}>
                        <ToolTip title='Imprimir'><IconButton sx={{ ml: 3 }} color="hijos" aria-label="print" onClick={() => PrintTable(notas, fechaPdf, hoy)}>
                            <PrintIcon />
                        </IconButton></ToolTip>
                    </ThemeProvider>
                </Box>
            </Container>
            <Divider sx={{ mb: 3, mt: 3 }} />
            {/* className='animate__animated animate__fadeInUp' */}
            <TableContainer component={Paper}  >
                <Table id='tabla' stickyHeader size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>

                            <StyledTableCell align='center'>Tipo</StyledTableCell>
                            <StyledTableCell align='center'>Nº Nota</StyledTableCell>
                            <StyledTableCell align='center'>Letra</StyledTableCell>
                            <StyledTableCell align='center'>Fojas</StyledTableCell>
                            <StyledTableCell align='center'>Fecha</StyledTableCell>
                            <StyledTableCell align='center'>Hora</StyledTableCell>
                            <StyledTableCell align='center'>Firmante</StyledTableCell>
                            <StyledTableCell align='center'>Extracto</StyledTableCell>
                            <StyledTableCell align='center'>Destino</StyledTableCell>
                            <StyledTableCell align='center'>Acciones</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {useMemo(() => ((notasFiltradas.length > 0) ? notasFiltradas : notas).map((row) => (

                            <StyledTableRow key={row.id}>

                                <StyledTableCell align='center'>{row.tipo}</StyledTableCell>
                                <StyledTableCell align='center'>{row.numero}</StyledTableCell>
                                <StyledTableCell align='center'>{row.letra}</StyledTableCell>
                                <StyledTableCell align='center'>{row.fojas}</StyledTableCell>
                                <StyledTableCell align='center'>{row.fecha}</StyledTableCell>
                                <StyledTableCell align='center'>{row.hora}</StyledTableCell>
                                <StyledTableCell align='center'>{row.firmante}</StyledTableCell>
                                <StyledTableCell align='center'>{row.extracto}</StyledTableCell>
                                <StyledTableCell align='center'>{row.para}</StyledTableCell>
                                <StyledTableCell align='center'>
                                    <ThemeProvider theme={theme}>
                                        <ToolTip title='Editar'><IconButton color='editar' aria-label="edit" onClick={() => handleEdit(row.id, row.tipo, row.numero, row.letra, row.fojas, row.fecha, row.hora, row.firmante, row.extracto, row.para)}>
                                            <EditIcon />
                                        </IconButton></ToolTip>
                                        <ToolTip title='Eliminar'><IconButton aria-label="delete" color='error' onClick={() => handleDelete(row.id)}>
                                            <DeleteForeverIcon />
                                        </IconButton></ToolTip>
                                        {/* <ToolTip title='Imprimir'><IconButton color='hijos' aria-label="edit" onClick={() => Comprobante(row.tipo, row.numero, row.letra, row.fojas, row.fecha, row.hora, row.firmante)}>
                                            <PrintIcon />
                                        </IconButton></ToolTip> */}
                                    </ThemeProvider>
                                </StyledTableCell>

                            </StyledTableRow>
                        )), [notas, notasFiltradas])}
                    </TableBody>
                </Table>
            </TableContainer>

        </>
    )
}
