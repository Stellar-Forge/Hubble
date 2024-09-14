import {
    DashboardIcon,
    DashboardWorkspaceIcon,
    SettingsIcon,
    ModelSidebarIcon,
} from "@hubble/ui/Icons";

import { SidebarItem } from "@hubble/ui/SidebarItem";

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}): JSX.Element {
    return (
        <div className="flex">
            <div className="flex w-1/6 border-r border-black min-h-screen">
                <div className="flex flex-col w-full justify-between items-center my-5">
                    <div>
                        <a
                            href="/"
                            className="font-bold text-4xl drop-shadow-[2px_2px_1px_rgba(0,0,0,0.45)]"
                        >
                            Hubble
                        </a>
                    </div>
                    <div className="border-t border-black w-full mb-10">
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
                            href={"/models"}
                            icon={<ModelSidebarIcon />}
                            title="Models"
                        />
                        <SidebarItem
                            href={"/user-config"}
                            icon={<SettingsIcon />}
                            title="API Settings"
                        />
                    </div>
                    <div className="font-bold text-4xl drop-shadow-[2px_2px_1px_rgba(0,0,0,0.45)]">
                        <a href="/settings">Settings</a>
                    </div>
                </div>
            </div>
            {children}
        </div>
    );
}
