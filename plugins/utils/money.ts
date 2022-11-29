export const $moneyFormat = (money: number) => {
  const fotmatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  })
  return fotmatter.format(money)
}
