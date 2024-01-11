"use client";

import useClient from "@/components/reusablecomponents/useClient";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
    const isAuthenticated = useClient();

    return (
        <>
            {isAuthenticated && (
                <>
                    {children}
                </>
            )}
        </>
    );
};

export default RootLayout;
