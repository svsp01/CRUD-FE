"use client";

import useLogin from "@/components/reusablecomponents/useLogin";


const RootLayout = ({ children }: { children: React.ReactNode }) => {
    const isAuthenticated = useLogin();

    return (
        <>
            {isAuthenticated && (
                <div className="w-[100%] min-h-screen flex flex-col items-center justify-between">
                    {children}
                </div>
            )}
        </>
    );
};

export default RootLayout;
