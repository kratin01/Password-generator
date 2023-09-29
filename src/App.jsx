import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [length, setlength] = useState(8);
  const [numallow, setnumallow] = useState(false);
  const [charallow, setcharallow] = useState(false);
  const [password, setpassword] = useState("");

  const passgene = useCallback(() => {
    let pass = "";
    let string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numallow) string += "0123456789";
    if (charallow) string += "!@#$%^&*()_+=";
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * string.length + 1);
      pass += string.charAt(char);
    }
    setpassword(pass);
  }, [length, numallow, charallow, setpassword]);

  const copypas=useCallback(()=>{
    passwordref.current?.select()
    passwordref.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(() => {
    passgene();
  }, [length, numallow, charallow, passgene]);

  const passwordref = useRef(null)

  
  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-[#faedcd] text-[#a7733f]">
        <h1 className="text-[#b08968] text-center my-3 font-bold text-xl">
          Password generator
        </h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
            ref={passwordref}


          />
          <button onClick={copypas} className=" outline-none font-bold py-2 px-3 bg-[#fcd5ce] shrink-0">
            copy
          </button>
        </div>

        <div className="flex text-sm gap-x-2">
          {/* ----------------------------------------------------------------- */}
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={4}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setlength(e.target.value);
              }}
            />
            <label>Length: {length}</label>
          </div>
          {/* ----------------------------------------------------------------- */}
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numallow}
              className=" cursor-pointer"
              id="numin"
              onChange={() => {
                setnumallow((prev) => !prev);
              }}
            />
            <label htmlFor="numin">NUMBER</label>
          </div>
          {/* ----------------------------------------------------------------- */}
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charallow}
              className=" cursor-pointer"
              id="chin"
              onChange={() => {
                setcharallow((prev) => !prev);
              }}
            />
            <label htmlFor="chin">CHARACTERS</label>
          </div>
          {/* ----------------------------------------------------------------- */}
        </div>
      </div>
    </>
  );
}

export default App;
