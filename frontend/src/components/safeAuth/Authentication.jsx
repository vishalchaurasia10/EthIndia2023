import { LogInWithAnonAadhaar, useAnonAadhaar } from "anon-aadhaar-react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Authentication = () => {
    const [anonAadhaar] = useAnonAadhaar();
    const router = useRouter();

    useEffect(() => {
        console.log("Anon Aadhaar status: ", anonAadhaar.status);
        console.log(anonAadhaar);
        if (anonAadhaar.status === "logged-in") {
            router.push('/connecttowallet')
        }
    }, [anonAadhaar]);

    return (
        <div className="flex space-y-2 flex-col items-center justify-center">
            <h2 className='text-5xl font-jost font-bold pb-10 text-white text-center'>Verify Your Adhaar Card</h2>
            <LogInWithAnonAadhaar />
            <p className="text-white">{anonAadhaar?.status}</p>
        </div>
    )
}

export default Authentication