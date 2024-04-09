<template>
  <div class="login-container">
    
    <Card class="login-card">
      <img src="../images/login.png" alt="Login Image" class="login-image" />
      <h4 class="login-title">Task Management System</h4>
      <form class="login-form" @submit.prevent="submit">
        <div class="input-group">
          <label for="email" class="input-label">User ID</label>
          <Input
            required
            name="email"
            type="text"
            placeholder="john@gmail.com"
            class="input-field"
          />
        </div>
        <div class="input-group">
          <label for="password" class="input-label">Password</label>
          <Input
            required
            name="password"
            type="password"
            placeholder="******"
            class="input-field"
          />
        </div>
        <Button :loading="session.login.loading" variant="solid" type="submit" class="login-button">
          <span>Login</span>
        </Button>
      </form>
    </Card>

     
  </div>
</template>

<script setup>
import { session } from '../data/session';


const submit = (e) => {
  const formData = new FormData(e.target);
  session.login.submit({
    email: formData.get('email'),
    password: formData.get('password'),
  });
  
};



</script>

<style scoped>



.login-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login-image {
  /* max-width: 100%; */
  margin-bottom: 1rem; /* Adjust margin as needed */
}

.login-card {
  width: 90%;
  max-width: 400px;
  padding: 2rem;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.login-title{
  display: flex;
  /* align-items: center; */
  justify-content: center;
}

.input-group {
  display: flex;
  flex-direction: column;
}

.input-label {
  font-size: 1rem;
  margin-bottom: 0.25rem;
}

.input-field {
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
}

.login-button {
  align-self: flex-end;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
}
</style>
