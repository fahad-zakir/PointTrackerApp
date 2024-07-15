import { createRouter, createWebHashHistory } from "vue-router";
import PointsList from "../components/PointsList.vue";
import EditPoint from "../components/EditPoint.vue";
import NewPoint from "../components/NewPoint.vue";

const routes = [
  {
    path: "/",
    name: "PointsLx1ist",
    component: PointsList,
  },
  {
    path: "/edit/:id",
    name: "EditPoint",
    component: EditPoint,
  },
  {
    path: "/new",
    name: "NewPoint",
    component: NewPoint,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
