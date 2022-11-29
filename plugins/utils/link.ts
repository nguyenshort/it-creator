export const $link = () => {
  return {
    product: (product: { slug: string }) => ({
      name: 'projects',
      params: { id: product.slug }
    })
  }
}
