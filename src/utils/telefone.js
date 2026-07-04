export function limparTelefone(telefone) {
  return String(telefone || '').replace(/\D/g, '')
}
