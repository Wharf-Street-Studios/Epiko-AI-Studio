import React, { Component, ReactNode } from 'react';
import { Button } from './ui';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/welcome';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col items-center justify-center p-6">
          <div className="max-w-md w-full text-center">
            <div className="w-24 h-24 bg-red-50 rounded-full mx-auto mb-6 flex items-center justify-center">
              <span className="text-5xl">⚠️</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              Oops! Something went wrong
            </h1>
            <p className="text-gray-600 mb-8 text-lg">
              We encountered an unexpected error. Don't worry, your data is safe.
            </p>
            {this.state.error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-left">
                <p className="text-sm text-red-800 font-mono break-all">
                  {this.state.error.message}
                </p>
              </div>
            )}
            <div className="space-y-3">
              <Button
                variant="primary"
                size="large"
                fullWidth
                onClick={this.handleReset}
              >
                Return to Home
              </Button>
              <button
                onClick={() => window.location.reload()}
                className="w-full text-center text-gray-600 hover:text-gray-900 text-sm font-semibold transition-colors"
              >
                Reload Page
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
