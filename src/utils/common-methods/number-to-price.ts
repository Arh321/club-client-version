const numberToPersianPrice = (number: number, decimals = 0): string => {
  // Create a single Intl.NumberFormat instance for Toman
  const formatter = new Intl.NumberFormat("fa-IR", {
    style: "decimal",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  // Convert to Toman by dividing by 10
  const tomanValue = number / 10;

  // Format the number using the formatter
  const formattedNumber = formatter.format(tomanValue);

  return formattedNumber.replace(/\u200e/g, ""); // Remove any unwanted characters
};

export { numberToPersianPrice };
