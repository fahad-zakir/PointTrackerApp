<template>
    <div>
        <router-link to="/" class="home-button">Home</router-link>
        <h2>Edit Point</h2>
        <form @submit.prevent="savePoint">
            <div>
                <label>Name:</label>
                <input class="name-input" v-model="point.name" required />
            </div>
            <div>
                <label>X:</label>
                <input type="number" v-model="point.x" required />
            </div>
            <div>
                <label>Y:</label>
                <input type="number" v-model="point.y" required />
            </div>
            <div class="button-group">
                <button type="submit">Save</button>
                <button type="button" @click="resetForm">Reset</button>
                <button type="button" @click="deletePoint">Delete</button>
            </div>
        </form>
        <p v-if="nearestPoints.length">Nearest point at distance {{ nearestDistance }}:</p>
        <ul class="custom-list">
            <li v-for="p in nearestPoints" :key="p.id">{{ p.name }} ({{ p.x }}, {{ p.y }})</li>
        </ul>
        <p v-if="farthestPoints.length">Farthest point at distance {{ farthestDistance }}:</p>
        <ul class="custom-list">
            <li v-for="p in farthestPoints" :key="p.id">{{ p.name }} ({{ p.x }}, {{ p.y }})</li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            point: { name: '', x: 0, y: 0 },
            originalPoint: null,
            nearestPoints: [],
            nearestDistance: 0,
            farthestPoints: [],
            farthestDistance: 0,
        };
    },
    created() {
        this.fetchPoint();
    },
    watch: {
        'point.x': 'updateDistances',
        'point.y': 'updateDistances',
    },
    methods: {
        fetchPoint() {
            axios.get(`http://localhost:3000/points/${this.$route.params.id}`)
                .then(response => {
                    this.point = response.data;
                    this.originalPoint = { ...this.point };
                    this.updateDistances();
                })
                .catch(error => {
                    console.error(error);
                });
        },
        savePoint() {
            axios.put(`http://localhost:3000/points/${this.$route.params.id}`, this.point)
                .then(() => {
                    this.$router.push('/');
                })
                .catch(error => {
                    console.error(error);
                });
        },
        resetForm() {
            this.point = { ...this.originalPoint };
        },
        deletePoint() {
            axios.delete(`http://localhost:3000/points/${this.$route.params.id}`)
                .then(() => {
                    this.$router.push('/');
                })
                .catch(error => {
                    console.error(error);
                });
        },
        updateDistances() {
            axios.get('http://localhost:3000/points')
                .then(response => {
                    const points = response.data.filter(p => p.id !== this.point.id);
                    const distances = points.map(p => ({
                        ...p,
                        distance: Math.sqrt((p.x - this.point.x) ** 2 + (p.y - this.point.y) ** 2),
                    }));

                    distances.sort((a, b) => a.distance - b.distance);

                    const nearestUnique = distances.find(d => d.distance !== distances[0].distance) || distances[0];
                    const farthestUnique = distances.find(d => d.distance !== distances[distances.length - 1].distance) || distances[distances.length - 1];

                    this.nearestPoints = [nearestUnique];
                    this.nearestDistance = nearestUnique.distance.toFixed(1);

                    this.farthestPoints = [farthestUnique];
                    this.farthestDistance = farthestUnique.distance.toFixed(1);
                })
                .catch(error => {
                    console.error(error);
                });
        },
    },
    computed: {
        isFormValid() {
            return this.point.name && this.point.name !== this.originalPoint.name && this.point.x !== null && this.point.y !== null;
        },
    },
};
</script>

<style scoped>
.home-button {
    display: inline-block;
    background-color: #007BFF;
    color: white;
    padding: 4px 6px;
    font-size: 14px;
    border-radius: 4px;
    text-decoration: none;
    margin-bottom: 10px;
    /* Space between the button and the title */
}

.home-button:hover {
    background-color: #0056b3;
}

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

.button-group {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
}

button {
    padding: 5px 10px;
    font-size: 14px;
}
</style>
