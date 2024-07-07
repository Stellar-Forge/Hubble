import React from "react";
import { Select, Option } from "@material-tailwind/react";
import { useRecoilState } from "recoil";
import { selectedModelAtom } from "../../store/atoms/selectedModelAtom";
 
export function SelectModel() {
//   const [value, setValue] = React.useState("");
  const [currentModel, setCurrentModel] = useRecoilState(selectedModelAtom)
 
  return (
    <div className="w-72">
      <Select
        size="lg"
        label="Select AI Model"
        value={currentModel}
        onChange={(val) => setCurrentModel(val)}
      >
        <Option value="Midjourney">Midjourney</Option>
        <Option value="Gpt-4o">GPT-4o</Option>
        <Option value="Gemini">Gemini</Option>

      </Select>
    </div>
  );
}