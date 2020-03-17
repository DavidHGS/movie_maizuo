import Vue from "vue";
import VueRouter from "vue-router";
import film from "@/views/film";
import cinema from "@/views/cinema";
import center from "@/views/center";
import nowplaying from "@/views/film/nowplaying";
import comingsoon from "@/views/film/comingsoon";
import detail from "@/views/detail";
import city from "@/views/city";

Vue.use(VueRouter);

const routes = [
  {
    path: "/film",
    component: film,
    children: [
      {
        path: "/film/nowplaying",
        component: nowplaying
      },
      {
        path: "/film/comingsoon",
        component: comingsoon
      },
      {
        path: "",
        redirect: "/film/nowplaying"
      }
    ]
  },
  {
    path: "/cinema",
    component: cinema
  },
  {
    path: "/city",
    component: city
  },
  {
    path: "/center",
    component: center
  },
  {
    path: "/detail/:id",
    name: "detail",
    component: detail
  },
  {
    path: "*",
    redirect: "/film"
  }
];

const router = new VueRouter({
  // mode: 'history',//是否使用#
  // base: process.env.BASE_URL,
  routes
});

export default router;
