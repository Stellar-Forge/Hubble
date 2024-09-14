import {
    DashboardIcon,
    AddWorkspaceIcon,
    WorkspaceIcon,
} from "@hubble/ui/Icons";

import { SidebarItem } from "@hubble/ui/SidebarItem";
import { Suspense } from "react";
import Loading from "./loading";

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
                            href={"/workspace/1"}
                            icon={<WorkspaceIcon />}
                            title="Workspace 1"
                        />
                        <SidebarItem
                            href={"/workspace/2"}
                            icon={<WorkspaceIcon />}
                            title="Workspace 2"
                        />
                        <SidebarItem
                            href={"/workspace/3"}
                            icon={<WorkspaceIcon />}
                            title="Workspace 3"
                        />
                        <SidebarItem
                            href={"/transactions"}
                            icon={<AddWorkspaceIcon />}
                            title="Add Workspace"
                        />
                    </div>
                    <div className="font-bold text-4xl drop-shadow-[2px_2px_1px_rgba(0,0,0,0.45)]">
                        <a href="/settings">Settings</a>
                    </div>
                </div>
            </div>
            <Suspense fallback={<Loading />}>{children}</Suspense>
        </div>
    );
}
