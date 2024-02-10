import { useContext } from "react";
import { countContext } from "./Context";

export function Button() {
  console.log("Rendering Button");

  const { setCount } = useContext(countContext);
  return (
    <>
      <button
        onClick={() => {
          setCount((count) => count + 1);
        }}
      >
        Increase Count
      </button>
    </>
  );
}
