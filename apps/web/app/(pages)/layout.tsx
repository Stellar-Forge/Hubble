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
            <div className="w-72 border-r border-slate-300 min-h-screen mr-4 pt-28">
                <div>
                    <SidebarItem
                        href={"/home"}
                        icon={<DashboardIcon />}
                        title="Home"
                    />
                    <SidebarItem
                        href={"/explore"}
                        icon={<DashboardWorkspaceIcon />}
                        title="Explore"
                    />
                    <SidebarItem
                        href={"/notifications"}
                        icon={<SettingsIcon />}
                        title="Notifications"
                    />
                    <SidebarItem
                        href={"/messages"}
                        icon={<SettingsIcon />}
                        title="Messages"
                    />
                </div>
            </div>
            {children}
        </div>
    );
}
