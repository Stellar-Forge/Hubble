import { AddWorkspaceIcon, DashboardIcon, WorkspaceIcon } from "../../components/Icons";
import { SidebarItem } from "../../components/SidebarItemClient";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className="flex">
        <div className="w-72 border-r border-slate-300 min-h-screen mr-4 pt-28">
            <div>
                <SidebarItem href={"/"} icon={<DashboardIcon />} title="Dashboard" />
                <SidebarItem href={"/workspace/1"} icon={<WorkspaceIcon />} title="Workspace 1" />
                <SidebarItem href={"/workspace/2"} icon={<WorkspaceIcon />} title="Workspace 2" />
                <SidebarItem href={"/transactions"} icon={<AddWorkspaceIcon />} title="Add Workspace" />
            </div>
        </div>
            {children}
    </div>
  );
}