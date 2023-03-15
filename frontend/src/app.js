import {Router} from "./router.js";

class App {
    constructor() {
        this.router = new Router();
        window.addEventListener('DOMContentLoaded', this.handleRouteChanging.bind(this));
        window.addEventListener('popstate', this.handleRouteChanging.bind(this));    //Вызываем тут событие, которое возникает при смене Урла
    }

    handleRouteChanging() {    //Создадим общую функцию, для удобства и красоты.
        this.router.openRoute();
    }
}

(new App());