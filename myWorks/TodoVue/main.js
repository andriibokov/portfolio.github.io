
Vue.component('todo',{
    props: ['todo'],
    template:`
    <li class="todo__item">
        <button v-on:click="$emit('remove')">Выполнено</button>
        <p>{{ todo }}</p>
        <button v-on:click="$emit('remove')">Редактировать</button>
        <button v-on:click="$emit('remove-todo')">Удалить</button>
    </li> 
    `
})
Vue.component('task',{
    props:['newTaskText', 'index', 'taskTodos'],
    methods:{
        edit(){
            document.querySelector('.input__task').value = this.newTaskText
        }
    },
    template:`
        <li class="todo__item">
            <div class="box__task">
                <h2 class="todo__title">{{index}}.{{ newTaskText }}</h2>
                <ul>
                    <ul
                        v-for="(todo, index) in taskTodos"
                        :key="todo.id"
                        >
                        <li>
                            <p>{{index+1}}.{{todo.text}}</p>
                        </li>
                    </ul>
                </ul>
            </div>
            <button v-on:click="edit">Редактировать</button>
            <button v-on:click="$emit('remove-task')">Удалить</button>
        </li>`
})

let nextTodoId = 1
let nextTaskId = 1



var app = new Vue({
    el: '#app',
    data() {
        return{
            newTaskText: '',
            newTodoText: '',
            todos: [],
            tasks: []
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
                this.newTaskText = ''
                this.newTodoText = ''
                // this.todos.splice(0,this.todos.length)
                
            }
        }
    }
})
    
    
    