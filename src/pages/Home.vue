<template>
  <div class="task-list-container">
    <div class="navbar">
      <div class="topic-container">
  <img src="../images/missan.png" alt="Logo" class="topic-image" />
  <h1 class="topic-heading">Task Management System</h1>
</div>

<div class="user-info" @click="toggleDropdown">
  <img src="../images/login1.png" alt="icon" class="user-icon" />
  <button class="btn text-white dropdown-toggle" type="button" id="userDropdown">
    {{ fullName }}
  </button>
  <ul class="dropdown-menu dropdown-menu-sm" :class="{ 'show': isDropdownOpen }" aria-labelledby="userDropdown">
  <li><a class="dropdown-item" href="#" @click.prevent="logout">Logout</a></li>
</ul>

</div>



    </div>
    <div class="mx-10 my-6" style="margin-top: 70px">
      <div class="flex flex-row items-center justify-between">
        <h2 class="text--5xl font-black text-gray-900"></h2>
        <Button
          @click="addActionDialogShown = true"
          icon-left="plus"
          class="task-button"
        >
          New Task
        </Button>
      </div>
      <div class="tab-buttons">
        <h3
          @click="activeTab = 'taskList'"
          :class="{ 'active-tab': activeTab === 'taskList' }"
        >
          Task List
        </h3>
        <div class="vertical-line"></div>
        <!-- Vertical line -->
        <h3
          @click="activeTab = 'ongoingTasks'"
          :class="{ 'active-tab': activeTab === 'ongoingTasks' }"
        >
          Ongoing Tasks
        </h3>
        <div class="vertical-line"></div>
        <!-- Vertical line -->
        <h3
          @click="activeTab = 'completedTasks'"
          :class="{ 'active-tab': activeTab === 'completedTasks' }"
        >
          Completed Tasks
        </h3>
      </div>

      <div class="table-container" v-if="activeTab === 'taskList'">
  <div class="scroll-table">
    <table v-if="paginatedTasks.length">
      <!-- Table header -->
      <thead>
        <tr>
          <th>Task Name</th>
          <th>Description</th>
          <th>Assigned By</th>
          <th>Assign To</th>
          <th>Due Date</th>
          <th>Status</th>
        </tr>
      </thead>
      <!-- Table body -->
      <tbody>
        <tr v-for="task in paginatedTasks" :key="task.name" @click="openTaskDetailsModal(task)">
          <td v-if="fullName === task.assign_user">{{ task.task_name }}</td>
          <td v-if="fullName === task.assign_user">{{ task.desc }}</td>
          <td v-if="fullName === task.assign_user">{{ task.acc_user }}</td>
          <td v-if="fullName === task.assign_user">{{ task.assign_user }}</td>
          <td v-if="fullName === task.assign_user">{{ task.ddate }}</td>
          <td v-if="fullName === task.assign_user" :style="{ color: task.is_completed === 1 ? 'green' : 'orange' }">
            {{ task.is_completed === 1 ? 'Completed' : 'Ongoing' }}
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else>No tasks available for Task List.</p>
  </div>
</div>


      <!-- Table 2: Ongoing Tasks -->
      <div class="table-container" v-if="activeTab === 'ongoingTasks'">
        <div class="scroll-table">
          <table v-if="paginatedTasks.length">
            <!-- Table header -->
            <thead>
              <tr>
                <th>Task Name</th>
                <th>Description</th>
                <th>Assign To</th>
                <th>Assigned By</th>
                <th>Consulted</th>
                <th>Informed</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <!-- Table body -->
            <tbody>
              <tr v-for="task in paginatedTasks" :key="task.name">
                <td v-if="fullName === task.assign_user || fullName === task.acc_user || fullName === task.cons_user || fullName === task.inform_user">{{ task.task_name }}</td>
                <td v-if="fullName === task.assign_user || fullName === task.acc_user || fullName === task.cons_user || fullName === task.inform_user">{{ task.desc }}</td>
                <td v-if="fullName === task.assign_user || fullName === task.acc_user || fullName === task.cons_user || fullName === task.inform_user">{{ task.assign_user }}</td>
                <td v-if="fullName === task.assign_user || fullName === task.acc_user || fullName === task.cons_user || fullName === task.inform_user">{{ task.acc_user }}</td>
                <td v-if="fullName === task.assign_user || fullName === task.acc_user || fullName === task.cons_user || fullName === task.inform_user">{{ task.cons_user }}</td>
                <td v-if="fullName === task.assign_user || fullName === task.acc_user || fullName === task.cons_user || fullName === task.inform_user">{{ task.inform_user }}</td>
                <td v-if="fullName === task.assign_user || fullName === task.acc_user || fullName === task.cons_user || fullName === task.inform_user">{{ task.ddate }}</td>
                <td v-if="fullName === task.assign_user || fullName === task.acc_user || fullName === task.cons_user || fullName === task.inform_user"
                  :style="{
                    color: task.is_completed === 1 ? 'green' : 'orange',
                    textAlign: 'left',
                  }"
                >
                  <span v-if="task.is_completed === 1">Completed</span>
                  <span v-else>Ongoing</span>
                </td>
                <td v-if="fullName === task.assign_user || fullName === task.acc_user || fullName === task.cons_user || fullName === task.inform_user">
                  <Button @click="completeOngoingTask(task)" icon="check" />
                </td>
              </tr>
            </tbody>
          </table>
          <p v-else>No ongoing tasks available.</p>
        </div>
      </div>

      <!-- Table 3: Completed Tasks -->
      <div class="table-container" v-if="activeTab === 'completedTasks'">
        <div class="scroll-table">
          <table v-if="paginatedTasks.length">
            <!-- Table header -->
            <thead>
              <tr>
                <th>Task Name</th>
                <th>Description</th>
                <th>Assigned By</th>
                <th>Due Date</th>
                <th>Status</th>
              </tr>
            </thead>
            
            <tbody>
              <tr v-for="task in paginatedTasks" :key="task.name">
                <td>{{ task.task_name }}</td>
                <td>{{ task.desc }}</td>
                <td>{{ task.acc_user }}</td>
                <td>{{ task.ddate }}</td>
                <td
                  :style="{
                    color: task.is_completed === 1 ? 'green' : 'orange',
                    textAlign: 'left',
                  }"
                >
                  <span v-if="task.is_completed === 1">Completed</span>
                  <span v-else>Ongoing</span>
                </td>
              </tr>
            </tbody>
          </table>
          <p v-else>No completed tasks available.</p>
        </div>
      </div>


      <Dialog :options="dialogOptions" v-model="addActionDialogShown">
        <template #body-content>
          <table>
            <tr>
              <td style="padding: 15px">
                <div class="space-y-3">
                  <Input
                    v-model="action.task_name"
                    type="text"
                    required
                    placeholder="Enter Task Name"
                    label="Task Title"
                    style="height: 35px;margin-bottom: 25px;"
                  />
                  <Input
                    v-model="action.desc"
                    type="textarea"
                    required
                    placeholder="Enter Description"
                    label="Task Description"
                    style="height: 90px"
                  />
                  <Input
                    v-model="action.ddate"
                    type="date"
                    required
                    label="Deadline"
                  />
                </div>
              </td>
              <td>
                <div class="space-y-3">
                  <Input
                    v-model="action.assign_user"
                    label="Assign To"
                    type="select"
                    :options="usersOptions"
                    style="height: 35px;"
                    
                  />
                  <Input 
                  v-model="fullName" 
                  label="Created By" 
                  style="height: 35px;"
                  />
                  <Input
                    v-model="action.cons_user"
                    label="Consulted"
                    type="select"
                    :options="usersOptions"
                    style="height: 35px;"
                  />
                  <Input
                    v-model="action.inform_user"
                    label="Informed"
                    type="select"
                    :options="usersOptions"
                    style="height: 35px;"
                  />
                </div>
              </td>
            </tr>
          </table>
          <TaskDetails :action="action" />
        </template>
      </Dialog>




<!-- <Dialog 
        :options="taskDialogOptions"
        v-model="taskDialogShown"
        @close="updateTaskDetails"
        
        
      >
        <template #body-content>
          <div >
            <h2>Task Details</h2> -->
            <!-- Input fields for editing task details -->
            <!-- <Input v-model="selectedTask.task_name" label="Task Name" />
            <Input
              v-model="selectedTask.desc"
              label="Description"
              type="textarea"
            />
            <Input v-model="fullName" label="Created By" style="width: 100%" />
            <Input
              v-model="selectedTask.assign_user"
              label="Assign To"
              type="select"
              :options="usersOptions"
              style="width: 100%"
            />
            <Input v-model="selectedTask.ddate" label="Due Date" type="date" />
            <div>
          <label for="imageInput" class="image-label">Add your image</label>
          <img class="uploading-image" :src="selectedTask.image" alt="Selected Image" />
          <input id="imageInput" type="file" accept="image/jpeg" @change="handleImageChange" />
        </div>


        <div>
        <label for="commentInput">Add a Comment</label>
        <textarea id="commentInput" v-model="selectedTask.comment" @input="handleCommentChange"></textarea>
      </div>
      <button @click="postComment">Post Comment</button>
      <div v-if="selectedTask.comment && selectedTask.comment.length > 0"> -->
        <!-- <h3>Comments</h3> -->
        <!-- <div v-for="(comment, index) in selectedTask.comment" :key="index">
          <span>{{ comment }}</span>
        </div>
      </div>

        

            <Input
              v-model="selectedTask.is_completed"
              label="Status"
              disabled
            />
          </div>
        </template>
      </Dialog> -->




      <div class="modal fade" id="taskDetailsModal" tabindex="-1" aria-labelledby="taskDetailsModalLabel" aria-hidden="true" data-bs-backdrop="static">
  <div class="modal-dialog custom-modal-lg">
    <div class="modal-content">
      <!-- Modal header -->
      <div class="modal-header bg-primary text-white">
        <h5 class="modal-title" id="taskDetailsModalLabel">Task Details</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <!-- Modal body -->
      <div class="modal-body">
        <!-- Task details content -->
        <div v-if="selectedTask">
          <div class="row ms-2">
            <div class="col-md-6">
              <h4 class="text-primary ">Task Name</h4>
              <input type="text" v-model="selectedTask.task_name" class="form-control input-field col-md-9"> <!-- Adding margin-right -->
            </div>
            <div class="col-md-6">
              <h4 class="text-primary">Description</h4>
              <textarea v-model="selectedTask.desc" class="form-control input-field col-md-9"></textarea>
            </div>
          </div>
          <div class="row mt-3 ms-2">
            <div class="col-md-6">
              <h4 class="text-primary">Created By</h4>
              <input type="text" v-model="selectedTask.acc_user" class="form-control input-field col-md-9"> <!-- Adding margin-right -->
            </div>
            <div class="col-md-6">
  <h4 class="text-primary">Assign To</h4>
  <select v-model="selectedTask.assign_user" class="form-select input-field col-md-9 custom-select">
    <option v-for="(user, index) in usersOptions" :key="index" :value="user">{{ user }}</option>
  </select>
</div>
          </div>
          <div class="row mt-3 ms-2">
            <div class="col-md-6">
              <h4 class="text-primary">Due Date</h4>
              <input type="date" v-model="selectedTask.ddate" class="form-control input-field col-md-9"> <!-- Adding margin-right -->
            </div>
            <div class="col-md-6">
  <h4 class="text-primary">Status</h4>
  <select v-model="selectedTask.is_completed" class="form-select input-field col-md-9 custom-select">
    <option value="1">Completed</option>
    <option value="0">Ongoing</option>
  </select>
</div>
          </div>
          <!-- Image Input -->
          <div class="row mt-3 ms-2">
            <!-- <div class="col-md-6">
        <h4 for="imageInput" class="image-label text-primary">Add your image</h4>
        <img class="uploading-image" :src="selectedTask.image" alt="Selected Image" />
        <input id="imageInput" type="file" @change="handleImageChange" />
      </div> -->
      <div class="col-md-6">
<label for="imageInput" class="image-label">Add your image</label>
<input multiple id="imageInput" type="file" @change="handleImageChange" />
<!-- <p>{{ selectedTask }}</p> -->
<div v-if="selectedTask.attachment_table && selectedTask.attachment_table.length">
  <!-- Display attachment links -->
  <ul>
    <li v-for="attachment in selectedTask.attachment_table" :key="attachment.attachment">
      <!-- Make the link clickable and open in a new tab -->
      <a :href="attachment.attachment" target="_blank" class="attachment-link"> <span>{{ attachment.fileName }}</span>
          
          </a>
    </li>
  </ul>
</div>


 
</div>


          <!-- Comment Input -->
          <!-- <div class="col-md-6">
  <div class="mt-3">
    <h4 for="commentInput" class="form-label text-primary">Add a Comment</h4>
    <textarea id="commentInput" @input="handleCommentChange" v-model="newComment" class="form-control input-field col-md-9"></textarea>
  </div>
  <button @click="updateTaskDetails" class="btn btn-primary mt-3">Post Comment</button>
  <div v-if="selectedTask.comment && selectedTask.comment.length > 0" class="mt-3">
    <div v-for="(comment, index) in selectedTask.comment" :key="index">
      <span>{{ comment }}</span>
    </div>
  </div>
</div> -->


<!-- <div class="col-md-6">
  <label for="commentInput">Add a Comment</label>
  <textarea id="commentInput" v-model="selectedTask.comment_area"></textarea>
  
  
</div> -->

<div class="col-md-6">
  <label for="commentInput">Add a Comment</label>
  <textarea id="commentInput" v-model="newCommentText"></textarea>
  <button @click="handleCommentAdditionToDocType(newCommentText)">Add Comment</button></div>

<!-- Display comments -->
<div v-if="selectedTask.comment_area && selectedTask.comment_area.length">
  <ul>
    <li v-for="(comment_area, index) in selectedTask.comment_area" :key="index">
      <!-- Display comment details -->
      <div>Who: {{ comment_area.comment_section }}</div>
      <div>When: {{ comment_area.commented_by }}</div>
      <div>Comment: {{ comment_area.commented_at }}</div>
    </li>
  </ul>
</div>







      </div>
    </div>
          </div>
      <!-- Modal footer -->
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="updateTaskDetails">Save Changes</button>
      </div>
    </div>
  </div>
</div>




<!-- Your Task List Table -->
<!-- <div class="table-container" v-if="activeTab === 'taskList'">
  <div class="scroll-table">
    <table v-if="paginatedTasks.length"> -->
      <!-- Table header -->
      <!-- <thead>
        <tr>
          <th>Task Name</th>
          <th>Description</th>
          <th>Assigned By</th>
          <th>Assign To</th>
          <th>Due Date</th>
          <th>Status</th>
        </tr>
      </thead> -->
      <!-- Table body -->
      <!-- <tbody>
        <tr v-for="task in paginatedTasks" :key="task.name" @click="openTaskDetailsModal(task)">
          <td v-if="fullName === task.assign_user">{{ task.task_name }}</td>
          <td v-if="fullName === task.assign_user">{{ task.desc }}</td>
          <td v-if="fullName === task.assign_user">{{ task.acc_user }}</td>
          <td v-if="fullName === task.assign_user">{{ task.assign_user }}</td>
          <td v-if="fullName === task.assign_user">{{ task.ddate }}</td>
          <td v-if="fullName === task.assign_user" :style="{ color: task.is_completed === 1 ? 'green' : 'orange' }">
            {{ task.is_completed === 1 ? 'Completed' : 'Ongoing' }}
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else>No tasks available for Task List.</p>
  </div>
</div> -->






<div class="pagination">
  <button @click="prevPage" :disabled="currentPage === 1" class="pagination-button">Previous</button>
  <span class="pagination-text">Page {{ currentPage }} of {{ totalPages }}</span>
  <button @click="nextPage" :disabled="currentPage === totalPages" class="pagination-button">Next Page</button>
</div>









      
    </div>
  </div>
</template>

<script setup>
import {
  Dialog,
 
  createListResource,
  Input,
  Button,
  createResource,
} from 'frappe-ui'
import { session } from '../data/session'
import { ref, computed } from 'vue'
import axios from 'axios'
import { createRouter, createWebHistory, useRoute } from 'vue-router'
import Login from './Login.vue'
import { useRouter } from 'vue-router'





const perPage = ref(10); 
const currentPage = ref(1);
const documentData = ref(null);

// Define computed property to return paginated tasks
const paginatedTasks = computed(() => {
  const start = (currentPage.value - 1) * perPage.value;
  const end = start + perPage.value;
  return filteredTasks.value.slice(start, end);
});

// Calculate total pages based on the number of filtered tasks and items per page
const totalPages = computed(() => Math.ceil(filteredTasks.value.length / perPage.value));

// Function to navigate to the previous page
const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

// Function to navigate to the next page
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};








// const selectedTask = ref(null);
// const openTaskDetailsModal = (task) => {
//   selectedTask.value = task;
//   $('#taskDetailsModal').modal('show');
// }




const selectedTask = ref(null);

const openTaskDetailsModal = async (task) => {
  try {
    console.log("task name", task.name);
    // Make a GET request to fetch the task details using Frappe's API
    const response = await axios.get(`/api/resource/Tms/${encodeURIComponent(task.name)}`);

    if (response.status === 200) {
      // Extract file names from attachment URLs
      const formattedTask = {
        ...response.data.data,
        attachment_table: response.data.data.attachment_table.map(attachment => ({
          ...attachment,
          // Extract file name from URL
          fileName: attachment.attachment.split('/').pop()
        }))
      };
      
      // Set the selectedTask value to the fetched task with file names
      selectedTask.value = formattedTask;
      // Show the modal
      $('#taskDetailsModal').modal('show');
    } else {
      console.error('Failed to fetch task details:', response.data);
    }
  } catch (error) {
    console.error('Error fetching task details:', error);
  }
}








const router = useRouter();
const isDropdownOpen = ref(false);
const fullName = ref('');

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
}

const logout = async () => {
  try {
    const response = await axios.post('/api/method/logout'); // Adjust your logout API endpoint accordingly
    if (response.status === 200) {
      
      router.push({ name: 'Login' });
      location.reload();
    } else {
      console.error('Failed to logout:', response.data);
    }
  } catch (error) {
    console.error('Error during logout:', error);
  }
}
const currentUser = session.user

console.log('Current user:', currentUser)

let attachmentTable = [];
let fileUrls = [];
// Create an array to store the attachment objects
let attachments = [];
console.log("uuuuuuuuuuuuu===========",attachments)
let comment= [];
console.log("yyyyyyyyyyyyy===========",comment)

// Function to handle image change
const handleImageChange = async (event) => {
  const files = event.target.files;

  if (files && files.length > 0) {
    try {
      // Create an array of objects representing the attachments
      attachmentTable = Array.from(files);

      // Log attachment table for debugging
      console.log("Attachment Table:", attachmentTable);
    } catch (error) {
      console.error('Error handling image change:', error);
    }
  }
};



// Function to upload a file to Frappe manually using REST API
const uploadFileToFrappe = async (file) => {
  try {

    // Construct FormData object to send file
    const formData = new FormData();
    formData.append('file', file);

    // Make a POST request to the upload_file endpoint
    const response = await fetch('/api/method/upload_file', {
      method: 'POST',
      body: formData,
    });

   
    if (!response.ok) {
      console.log("Failed to upload file")
      throw new Error('Failed to upload file');
    }

    // Parse response JSON if needed
    const data = await response.json();
    console.log(data.message.file_name, "file name---");

    const hostWithPort = window.location.host;
    console.log(hostWithPort); 

    const fileUrl = data.message.file_url;

    const completeFileUrl = `http://${hostWithPort}${fileUrl}`;
    fileUrls.push(completeFileUrl)

    // Add attachment details to the attachments array
    attachments.push({
          attachment: completeFileUrl, // Assuming the file name is returned by the API
    });

    console.log(fileUrls, "file urls array");
    console.log('File uploaded successfully:', data);

    return data; // Return response data if needed
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error; // Re-throw error to handle it in caller function
  }
};





/*const updateTaskDetails = async ()=>{
  



  try{
    const tmsResponse = await axios.get(`/api/resource/Tms/${encodeURIComponent(selectedTask.value.name)}`);
    console.log("tmsresponse",tmsResponse.data.data.response_data);

    
    const selected = ref({
      ...selectedTask.value,
  id: tmsResponse.id,
  name: selectedTask.value.name,
  desc: selectedTask.value.desc,
  ddate: selectedTask.value.ddate,
  assign_user: selectedTask.value.assign_user,
  acc_user: selectedTask.value.acc_user,
  cons_user: selectedTask.value.cons_user,
  inform_user: selectedTask.value.inform_user,
  is_completed: selectedTask.value.is_completed,
  task_name: selectedTask.value.task_name,
  image:selectedTask.value.image,
  comment: selectedTask.value.comment,
  attachment_table:[],
  tms_attachment_table:selectedTask.value.tms_attachment_table,
})
// tmsResponse.data.data.response_data.push(selected);


    console.log("selected task.",selectedTask.value);
    const selectedStringValue = JSON.stringify(selected.value, null, 2);
    console.log("selectedstring value",selectedStringValue)
    tmsResponse.data.data.response_data = selectedStringValue;

console.log("Updated response_data:", tmsResponse.data.data.response_data);

    if (attachmentTable.length > 0) {
      // Iterate through each file in the attachment table and upload it
      for (const file of attachmentTable) {
        await uploadFileToFrappe(file);
      }
      console.log("attachments array", attachments)
    }


  }catch{

  }
} */

const handleCommentAdditionToDocType = async (commentTextArrayOrText) => {
  try {
    // Check if commentTextArrayOrText is an array or a single string
    const commentTextArray = Array.isArray(commentTextArrayOrText) ? commentTextArrayOrText : [commentTextArrayOrText];
console.log("comment Array",commentTextArray)
    if (commentTextArray.length > 0) {
      const commentDataArray = commentTextArray.map(commentText => ({
        comment_section: fullName._value,
        commented_by: new Date().toLocaleString(),
        commented_at: commentText
      }));

      console.log('New comments:', commentDataArray);

      // Fetch existing comments and attachments
      const response = await axios.get(`/api/resource/Tms/${encodeURIComponent(selectedTask.value.name)}`);
      const existingData = response.data.data;
      console.log("Existing data:", existingData);

      // Extract existing comments and attachments
      const existingComments = existingData.comment_area || [];
      console.log("Existing comments:", existingComments);
      const existingAttachments = existingData.attachment_table || [];
      console.log("Existing attachments:", existingAttachments);

      // Add existing comments to new comments
      const allComments = [...existingComments, ...commentDataArray];
      console.log("all commentrssdfuy",allComments)

      await addCommentsAndAttachmentsToDocType(allComments, existingAttachments);
      console.log('Comments and attachments added successfully');
    } else {
      console.log('No comments provided');
    }
  } catch (error) {
    console.error('Error handling comment and attachments addition:', error);
  }
};



// Function to refresh the document
const refreshDocument = async () => {
  try {
    // Make a GET request to fetch the updated document data
    const response = await axios.get(`/api/resource/Tms/${encodeURIComponent(selectedTask.value.name)}`);
    console.log("Document refreshed successfully:", response.data);

    // Store the refreshed document data into the documentData ref
    documentData.value = response.data.data;
    console.log("Refreshed Document Data", documentData)
  } catch (error) {
    console.error('Error refreshing document:', error);
    throw error;
  }
};


// Function to add comments and attachments to the document
const addCommentsAndAttachmentsToDocType = async (comments, attachments) => {
  try {
    // Update the task with the updated comment_area and attachment_table
    const updateResponse = await axios.put(`/api/resource/Tms/${encodeURIComponent(selectedTask.value.name)}`, {
      comment_area: comments,
      // attachment_table: attachments
    });
    const commentArea = updateResponse.data.data.comment_area;

    // Push the comment area to the documentData ref
    documentData.value = commentArea;

    if (updateResponse.status === 200) {
      console.log('Comments and attachments added successfully:', updateResponse.data);
      
      // Refresh the document
      await refreshDocument();
      
    } else {
      console.log("Failed to add comments and attachments");
      throw new Error('Failed to add comments and attachments');
    }
  } catch (error) {
    console.error('Error adding comments and attachments:', error);
    throw error;
  }
};

// const handleCommentAdditionToDocType = async (commentTextArrayOrText) => {
//   try {
//     // Check if commentTextArrayOrText is an array or a single string
//     const commentTextArray = Array.isArray(commentTextArrayOrText) ? commentTextArrayOrText : [commentTextArrayOrText];

//     if (commentTextArray.length > 0) {
//       const commentDataArray = commentTextArray.map(commentText => ({
//         comment_section: fullName._value,
//         commented_by: new Date().toLocaleString(),
//         commented_at: commentText
//       }));

//       console.log('New comments:', commentDataArray);

//       // Fetch existing comments
//       const response = await axios.get(`/api/resource/Tms/${encodeURIComponent(selectedTask.value.name)}`);
//       const existingData = response.data;
//       console.log("Existing comments data:", existingData);

//       // Extract existing comments
//       const existingComments = existingData.comment_area || [];
//       console.log("Existing comments:", existingComments);

//       // Add existing comments to new comments
//       const allComments = [...existingComments, ...commentDataArray];

//       await addCommentsToDocType(allComments);
//       console.log('Comments added successfully');
//     } else {
//       console.log('No comments provided');
//     }
//   } catch (error) {
//     console.error('Error handling comment addition:', error);
//   }
// };

// const addCommentsToDocType = async (comments) => {
//   try {
//     // Update the task with the updated comment_area
//     const updateResponse = await axios.put(`/api/resource/Tms/${encodeURIComponent(selectedTask.value.name)}`, { comment_area: comments });

//     if (updateResponse.status === 200) {
//       console.log('Comments added successfully:', updateResponse.data);
//       return updateResponse.data;
//     } else {
//       console.log("Failed to add comments");
//       throw new Error('Failed to add comments');
//     }
//   } catch (error) {
//     console.error('Error adding comments:', error);
//     throw error;
//   }
// };

// Example usage
// handleCommentAdditionToDocType("Another comment text");










// Function to update task details
// const updateTaskDetails = async () => {
  
//   try {

    
//     let updatedDocument = null;
    
    
//     if (attachmentTable.length > 0) {

    
            
//       // // Refresh the document only if there are attachments
//       // updatedDocument = await refreshDocument();
//       // console.log("Updated document:", updatedDocument);

//       // Iterate through each file in the attachment table and upload it
//       for (const file of attachmentTable) {
//         await uploadFileToFrappe(file);
//       }
//       console.log("attachments array", attachments)
//     }
    
  
//     const tmsResponse = await axios.get(`/api/resource/Tms/${encodeURIComponent(selectedTask.value.name)}`);
//     const currentAttachments = tmsResponse.data.data.attachment_table || [];

//     // Extract only the 'attachment' field from each object in the attachment_table array
//     const attachmentNames = currentAttachments.map(attachment => attachment.attachment);

//     console.log("existing attachments:", attachmentNames);

//     const existingAttachments = [];

//     for (const attachment of currentAttachments){
//       existingAttachments.push({
//         attachment:attachment.attachment
//       });
//     }
//     console.log("Existing attachments url", existingAttachments);

//   // Merge the task details from selectedTask with updatedDocument
//   if (updatedDocument) {
//     // Extract attachment table and comment from updatedDocument
//     const { attachment_table, comment_area } = updatedDocument;

//     // Merge other values from selectedTask with the extracted attachment table and comment
//     selectedTask.value = {
//       ...selectedTask.value, // Keep other values from selectedTask
//       attachment_table, // Copy attachment table from updatedDocument
//       comment_area // Copy comment from updatedDocument
//     };
//     console.log("updated selectewd task, ---", selectedTask.value);
//   }


//     // Determine the task to update based on the presence of attachments
//     const taskToUpdate = attachmentTable.length > 0 ? selectedTask.value : updatedDocument;


//     // Combine the current attachments with the new attachments
//     const combinedAttachments = [...existingAttachments, ...attachments];
//     console.log("Combined attachments", combinedAttachments);
    
//     // Hardcoded attachment array
//     const newAttachments = [{ "attachment": "http://example.com/file1.png" }, { "attachment": "http://example.com/file2.jpg" }];
//     console.log("hardcode attachment")
//     // await handleCommentAdditionToDocType(newCommentText);
//     // Make a PUT request to update the task details, including the attachment_table
//     // const response = await axios.put(
//     //   `/api/resource/Tms/${encodeURIComponent(selectedTask.value.name)}`,
//     //   { response_data:attachments, ...selectedTask.value }
//     // );

//   // Make a PUT request to update the task details, including the attachment_table
//   const response = await axios.put(
//     `/api/resource/Tms/${encodeURIComponent(taskToUpdate.name)}`,
//     { response_data: attachments, ...selectedTask.value }
//   );

//   console.log("Updated response:", response);
   

//     // Make a PUT request to update the task details, including the attachment_table
//     const response1 = await axios.put(
//     `/api/resource/Tms/${encodeURIComponent(selectedTask.value.name)}`,
//     { attachment_table: combinedAttachments }
//     );

//     console.log("Updated response:", response);

//     if (response.status === 200) {
//       console.log('Task details updated successfully:', response.data);
      
//       taskDialogShown.value = false;
//       // Clear the file input field if needed
//       // event.target.value = '';
//     } else {
//       console.error('Failed to update task details:', response.data);
//     }

//     // try {
//     //   // Make the second PUT request to update the rest of the task details using the refreshed data
//     //   const response_2 = await axios.put(`/api/resource/Tms/${encodeURIComponent(selectedTask.value.name)}`, { ...selectedTask });
//     //   console.log("Response 2:", response_2);
      

//     //   // Make a GET request to refresh the document
//     //   const refreshResponse = await axios.get(`/api/resource/Tms/${encodeURIComponent(selectedTask.value.name)}`);
//     //   console.log("Document refreshed successfully:", refreshResponse.data);
//     //   // Make the first PUT request to update the attachment_table
//     //   const response_1 = await axios.put(`/api/resource/Tms/${encodeURIComponent(selectedTask.value.name)}`, { attachment_table: combinedAttachments });
//     //   console.log("Response 1:", response_1);


//     //   if (response_2.status === 200) {
//     //     console.log('Task details updated successfully:', response_2.data);
//     //     taskDialogShown.value = false;
//     //     // Clear the file input field if needed
//     //     // event.target.value = '';
//     //   } else {
//     //     console.error('Failed to update task details:', response_2.data);
//     //   }
//     // } catch (error) {
//     //   console.error("Error updating task details:", error);
//     // }



  
//   } catch (error) {
//     console.error('Error updating task details:', error);
//   }
// }; 


const updateTaskDetails = async () => {
  try {
    let updatedDocument = [];
    
    if (attachmentTable.length > 0) {
      // Iterate through each file in the attachment table and upload it
      for (const file of attachmentTable) {
        await uploadFileToFrappe(file);
      }
    }

    // Reload the tms list resource to ensure you have the latest version of the document
    await tms.reload();

    // Fetch the current task details from the API
    const tmsResponse = await axios.get(`/api/resource/Tms/${encodeURIComponent(selectedTask.value.name)}`);
    const currentTask = tmsResponse.data.data;
    const currentModifiedTime = currentTask.modified;
    console.log("current modify data-------", currentModifiedTime);

    // Merge the task details from selectedTask with updatedDocument
    const taskToUpdate = attachmentTable.length > 0 ? selectedTask.value : currentTask;

    // Combine the current attachments with the new attachments
    const combinedAttachments = [...currentTask.attachment_table || [], ...attachments];

    // Make a PUT request to update the task details, including the attachment_table
    const response = await axios.put(
      `/api/resource/Tms/${encodeURIComponent(taskToUpdate.name)}`,
      { response_data: attachments, ...taskToUpdate }
    );

    console.log("Updated response:", response);

    if (response.status === 200) {
      console.log('Task details updated successfully:', response.data);
      taskDialogShown.value = false;
    } else {
      console.error('Failed to update task details:', response.data);
    }
  } catch (error) {
    console.error('Error updating task details:', error);
  }
};








// const updateTaskDetails = async (commentTextArrayOrText) => {
//   try {
//     let updatedDocument = ''; // Initialize updatedDocument

//     // Check if there are any attachments to upload
//     if (attachmentTable.length > 0) {
//       // Iterate through each file in the attachment table and upload it
//       for (const file of attachmentTable) {
//         await uploadFileToFrappe(file);
//       }
//       console.log("Attachments array:", attachments);
//     }
    
//     // Fetch the current task details from the API
//     const tmsResponse = await axios.get(`/api/resource/Tms/${encodeURIComponent(selectedTask.value.name)}`);
//     const currentTask = tmsResponse.data.data;
//     const commentTextArray = Array.isArray(commentTextArrayOrText) ? commentTextArrayOrText : [commentTextArrayOrText];

//     const commentDataArray = commentTextArray.map(commentText => ({
//         comment_section: fullName._value,
//         commented_by: new Date().toLocaleString(),
//         commented_at: commentText
//       }));


//     const existingComments = currentTask.comment_area || [];
//     console.log("Existing comment_area---------:", existingComments);

//     const allComments = [...existingComments, ...commentDataArray];
//       console.log("all commentrssdfuy-------",allComments)

//     // Extract current attachments from the response
//     const currentAttachments = currentTask.attachment_table || [];
//     console.log('Current attachments:', currentAttachments);

//     // Extract attachment names
//     const attachmentNames = currentAttachments.map(attachment => attachment.attachment);
//     console.log("Existing attachments:", attachmentNames);

//     // Create an array to store existing attachments
//     const existingAttachments = currentAttachments.map(attachment => ({ attachment: attachment.attachment }));
//     console.log("Existing attachments---------:", existingAttachments);

//     // const existingComments = currentAttachments.map(comment_area => ({ comment_area: comment_area.comment_area }));
//     // console.log("Existing comment_area---------:", existingComments);
//     // Merge the task details from selectedTask with updatedDocument if available
//     if (updatedDocument) {
//       // Extract attachment table and comment from updatedDocument
//       const { attachment_table, comment_area } = updatedDocument;

//       // Merge other values from selectedTask with the extracted attachment table and comment
//       selectedTask.value = {
//         ...selectedTask.value,
//         attachment_table,
//         comment_area
//       };
//       console.log("Updated selected task:", selectedTask.value);
//     }

//     // Determine the task to update based on the presence of attachments
//     const taskToUpdate = attachmentTable.length > 0 ? selectedTask.value : updatedDocument;

//     // Combine the current attachments with the new attachments
//     const combinedAttachments = [...existingAttachments, ...attachments];
//     console.log("Combined attachments:", combinedAttachments);

//     // Merge documentData with selectedTask
//     documentData.value = { ...selectedTask.value };
//     console.log("Document data before update:", documentData.value);

//     // Make a PUT request to update the task details, including both attachment_table and comment_area
//     const response = await axios.put(
//       `/api/resource/Tms/${encodeURIComponent(taskToUpdate.name)}`,
//       { 
//         attachment_table: attachments, 
//         ...allComments,...selectedTask.value
//         // Add other fields if needed
//       }
//     );

//     console.log("Updated response:", response);

//     if (response.status === 200) {
//       console.log('Task details updated successfully:', response.data);
//       taskDialogShown.value = false;
//     } else {
//       console.error('Failed to update task details:', response.data);
//     }
//   } catch (error) {
//     console.error('Error updating task details:', error);
//   }
// };










const taskDialogShown = ref(false)
// const selectedTask = ref(null)

const openTaskDetails = (task) => {
  selectedTask.value = task
  taskDialogShown.value = true
}

console.log("opentaskdetails",openTaskDetails)

const taskDialogOptions = {
  title: 'Task Details',
  actions: [{ label: 'Save' }],
}

const task = ref({})
function handleTaskNameClick(clickedTask) {
  task.value = clickedTask
}

const userTasks = computed(() => {
  if (!session.user) return []

  return filteredTasks.value.filter((task) => task.inform_user === session.user)
})

const activeTab = ref('taskList')

// Define filteredTasks computed property to filter tasks based on the active tab
const filteredTasks = computed(() => {
  if (activeTab.value === 'taskList') {
    return tms.data
  } else if (activeTab.value === 'ongoingTasks') {
    return tms.data.filter((task) => task.is_completed === 0)
  } else {
    return tms.data.filter((task) => task.is_completed === 1)
  }
})




// Separate arrays for ongoing and completed tasks
const ongoingTasks = computed(() =>
  tms.data.filter((task) => task.is_completed === 0)
)
const completedTasks = computed(() =>
  tms.data.filter((task) => task.is_completed === 1)
)

const dialogOptions = computed(() => ({
  title: 'Add New Task',
  actions: [
    {
      label: 'Create',
      appearance: 'primary',
      onclick: () => {
        createTicket()
        resetForm()
      },
    },
    { label: 'Cancel' },
  ],
}))

const action = ref({
  id: '',
  name: '',
  desc: '',
  ddate: '',
  assign_user: '',
  acc_user: '',
  cons_user: '',
  inform_user: '',
  is_completed: '',
  task_name: '',
  image:'',
  comment: '',
  attachment_table:[],
  tms_attachment_table:'',
  comment_area:[],
})

const addActionDialogShown = ref(false)

const tms = createListResource({
  doctype: 'Tms',

  fields: ['*'],
  limit: 100,
})
tms.reload()

const currentUserEmail = session.user

// const fullName = ref('')

const userFullname = createListResource({
  doctype: 'User',
  fields: ['*'],
  transform(userFullname) {
    var currentUserData = userFullname.find(
      (user) => user.email === currentUserEmail
    )

    if (currentUserData) {
      fullName.value = currentUserData.full_name
      return [currentUserData]
    } else {
      fullName.value = 'Admin'
      return [currentUserData]
    }
  },
})
userFullname.reload()

const users = createListResource({
  doctype: 'User',
  fields: ['full_name'],
  transform(users) {
    return users.map((c) => c.full_name)
  },
})

console.log('jgfhsgdhfgdsfsd', users)
users.reload()

const usersOptions = computed(() => {
  if (users.list.loading || !users.data) {
    return []
  }
  return users.data
})

const createTicket = async () => {
  console.log('Action object:', action)

  try {
    const response = await tms.insert.submit({
      ...action,
      doctype: 'Tms',
      name: action.value.name,
      desc: action.value.desc,
      ddate: action.value.ddate,
      assign_user: action.value.assign_user,
      acc_user: fullName.value,
      cons_user: action.value.cons_user,
      inform_user: action.value.inform_user,
      is_completed: action.value.is_completed,
      task_name: action.value.task_name,
      image: action.value.image,
      comment: action.value.comment,
      attachment_table:action.value.attachment_table,
      tms_attachment_table:action.value.tms_attachment_table,
      comment_area:action.value.comment_area,
      response_data:action.value
    })
    console.log('Response from server:', response)

    if (response.status_code === 200) {
      location.reload();
      console.log('Task created successfully:', response.data)
      
      resetForm()

      // Close the dialog
      close()
      // location.reload();
      
    } else {
      console.error('Error creating task:', response.data)
      // location.reload();
    }
  } catch (error) {
    console.error('Error creating task:', error)
    console.log('Error details:', error.response?.data || error.message)
  }
}

const resetForm = () => {
  action.name = ''
  action.desc = ''
  action.ddate = ''
  action.assign_user = ''
  action.acc_user = ''
  action.cons_user = ''
  action.inform_user = ''
  action.task_name = ''
  action.image =''
  action.comment = ''
  action.attachment_table= []
  action.tms_attachment_table= ''
  action.comment_area = []
}

const completeOngoingTask = async (task) => {
  console.log('Task:', task)
  try {
    const taskDetails = tms.data.find((t) => t.name === task.name)

    if (!taskDetails) {
      console.error(
        'Failed to retrieve task details for naming series:',
        task.name
      )
      return
    }

    if ('is_completed' in taskDetails && taskDetails.is_completed === 0) {
      const updatedTaskData = {
        doctype: 'Tms',
        name: task.name,
        is_completed: 1,
      }

      try {
        // Make the POST request to update task status
        const response = await axios.put(
          `/api/resource/Tms/${encodeURIComponent(task.name)}`,
          updatedTaskData,

          { params: { _method: 'PUT' } }
        )

        console.log('Server Response:', response)

        // Check if the status code indicates success (2xx range)
        if (response.status >= 200 && response.status < 300) {
          console.log('Task marked as completed in the backend.')

          // Update the local data
          tms.data = tms.data.map((t) =>
            t.name === task.name ? { ...t, is_completed: 1 } : t
          )

          console.log('Task marked as completed:', tms.data)
        } else {
          // Log an error if the request was not successful
          console.error(
            'Failed to update task status. Server response:',
            response.data
          )
        }
      } catch (updateError) {
        // Handle errors during the update request
        console.error('Error updating task status:', updateError.message)

        // If there's a response from the server, log it
        if (updateError.response) {
          console.log('Server response details:', updateError.response.data)
        }
      }
    } else {
      console.log('Task is already completed.')
    }
  } catch (error) {
    // Handle errors in the main try-catch block
    console.error('Error in completeOngoingTask:', error.message)
  }
}
</script>




<style scoped>


*{
  
  font-family: "Open Sans", sans-serif;
} 


#myModal{

width: 100%;
height: 100%;
}

.modal-body{
  /* margin-top:20px; */
  height: 80vh;
}

.topic-container {
  display: flex;
  align-items: center;
  justify-content: center;
}
.max-w-lg{
  width:100rem !important;
}
.topic-image {
  width: 130px; /* Adjust the width as needed */
  margin-right: 10px; /* Add some space between the image and the heading */
}


.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #007bff; /* Navbar background color */
  color: #ffffff;
  font-size: 20px;
  padding: 10px 20px;
  position: sticky;
}

.task-button {
  background-color: #007bff;
  color: #ffffff;
}

.task-button:hover {
  background-color: #0056b3; /* Darker shade of blue for hover effect */
}

.topic-heading {
  margin: 0;
  font-size: 24px;
}

.navbar-right {
  display: flex;
  align-items: center;
}

.user-info {
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
}

.dropdown-menu {
  position: absolute;
  margin-left: -10px;
  top: 120%; /* Position the dropdown below the user info */
  left: 0;
  z-index: 1; /* Ensure the dropdown is above other elements */
  background-color: #fff; /* Dropdown background color */
  border: 1px solid #ccc; /* Dropdown border */
  border-radius: 4px; /* Rounded corners */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Dropdown shadow */
}

.dropdown-menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.dropdown-menu li {
  padding: 8px 16px;
}

.dropdown-menu li a {
  text-decoration: none;
  color: #333; /* Dropdown link color */
  display: block;
}

.dropdown-menu li a:hover {
  background-color: #f5f5f5; /* Hover background color */
}

.user-icon {
  width: 32px;
  height: 32px;
  margin-right: 10px;
  cursor: pointer;
}

/* Table styles */
.table-container table {
  width: 100%;
  border-collapse: collapse;
}

/* Table header styles */
.table-container th {
  padding: 8px;
  text-align: left;
  background-color: #f2f2f2; /* Header background color */
  border-bottom: 1px solid #ddd;
}

/* Table body styles */
.table-container td {
  padding: 8px;
  border-bottom: 1px solid #ddd;
}

/* Style for the last cell in each row */
.table-container td:last-child {
  text-align: center;
}

/* Style for the hover effect */
.table-container tbody tr:hover {
  background-color: #f5f5f5; /* Hover background color */
}

.table-container {
  overflow-x: auto; /* Enable horizontal scrolling on smaller screens */
}

.table-container {
  /* Adjust alignment as needed */
  text-align: left; /* Example: Align cell content to the left */
}
.scroll-table table {
  width: 100%; /* Ensure the table takes full width of its container */
  border-collapse: collapse; /* Remove spacing between table cells */
}

.scroll-table th,
.scroll-table td {
  padding: 8px;
}

.tab-buttons {
  display: flex;
  justify-content: center;
  align-items: center;
}

.tab-buttons h3 {
  margin: 0; /* Remove default margin */
  padding: 10px 20px; /* Add padding */
  font-size: 16px;
  cursor: pointer;
}

.vertical-line {
  width: 1px;
  height: 20px; /* Adjust the height as needed */
  background-color: #ccc; /* Vertical line color */
  margin: 0 10px; /* Add margin for spacing */
}

.active-tab {
  background-color: #007bff;
  color: #ffffff;
  border-radius: 10px;
}

.table-container {
  margin-top: 20px; /* Add space above the table */
}

.custom-modal-lg{
  max-width: 90%;
}

.custom-select{
  height: 40px;
}

.task-comment {
  /* Apply your desired styles here */
  font-size: 25px;
  color: #333;
  line-height: 1.5;
  margin-bottom: 15px;
  
  border: 1px solid #ccc; 
  padding: 10px; 
  background-color: #f5f5f5; 
}

.pagination {
  margin-top: 20px;
  text-align: center;
}

.pagination-button {
  background-color: #4caf50; /* Green */
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-flex; /* Use flexbox */
  align-items: center; /* Center vertically */
  justify-content: center; /* Center horizontally */
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 5px;
}

.pagination-button:hover {
  background-color: #45a049; /* Darker green */
}

.pagination-button:disabled {
  background-color: #cccccc; /* Grey */
  color: #666666; /* Dark grey */
  cursor: not-allowed;
}

.pagination-text {
  font-size: 16px;
  margin: 0 10px;
  color: #333333; /* Black */
}

.attachment-link {
  display: inline-block;
  padding: 4px 12px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 5px;
  text-decoration: none;
  color: #333;
  position: relative;
  margin-bottom: 5px;
}

.attachment-link:hover {
  background-color: #e0e0e0;
}

.close-icon {
  position: absolute;
  top: 0px;
  right: 5px;
  font-weight: bold;
  color: #666;
  cursor: pointer;
}

.close-icon:hover {
  color: #333;
}


/* Define breakpoint for smaller screens */
@media (max-width: 768px) {
  .scroll-table th,
  .scroll-table td {
    font-size: 14px; /* Reduce font size on smaller screens */
  }
}
</style>
