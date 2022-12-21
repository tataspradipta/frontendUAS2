import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: "/login",
        name: "login",
        component: () => import("@/views/Auth/loginView.vue"),
    },
    {
        path: "/register",
        name: "register",
        component: () => import("@/views/Auth/registerView.vue"),
    },
    {
        path: "/dashboard",
        name: "dashboard",
        component: () => import("@/views/dashboard/indexPage.vue"),
    },

    {
        path: "/",
        name: "beranda",
        component: () => import("@/views/dashboard/indexPage.vue"),
        children: [
            {
                path: "/announcement",
                name: "announcement.index",
                component: () => import("@/views/Announcement/indexPage.vue"),
            },
            {
                path: "/announcement/create",
                name: "announcement.create",
                component: () => import("@/views/Announcement/createPage.vue"),
            },
            {
                path: "/announcement/edit",
                name: "announcement.edit",
                component: () => import("@/views/Announcement/editPage.vue"),
            },
            {
                path: "/organizer",
                name: "organizer.index",
                component: () => import("@/views/Organizer/indexOrganizer.vue"),
            },
            {
                path: "/organizer/create",
                name: "organizer.create",
                component: () => import("@/views/Organizer/createOrganizer.vue"),
            },
            {
                path: "/organizer",
                name: "organizer.edit",
                component: () => import("@/views/Organizer/editOrganizer.vue"),
            },
        ],
    },
];
const router = createRouter({
    history: createWebHistory(),
    routes,
});
export default router;
