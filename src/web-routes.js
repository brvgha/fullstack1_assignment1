import { accountsController } from "./controllers/accounts-controller.js";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { aboutController } from "./controllers/about-controller.js";
import { placemarkController } from "./controllers/placemark-controller.js";
import { adminController } from "./controllers/admin-controller.js";
import { infoController } from "./controllers/info-controller.js";
import os from "os";

export const webRoutes = [
  { method: "GET", path: "/", config: accountsController.index },
  { method: "GET", path: "/signup", config: accountsController.showSignup },
  { method: "GET", path: "/login", config: accountsController.showLogin },
  { method: "GET", path: "/logout", config: accountsController.logout },
  { method: "POST", path: "/register", config: accountsController.signup },
  { method: "POST", path: "/authenticate", config: accountsController.login },
  { method: "GET", path: "/user", config: accountsController.account },
  { method: "POST", path: "/user/updateuser/{id}", config: accountsController.update },

  { method: "GET", path: "/about", config: aboutController.index },

  { method: "GET", path: "/dashboard", config: dashboardController.index },
  { method: "POST", path: "/dashboard/addplacemark", config: dashboardController.addPlaceMark },
  { method: "GET", path: "/dashboard/deleteplacemark/{id}", config: dashboardController.deletePlaceMark },
  
  { method: "GET", path: "/admin", config: adminController.index },
  { method: "GET", path: "/admin/deleteuser/{id}", config: adminController.deleteUser },
  { method: "GET", path: "/admin/deleteplacemark/{id}", config: adminController.deletePlaceMark },
  { method: "GET", path: "/admin/deleteinfo/{id}", config: adminController.deleteInfo },

  { method: "GET", path: "/placemark/{id}", config: placemarkController.index },
  { method: "POST", path: "/placemark/{id}/addinfo", config: placemarkController.addInfo },
  { method: "GET", path: "/placemark/{id}/deleteinfo/{infoid}", config: placemarkController.deleteInfo },

  { method: "GET", path: "/info/{id}/editinfo/{infoid}", config: infoController.index },
  { method: "POST", path: "/info/{id}/updateinfo/{infoid}", config: infoController.update },
  
  { method: "POST", path: "/placemark/{id}/uploadimage", config: placemarkController.uploadImage },

  { method: "GET", path: "/{param*}", handler: { directory: { path: "./public" } }, options: { auth: false } },
  {method: 'GET', path: '/testlb', handler: function (request, h) {
    const serverip = 'Server: ' + os.hostname();
    const cpuUse = os.loadavg();
    const freeMem = os.freemem();
    const totalMem = os.totalmem();
    const percentFreeMem = (freeMem/totalMem)*100;
    return(serverip + '\n' + 'CPU usage = ' + cpuUse + '\n' + 'Free memory = ' + freeMem + '\n' + 'Percent free memory = ' + percentFreeMem);
  }, config: {auth: false}},
];
