// AuthGuard.tsx

import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { WindowLoader } from "@/components/shared/WindowLoader";

export function AuthGuard({ children }: { children: JSX.Element }) {
  const { state, dispatch } = useAppContext();
  const { authLoading, auth } = state;
  const router = useRouter();
  const [renderCount, setRenderCount] = useState<number>(0);

  useEffect(() => {
    setRenderCount(1);

    async function fetch() {
      try {
        dispatch({
          type: "set_auth",
          payload: {
            authRedirect: router.route,
            authLoading: true,
            auth: false,
          },
        });

        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/v1/auth/is-authed`,
          { withCredentials: true }
        );

        // setTimeout(() => {
        dispatch({
          type: "set_auth",
          payload: {
            authRedirect: "",
            authLoading: false,
            auth: true,
          },
        });
        // }, 3000);
      } catch (e) {
        dispatch({
          type: "set_auth",
          payload: {
            authRedirect: router.route,
            authLoading: false,
            auth: false,
          },
        });

        router.push("/login");
      }
    }

    fetch();
  }, []);

  // debugger;

  /* show loading indicator while the auth provider is still initializing */
  if (authLoading) {
    return <WindowLoader></WindowLoader>;
  }

  // if auth initialized with a valid user show protected page
  if (!authLoading && auth && renderCount > 0) {
    return <>{children}</>;
  }

  /* otherwise don't return anything, will do a redirect from useEffect */
  return null;
}
