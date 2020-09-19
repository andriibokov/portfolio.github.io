
Vue.component('todo',{
    props: ['todo', 'todoid'],
    template:`
        <li class="todo__item">
            <p>{{ todoid }}.</p>
            <p class="itemTodo__title"><input type="checkbox" v-model="todo.checked">{{ todo.text }}</p>
            <button v-on:click="$emit('remove-todo')">Удалить</button>
        </li>
    `
})
Vue.component('task',{
    props:['newTaskText', 'index', 'todos'],
    methods:{
        edit(){
            document.querySelector('.input__task').value = this.newTaskText
        }
    },
    template:`
        <li class="task__item">
            <div class="box__task">
                <h2 class="todo__title">{{index}}.{{ newTaskText }}</h2>
            </div>
            <todo
                v-for="(todo, index) in todos"
                :key="todo.id"
                :todo="todo"
                :todoid="index+1"
                v-on:remove-todo="todos.splice(index, 1)"
            ></todo>
        </li>`
})
Vue.component('tasksfin',{
    props:['newTasksfinText', 'index', 'todos'],
    template:`
        <li class="task__item">
            <div class="box__task">
                <h2 class="todo__title">{{index}}.{{ newTasksfinText }}</h2>
                <div class="task__btn">
                    <button v-on:click="$emit('edit-task', $event.target)">Редактировать</button>
                    <button v-on:click="$emit('remove-task', $event.target)">Удалить</button>
                </div>
            </div>
            <todo
                v-for="(todo, index) in todos"
                :key="todo.id"
                :todo="todo"
                :todoid="index+1"
                v-on:remove-todo="todos.splice(index, 1)"
            ></todo>
        </li>`
})

let nextTodoId = 1
let nextTasksfinId = 1
let index = 0
let cheskBox = false
let indexTaskEdit = 0


var app = new Vue({
    el: '#app',
    data: {
            newTaskText: '',
            newTodoText: '',
            todos:[],
            tasks: [],
            tasksfin:[]
    },
    methods: {
        saveTask(){
            const trimmedTextTask = this.newTaskText.trim()
            const trimmedTextTodo = this.newTodoText.trim()
            if( trimmedTextTask ) {
                this.todos.push([])
                this.tasks[0] = {
                    text : trimmedTextTask,
                    todo : this.todos[0]
                }
                this.newTaskText =""
            }
            if ( trimmedTextTodo ) {
                this.todos[0].push({
                    checked : false,
                    id: nextTodoId++,
                    text: trimmedTextTodo
                })
                this.tasks[0] = {
                    text : this.tasks[0].text,
                    todo : this.todos[0]
                }
                this.newTodoText = ''
            }
        },
        editTask: function (event){
            this.removeTask();
            cheskBox = true;
            indexTaskEdit = Number(event.closest('.box__task')
                .querySelector('.todo__title')
                .innerHTML
                .trim()
                .charAt(0))-1;
            this.todos[0] = [];
            for(let i = 0; i < this.tasksfin[indexTaskEdit].tasks.todo.length; i++ ){
                this.todos[0].push({
                    checked : this.tasksfin[indexTaskEdit].tasks.todo[i].checked,
                    id: this.tasksfin[indexTaskEdit].tasks.todo[i].id,
                    text: this.tasksfin[indexTaskEdit].tasks.todo[i].text
                })
            }
            this.tasks[0] = {
                id : this.tasksfin[indexTaskEdit].id,
                text : this.tasksfin[indexTaskEdit].tasks.text,
                todo : this.todos[0]
            }
        },
        saveTasksfin(){
            if(!this.tasks[0]){
                return false
            }
            if(cheskBox){
                indexTaskfin =  indexTaskEdit + 1;
                cheskBox = false;
            } else{ indexTaskfin = nextTasksfinId++}
            this.tasksfin[indexTaskfin-1] = {
                id : indexTaskfin,
                tasks : this.tasks[0]
            }
            this.removeTask()
            this.newTodoText = ''
        },
        removeTask(){
            this.tasks.splice(index, 1);
            this.removeTodo();
            cheskBox = false;
        },
        removeTaskfin: function (event){
            let indexRemove = Number(event.closest('.box__task')
                .querySelector('.todo__title')
                .innerHTML
                .trim()
                .charAt(0))-1;
            this.tasksfin.splice(indexRemove, 1);
            this.removeTodo();
            cheskBox = false;
            nextTasksfinId--
        },
        removeTodo(){
            this.todos.splice(index, 1)
        }
    }
})


