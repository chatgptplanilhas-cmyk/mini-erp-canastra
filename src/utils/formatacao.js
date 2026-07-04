export function numero(valor) {
    const texto = String(valor ?? '').trim()

    if (!texto) return 0

    const limpo = texto
      .replace(/[^0-9,.-]/g, '')
      .replace(/\.(?=\d{3}(\D|$))/g, '')
      .replace(',', '.')

    return Number(limpo) || 0
  }
