const ONES = [
  '', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve',
  'diez', 'once', 'doce', 'trece', 'catorce', 'quince', 'dieciséis', 'diecisiete', 'dieciocho', 'diecinueve',
]
const TENS = ['', '', 'veinte', 'treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa']
const HUNDREDS = [
  '', 'cien', 'doscientos', 'trescientos', 'cuatrocientos', 'quinientos',
  'seiscientos', 'setecientos', 'ochocientos', 'novecientos',
]
const VEINTIS = [
  '', 'veintiuno', 'veintidós', 'veintitrés', 'veinticuatro', 'veinticinco',
  'veintiséis', 'veintisiete', 'veintiocho', 'veintinueve',
]

export function numberToWordsES(n: number): string {
  if (n === 0) return 'cero'
  if (n < 20) return ONES[n]
  if (n < 30) return n === 20 ? 'veinte' : VEINTIS[n - 20]
  if (n < 100) {
    const u = n % 10
    return u === 0 ? TENS[Math.floor(n / 10)] : `${TENS[Math.floor(n / 10)]} y ${ONES[u]}`
  }
  if (n < 1000) {
    const h = Math.floor(n / 100)
    const rest = n % 100
    const hStr = h === 1 && rest > 0 ? 'ciento' : HUNDREDS[h]
    return rest === 0 ? hStr : `${hStr} ${numberToWordsES(rest)}`
  }
  if (n < 1_000_000) {
    const t = Math.floor(n / 1000)
    const rest = n % 1000
    const tStr = t === 1 ? 'mil' : `${numberToWordsES(t)} mil`
    return rest === 0 ? tStr : `${tStr} ${numberToWordsES(rest)}`
  }
  return n.toLocaleString('es')
}
