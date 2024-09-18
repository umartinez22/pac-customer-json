import { useEffect, useState } from "react";
import "./App.css";
import data from "./data.json";

/**
 *  Rename all properties.
 * @param {String} jsonString the json string
 */
function renameProperties(jsonString) {
  return jsonString
    .replaceAll('"type"', '"@type"')
    .replaceAll('"referredType"', '"@referredType"')
    .replaceAll('"characteristics"', '"characteristic"')
    .replaceAll('"partyCharacteristics"', '"partyCharacteristic"')
    .replaceAll('"contactMediums"', '"contactMedium"')
    .replaceAll('"relatedParties"', '"relatedParty"')
    .replaceAll('"individualIdentifications"', '"individualIdentification"')
    .replaceAll(
      '"organizationIdentifications"',
      '"organizationIdentification"'
    );
}

/**
 * Transform the json string.
 * @param {String} jsonString the json string
 * @returns
 */
function transform(jsonString) {
  if (!jsonString) {
    return jsonString;
  }
  return renameProperties(jsonString);
}

function setUpContainerHeight() {
  document.getElementsByClassName("input-container")[0].style.height =
    window.innerHeight - 110 + "px";
}

function App() {
  let [dataJson, setDataJson] = useState({ ...data });

  useEffect(() => {
    window.addEventListener("resize", function () {
      setUpContainerHeight();
    });
    setUpContainerHeight();
  }, []);

  return (
    <div className="app content">
      <div className="input-container">
        <h1>Input</h1>
        <textarea
          className="textarea"
          value={JSON.stringify(dataJson, undefined, 4)}
          onChange={(e) => {
            try {
              setDataJson(JSON.parse(e.target.value ?? "{}"));
            } catch (e) {
              setDataJson(JSON.stringify(e.target));
            }
          }}
        ></textarea>
        <button
          className="button is-fullwidth"
          onClick={(e) => {
            navigator.clipboard
              .readText()
              .then((text) => {
                setDataJson(JSON.parse(text));
              })
              .catch((err) => {
                console.error("Failed to read clipboard contents: ", err);
              });
          }}
        >
          📄PASTE
        </button>
      </div>
      <div className="input-container">
        <h1>Result</h1>
        <textarea
          className="textarea"
          id="output"
          value={transform(
            JSON.stringify(
              dataJson && dataJson.arg0 ? dataJson.arg0 : dataJson,
              undefined,
              4
            )
          )}
        ></textarea>
        <button
          className="button is-fullwidth"
          onClick={() => {
            document.getElementById("output").select();
            document.execCommand("copy");
          }}
        >
          📝COPY
        </button>
      </div>
    </div>
  );
}

export default App;
