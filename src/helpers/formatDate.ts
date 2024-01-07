export const formatDate = (date: Date, variant: "short" | "long"): string => {
  if (variant === "short") {
    // Formats date to Tues, 1/2/2024
    // options is type asserted as it is throwing an error. More infomartion on: https://stackoverflow.com/questions/73563950/what-exactly-is-the-typescript-linter-asking-for-in-this-case-where-an-object-r
    const dateOptions = {
      weekday: "short" as const,
      year: "numeric" as const,
      month: "numeric" as const,
      day: "numeric" as const,
    };

    const dateObj = new Date(date);

    // Shortens the year further from 2024 to 24 (final date format: 'Tues, 1/2,24')
    let shortYear = dateObj.getFullYear().toString().slice(-2);

    return dateObj
      .toLocaleString("en-US", dateOptions)
      .replace(/\d{4}/, shortYear);
  } else if (variant === "long") {
    // Formats date to 1/2/2024 00:00:00
    // options is type asserted as it is throwing an error. More infomartion on: https://stackoverflow.com/questions/73563950/what-exactly-is-the-typescript-linter-asking-for-in-this-case-where-an-object-r
    const dateOptions = {
      year: "numeric" as const,
      month: "numeric" as const,
      day: "numeric" as const,
      hour: "2-digit" as const,
      minute: "2-digit" as const,
      second: "2-digit" as const,
      hour12: false as const,
    };

    const dateObj = new Date(date);

    return dateObj.toLocaleString("en-US", dateOptions);
  } else {
    return date.toLocaleString("en-US");
  }
};
