import {useField, useForm} from 'vee-validate'
import * as yup from 'yup'

export function useNoteForm(fn) {
    const {isSubmitting, handleSubmit} = useForm({
        initialValues: {
            status: 'active'
        }
    })

    const {value: title, errorMessage: titleError, handleBlur: titleBlur} = useField(
        'title',
            yup
                .string()
                .trim()
                .required()
        )
    const {value: text, errorMessage: textError, handleBlur: textBlur} = useField(
        'text',
            yup
                .string()
                .trim()
                .required()
        )
    const {value: status} = useField('status')

    const onSubmit = handleSubmit(fn)

    return {
        title,
        text,
        status,
        titleError,
        textError,
        titleBlur,
        textBlur,
        isSubmitting,
        onSubmit
    }
}
