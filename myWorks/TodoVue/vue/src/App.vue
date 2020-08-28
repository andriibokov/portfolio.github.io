<template>
  <div class="container">
    <div class="task__btn">
      <button>➕ Создать новую заметку</button>
    </div>
    <ul>
      <task
        v-for="(task, index) in tasks"
        :key="task.id"
        :newTaskText="task.text"
        :taskTodos="task.todo"
        :index="index+1"
        v-on:remove-task="tasks.splice(index, 1)"

      ></task>
    </ul>
    <div class="box__btn">
      <button class="btn__delete">Удалить</button>
      <button class="btn__canceling">Отменить</button>
      <button class="btn__save" @click="saveTask">Сохранить</button>
    </div>
    <form @submit.prevent="">
      <div class="box__input">
        <label class="input__label">Название заметки</label>
        <input
          type="text"
          v-model="newTaskText"
          @keydown.enter="saveTask"
          class="input__task"
          placeholder="Например, покормить кота"
        >
      </div>
      <div class="box__input">
        <label class="input__label">Добавить задачу</label>
        <input
          type="text"
          v-model="newTodoText"
          @keydown.enter="addTodo"
          class="input__todo"
          placeholder="Например, покормить кота"
        >
        <button @click="addTodo">Добавить</button>
      </div>
    </form>
    <ul>
      <todo
        v-for="(todo, index) in todos"
        :key="todo.id"
        :todo="todo.text"
        v-on:remove-todo="todos.splice(index, 1)"
      ></todo>
    </ul>
  </div>
</template>  

<script>
  import Todo from './components/Todo.vue'
  import Task from './components/Task.vue'

  let nextTodoId = 1
  let nextTaskId = 1


  export default {
    components: {
      Todo, Task
    },
    data () {
      return {
        newTaskText: '',
        newTodoText: '',
        todos: [],
        tasks: [],
      }
    },
    methods: {
      addTodo () {
        const trimmedTextTodo = this.newTodoText.trim()
        if (trimmedTextTodo) {
          this.todos.push({
            id: nextTodoId++,
            text: trimmedTextTodo
          })
          this.newTodoText = ''
        }
      },
      saveTask(){
        const trimmedTextTask = this.newTaskText.trim()
        if(trimmedTextTask) {
          this.tasks.push({
            id: nextTaskId++,
            text: trimmedTextTask,
            todo: this.todos
          })
            console.log(this.tasks)
          this.newTaskText = ''
          this.newTodoText = ''
          // this.todos.splice(0,this.todos.length)

        }
      }
    }
}
</script>

<style>
*,
*::after,
*::before{
  box-sizing: border-box;
}
body{
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    color: #000;
    font-size: 18px;
    font-weight: 21px;
    margin: 0;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
}

a{
    text-decoration: none;
    color: inherit;
}


p{
    margin: 0;padding: 0;
}

.container{
    position: relative;
    max-width: 1250px;
    min-height: 100vh;
    margin: 0 auto;
    padding: 5px;
    color: #2c3e50;
    text-align: center;
    background-color: rgba(151, 150, 150, 0.404);
}

.box__btn{
    font-size: 20px;
    margin-bottom: 20px;
    display: flex;
    align-items: flex-start;
}

.box__input{
  display: flex;
  align-content: flex-start;
}

.input__label{
  margin: 10px;
}

.input__task{
  height: 35px;
  margin: 5px;
}

.input__todo{
  height: 35px;
  margin: 5px;
}
</style>
