import { TIME_ZONE_BRASIL } from '../constants/app'

export function partesDataBrasil(data = new Date()) {
    const partes = new Intl.DateTimeFormat('en-CA', {
      timeZone: TIME_ZONE_BRASIL,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).formatToParts(data)

    return {
      ano: partes.find((parte) => parte.type === 'year')?.value || '1970',
      mes: partes.find((parte) => parte.type === 'month')?.value || '01',
      dia: partes.find((parte) => parte.type === 'day')?.value || '01',
    }
  }

export function dataHoje() {
    const { ano, mes, dia } = partesDataBrasil()
    return `${ano}-${mes}-${dia}`
  }

export function inicioMesAtual() {
    const { ano, mes } = partesDataBrasil()
    return `${ano}-${mes}-01`
  }

export function dataISO(data) {
    const dataObj = data instanceof Date ? data : new Date(data)
    if (Number.isNaN(dataObj.getTime())) return dataHoje()
    const { ano, mes, dia } = partesDataBrasil(dataObj)
    return `${ano}-${mes}-${dia}`
  }

export function dentroPeriodoFiltro(data, inicio, fim) {
    if (!data) return false
    const valor = String(data).slice(0, 10)
    if (inicio && valor < inicio) return false
    if (fim && valor > fim) return false
    return true
  }
