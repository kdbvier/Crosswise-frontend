const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']

const formatNumber = (number) => (number < 10 ? `0${number}` : number)

export const formatDate = (date = new Date()) => {
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
}

export const formatDateTime = (date = new Date()) => {
  return `${formatNumber(date.getDate())} ${months[date.getMonth()]} ${date.getFullYear()} - ${formatNumber(
    date.getHours(),
  )} : ${formatNumber(date.getMinutes())} : ${formatNumber(date.getSeconds())}`
}

export const isValidDate = (date) => {
  return !Number.isNaN(date.getFullYear())
}
