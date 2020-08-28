<template>
    <li class="todo__item">
        <button v-on:click="$emit('remove')">Выполнено</button>
        <p>{{ todo }}</p>
        <button v-on:click="$emit('remove')">Редактировать</button>
        <button v-on:click="$emit('remove-todo')">Удалить</button>
    </li>    
</template>

<script>

export default {
    props: ['todo']
}
</script>