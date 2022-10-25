import { useState } from "react"
import Swal from "sweetalert2";

export const useFilter = () => {
    const [notasFiltradas, setNotasFiltradas] = useState([])


    const Toast = Swal.mixin({
        toast: true,
        position: 'bottom',
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    });


    const resetFilter = () => {
        setNotasFiltradas([])
    }

    const getNotasFiltradas = (key, buscar = '', notas = []) => {

        let notasFil = []

        switch (key) {
            // case 'tipo':
            //     notasFil = (notasFiltradas.length > 0 ? notasFiltradas : notas).filter(nota => nota.tipo === buscar)
            //     setNotasFiltradas(notasFil)
            //     break;
            // case 'destino':
            //     notasFil = (notasFiltradas.length > 0 ? notasFiltradas : notas).filter(nota => nota.para === buscar)
            //     setNotasFiltradas(notasFil)
            //     break;
            case 'firmante':
                notasFil = (notasFiltradas.length > 0 ? notasFiltradas : notas).filter(nota => ((nota.firmante).toLowerCase()).includes(buscar.toLowerCase()))
                setNotasFiltradas(notasFil);
                (notasFil.length === 0) && Toast.fire({
                    icon: 'warning',
                    title: 'No hay coincidencia !!'
                })
                break;
            case 'extracto':
                notasFil = (notasFiltradas.length > 0 ? notasFiltradas : notas).filter(nota => ((nota.extracto).toLowerCase()).includes(buscar.toLowerCase()))
                setNotasFiltradas(notasFil);
                (notasFil.length === 0) && Toast.fire({
                    icon: 'warning',
                    title: 'No hay coincidencia !!'
                })

                break;
            default:
                setNotasFiltradas([])
                break;
        }

    }
    const handleFilter = (key, buscar, notas, values) => {
        
        const { filtroFirmante, filtroExtracto } = values

        if (typeof buscar !== 'undefined') {
            switch (key) {
                // case 'tipo':
                //     console.log('ENTRA AL HANDLE FILTER TIPO');
                //     // if (filtroDestino.length > 0) {
                //     //     console.log('ENTRA AL IF DEL HANDLEFILTER TIPO')
                //     //     console.log(key,buscar)
                //     //     getNotasFiltradas(key, buscar, notas)
                //     //     getNotasFiltradas('destino', filtroDestino, notas)
                //     // } else {
                //     getNotasFiltradas(key, buscar, notas)
                //     // }

                //     break;
                // case 'destino':
                //     console.log('ENTRA AL HANDLE FILTER DESTINO')

                //     getNotasFiltradas(key, buscar, notas)
                //     break;
                case 'firmante':
                    if (buscar) {
                        getNotasFiltradas(key, buscar, notas)
                        break
                    } else {
                        notasFiltradas.length = 0
                        setNotasFiltradas([])
                    }

                    if (filtroExtracto) {
                        getNotasFiltradas('extracto', filtroExtracto, notas)
                    }

                    break;
                case 'extracto':
                    if (buscar) {
                        getNotasFiltradas(key, buscar, notas)
                        break
                    } else {
                        notasFiltradas.length = 0
                        setNotasFiltradas([])
                    }

                    if (filtroFirmante) {
                        getNotasFiltradas('firmante', filtroFirmante, notas)
                    }

                    break;
                default:
                    break;
            }
        }
    }

    return [notasFiltradas, handleFilter, resetFilter]
}
