import { atom } from "recoil";

// stores b64 string in image keys in these 3 workspaces
export const workspaceImage = atom({
    key: "workspaceImage",
    default: [
        {
            style: "photorealism",
            width: 1024,
            height: 1024,
            output_format: "jpeg",
            response_format: "b64",
            image: "",
            url: "",
            isUrl: false
        }, {
            style: "photorealism",
            width: 1024,
            height: 1024,
            output_format: "jpeg",
            response_format: "b64",
            image: "",
            url: "",
            isUrl: false
        }, {
            style: "photorealism",
            width: 1024,
            height: 1024,
            output_format: "jpeg",
            response_format: "b64",
            image: "",
            url: "",
            isUrl: false
        }
    ]
})