import { useCallback, useEffect, useMemo } from "react";
import { MainNavbar } from "../components/MainNavbar";
import { OutputCard } from "../components/studio/OutputCard";
import { SelectModel } from "../components/studio/SelectModel";
import { Sidebar } from "../components/studio/Sidebar";
import axios from "axios";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { jwtAuthAtom, jwtAuthTrigger } from "../store/atoms/jwtTokenAtom";
import { useNavigate } from "react-router-dom";

export function Studio() {

    useEffect(()=>{
        authTrigger(c => c+1)
    }, [])

    const navigate = useNavigate()
    const authTrigger = useSetRecoilState(jwtAuthTrigger)
    const authStatus = useRecoilValue(jwtAuthAtom)
    
    if (authStatus == "Allowed") {
        return (
            <div>
                <MainNavbar /><br/>
                <div className="flex">
                    <Sidebar/>
                    <div className="grid grid-cols-1">
                    <OutputCard /><br/>
                    <SelectModel/>
                    </div>
                </div>
            </div>)

    } else {
        useEffect(()=>{
            navigate("/login")
        }, [])
        return <>
        Access Denied !
        </>
    }
    
}

