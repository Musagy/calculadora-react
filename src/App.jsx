import { useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const [saveNumber, setSaveNumber] = useState("");
  const [operator, setOperator] = useState("");

  function solution(operator) {
    let num1 = saveNumber === "" ? 0 : parseFloat(saveNumber);
    let num2 = input === "" ? 0 : parseFloat(input);

    const OPERATORS = {
      "+": (a, b) => a + b,
      "-": (a, b) => a - b,
      "*": (a, b) => a * b,
      "/": (a, b) => a / b,
      "%": (a, b) => (a / 100) * b,
    }

    const result = !!operator ? OPERATORS[operator](num1, num2) : num2;

    return result;
  }

  return (
    <div className="bg-[#1A1B28] w-full h-screen text-white grid place-content-center">
      <div className="bg-[#292939] w-full h-full rounded-xl overflow-hidden scale-[1.7]">
        <div className="bg-[#F92561] px-2 flex justify-between">
          <div className="w-[14px] flex py-0.5 gap-0.5 flex-col justify-center">
            {["100%", "60%", "100%"].map((lineWidth, i) => (
              <div
                key={i}
                className={`rounded-full bg-white w-[${lineWidth}] h-[2px]`}
              />
            ))}
          </div>
          Calculadora
        </div>
        <div className="px-2 pb-2 flex flex-col gap-2">
          <div>
            <div
              className={`${
                input.length <= 5 ? "text-lg" : input.length <= 10 && "text-md"
              } rounded-xl text-right opacity-60`}
            >
              {saveNumber === "" ? 0 : saveNumber}
            </div>
            <div className="flex justify-between">
              <h3 className="text-[#F92561]">{operator}</h3>
              <h2
                className={`${
                  input.length >= 10
                    ? ""
                    : input.length >= 5
                    ? "text-2xl"
                    : "text-5xl"
                } rounded-xl text-right`}
              >
                {input === "" ? 0 : input}
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-1.5">
            {[
              ["C", "i"],
              ["%", "i"],
              ["/", "i"],
              ["*", "i"],
              ["7", "n"],
              ["8", "n"],
              ["9", "n"],
              ["-", "i"],
              ["4", "n"],
              ["5", "n"],
              ["6", "n"],
              ["+", "i"],
              ["1", "n"],
              ["2", "n"],
              ["3", "n"],
              ["=", "s"],
              ["0", "n"],
              [".", "n"],
              ["<", "n"],
            ].map((key, i) => (
              <button
                key={i}
                className={`rounded w-8 h-full min-h-[32px] grid place-content-center bg-[${
                  key[1] == "i"
                    ? "#97979E"
                    : key[1] == "n"
                    ? "#3D3D4D"
                    : "#51B9DF"
                }] ${key[1] == "s" && "row-span-2"}`}
                onClick={() => {
                  if (key[1] == "n") {
                    if(key[0] == "<"){
                      setInput(input.substring(0, input.length - 1));
                    } else{
                      setInput(input + key[0]);
                    }
                  } else if (key[1] == "i") {
                    if (key[0] == "C") {
                      setInput("");
                      setSaveNumber("");
                      setOperator("");
                    } else {
                      setSaveNumber(solution(operator).toString());
                      setOperator(key[0]);
                      setInput("");
                    }
                  } else {
                    setInput(solution(operator).toString());
                    setSaveNumber("");
                    setOperator("");
                  }
                }}
              >
                {key[0]}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
