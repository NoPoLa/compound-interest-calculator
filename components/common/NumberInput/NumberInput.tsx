import React, { useDebugValue, useEffect, useRef, useState } from "react";

interface NumberInputProps {
  defaultValue: number;
  onChange: (value: number) => void;
  label: string;
  name: string;
  min?: number;
  max?: number;
  step?: number;
}

const NumberInput = ({
  defaultValue,
  onChange,
  name,
  label,
  step = 1000,
}: NumberInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!inputRef?.current) {
      return;
    }

    inputRef.current.value = formatNumber(defaultValue);
  }, [defaultValue]);

  const handleOnChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.value || isNaN(Number(event.target.value[0]))) {
      event.target.value = "";
      return;
    }

    const parsedValue = parseAsNumber(event.target.value);
    event.target.value = formatNumber(parsedValue);

    onChange(parsedValue);
  };

  const handleDecrement = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!inputRef.current) {
      return;
    }

    const num = parseAsNumber(inputRef.current.value);
    const newValue = num - step;

    if (newValue < 0) {
      return;
    }

    inputRef.current.value = formatNumber(newValue);
    onChange(newValue);
  };

  const handleIncrement = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!inputRef.current) {
      return;
    }

    const num = parseAsNumber(inputRef.current.value);
    const newValue = num + step;

    inputRef.current.value = formatNumber(newValue);
    onChange(newValue);
  };

  return (
    <div>
      <span className="font-serif text-sm font-medium italic">{label}</span>
      <div className="mt-2 flex h-10 rounded border-gray-400">
        <button
          className="group z-10 -mr-1 rounded-l border-2 border-gray-400 bg-white px-4 outline-none hover:border-blue-600 hover:bg-blue-600 focus-visible:z-30 focus-visible:rounded-r focus-visible:border-[3px] focus-visible:border-blue-600"
          type="button"
          onClick={handleDecrement}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="m-auto h-5 w-5 text-gray-400 group-hover:text-white group-active:text-blue-600"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <input
          ref={inputRef}
          className="z-20 w-full appearance-none rounded border-y-2 border-x-2 border-gray-400 text-center text-lg font-medium text-gray-600 outline-none focus:border-y-2"
          placeholder="0"
          type="text"
          name={name}
          onChange={handleOnChanged}
        />
        <button
          className="group z-10 -ml-1 rounded-r border-2 border-gray-400 bg-white px-4 outline-none hover:border-blue-600 hover:bg-blue-600 focus:rounded-l focus-visible:z-30 focus-visible:border-[3px] focus-visible:border-blue-600"
          type="button"
          onClick={handleIncrement}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="m-auto h-5 w-5 text-gray-400 group-hover:text-white group-active:text-blue-600"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default NumberInput;

function parseAndFormat(value: string) {
  const num = parseAsNumber(value);
  const formatted = formatNumber(num);

  return formatted;
}

function formatNumber(value: number) {
  return value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
}

function parseAsNumber(value: string) {
  return Number(value.replace(/[^0-9]/g, ""));
}
