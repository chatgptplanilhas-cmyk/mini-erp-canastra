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
