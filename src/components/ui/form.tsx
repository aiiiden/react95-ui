import * as React from "react"
import { Slot } from "radix-ui"
import { Controller, FormProvider, useFormContext, useFormState, type ControllerProps, type FieldPath, type FieldValues } from "react-hook-form"
import { cn } from "@/lib/utils"
import { Label } from "./label"

/** react-hook-form wiring: labels, descriptions and errors are linked to their control for you */
const Form = FormProvider

const FormFieldContext = React.createContext<{ name: string }>({ name: "" })
const FormItemContext = React.createContext<{ id: string }>({ id: "" })

function FormField<TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>(props: ControllerProps<TFieldValues, TName>) {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  )
}

function useFormField() {
  const { name } = React.useContext(FormFieldContext)
  const { id } = React.useContext(FormItemContext)
  const { getFieldState } = useFormContext()
  const formState = useFormState({ name })
  const state = getFieldState(name, formState)
  return { id, name, formItemId: `${id}-item`, formDescriptionId: `${id}-description`, formMessageId: `${id}-message`, ...state }
}

function FormItem({ className, ...props }: React.ComponentProps<"div">) {
  const id = React.useId()
  return (
    <FormItemContext.Provider value={{ id }}>
      <div data-slot="form-item" className={cn("grid gap-1.5 type-16", className)} {...props} />
    </FormItemContext.Provider>
  )
}

function FormLabel({ className, ...props }: React.ComponentProps<typeof Label>) {
  const { formItemId } = useFormField()
  return <Label data-slot="form-label" htmlFor={formItemId} className={cn(className)} {...props} />
}

function FormControl(props: React.ComponentProps<typeof Slot.Root>) {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()
  return <Slot.Root data-slot="form-control" id={formItemId} aria-describedby={error ? `${formDescriptionId} ${formMessageId}` : formDescriptionId} aria-invalid={!!error} {...props} />
}

function FormDescription({ className, ...props }: React.ComponentProps<"p">) {
  const { formDescriptionId } = useFormField()
  return <p data-slot="form-description" id={formDescriptionId} className={cn("type-12", className)} {...props} />
}

function FormMessage({ className, children, ...props }: React.ComponentProps<"p">) {
  const { error, formMessageId } = useFormField()
  const body = error ? String(error.message ?? "") : children
  if (!body) return null
  return (
    <p data-slot="form-message" id={formMessageId} role="alert" className={cn("type-12 text-danger", className)} {...props}>
      {body}
    </p>
  )
}

export { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage, useFormField }
