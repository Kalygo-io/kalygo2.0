// AuthGuard.tsx

import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/router";
import { useEffect } from "react";
import axios from "axios";

export function AuthGuard({ children }: { children: JSX.Element }) {
  const { state, dispatch } = useAppContext();
  const { authLoading, auth } = state;
  const router = useRouter();

  useEffect(() => {
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

        dispatch({
          type: "set_auth",
          payload: {
            authRedirect: "",
            authLoading: false,
            auth: true,
          },
        });
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

  /* show loading indicator while the auth provider is still initializing */
  if (authLoading) {
    return <h1>Application Loading</h1>;
  }

  // if auth initialized with a valid user show protected page
  if (!authLoading && auth) {
    return <>{children}</>;
  }

  /* otherwise don't return anything, will do a redirect from useEffect */
  return null;
}
