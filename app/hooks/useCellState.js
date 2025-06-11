export function useCellState(p1Moves, p2Moves) {
  const getCellValue = (index) => {
    if (p1Moves.includes(index)) return 'X'
    if (p2Moves.includes(index)) return '0'
    return ''
  }

  const getCellAge = (index) => {
    if (p1Moves[0] === index) return 'old'
    if (p1Moves[1] === index) return 'middle'
    if (p1Moves[2] === index) return 'young'

    if (p2Moves[0] === index) return 'old'
    if (p2Moves[1] === index) return 'middle'
    if (p2Moves[2] === index) return 'young'

    return ''
  }

  return {
    getCellValue,
    getCellAge
  }
} 