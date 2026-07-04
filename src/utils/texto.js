export function primeiroNome(nome) {
  return String(nome || '').trim().split(/\s+/)[0] || 'Cliente'
}

export function limparPontuacaoTexto(texto) {
    return normalizarTexto(texto).replace(/[^a-z0-9\s,./-]/g, ' ')
  }

export function normalizarTexto(valor) {
    return String(valor || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim()
  }

export function contemTermos(textoBase, termoBusca) {
    const texto = normalizarTexto(textoBase)
    const termos = normalizarTexto(termoBusca).split(/\s+/).filter(Boolean)

    if (termos.length === 0) return true

    return termos.every((termo) => texto.includes(termo))
  }
