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
import { useRef, useState } from "react";
import axios from "axios"
import { SignUpSuccessAlert } from "./SignUpSuccessAlert";


export function SignUpCard() {

    const [open, setOpen] = useState(false);
    const [response, setResponse] = useState("")

    const emailInput = useRef()
    const usernameInput = useRef()
    const passwordInput = useRef()

    async function sendData() {

        const res = await axios({
            method: "post",
            url: "http://localhost:3000/user/signup",
            headers: {}, 
            data: {
                email: emailInput.current.children[0].value,
                username: usernameInput.current.children[0].value,
                password: passwordInput.current.children[0].value
            }
          })

        if (res.data.msg == "User created successfully!") {
          setResponse("")
          setOpen(true)
        } else {
          setResponse(res.data.msg)
        }
    }

    return (
      <>
        <SignUpSuccessAlert open={open} setOpen={setOpen}/> <br/> <br/>
        <Card className="w-96">
          <CardHeader
            variant="gradient"
            color="gray"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              Sign Up
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input ref={emailInput} label="Email" size="lg" />
            <Input ref={usernameInput} label="Username" size="lg" />
            <Input ref={passwordInput} label="Password" size="lg" />
            <div className="-ml-2.5">
              <Checkbox label="Remember Me" />
            </div>
          </CardBody>
          <CardFooter className="pt-0">
          <Typography variant="small" color="red" className="mt-6 flex justify-left ">
            {response}
          </Typography>
            <Button onClick={sendData} variant="gradient" fullWidth>
            Sign Up
            </Button>
            <Typography variant="small" className="mt-6 flex justify-center">
              Already have an account?
              <Typography
                as="a"
                href="/login"
                variant="small"
                color="blue-gray"
                className="ml-1 font-bold"
              >
                Log In
              </Typography>
            </Typography>
          </CardFooter>
        </Card>
      </>
    );
  }

