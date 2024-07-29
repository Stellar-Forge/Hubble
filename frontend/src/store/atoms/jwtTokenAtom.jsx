import axios from "axios"
import { atom, selector } from "recoil"

export const jwtAuthTrigger = atom({
    key: "jwtAuthTrigger",
    default: 0
}) 

export const jwtAuthAtom =  atom({
    key: "jwtAuthAtom",
    default: selector({
        key: "jwtTokenSelector",
        get: async ({get}) => {
            get(jwtAuthTrigger)
            const jwtToken = localStorage.getItem("jwtToken")
            const res = await axios.get("http://localhost:3000/user/pageauthcheck", {
                headers: {authorization: jwtToken}
            })
            return res.data.msg
        }
    })
})
