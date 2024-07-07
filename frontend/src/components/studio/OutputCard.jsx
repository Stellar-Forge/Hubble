import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
    Input
  } from "@material-tailwind/react";

import React from "react";
import { useRecoilValue } from "recoil";
import { selectedModelAtom } from "../../store/atoms/selectedModelAtom";
 
export function OutputCard() {

  const [inputPrompt, setInputPrompt] = React.useState("");
  const onChange = ({ target }) => setInputPrompt(target.value);

  const currentModel = useRecoilValue(selectedModelAtom)

  return (
    <Card className="mt-6 w-96">
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          {currentModel}
        </Typography>
        <Typography>
          The place is close to Barceloneta Beach and bus stop just 2 min by
          walk and near to &quot;Naviglio&quot; where you can enjoy the main
          night life in Barcelona.
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