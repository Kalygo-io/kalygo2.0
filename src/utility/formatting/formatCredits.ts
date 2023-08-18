import split from "lodash/split";
import round from "lodash/round";
import padStart from "lodash/padStart";
import padEnd from "lodash/padEnd";

export function formatCredits(m: number) {
  // round, and clamp the number. Then split and find dollars and cents

  //   clamp(m, 0, 9999.99)
  const rounded = round(m, 2).toFixed(2);

  let sp = split(rounded, "."),
    wholeCredits = padStart(sp[0], 4, "0"),
    fractions = padEnd(sp[1] || "0", 2, "0");

  return wholeCredits + "." + fractions;
}
