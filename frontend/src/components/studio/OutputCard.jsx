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
 
export function OutputCard() {

  const [inputPrompt, setInputPrompt] = useState("");
  const [response, setResponse] = useState("")
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
    setResponse(res.data.msg)
  }

  const currentModel = useRecoilValue(selectedModelAtom)

  return (
    <Card className="mt-6 w-96">
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          {currentModel}
        </Typography>
        <Typography>
          {response}
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
      </CardFooter>
    </Card>
  );
}