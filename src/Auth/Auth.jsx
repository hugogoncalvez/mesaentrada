import React, { useState } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Fondo from '../assets/garupa.png'
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import isEmpty from 'validator/lib/isEmpty';
import axios from "axios";

function Copyright(props) {
  return (
    // className='animate__animated animate__jackInTheBox'
    <Typography  variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="#" >
        Informática
      </Link>{' '}
      2022
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

const URI = `http://${window.location.hostname}:8000/login/`;


export const Auth = () => {
  // const [loading, setLoading] = useState(false)
  const { setAuth, setUser } = useAuth();


  const [ErrUser, setErrUser] = useState(false)
  const [ErrPass, setErrPass] = useState(false)
  const [placeHolderUsuario, setPlaceHolderUsuario] = useState('')
  const [placeHolderPassword, setPlaceHolderPassword] = useState('')
 // const [loginNoOk, setLoginNoOk] = useState(false)

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget);

    let usuario = data.get('usuario').trim();
    let password = data.get('password').trim();
    let emptyUsuario = (isEmpty(usuario))
    let emptyPassword = (isEmpty(password))

   

    if (!emptyUsuario) {
      axios.get(URI + usuario)
        .then((res) => {

          if (res.statusText === 'OK' && res.data.msgError === '') {

            if (res.data[0].pass === password) {

              setAuth(true);
              setUser(usuario);
              sessionStorage.setItem('auth', true);
              sessionStorage.setItem('user', usuario);
              navigate('/home');

            } else {

              setErrUser(false)
              //setLoginNoOk(true)
              setErrPass(true)
              !emptyPassword ? setPlaceHolderPassword('La contraseña no es válida') : setPlaceHolderPassword('Ingrese una contraseña válida')

            }


          } else {

            setErrPass(false)
           // setLoginNoOk(true)
            setErrUser(true)
            setPlaceHolderUsuario('El usuario no es válido')



          }
        })
        .catch((err) => {

        })
    } else {
      setErrUser(true)
      setPlaceHolderUsuario('Ingrese un usuario')
     if (emptyPassword) {
       setErrPass(true) 
       setPlaceHolderPassword('Ingrese una contraseña')
     }else{
      setErrPass(false) 
     }
    }

  }


  return (
    <ThemeProvider theme={theme}>
      {/* className='animate__animated animate__fadeIn' */}
      <Grid  container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        {/* className='animate__animated animate__fadeInLeft' */}
        <Grid
          
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${Fondo})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'rigth',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Ingresar
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="usuario"
                label="Nombre de Usuario"
                name="usuario"
                autoComplete="user"
                autoFocus
                error={ErrUser}
                helperText={ErrUser && placeHolderUsuario}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                error={ErrPass}
                helperText={ErrPass && placeHolderPassword}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Login
              </Button>

              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
