import clsx from "clsx"

const ForbiddenMessage = ({ message, className, ...otherProps }) => (
  <div
    className={clsx(
      className,
      "text-red-600 font-bold text-center text-3xl flex items-center justify-center w-screen h-96",
    )}
    {...otherProps}
  >
    <p>{message}</p>
  </div>
)

export default ForbiddenMessage
