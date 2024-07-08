import React, { useEffect } from "react";
import { Select, Option } from "@material-tailwind/react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { selectedModelAtom } from "../../store/atoms/selectedModelAtom";
import { currentWorkspaceAtom } from "../../store/atoms/workspaceAtom";
 
export function SelectModel() {

  const setCurrentModel = useSetRecoilState(selectedModelAtom)
  let currentModels = useRecoilValue(selectedModelAtom)
  const currentWorkspace = useRecoilValue(currentWorkspaceAtom)
  const currentModel = currentModels[currentWorkspace-1]
  let newArr = [...currentModels]

  return (
    <div className="w-72">
      <Select
        size="lg"
        label="Select AI Model"
        value={currentModel}
        onChange={(val) => setCurrentModel(() => {
          newArr[currentWorkspace-1] = val          
          return newArr     
        })}
      >
        <Option value="Midjourney">Midjourney</Option>
        <Option value="Gpt-4o">GPT-4o</Option>
        <Option value="Gemini">Gemini</Option>

      </Select>
    </div>
  );
}