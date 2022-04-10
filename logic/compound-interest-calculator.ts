export type compoundFrequency =
  | "monthly"
  | "quarterly"
  | "semi-annually"
  | "annually";

export type deposit = "start" | "end";

export function calculateCompoundInterest(
  initial: number,
  monthly: number,
  interest: number,
  time: number,
  frequency: compoundFrequency
  // deposit: deposit
) {
  const totalMonths = time * 12;
  const compoundInterval = getCompoundInterval(frequency);
  let total = initial;

  let intervalBalance = [initial];
  for (let i = 0; i < totalMonths; i++) {
    intervalBalance[i] = total + monthly;

    if ((i + 1) % compoundInterval === 0) {
      const intervalAverage =
        intervalBalance.reduce((x, y) => x + y) / compoundInterval;
      const intervalInterest =
        intervalAverage * (interest * (compoundInterval / 12));

      total += intervalInterest;
      intervalBalance = [];
    }

    // TODO : if deposit is end, then add the monthly payment to the total here insted
  }

  return total;
}

function getCompoundInterval(frequency: compoundFrequency) {
  switch (frequency) {
    case "monthly":
      return 1;
    case "quarterly":
      return 4;
    case "semi-annually":
      return 6;
    case "annually":
      return 12;
  }
}
