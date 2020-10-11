export const roundFloatingPoint = (number, places) => {
    const multiplier = Math.pow(10, places)
    return Math.round((number + Number.EPSILON) * multiplier) / multiplier
}
export const formatCurrency = (value, currency) => {
    return value
      .toLocaleString('en', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })
      .replace('0.00', '')
  }