<template>
    <div>
        <h2>New Point</h2>
        <form @submit.prevent="createPoint">
            <div>
                <label>Name:</label>
                <input v-model="point.name" required />
            </div>
            <div>
                <label>X:</label>
                <input type="number" v-model="point.x" required />
            </div>
            <div>
                <label>Y:</label>
                <input type="number" v-model="point.y" required />
            </div>
            <button type="submit" :disabled="!isFormValid">Save</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            point: { name: '', x: 0, y: 0 },
        };
    },
    methods: {
        createPoint() {
            axios.post('http://localhost:3000/points', this.point)
                .then(() => {
                    this.$router.push('/');
                })
                .catch(error => {
                    console.error(error);
                });
        },
    },
    computed: {
        isFormValid() {
            return this.point.name && this.point.x !== null && this.point.y !== null;
        },
    },
};
</script>

<style scoped>
form {
    display: flex;
    flex-direction: column;
    width: 300px;
    margin: auto;
}

label {
    margin-top: 10px;
}

input {
    margin-bottom: 10px;
}

button {
    margin-top: 10px;
}
</style>
