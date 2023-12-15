import clsx from "clsx"

const Input = ({ field, className, ...otherProps }) => (
  <input
    {...otherProps}
    {...field}
    className={clsx(
      "border-2 p-2 border-black placeholder:text-center text-center",
      className,
    )}
  />
)

export default Input
