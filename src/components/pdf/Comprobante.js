import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
import { muniLogo, logoMS } from './logo'

const Comprobante = async (tipo, numeroNota, letra, fojas, fecha, hora, firmante) => {

    pdfMake.vfs = pdfFonts.pdfMake.vfs;

    //const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

    let destino = '';
    (tipo === 'Entrada') ? destino = 'Entró' : destino = 'Salió'
   // const dia = (fecha).substring(0, 2)
    //const mes = (fecha).substring(3, 5)
    const anio = (fecha).substring(6)

    //const intervino = sessionStorage.getItem('user')
   // const letraMes = meses[parseInt(mes) - 1]

    const encabezado = {

        table: {
            widths: ['25%', '*', '25%'],
            heights: [100, 100, 100],

            body: [
                [
                    {
                        image: muniLogo,
                        width: 60,
                        height: 70,
                        margin: [0, 10, 0, 0],
                        alignment: 'center',
                        border: [false, false, false, true],

                    },
                    {
                        text: 'Mesa de Entrada y Salidas\nMunicipalidad de Garupá',
                        fontSize: 18,
                        bold: true,
                        alignment: 'center',
                        margin: [0, 20, 0, 0],
                        border: [false, false, false, true],

                    },
                    {
                        image: logoMS,
                        width: 110,
                        height: 70,
                        margin: [0, 10, 0, 0],
                        alignment: 'center',
                        border: [false, false, false, true],

                    }
                ]
            ]
        }
    }

    const cuerpo = {
        table: {
            widths: ['*', '*', '*'],
            // heights: [100, 100, 100],

            body: [
                [
                    {
                        text:[ 'Nota Nº:  ', {text: numeroNota, fontSize:16, bold: true,}],
                        fontSize: 12,
                        bold: false,
                        alignment: 'center',
                        margin: [0, 0, 0, 10],
                        border: [true, true, false, false],

                    },
                    {
                        text:[ 'Letra:  ', {text: letra, fontSize:16, bold: true,}],
                        fontSize: 12,
                        alignment: 'center',
                        margin: [0, 0, 0, 10],
                        border: [false, true, false, false],

                    },
                    {
                        text:[ 'Año Nº:  ', {text: anio, fontSize:16, bold: true,}],
                        fontSize: 12,
                        alignment: 'center',
                        margin: [0, 0, 0, 10],
                        border: [false, true, true, false],

                    }
                ],
                [
                    {
                        text:[ `${destino}:  `, {text: fecha, fontSize:16, bold: true,}],
                        colSpan: 2,
                        fontSize: 12,
                        alignment: 'left',
                        margin: [42, 0, 0, 10],
                        border: [true, false, false, false],

                    },
                    {},
                    {
                        text:[ 'Hora:  ', {text: hora, fontSize:16, bold: true,}],
                        fontSize: 12,
                        alignment: 'center',
                        margin: [0, 0, 8, 10],
                        border: [false, false, true, false],

                    }
                ],
                [
                    {
                        text:[ 'Presentado por:  ', {text: firmante, fontSize:16, bold: true,}],
                        colSpan: 2,
                        fontSize: 12,
                        alignment: 'left',
                        margin: [42, 0, 0, 14],
                        border: [true, false, false, false],

                    },
                    {},
                    {
                        text:[ 'Adj.Fs.:  ', {text: fojas, fontSize:16, bold: true,}],
                        fontSize: 12,
                        alignment: 'center',
                        margin: [0, 0, 37, 14],
                        border: [false, false, true, false],
                    }

                ],
                [
                    {
                        text: `Intervino: ____________________________________________________________________`,
                        colSpan: 3,
                        fontSize: 12,
                        bold: false,
                        alignment: 'left',
                        margin: [42, 0, 0, 0],
                        border: [true, false, true, true],

                    },
                    {},
                    {}
                ]
            ]
        }
    }
    // var headers = {
    //     fila_0: {
    //         col_1: { text: 'N° de inventario', style: 'tableHeader', alignment: 'center' },
    //         col_2: { text: 'Tipo', style: 'tableHeader', alignment: 'center' },
    //         col_3: { text: 'Descripción', style: 'tableHeader', alignment: 'center' },
    //         col_4: { text: 'Marca', style: 'tableHeader', alignment: 'center' },
    //         col_5: { text: 'N° de serie', style: 'tableHeader', alignment: 'center' },
    //         col_6: { text: 'Estado', style: 'tableHeader', alignment: 'center' }
    //     },
    // }


    // var elementos = [];

    // for (var key in headers) {
    //     if (headers.hasOwnProperty(key)) {
    //         var header = headers[key];
    //         var row = [];
    //         row.push({ text: header.col_1, alignment: 'center' });
    //         row.push({ text: header.col_2, alignment: 'center' });
    //         row.push({ text: header.col_3, alignment: 'center' });
    //         row.push({ text: header.col_4, alignment: 'center' });
    //         row.push({ text: header.col_5, alignment: 'center' });
    //         row.push({ text: header.col_6, alignment: 'center' });
    //         elementos.push(row);
    //     }
    // }
    // for (var key2 in items) {
    //     if (items.hasOwnProperty(key2)) {
    //         var data = items[key2];
    //         var row2 = [];
    //         row2.push({ text: data.num_inventario, alignment: 'center' });
    //         row2.push({ text: data.tipo, alignment: 'center' });
    //         row2.push({ text: data.descripcion, alignment: 'center' });
    //         row2.push({ text: data.marca, alignment: 'center' });
    //         row2.push({ text: data.num_serie, alignment: 'center' });
    //         row2.push({ text: data.estado, alignment: 'center' });
    //         elementos.push(row2);
    //     }
    // }

    const dd = {
        // pageSize: {
        //     width: 595.28,
        //     height: 420.95
        //   },
        pageMargins: [40, 155, 40, 55],
        //pageOrientation: 'landscape',
        header: encabezado,
        // footer: function (currentPage, pageCount) {
        //     return { text: 'Pagina ' + currentPage.toString() + ' de ' + pageCount, alignment: 'center', margin: [0, 30, 0, 0] };
        // },
        content: [
            // {
            //     text: `Garupá, Misiones, ${dia} de ${letraMes} del año ${anio}.-\n\n`,
            //     fontSize: 13,
            //     bold: false,
            //     alignment: 'right',
            // },

            // '\n\n',

            cuerpo,

            // {
            //     text: `Nota Nº: ${numeroNota}`,
            //     fontSize: 12,
            //     bold: false,
            //     alignment: 'left',
            // },
            // {
            //     text: `\nLetra: ${letra}`,
            //     fontSize: 12,
            //     bold: false,
            //     alignment: 'left',
            // },
            // {
            //     text: `\nAño: ${anio}`,
            //     fontSize: 12,
            //     bold: false,
            //     alignment: 'left',
            // },
            // {
            //     text: `\nEntró: ${fecha}`,
            //     fontSize: 12,
            //     bold: false,
            //     alignment: 'left',
            // },
            // {
            //     text: `\nSalió: ${fecha}`,
            //     fontSize: 12,
            //     bold: false,
            //     alignment: 'left',
            // },
            // {
            //     text: `\nPresentado por: ${firmante}`,
            //     fontSize: 12,
            //     bold: false,
            //     alignment: 'left',
            // },
            // {
            //     text: `\nintervino:________________________________________________`,
            //     fontSize: 12,
            //     bold: false,
            //     alignment: 'left',
            // }
        ],
        styles: {
            header: {
                fontSize: 28,
                bold: true
            },
            subheader: {
                fontSize: 15,
                bold: true
            },
            quote: {
                italics: true
            },
            small: {
                fontSize: 8
            },
            sta: {
                fontSize: 11,
                bold: false,
                alignment: 'justify'
            }
        }
    }



    pdfMake.createPdf(dd).open();
}
export default Comprobante