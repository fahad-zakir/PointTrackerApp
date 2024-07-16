<template>
    <div>
        <button @click="goToNewPoint">New Point</button>
        <table class="rounded-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>X</th>
                    <th>Y</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="point in points" :key="point.id" @click="editPoint(point.id)">
                    <td>{{ point.name }}</td>
                    <td>{{ point.x }}</td>
                    <td>{{ point.y }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            points: [],
        };
    },
    created() {
        this.fetchPoints();
    },
    methods: {
        fetchPoints() {
            axios.get('http://localhost:3000/points')
                .then(response => {
                    this.points = response.data;
                })
                .catch(error => {
                    console.error(error);
                });
        },
        goToNewPoint() {
            this.$router.push('/new');
        },
        editPoint(id) {
            this.$router.push(`/edit/${id}`);
        },
    },
};
</script>

<style scoped>
table {
    width: 100%;
    border-collapse: collapse;
}

th,
td {
    border: 1px solid black;
    padding: 8px;
    text-align: left;
}

tr {
    cursor: pointer;
}
</style>
//testing