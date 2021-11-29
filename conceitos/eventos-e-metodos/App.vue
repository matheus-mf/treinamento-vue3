<template>
 <div>
  <h1>My todo list</h1>
  <button @click="handleShowHideList">Show the list!</button>
  <br />
  <input
    type="text"
    @keyup.enter="handleAddTask" 
    v-focus
    v-model="currentTask"
  />
  <ul v-if="showList">
   <li 
     v-for="(task, index) in tasks"
     :key="`${task}-${index}`"
     @dblclick="handleComplete(task)"
     class="task-item"
     :class="{
       'line-through': task.isDone
     }"
   >
     {{ task.name }}
     <button 
       @click="handleRemove(task)"
     >
       &times;
     </button>
   </li>
  </ul>
  <p v-else>
   Todo list is hide!
  </p>
 </div>
</template>

<script>
const focus = {
  inserted: (el) => {
    el.focus()
  }
}

export default {
  directives: {
    focus,
  },
  data: () => ({
    showList: false,
    currentTask: '',
    tasks: [
      { name: 'Fazer o curso', isDone: false }
    ]
  }),
  methods: {
    handleShowHideList () {
      this.showList = !this.showList
    },
    handleAddTask () {
      this.tasks.push({
        name: this.currentTask,
        isDone: false
      })
      this.currentTask = ''
    },
    handleComplete (task) {
      this.tasks = this.tasks.map(t => {
        if (t.name !== task.name) {
          return { ...t }
        }
        return { ...t, isDone: !t.isDone }
      })
    },
    handleRemove (task) {
      this.tasks = this.tasks.filter(t => t.name !== task.name)
    }
  }
}
</script>

<style scoped>
.line-through {
  text-decoration: line-through;
}
.task-item {
  cursor: pointer;
}
</style>
