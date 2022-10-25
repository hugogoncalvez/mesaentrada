import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable';

const PrintTable = (notas, fechaPdf, hoy) => {

    const addFooters = pdf => {
        const pageCount = pdf.internal.getNumberOfPages()

        const centerPage = pdf.internal.pageSize.width / 2

        pdf.setFont('helvetica', 'italic')
        pdf.setFontSize(8)
        for (var i = 1; i <= pageCount; i++) {
            pdf.setPage(i)
            pdf.text('Página ' + String(i) + ' de ' + String(pageCount), centerPage, 200, {
                align: 'center'
            })
        }
    }

    const pdf = new jsPDF({
        orientation: 'landscape'
    })

    const nombre = (fechaPdf || hoy)

    const notasDia = notas.filter(nota => nota.fecha === nombre)



    autoTable(pdf, {
        theme: 'grid',
        margin: { horizontal: 5, bottom: 13, top: 8 },
        bodyStyles: { lineColor: [0, 0, 0], valign: 'middle', },
        alternateRowStyles: { fillColor: [234, 234, 234] },
        headStyles: {
            fillColor: [178, 178, 178],
            textColor: [0, 0, 0],
            fontSize: 8,
            padding: 0,
            halign: 'center',
            valign: 'middle',
            lineColor: 50,
            lineWidth: 0.3
        },
        columnStyles: { 0: { halign: 'center' }, 1: { halign: 'center' }, 2: { halign: 'center' }, 3: { halign: 'center' }, 4: { halign: 'center', fontStyle: 'bold' }, 5: { halign: 'center' }, 8: { halign: 'center' } },
        head: [['Tipo', 'Nº Nota', 'Letra', 'Fojas', 'Fecha', 'Hora', 'Firmante', 'Extracto', 'Destino']],
        body: notasDia.map(nota => [nota.tipo, nota.numero, nota.letra, nota.fojas, nota.fecha, nota.hora, nota.firmante, nota.extracto, nota.para])
    })

    addFooters(pdf)

    pdf.save(nombre)
}

export default PrintTable