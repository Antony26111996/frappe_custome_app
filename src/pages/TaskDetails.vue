<template>
  <Dialog :options="dialogOptions" v-model="dialogShown">
    <template #body-content>
      <div class="space-y-3">
        <Input v-model="editedTask.task_name" type="text" label="Task Name" />
        <Input v-model="editedTask.desc" type="textarea" label="Description" />
        <Input v-model="editedTask.ddate" type="date" label="Due Date" />
        <!-- Add input fields for other task details -->
      </div>
    </template>
  </Dialog>
</template>

<script setup>
import { Dialog, Input } from 'frappe-ui';
import { ref } from 'vue';

const dialogShown = ref(false);
const editedTask = ref({});

const dialogOptions = {
  title: 'Task Details',
  actions: [{ label: 'Close' }],
};
</script>
