import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
    Input
  } from "@material-tailwind/react";

import { useState } from "react";
import { useRecoilValue } from "recoil";
import { selectedModelAtom } from "../../store/atoms/selectedModelAtom";
import axios from "axios";
import { currentWorkspaceAtom } from "../../store/atoms/workspaceAtom";
 
export function OutputCard() {

  const [inputPrompt, setInputPrompt] = useState("");
  const [response, setResponse] = useState([[],[],[]])
  const [workspaceUpdateResponse, setWorkspaceUpdateResponse] = useState("")

  const currentWorkspace = useRecoilValue(currentWorkspaceAtom)
  const currentModels = useRecoilValue(selectedModelAtom)
  const currentModel = currentModels[currentWorkspace-1]

  const onChange = ({ target }) => setInputPrompt(target.value);

  async function sendPrompt(inputPrompt) {

    const res = await axios({
      method: "post",
      url: "http://localhost:3000/user/studio",
      headers: {
        authorization: localStorage.getItem("jwtToken"),
        model: currentModel
      },
      data: {
        "prompt": inputPrompt
      }
    })

    setInputPrompt("")

    setResponse(resArr => {
      let newCurrentArr = [...resArr[currentWorkspace-1], res.data.msg]
      let newTotalArr = [...resArr]
      newTotalArr[currentWorkspace-1] = newCurrentArr
      return newTotalArr
    })

  }


  async function saveWorkspace() {

    const res = await axios({
      method: "post",
      url: "http://localhost:3000/user/workspace",
      headers: {
        authorization: localStorage.getItem("jwtToken"),
      },
      data: {
        model: currentModel,
        currentworkspace: currentWorkspace,
        output: saveCurrentWorkspaceOutput
      }
    })
    
    setResponse(arr => {
      let newArr = [...arr]
      newArr[currentWorkspace-1] = []
      return newArr
    })
    saveCurrentWorkspaceOutput = ""
    setWorkspaceUpdateResponse(res.data.msg)
  }

  const currentWorkspaceOutput = response[currentWorkspace-1]
  let saveCurrentWorkspaceOutput = ""
  currentWorkspaceOutput.map(e => saveCurrentWorkspaceOutput+=e+", ")
  return (
    <Card className="mt-6 w-96">
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          {currentModel}
        </Typography>
        <Typography>
          {currentWorkspaceOutput.map(e => <Typography>{e}</Typography>)}
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
          <div className="relative flex w-full max-w-[24rem]">
          <Input
          label="Enter Your Prompt"
          value={inputPrompt}
          onChange={onChange}
          className="pr-20"
          containerProps={{
          className: "min-w-0",
          }}
          />
          <Button
              onClick={() => sendPrompt(inputPrompt)}
              size="sm"
              color={inputPrompt ? "gray" : "blue-gray"}
              disabled={!inputPrompt}
              className="!absolute right-1 top-1 rounded">
              Enter
          </Button>
          </div>
          <Button
              onClick={() => saveWorkspace(response)}
              size="sm"
              color={"blue-gray"}
              className="!absolute right-1 top-1 rounded">
              Save
          </Button>
      </CardFooter>
    </Card>
  );
}