import React, { useEffect } from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
} from "@material-tailwind/react";
import {
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
  PlusCircleIcon
} from "@heroicons/react/24/solid";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { currentWorkspaceAtom } from "../../store/atoms/workspaceAtom";
import { useNavigate } from "react-router-dom";
 
export function Sidebar() {
  const [open, setOpen] = React.useState(0);  
  const navigate = useNavigate()

  const setCurrentWorkspaceAtom = useSetRecoilState(currentWorkspaceAtom)
  const currentWorkspaceValue = useRecoilValue(currentWorkspaceAtom)
 
  useEffect(() => {
    navigate(`/studio/${currentWorkspaceValue}`)
  }, [currentWorkspaceValue])
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
 
  return (
    <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="mb-2 p-4">
        <Typography variant="h5" color="blue-gray">
          Studio
        </Typography>
      </div>
      <List>
        <ListItem onClick={()=> setCurrentWorkspaceAtom(1)}>
          <ListItemPrefix>
            <InboxIcon className="h-5 w-5" />
          </ListItemPrefix>
          Workspace 1
        </ListItem>
        <ListItem onClick={()=> setCurrentWorkspaceAtom(2)}>
          <ListItemPrefix>
            <InboxIcon className="h-5 w-5" />
          </ListItemPrefix>
          Workspace 2
        </ListItem>
        <ListItem onClick={()=> setCurrentWorkspaceAtom(3)}>
          <ListItemPrefix>
            <InboxIcon className="h-5 w-5" />
          </ListItemPrefix>
          Workspace 3
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <PlusCircleIcon className="h-5 w-5" />
          </ListItemPrefix>
          Add New Workspace
        </ListItem>

        <hr className="my-2 border-blue-gray-50" />
        
        <ListItem>
          <ListItemPrefix>
            <Cog6ToothIcon className="h-5 w-5" />
          </ListItemPrefix>
          Editor
        </ListItem>
      </List>
    </Card>
  );
}