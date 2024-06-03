import { UseFormReturn } from "react-hook-form/dist/types/form";
import {FieldError} from "react-hook-form";

interface InputProps {
    label: string;
    id: string;
    required?: boolean;
    inputProps: any;
    form: UseFormReturn<any>
}

const defaultStyles = "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight";

const Input = (props: InputProps) => (
    <div className="mb-4">
        <div className="flex">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={props.id}>{props.label}</label>
            {props.required && <span className="text-red-600">*</span>}
        </div>
        <input
            {...props.inputProps}
            className={`${defaultStyles} ${props.inputProps.className}`}
            id={props.id}
            type="text"
            {...props.form.register(props.id, {required: !!props.required})}
        />
        {props.form.formState.errors[props.id] && (
            <span className="text-xs text-red-400 font-bold">
                {(props.form.formState.errors[props.id] as FieldError).message}
            </span>
        )}
    </div>
);

export default Input;
