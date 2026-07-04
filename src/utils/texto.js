export function primeiroNome(nome) {
  return String(nome || '').trim().split(/\s+/)[0] || 'Cliente'
}
