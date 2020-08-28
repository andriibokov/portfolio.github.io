ч<template>
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
    </li>    
</template>

<script>
    import Todo from './Todo.vue'
    import App from '../App.vue'

    let nextTodoId = 1
    export default {
        components: {
            Todo, App
        },
        props:['newTaskText', 'index', 'taskTodos'],
        methods:{
            edit(){
                document.querySelector('.input__task').value = this.newTaskText
            }
        }
        
    }
</script>

<style>
    .todo__title{
        margin: 0;
    }
</style>