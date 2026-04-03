export interface AdminHeaderProps {
    isSidebarOpen: boolean;
    setIsSidebarOpen: (isOpen: boolean) => void;
    user: any;
}

export interface AdminSidebarProps {
    isSidebarOpen: boolean;
    handleLogout: () => void;
}