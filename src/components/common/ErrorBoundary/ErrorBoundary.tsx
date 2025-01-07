import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true, error: _ };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    return { hasError: true, error };
  }

  public render() {
    if (this.state.hasError) {
      return <>{this.state.error?.message}</>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
