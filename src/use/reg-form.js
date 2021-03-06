import {useField, useForm} from 'vee-validate'
import * as yup from 'yup'
import {computed, watch} from 'vue'

export function useRegForm(fn) {
    const {handleSubmit, isSubmitting, submitCount} = useForm()

    const {value: name, errorMessage: nameError, handleBle: nameBlur} = useField(
        'name',
        yup
            .string()
            .trim()
            .required()
            .min(2)
    )

    const {value: email, errorMessage: emailError, handleBlur: emailBlur} = useField(
        'email',
        yup
            .string()
            .trim()
            .required()
            .email()
    )
    const {value: password, errorMessage: passError, handleBlur: passBlur} = useField(
        'password',
        yup
            .string()
            .trim()
            .required()
            .min(6)
    )

    const isTooManyTries = computed(() => submitCount.value >= 3)

    watch(isTooManyTries, val => {
        if (val) {
            setTimeout(() => submitCount.value = 0, 50000)
        }
    })

    const onSubmit = handleSubmit(fn)

    return {
        email,
        password,
        name,
        emailError,
        passError,
        nameError,
        emailBlur,
        passBlur,
        nameBlur,
        onSubmit,
        isSubmitting,
        isTooManyTries
    }
}