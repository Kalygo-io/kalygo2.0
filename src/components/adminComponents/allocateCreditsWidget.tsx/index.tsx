import axios from "axios";
import React, { useState } from "react";

export const AllocateCreditsWidget = () => {
  const [creditType, setCreditType] = useState("summary");
  const [btnLabel, setBtnLabel] = useState("Summary Credits");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  const allocateCredits = async () => {
    try {
      let apiEndpoint;
      if (creditType === "summary") {
        apiEndpoint = "/api/v1/allocate-summary-credits";
      } else if (creditType === "search") {
        apiEndpoint = "/api/v1/allocate-search-credits";
      } else if (creditType === "customRequest") {
        apiEndpoint = "/api/v1/allocate-custom-request-credits";
      }

      if (apiEndpoint) {
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_HOSTNAME}${apiEndpoint}`,
          {
            email: email,
            amount: amount,
          },
          { withCredentials: true }
        );
        setEmail("");
        setAmount(0);
        setErrorMessage("Succesful");
      }
    } catch (err) {
      setErrorMessage("Failed");
      console.log(err);
    }
  };

  return (
    <div className="mt-6 space-y-4">
      <div className="mt-2">
        <div>
          <input
            type="radio"
            id="summary-credits"
            name="credit-type"
            value="summary"
            checked={creditType === "summary"}
            onChange={() => setCreditType("summary")}
            className="mr-2 focus:ring-0"
          />
          <label htmlFor="summary-credits">Summary Credits</label>
        </div>
        <div>
          <input
            type="radio"
            id="search-credits"
            name="credit-type"
            value="search"
            checked={creditType === "search"}
            onChange={() => setCreditType("search")}
            className="mr-2 focus:ring-0"
          />
          <label htmlFor="search-credits">Search Credits</label>
        </div>
        <div>
          <input
            type="radio"
            id="custom-request-credits"
            name="credit-type"
            value="customRequest"
            checked={creditType === "customRequest"}
            onChange={() => setCreditType("customRequest")}
            className="mr-2 focus:ring-0"
          />
          <label htmlFor="custom-request-credits">Custom Request Credits</label>
        </div>
      </div>
      <div>
        <label
          htmlFor="email"
          className="block text-lg font-semibold text-gray-900"
        >
          Email:
        </label>
        <input
          id="email"
          type="email"
          className="mt-2 w-full p-2 border-gray-300 focus:ring-blue-500 focus:border-blue-500 rounded-md sm:text-lg"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label
          htmlFor="amount"
          className="block text-lg font-semibold text-gray-900"
        >
          Amount:
        </label>
        <input
          id="amount"
          type="number"
          className="mt-2 w-full p-2 border-gray-300 focus:ring-blue-500 focus:border-blue-500 rounded-md sm:text-lg"
          placeholder="Amount of credits"
          value={amount}
          onChange={(e) => setAmount(+e.target.value)}
        />
      </div>
      <button
        className="w-full px-4 py-2 mt-2 font-semibold text-white bg-orange-400 rounded-md hover:bg-orange-500"
        onClick={allocateCredits}
      >
        Allocate {btnLabel}
      </button>
      {errorMessage && (
        <p className="mt-2 font-bold text-lg text-center text-blue-500">
          {errorMessage}
        </p>
      )}
    </div>
  );
};
