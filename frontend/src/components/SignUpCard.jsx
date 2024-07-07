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
            <Typography
              variant="small"
              color="gray"
              className="mt-2 flex items-center gap-1 font-normal"
              >
              <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="-mt-px h-4 w-4"
              >
              <path
                  fillRule="evenodd"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                  clipRule="evenodd"
              />
              </svg>
              Use at least 8 characters, one uppercase, one lowercase and one number.
            </Typography>
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

