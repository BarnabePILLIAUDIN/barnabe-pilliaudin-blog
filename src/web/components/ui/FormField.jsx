import Alert from "@/web/components/ui/Alert"
import Input from "@/web/components/ui/Input"
import clsx from "clsx"
import { useField } from "formik"

const FormField = (props) => {
  const {
    as: Component = Input,
    name,
    label,
    children,
    className,
    ...otherProps
  } = props
  const [field, { error, touched }] = useField(name)
  const hasError = touched && error

  return (
    <label className={clsx("flex flex-col gap-2", className)}>
      {label && <span className="font-semibold">{label}</span>}
      <Component
        name={name}
        {...field}
        {...otherProps}
        className={clsx("rounded-md border-2 border-black", {
          "border-red-600": hasError,
          "px-5 py-2": Component === "textarea",
        })}
      />
      {hasError && <span className="text-sm text-red-500">{error}</span>}
      {children && <Alert>{children}</Alert>}
    </label>
  )
}

export default FormField
