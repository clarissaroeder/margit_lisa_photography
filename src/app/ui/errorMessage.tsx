"use client";

/**
 * ErrorMessage Component
 *
 * Displays an error message with optional styling.
 *
 * @param {object} props - Component props.
 * @param {string} props.message - The error message to display.
 * @param {string} [props.className] - Additional CSS classes for customization.
 * @returns A JSX element representing the error message.
 */
interface ErrorMessageProps {
  message: string;
  className?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, className = '' }) => {
  return (
    <div className={`flex items-center justify-center h-full ${className}`} role="alert" aria-live="assertive">
      <div className="flex items-center">
        <h1 className="inline-block mr-5 pr-6 text-2xl font-semibold align-top leading-relaxed border-r border-black/30 dark:border-white/30">
          Oops!
        </h1>
        <div className="inline-block">
          <h2 className="text-sm font-normal">
            {message}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;
