export const insertThousandSeparator = (_input = '') => {
  return _input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
