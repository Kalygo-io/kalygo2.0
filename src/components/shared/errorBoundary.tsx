import React, { ReactNode } from "react";
import { Error } from "./error";

class ErrorBoundary extends React.Component {
  state: {
    hasError: boolean;
    children: ReactNode;
  };

  constructor(props: { children: any; t: any }) {
    super(props);

    // Define a state variable to track whether is an error or not
    this.state = { hasError: false, children: props.children };
  }
  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }
  componentDidCatch(error: any, errorInfo: any) {
    // You can use your own error logging service here
    console.error({ error, errorInfo });
  }
  render() {
    // Check if the error is thrown
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <Error />
        // <div>
        //   <h2>Oops, there is an error!</h2>
        //   <button
        //     type="button"
        //     onClick={() => this.setState({ hasError: false })}
        //   >
        //     Try again?
        //   </button>
        // </div>
      );
    }

    // Return children components in case of no error

    // @ts-ignore
    return this.props.children;
  }
}

export default ErrorBoundary;
