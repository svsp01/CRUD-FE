"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const useLogin = () => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuthentication = async () => {
            const token = localStorage.getItem("token");

            if (token) {
                await router.push("/dashboard");
            } else {
                setIsAuthenticated(true);
            }
        };

        checkAuthentication();
    }, [router]);

    return isAuthenticated;
};

export default useLogin;
