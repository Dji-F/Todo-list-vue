<template>
  <app-page title="Help">
    <question-item v-for="question in questions" :questions="question" />
  </app-page>
</template>

<script>
import AppPage from '@/components/ui/AppPage'
import QuestionItem from '@/components/question/QuestionItem'

export default {
  setup() {
    const questions = [
      {title: 'What can this app do?', body: 'It can add new notes.'},
      {title: 'What can this app do', body: 'It can add new nots.'},
      {title: 'What can thiapp do?', body: 'It can a new notes.'}
    ]

    return {questions}
  },
  components: {AppPage, QuestionItem}
}
</script>

<style scoped>

</style>
