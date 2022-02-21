const currency = (params) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "IDR",
  });

  const newCurrency = formatter.format(params);
  return newCurrency;
};

const formatDate = (params) => {
  return new Date(params).toISOString().split("T")[0];
};

export { currency, formatDate };
