import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Checkbox,
    Button,
  } from "@material-tailwind/react";

import { useRef } from "react";
import axios from "axios"
   
  export function LoginCard() {

    const usernameInput = useRef()
    const passwordInput = useRef()

    async function sendData() {

        const res = await axios({
            method: "post",
            url: "http://localhost:3000/user/signin",
            headers: {}, 
            data: {
                username: usernameInput.current.children[1].value,
                password: passwordInput.current.children[0].value
            }
          })
        
        console.log(res.data)

    }

    return (
      <Card className="w-96">
        <CardHeader
          variant="gradient"
          color="gray"
          className="mb-4 grid h-28 place-items-center"
        >
          <Typography variant="h3" color="white">
            Log In
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          <Input ref={usernameInput} label="Username" size="lg" />
          <Input ref={passwordInput} label="Password" size="lg" />
          <div className="-ml-2.5">
            <Checkbox label="Remember Me" />
          </div>
        </CardBody>
        <CardFooter className="pt-0">
          <Button onClick={sendData} variant="gradient" fullWidth>
            Log In
          </Button>
          <Typography variant="small" className="mt-6 flex justify-center">
            Don&apos;t have an account?
            <Typography
              as="a"
              href="/signup"
              variant="small"
              color="blue-gray"
              className="ml-1 font-bold"
            >
              Sign up
            </Typography>
          </Typography>
        </CardFooter>
      </Card>
    );
  }