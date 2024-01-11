"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const useClient = () => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuthentication = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                await router.push("/login");
            } else {
                setIsAuthenticated(true);
            }
        };

        checkAuthentication();
    }, [router]);

    return isAuthenticated;
};

export default useClient;
