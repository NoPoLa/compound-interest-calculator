import NumberInput from "components/common/NumberInput";
import {
  calculateCompoundInterest,
  CompoundFrequency,
} from "logic/compound-interest-calculator";
import { useState } from "react";

const Input = () => {
  const [initialDeposit, setInitialDeposit] = useState(1000);
  const [monthly, setMonthly] = useState(100);
  const [years, setYears] = useState(1);
  const [percent, setPercent] = useState(7);
  const [compoundFrequency, setCompoundFrequency] =
    useState<CompoundFrequency>("annually");

  const [result, setResult] = useState<number | null>(null);
  // function handleInitialDepositChanged(
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) {
  //   setInitialDeposit(Number(event.target.value) ?? 0);
  // }

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    const result = calculateCompoundInterest(
      initialDeposit,
      monthly,
      percent / 100,
      years,
      compoundFrequency
    );

    setResult(result);
  }

  return (
    <>
      <form className="flex flex-col">
        {/* <NumberInput
          label="Initial Deposit"
          name="initialDeposit"
          value={initialDeposit}
          onChange={setInitialDeposit}
        /> */}

        <label className="flex flex-col">
          Initial
          <input
            className="border-2 border-gray-500"
            type="number"
            value={initialDeposit}
            onChange={(e) => setInitialDeposit(Number(e.target.value))}
          />
        </label>
        <label className="flex flex-col">
          Monthly
          <input
            className="border-2 border-gray-500"
            type="number"
            onChange={(e) => setMonthly(Number(e.target.value))}
            value={monthly}
          />
        </label>
        <label className="flex flex-col">
          Percent
          <input
            className="border-2 border-gray-500"
            type="number"
            onChange={(e) => setPercent(Number(e.target.value))}
            value={percent}
          />
        </label>
        <label className="flex flex-col">
          Years
          <input
            className="border-2 border-gray-500"
            type="number"
            onChange={(e) => setYears(Number(e.target.value))}
            value={years}
          />
        </label>
        <label className="">
          Compound interval
          <select
            className="w-full border-2 border-gray-500"
            name="period"
            id="period"
            onChange={(e) =>
              setCompoundFrequency(e.target.value as CompoundFrequency)
            }
          >
            <option value="annually">annually</option>
            <option value="semi-annually">semi-annually</option>
            <option value="quarterly">quarterly</option>
            <option value="monthly">monthly</option>
          </select>
        </label>

        <button
          className="mt-6 border-2 border-gray-600 hover:bg-gray-200"
          onClick={handleClick}
        >
          Calc
        </button>
      </form>

      {result ? <div className="mt-6 text-lg">{result.toFixed(2)}$</div> : null}
    </>
  );
};

export default Input;
