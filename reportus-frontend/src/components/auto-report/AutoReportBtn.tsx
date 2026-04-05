"use client";

import { useEffect, useState } from "react";

interface AutoReport {
  text: string;
  submit: Function;
  className: string;
}

const AutoReportBtn = ({ text, submit, className = "" }: AutoReport) => {
  const [btnClass, setBtnClass] = useState("");

  useEffect(() => {
    switch (className) {
      case "all_checked":
        setBtnClass("bg-green-300 hover:bg-green-400 text-slate-700");
        break;
      case "unchecked":
        setBtnClass("bg-slate-300 text-slate-200 cursor-not-allowed");
        break;
      default:
        setBtnClass("bg-slate-700 hover:bg-slate-800 text-white");
        break;
    }
  }, [className]);

  return (
    <button
      className={`${btnClass} font-bold py-2 px-4 rounded shadow-md`}
      onClick={() => submit()}
    >
      {" "}
      {text}
    </button>
  );
};

export default AutoReportBtn;
