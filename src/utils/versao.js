export function normalizarVersao(valor) {
  return String(valor || '')
    .trim()
    .replace(/[^0-9.]/g, '')
}

export function compararVersoes(a, b) {
  const partesA = normalizarVersao(a).split('.').map((parte) => Number(parte) || 0)
  const partesB = normalizarVersao(b).split('.').map((parte) => Number(parte) || 0)
  const tamanho = Math.max(partesA.length, partesB.length)

  for (let indice = 0; indice < tamanho; indice += 1) {
    const numeroA = partesA[indice] || 0
    const numeroB = partesB[indice] || 0

    if (numeroA > numeroB) return 1
    if (numeroA < numeroB) return -1
  }

  return 0
}
