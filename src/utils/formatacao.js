export function numero(valor) {
    const texto = String(valor ?? '').trim()

    if (!texto) return 0

    const limpo = texto
      .replace(/[^0-9,.-]/g, '')
      .replace(/\.(?=\d{3}(\D|$))/g, '')
      .replace(',', '.')

    return Number(limpo) || 0
  }

export function moeda(valor) {
    return Number(valor || 0).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    })
  }

export function moedaInput(valor) {
    const numeroValor = numero(valor)

    if (!numeroValor) return ''

    return moeda(numeroValor)
  }

export function moedaInputCentavos(valor) {
    const digitos = String(valor || '').replace(/\D/g, '')

    if (!digitos) return ''

    return moeda(Number(digitos) / 100)
  }

export function percentual(valor) {
    return `${Number(valor || 0).toFixed(2).replace('.', ',')}%`
  }
