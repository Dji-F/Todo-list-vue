import {useField, useForm} from 'vee-validate'
import * as yup from 'yup'
import {computed, watch} from 'vue'
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'

export function useLoginForm() {
    const store = useStore()
    const router = useRouter()
    const {handleSubmit, isSubmitting, submitCount} = useForm()

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

    const onSubmit = handleSubmit(async values => {
        try {
            console.log('Form reg', values)
            await store.dispatch('ref/newUser', values)
            router.push('/auth')
        } catch (e) {}
    })

    return {
        email,
        password,
        emailError,
        passError,
        emailBlur,
        passBlur,
        onSubmit,
        isSubmitting,
        isTooManyTries
    }
}