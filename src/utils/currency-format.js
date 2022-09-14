export default function currencyFormat(price) {
  if (price) {
    const productFormat = Intl.NumberFormat("es-CO", {
      currency: price.currency,
      decimal: price.decimals,
    });

    return productFormat.format(price.amount);
  }
}
