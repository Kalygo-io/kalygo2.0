// AuthGuard.tsx

import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { WindowLoader } from "@/components/shared/WindowLoader";

export function AdminGuard({ children }: { children: JSX.Element }) {
  const { state, dispatch } = useAppContext();
  const { adminLoading, admin } = state;
  const router = useRouter();
  const [renderCount, setRenderCount] = useState<number>(0);

  useEffect(() => {
    setRenderCount(1);

    async function fetch() {
      try {
        dispatch({
          type: "set_admin",
          payload: {
            adminRedirect: router.route,
            adminLoading: true,
            admin: false,
          },
        });

        await axios.get(
          `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/v1/auth/is-admin`,
          { withCredentials: true }
        );

        dispatch({
          type: "set_admin",
          payload: {
            adminRedirect: "",
            adminLoading: false,
            admin: true,
          },
        });
      } catch (e) {
        dispatch({
          type: "set_admin",
          payload: {
            adminRedirect: router.route,
            adminLoading: false,
            admin: false,
          },
        });

        router.push("/");
      }
    }

    fetch();
  }, []);

  // debugger;

  /* show loading indicator while the auth provider is still initializing */
  if (adminLoading) {
    return <WindowLoader></WindowLoader>;
  }

  // if auth initialized with a valid user show protected page
  if (!adminLoading && admin && renderCount > 0) {
    return <>{children}</>;
  }

  /* otherwise don't return anything, will do a redirect from useEffect */
  return null;
}
