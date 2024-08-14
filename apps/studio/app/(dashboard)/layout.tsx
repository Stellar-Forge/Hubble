import { DashboardIcon } from "@hubble/ui/DashboardIcon";
import { DashboardWorkspaceIcon } from "@hubble/ui/DashboardWorkspaceIcon";
import { SettingsIcon } from "@hubble/ui/DashboardWorkspaceIcon";

import { SidebarItem } from "@hubble/ui/SidebarItem";

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}): JSX.Element {
    return (
        <div className="flex">
            {/* <div className="w-72 border-r border-slate-300 min-h-screen mr-4 pt-28">
                <div>
                    <SidebarItem
                        href={"/"}
                        icon={<DashboardIcon />}
                        title="Dashboard"
                    />
                    <SidebarItem
                        href={"/workspace"}
                        icon={<DashboardWorkspaceIcon />}
                        title="Workspace"
                    />
                    <SidebarItem
                        href={"/user-config"}
                        icon={<SettingsIcon />}
                        title="API Settings"
                    />
                </div>
            </div> */}
            {children}
        </div>
    );
}
