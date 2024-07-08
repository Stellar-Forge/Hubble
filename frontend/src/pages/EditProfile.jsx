import React, { useEffect, useRef } from "react";

// @material-tailwind/react
import {
  Input,
  Typography,
  Select,
  Option,
  Popover,
  PopoverHandler,
  PopoverContent,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter
} from "@material-tailwind/react";

// day picker
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";

import { useRecoilValue, useSetRecoilState } from "recoil";
import { jwtAuthAtom, jwtAuthTrigger } from "../store/atoms/jwtTokenAtom";
import { useNavigate } from "react-router-dom";

// @heroicons/react
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { MainNavbar } from "../components/MainNavbar";
import axios from "axios";

function EditProfile() {
    const [date, setDate] = React.useState();

    const emailRef = useRef()
    const passwordRef = useRef()
    const wrongInputRef = useRef()

    useEffect(()=>{
        authTrigger(c => c+1)
     }, [])

    const navigate = useNavigate()
    const authTrigger = useSetRecoilState(jwtAuthTrigger)
    const authStatus = useRecoilValue(jwtAuthAtom)

    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const handleOpen = () => setOpen(!open);

    async function deleteAccount() {
        const res = await axios({
            method: "delete",
            url: "http://localhost:3000/user/deleteaccount",
            headers: {authorization: localStorage.getItem("jwtToken")},
            data: {
                email: emailRef.current.children[0].value,
                password: passwordRef.current.children[0].value
            }
        })
        
        if (res.data.msg == "Account Deleted") {
            localStorage.setItem("jwtToken", "")
            setOpen2(true)
            handleOpen()
        } else {
            wrongInputRef.current.innerHTML = "Wrong Credentials Submitted !"
        }
        
        
    }

    if (authStatus == "Allowed") {
        return (
            <div>
            <MainNavbar /><br/>
            <Dialog open={open} size="xs" handler={handleOpen}>
                <div className="flex items-center justify-between">
                <DialogHeader className="flex flex-col items-start">
                    {" "}
                    <Typography className="mb-1" variant="h4">
                    Delete Your Account{" "}
                    </Typography>
                </DialogHeader>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="mr-3 h-5 w-5"
                    onClick={handleOpen}
                >
                    <path
                    fillRule="evenodd"
                    d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                    clipRule="evenodd"
                    />
                </svg>
                </div>
                <DialogBody>
                <Typography className="mb-10 -mt-7 " color="gray" variant="h7">
                    Enter your Email and Password to Delete your Account
                </Typography>
                <Typography ref={wrongInputRef} className="mb-10 -mt-7 " color="red" variant="h6" />
                <div className="grid gap-6">
                    <Typography className="-mb-1" color="blue-gray" variant="h6">
                    Email
                    </Typography>
                    <Input ref={emailRef} label="Email" />
                    <Typography className="-mb-1" color="blue-gray" variant="h6">
                    Password
                    </Typography>
                    <Input ref={passwordRef} label="Password" />
                </div>
                </DialogBody>
                <DialogFooter className="space-x-2">
                <Button variant="text" color="gray" onClick={handleOpen}>
                    Cancel
                </Button>
                <Button variant="gradient" color="red" onClick={() => {
                    deleteAccount()
                    }}>
                    Confirm Delete
                </Button>
                </DialogFooter>
            </Dialog>
            <Dialog open={open2}>
                <DialogHeader>Your Account Has Been Deleted Successfully !</DialogHeader>
                <DialogBody>
                    Please Signup Again If You Want To Continue Using Hubble
                    </DialogBody>
                <DialogFooter>
                <Button variant="gradient" color="green" onClick={() => {
                    setOpen2(false)
                    navigate("/signup")
                    }}>
                    <span>Confirm</span>
                </Button>
                </DialogFooter>
            </Dialog>
            <section className="px-8 py-20 container mx-auto">
            <Typography variant="h5" color="blue-gray">
                Basic Information
            </Typography>
            <Typography
                variant="small"
                className="text-gray-600 font-normal mt-1"
            >
                Update your profile information below.
            </Typography>
            <div className="flex flex-col mt-8">
                <div className="mb-6 flex flex-col items-end gap-4 md:flex-row">
                <div className="w-full">
                    <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 font-medium"
                    >
                    First Name
                    </Typography>
                    <Input
                    size="lg"
                    placeholder="Emma"
                    labelProps={{
                        className: "hidden",
                    }}
                    className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                    />
                </div>
                <div className="w-full">
                    <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 font-medium"
                    >
                    Last Name
                    </Typography>
                    <Input
                    size="lg"
                    placeholder="Roberts"
                    labelProps={{
                        className: "hidden",
                    }}
                    className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                    />
                </div>
                </div>
                <div className="mb-6 flex flex-col gap-4 md:flex-row">
                <div className="w-full">
                    <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 font-medium"
                    >
                    I&apos;m
                    </Typography>
                    <Select
                    size="lg"
                    labelProps={{
                        className: "hidden",
                    }}
                    className="border-t-blue-gray-200 aria-[expanded=true]:border-t-primary"
                    >
                    <Option>Male</Option>
                    <Option>Female</Option>
                    </Select>
                </div>
                <div className="w-full">
                    <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 font-medium"
                    >
                    Birth Date
                    </Typography>
                    <Popover placement="bottom">
                    <PopoverHandler>
                        <Input
                        size="lg"
                        onChange={() => null}
                        placeholder="Select a Date"
                        value={date ? format(date, "PPP") : ""}
                        labelProps={{
                            className: "hidden",
                        }}
                        className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                        />
                    </PopoverHandler>
                    <PopoverContent>
                        <DayPicker
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        showOutsideDays
                        className="border-0"
                        classNames={{
                            caption:
                            "flex justify-center py-2 mb-4 relative items-center",
                            caption_label: "text-sm !font-medium text-gray-900",
                            nav: "flex items-center",
                            nav_button:
                            "h-6 w-6 bg-transparent hover:bg-blue-gray-50 p-1 rounded-md transition-colors duration-300",
                            nav_button_previous: "absolute left-1.5",
                            nav_button_next: "absolute right-1.5",
                            table: "w-full border-collapse",
                            head_row: "flex !font-medium text-gray-900",
                            head_cell: "m-0.5 w-9 !font-normal text-sm",
                            row: "flex w-full mt-2",
                            cell: "text-gray-600 rounded-md h-9 w-9 text-center text-sm p-0 m-0.5 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-gray-900/20 [&:has([aria-selected].day-outside)]:text-white [&:has([aria-selected])]:bg-gray-900/50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                            day: "h-9 w-9 p-0 !font-normal",
                            day_range_end: "day-range-end",
                            day_selected:
                            "rounded-md bg-gray-900 text-white hover:bg-gray-900 hover:text-white focus:bg-gray-900 focus:text-white",
                            day_today: "rounded-md bg-gray-200 text-gray-900",
                            day_outside:
                            "day-outside text-gray-500 opacity-50 aria-selected:bg-gray-500 aria-selected:text-gray-900 aria-selected:bg-opacity-10",
                            day_disabled: "text-gray-500 opacity-50",
                            day_hidden: "invisible",
                        }}
                        components={{
                            IconLeft: ({ ...props }) => (
                            <ChevronLeftIcon
                                {...props}
                                className="h-4 w-4 stroke-2"
                            />
                            ),
                            IconRight: ({ ...props }) => (
                            <ChevronRightIcon
                                {...props}
                                className="h-4 w-4 stroke-2"
                            />
                            ),
                        }}
                        />
                    </PopoverContent>
                    </Popover>
                </div>
                <div className="w-full">
                    <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 font-medium"
                    >
                    Day
                    </Typography>
                    <Select
                    size="lg"
                    labelProps={{
                        className: "hidden",
                    }}
                    className="border-t-blue-gray-200 aria-[expanded=true]:border-t-primary"
                    >
                    <Option>1</Option>
                    <Option>2</Option>
                    <Option>3</Option>
                    <Option>4</Option>
                    <Option>5</Option>
                    <Option>6</Option>
                    <Option>7</Option>
                    <Option>8</Option>
                    <Option>9</Option>
                    <Option>10</Option>
                    <Option>11</Option>
                    <Option>12</Option>
                    <Option>13</Option>
                    <Option>14</Option>
                    <Option>15</Option>
                    <Option>16</Option>
                    <Option>17</Option>
                    <Option>18</Option>
                    <Option>19</Option>
                    <Option>20</Option>
                    <Option>21</Option>
                    <Option>22</Option>
                    <Option>23</Option>
                    <Option>24</Option>
                    <Option>25</Option>
                    <Option>26</Option>
                    <Option>27</Option>
                    <Option>28</Option>
                    <Option>29</Option>
                    <Option>30</Option>
                    </Select>
                </div>
                <div className="w-full">
                    <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 font-medium"
                    >
                    Year
                    </Typography>
                    <Select
                    size="lg"
                    labelProps={{
                        className: "hidden",
                    }}
                    className="border-t-blue-gray-200 aria-[expanded=true]:border-t-primary"
                    >
                    <Option>2022</Option>
                    <Option>2021</Option>
                    <Option>2020</Option>
                    </Select>
                </div>
                </div>
                <div className="mb-6 flex flex-col items-end gap-4 md:flex-row">
                <div className="w-full">
                    <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 font-medium"
                    >
                    Email
                    </Typography>
                    <Input
                    size="lg"
                    placeholder="emma@mail.com"
                    labelProps={{
                        className: "hidden",
                    }}
                    className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                    />
                </div>
                <div className="w-full">
                    <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 font-medium"
                    >
                    Confirm Email
                    </Typography>
                    <Input
                    size="lg"
                    placeholder="emma@mail.com"
                    labelProps={{
                        className: "hidden",
                    }}
                    className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                    />
                </div>
                </div>
                <div className="mb-6 flex flex-col items-end gap-4 md:flex-row">
                <div className="w-full">
                    <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 font-medium"
                    >
                    Location
                    </Typography>
                    <Input
                    size="lg"
                    placeholder="Florida, USA"
                    labelProps={{
                        className: "hidden",
                    }}
                    className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                    />
                </div>
                <div className="w-full">
                    <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 font-medium"
                    >
                    Phone Number
                    </Typography>
                    <Input
                    size="lg"
                    placeholder="+123 0123 456 789"
                    labelProps={{
                        className: "hidden",
                    }}
                    className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                    />
                </div>
                </div>
                <div className="flex flex-col items-end gap-4 md:flex-row">
                <div className="w-full">
                    <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 font-medium"
                    >
                    Language
                    </Typography>
                    <Input
                    size="lg"
                    placeholder="Language"
                    labelProps={{
                        className: "hidden",
                    }}
                    className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                    />
                </div>
                <div className="w-full">
                    <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 font-medium"
                    >
                    Skills
                    </Typography>
                    <Input
                    size="lg"
                    placeholder="Skills"
                    labelProps={{
                        className: "hidden",
                    }}
                    className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                    />
                    
                </div>
                </div>
                
                </div>
                <br />  
                <div className="flex justify-between">
                    <div>
                        <Button>Submit</Button>
                        <Button className="m-5" onClick={() => navigate("/update")}>Change Password</Button>
                    </div>
                    <div>
                        <Button color="red" onClick={handleOpen}>Delete Account</Button>
                    </div>
                </div>
            </section>
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

export default EditProfile;