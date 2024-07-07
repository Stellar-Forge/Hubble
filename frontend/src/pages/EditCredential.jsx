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
import { MainNavbar } from "../components/MainNavbar";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { jwtAuthAtom, jwtAuthTrigger } from "../store/atoms/jwtTokenAtom";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
   
export function EditCredential() {
    
    const oldPassRef = useRef()
    const newPassRef = useRef()
    const [response, setResponse] = useState("") 

    useEffect(()=>{
        authTrigger(c => c+1)
    }, [])

    const navigate = useNavigate()
    const authTrigger = useSetRecoilState(jwtAuthTrigger)
    const authStatus = useRecoilValue(jwtAuthAtom)
    
    async function updatePassword() {
        const oldPass = oldPassRef.current.children[0].value
        const newPass = newPassRef.current.children[0].value

        const res = await axios({
            method: "put",
            url: "http://localhost:3000/user/updatecred",
            headers: {authorization: localStorage.getItem("jwtToken")},
            data: {
                password: oldPass,
                newpassword: newPass
            }
        })
        
        setResponse(res.data.msg)
    }

    if (authStatus == "Allowed") {
        return (
            <div>
            <MainNavbar /> <br/><br/><br/><br/>
            <Card className="w-96">
                <CardHeader
                  variant="gradient"
                  color="gray"
                  className="mb-4 grid h-28 place-items-center"
                >
                  <Typography variant="h5" color="white">
                    Change Your Password
                  </Typography>
                </CardHeader>
                <CardBody className="flex flex-col gap-4">
                  <Input ref={oldPassRef} label="Old Password" size="lg" />
                  <Input ref={newPassRef} label="New Password" size="lg" />
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
                  </div>
                </CardBody>
                <CardFooter className="pt-0">
                    <Typography variant="small" color="red" className="mt-6 flex justify-left ">
                        {response}
                    </Typography>
                  <Button onClick={updatePassword} variant="gradient" fullWidth>
                    Update Password 
                  </Button>
                    <Typography
                      as="a"
                      href="#signup"
                      variant="small"
                      color="blue-gray"
                      className="ml-1 font-bold mt-6 flex justify-center"
                    >Forgot Password?
                  </Typography>
                </CardFooter>
            </Card>
            </div>
            );

    } else {
        useEffect(()=>{
            navigate("/login")
        }, [])
        return <>
        Access Denied !
        </>
    }













  }