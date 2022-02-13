const express = require("express");
const router = express.Router();
const TaskController = require("../controller/taskController");

/**
 * @api {post} /tasks/ Add Task
 * @apiName addTasks
 * @apiGroup Task
 *
 * @apiBody {String} task_name Task name,not unique
 * @apiBody {String} description Task description, not unique
 * @apiBody {number} estimated_hours Task estimated hours, not unique
 * @apiBody {number} actual_hours Task actual hours, not unique
 * @apiBody {number} invoiceId Task invoice Id, not unique
 *
 *
 * @apiParamExample Example Body:
 * {
 *   "task_name": "Developmenet",
 *   "description": "loermIspmspmaspmcpapsmcspmcm",
 *   "actual_hours": "3",
 *   "estimated_hours": "3",
 *   "invoiceId": "2"
 *
 * }
 *
 * @apiSuccess {Number} id Task id
 * @apiSuccess {String} task_name Task name
 * @apiSuccess {String} description Task Description
 * @apiSuccess {Number} actual_hours Task actual hours
 * @apiSuccess {Number} estimated_hours Task estimated hours
 * @apiSuccess {Number} invoiceId Task Invoice id
 *
 * @apiSuccessExample Success
 * {
 *   "id" : "2"
 *   "task_name": "Developmenet",
 *   "description": "loermIspmspmaspmcpapsmcspmcm",
 *   "actual_hours": "3",
 *   "estimated_hours": "3",
 *   "invoiceId": "2"
 * }
 */

router.post("/", TaskController.create);

/**
 * @api {get} /tasks/ Get Tasks
 * @apiName GetTasks
 * @apiGroup Task
 *
 * @apiSuccess  {Objects[]} Tasks Array
 * @apiSuccessExample Success
 * [{
 *   "id" : "2"
 *   "task_name": "Developmenet",
 *   "description": "loermIspmspmaspmcpapsmcspmcm",
 *   "actual_hours": "3",
 *   "estimated_hours": "3",
 *   "invoiceId": "2"
 * },
 * {
 *   "id" : "3"
 *   "task_name": "Develop",
 *   "description": "loermIspmspmaspmcpapsmcspmcm",
 *   "actual_hours": "3",
 *   "estimated_hours": "3",
 *   "invoiceId": "1"
 * }
 * ]
 */

router.get("/", TaskController.index);

/**
 * @api {get} /tasks/:id Get Task
 * @apiName GetTask
 * @apiGroup Task
 *
 * @apiParam {Number} id Task id
 *
 * @apiSuccess {Number} id Task id
 * @apiSuccess {String} task_name Task name
 * @apiSuccess {String} description Task Description
 * @apiSuccess {Number} actual_hours Task actual hours
 * @apiSuccess {Number} estimated_hours Task estimated hours
 * @apiSuccess {Number} invoiceId Task Invoice id
 * @apiSuccess {Objects[]} labels Array of labels objects belonging to task
 *
 * @apiSuccessExample Successful Reponse:
 * HTTP/1.1 200 OK
 *{
 * "task": {
 *  "id": 14,
 * "description": "this is testing",
 * "task_name": "devent",
 * "actual_hours": 3,
 * "estimated_hours": 3,
 * "createdAt": "2022-02-03T20:09:25.355Z",
 * "updatedAt": "2022-02-06T17:51:28.104Z",
 * "invoiceId": 1
 * },
 * "label": [
 * {
 *  "id": 56,
 * "title": "development",
 * "createdAt": "2022-02-03T20:09:25.401Z",
 * "updatedAt": "2022-02-03T20:09:25.401Z",
 * "taskId": 14
 * },
 * {
 *
 *  "id": 57,
 *  "title": "api",
 * "createdAt": "2022-02-03T20:09:25.419Z",
 *     "updatedAt": "2022-02-03T20:09:25.419Z",
 *     "taskId": 14
 *   },
 *   {
 *     "id": 58,
 *     "title": "testing",
 *     "createdAt": "2022-02-03T20:09:25.432Z",
 *     "updatedAt": "2022-02-03T20:09:25.432Z",
 *     "taskId": 14
 *   }
 * ]
 * }
 *
 * @apiError TaskNotFound The id of the Task was not found.
 *
 * @apiErrorExample Error-Response:
 * HTTP/1.1 404 Not Found
 * {
 *   error: "Something went wrong"
 * }
 *
 */

router.get("/:id", TaskController.show);
//filtering

/**
 * @api {get} /tasks/id/:value Get Task by id
 * @apiName GetTaskById
 * @apiGroup Task
 *
 * @apiParam {Number} value Task id
 *
 * @apiSuccess {Number} id Task id
 * @apiSuccess {String} task_name Task name
 * @apiSuccess {String} description Task Description
 * @apiSuccess {Number} actual_hours Task actual hours
 * @apiSuccess {Number} estimated_hours Task estimated hours
 * @apiSuccess {Number} invoiceId Task Invoice id
 *
 *
 * @apiSuccessExample Successful Reponse:
 * HTTP/1.1 200 OK
 *  {
 * "id": 14,
 * "description": "this is testing",
 * "task_name": "devent",
 * "actual_hours": 3,
 * "estimated_hours": 3,
 * "createdAt": "2022-02-03T20:09:25.355Z",
 * "updatedAt": "2022-02-06T17:51:28.104Z",
 * "invoiceId": 1
 *  }
 *
 *
 * @apiError TaskNotFound The id of the Task was not found.
 *
 * @apiErrorExample Error-Response:
 * HTTP/1.1 404 Not Found
 * {
 *   error: "Something went wrong"
 * }
 *
 */

router.get("/id/:value", TaskController.showById);

/**
 * @api {get} /tasks/invoiceId/:value Get Task by invoiceID
 * @apiName GetTaskByInvoiceId
 * @apiGroup Task
 *
 * @apiParam {Number} value Task invoiceId
 *
 * @apiSuccess {Number} id Task id
 * @apiSuccess {String} task_name Task name
 * @apiSuccess {String} description Task Description
 * @apiSuccess {Number} actual_hours Task actual hours
 * @apiSuccess {Number} estimated_hours Task estimated hours
 * @apiSuccess {Number} invoiceId Task Invoice id
 *
 *
 * @apiSuccessExample Successful Reponse:
 * HTTP/1.1 200 OK
 *  {
 * "id": 14,
 * "description": "this is testing",
 * "task_name": "devent",
 * "actual_hours": 3,
 * "estimated_hours": 3,
 * "createdAt": "2022-02-03T20:09:25.355Z",
 * "updatedAt": "2022-02-06T17:51:28.104Z",
 * "invoiceId": 1
 *  }
 *
 *
 * @apiError TaskNotFound The invoice Id of the Task was not found.
 *
 * @apiErrorExample Error-Response:
 * HTTP/1.1 404 Not Found
 * {
 *   error: "Something went wrong"
 * }
 *
 */

router.get("/invoiceId/:value", TaskController.showByInvoiceId);

/**
 * @api {get} /tasks/task_name/:value Get Task by task name
 * @apiName GetTaskByTaskName
 * @apiGroup Task
 *
 * @apiParam {string} value Task name
 *
 * @apiSuccess {Number} id Task id
 * @apiSuccess {String} task_name Task name
 * @apiSuccess {String} description Task Description
 * @apiSuccess {Number} actual_hours Task actual hours
 * @apiSuccess {Number} estimated_hours Task estimated hours
 * @apiSuccess {Number} invoiceId Task Invoice id
 *
 *
 * @apiSuccessExample Successful Reponse:
 * HTTP/1.1 200 OK
 *  {
 * "id": 14,
 * "description": "this is testing",
 * "task_name": "devent",
 * "actual_hours": 3,
 * "estimated_hours": 3,
 * "createdAt": "2022-02-03T20:09:25.355Z",
 * "updatedAt": "2022-02-06T17:51:28.104Z",
 * "invoiceId": 1
 *  }
 *
 *
 * @apiError TaskNotFound The task name of the Task was not found.
 *
 * @apiErrorExample Error-Response:
 * HTTP/1.1 404 Not Found
 * {
 *   error: "Something went wrong"
 * }
 *
 */

router.get("/task_name/:value", TaskController.showByTaskName);

//update single task

/**
 * @api {put} /tasks/ Update Task
 * @apiName updateTask
 * @apiGroup Task
 *
 * @apiParam {Number} id Task id
 *
 * @apiBody {String} task_name Task name,not unique
 * @apiBody {String} description Task description, not unique
 * @apiBody {number} estimated_hours Task estimated hours, not unique
 * @apiBody {number} actual_hours Task actual hours, not unique
 * @apiBody {number} invoiceId Task invoice Id, not unique
 *
 *
 * @apiParamExample Example Body:
 * {
 *   "task_name": "Developmenet",
 *   "description": "loermIspmspmaspmcpapsmcspmcm",
 *   "actual_hours": "3",
 *   "estimated_hours": "3",
 *   "invoiceId": "2"
 *
 * }
 *
 * @apiSuccess {Number} id Task id
 * @apiSuccess {String} task_name Task name
 * @apiSuccess {String} description Task Description
 * @apiSuccess {Number} actual_hours Task actual hours
 * @apiSuccess {Number} estimated_hours Task estimated hours
 * @apiSuccess {Number} invoiceId Task Invoice id
 *
 * @apiSuccessExample Success
 * {
 *   "id" : "2"
 *   "task_name": "Developmenet",
 *   "description": "loermIspmspmaspmcpapsmcspmcm",
 *   "actual_hours": "3",
 *   "estimated_hours": "3",
 *   "createdAt": "2022-02-05T12:40:06.411Z",
 *   "updatedAt": "2022-02-13T05:54:59.130Z",
 *   "invoiceId": "2"
 * }
 */

router.put("/:id", TaskController.update);

/**
 * @api {delete} /tasks/:id Delete task
 * @apiName DeleteTask
 * @apiGroup Task
 *
 * @apiParam {Number} id Task id
 *
 *
 *
 * @apiSuccessExample Successful Reponse:
 * HTTP/1.1 200 OK
 *{
 * }
 *
 * @apiError TaskNotFound The id of the Task was not found.
 *
 * @apiErrorExample Error-Response:
 * HTTP/1.1 404 Not Found
 * {
 *   error: "Something went wrong"
 * }
 *
 */

router.delete("/:id", TaskController.delete);

module.exports = router;
