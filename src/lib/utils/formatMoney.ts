export const formatMoney = (value: number, currency = "$") => `${currency}${value.toFixed(2)}`;
