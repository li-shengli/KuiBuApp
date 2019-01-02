import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { TaskInfo, User } from '../_models';
import { MapArrayConverter } from './MapArrayConverter';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // array in local storage for registered users
        let users: User[] = JSON.parse(localStorage.getItem('users')) || [];
        let tasks: TaskInfo[] = JSON.parse(localStorage.getItem('tasks')) || [];

        // wrap in delayed observable to simulate server api call
        return of(null).pipe(mergeMap(() => {
           
            // add task
            if (request.url.endsWith('/task/add') && request.method === 'POST') {
                let newTask = request.body;

                // save new task
                newTask.taskId = Date.now();
                newTask.createTime = new Date();
                newTask.taskStatus = "Submitted";
                newTask.history = new Map();
                newTask.history.set(0, newTask.pagesCurrent);
                tasks.push(newTask);
                localStorage.setItem('tasks', JSON.stringify(tasks));
                
                localStorage.setItem(newTask.taskId, JSON.stringify(MapArrayConverter.toArray(newTask.history)));
                console.log ("taskHistory: " + JSON.stringify(MapArrayConverter.toArray(newTask.history)));

                // respond 200 OK
                return of(new HttpResponse({ status: 200 }));
            }

            // get all task by username
            if (request.url.match(/\/task\/all\/.+$/) && request.method === 'GET') {
                console.log ("retrive tasks from localStorage...");

                let submittedTasks: TaskInfo[] = [];
                let ongoingTasks: TaskInfo[] = [];
                let doneTasks: TaskInfo[] = [];
                
                tasks.forEach(task => {
                    console.log ("retrive Submitted tasks from localStorage... and oldHistory ");

                    let username = localStorage.getItem('currentUserId');
                    if (task.username == username) {

                        task.history = this.getTaskHistory(task.taskId);

                        if (task.taskStatus === "Submitted") {
                            submittedTasks.push(task);
                        } else if  (task.taskStatus === "Executing") {
                            console.log ("retrive Executing tasks from localStorage...");
                            ongoingTasks.push(task);
                        } else {
                            console.log ("retrive Finished tasks from localStorage...");
                            if (task.endDate == null) {
                                task.endDate = new Date();
                                localStorage.setItem('tasks', JSON.stringify(tasks));
                            }
                            doneTasks.push(task);
                        }
                    }

                });

                let allTasks = {
                    "Submitted": submittedTasks,
                    "Executing": ongoingTasks,
                    "Finished": doneTasks
                }

                console.log ("retrive all tasks from localStorage: " + allTasks);

                return of(new HttpResponse({ status: 200, body: allTasks }));
            }

            // update task
            if (request.url.endsWith('/task/updateReadingTask') && request.method === 'POST') {
                let task = request.body;

                console.log ("update tasks from localStorage..." + JSON.stringify(task));

                let matchedTasks = tasks.filter(existTask => { return existTask.taskId == task.taskId; });
                let matchedTask = matchedTasks.length ? matchedTasks[0] : null;
                if (matchedTask != null) {
                    console.log ("One task was found from localStorage..." + JSON.stringify(matchedTask));

                    var pageChanged = task.pagesCurrent - matchedTask.pagesCurrent

                    if (task.taskName != null) {
                        matchedTask.taskName = task.taskName;
                    }
                    if (task.pagesCurrent != null) {
                        matchedTask.pagesCurrent = task.pagesCurrent;
                    }
                    if (task.pagesIntotal != null) {
                        matchedTask.pagesIntotal = task.pagesIntotal;
                    }
                    if (task.expectedDays != null) {
                        matchedTask.expectedDays = task.expectedDays;
                    }
                    if (task.taskStatus != null) {
                        matchedTask.taskStatus = task.taskStatus;
                    }
                    if (matchedTask.startTime == null) {
                        matchedTask.startTime = task.startTime;
                    } 
                    if (matchedTask.startTime == null && matchedTask.taskStatus == "Executing") {
                        matchedTask.startTime = matchedTask.createTime;
                    }
                    if (task.endDate != null) {
                        matchedTask.endDate = task.endDate;
                    }
                    var d: number = 0;
                    if (matchedTask.startTime != null) {
                        d = (Date.now() - Date.parse(matchedTask.startTime.toString()))/(24*60*60*1000);
                        console.log ("How many days passed: "+parseInt(d.toString()));
                    }
                    matchedTask.lastUpdateDate = new Date();

                    if (pageChanged > 0) {
                        var taskHistory = this.getTaskHistory(matchedTask.taskId);
                        taskHistory.set(parseInt(d.toString())+1, matchedTask.pagesCurrent);
                        localStorage.setItem(matchedTask.taskId, JSON.stringify(MapArrayConverter.toArray(taskHistory)));
                    }

                    localStorage.setItem('tasks', JSON.stringify(tasks));

                    return of(new HttpResponse({ status: 200 }));
                } else {
                    console.log ("No task was found from localStorage...");
                    return throwError({ error: { message: 'No Task Found!' } });
                }
                
            }

            // delete task
            if (request.url.match(/\/task\/delete\/\w+\/0\/\d+$/) && request.method === 'GET') {
                
                let urlParts = request.url.split('/');
                let id = urlParts[urlParts.length - 1];
                for (let i = 0; i < tasks.length; i++) {
                    let task = tasks[i];
                    if (task.taskId == id) {
                        // delete tasks
                        tasks.splice(i, 1);
                        localStorage.setItem('tasks', JSON.stringify(tasks));
                        localStorage.removeItem(id);
                        break;
                    }
                }

                console.log ("Task Deleted: " + id);
                // respond 200 OK
                return of(new HttpResponse({ status: 200 }));
            }

            // authenticate
            if (request.url.endsWith('/user/login') && request.method === 'POST') {
                // find if any user matches login credentials
                let filteredUsers = users.filter(user => {
                    return user.username === request.body.username && user.password === request.body.password;
                });

                if (filteredUsers.length) {
                    // if login details are valid return 200 OK with user details and fake jwt token
                    let user = filteredUsers[0];
                    let body = {
                        id: user.id,
                        username: user.username,
                        nickName: user.nickName
                    };

                    localStorage.setItem('currentUser', JSON.stringify(user));
                    localStorage.setItem('currentUserId', user.username);

                    return of(new HttpResponse({ status: 200, body: body }));
                } else {
                    // else return 400 bad request
                    return throwError({ error: { message: 'Username or password is incorrect' } });
                }
            }

            // get users
            if (request.url.endsWith('/users') && request.method === 'GET') {
                // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    return of(new HttpResponse({ status: 200, body: users }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return throwError({ status: 401, error: { message: 'Unauthorised' } });
                }
            }

            // get user by id
            if (request.url.match(/.*\/users\/\d+$/) && request.method === 'GET') {
                // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    // find user by id in users array
                    let urlParts = request.url.split('/');
                    let id = urlParts[urlParts.length - 1];
                    let matchedUsers = users.filter(user => { return user.id === id; });
                    let user = matchedUsers.length ? matchedUsers[0] : null;

                    return of(new HttpResponse({ status: 200, body: user }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return throwError({ status: 401, error: { message: 'Unauthorised' } });
                }
            }

            // register user
            if (request.url.endsWith('/user/register') && request.method === 'POST') {
                console.log ("register user into localStorage...");
                // get new user object from post body
                let newUser = request.body;

                // validation
                let duplicateUser = users.filter(user => { return user.username === newUser.username; }).length;
                if (duplicateUser) {
                    return throwError({ error: { message: 'Username "' + newUser.username + '" is already taken' } });
                }

                // save new user
                newUser.id = Date.now();
                users.push(newUser);
                localStorage.setItem('users', JSON.stringify(users));

                // respond 200 OK
                return of(new HttpResponse({ status: 200 }));
            }

            // update user
            if (request.url.endsWith('/user/update') && request.method === 'POST') {
                console.log ("update user into localStorage...");
                // get new user object from post body
                let newUser = request.body;

                // validation
                let matchedUsers = users.filter(user => { return user.id === newUser.id; });
                matchedUsers[0].nickName = newUser.nickName;
                matchedUsers[0].motto = newUser.motto;

                // save user
                localStorage.setItem('currentUser', JSON.stringify(matchedUsers[0]));
                localStorage.setItem('users', JSON.stringify(users));

                // respond 200 OK
                return of(new HttpResponse({ status: 200 }));
            }

            // delete user
            if (request.url.match(/\/users\/\d+$/) && request.method === 'DELETE') {
                // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    // find user by id in users array
                    let urlParts = request.url.split('/');
                    let id = urlParts[urlParts.length - 1];
                    for (let i = 0; i < users.length; i++) {
                        let user = users[i];
                        if (user.id === id) {
                            // delete user
                            users.splice(i, 1);
                            localStorage.setItem('users', JSON.stringify(users));
                            break;
                        }
                    }

                    // respond 200 OK
                    return of(new HttpResponse({ status: 200 }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return throwError({ status: 401, error: { message: 'Unauthorised' } });
                }
            }

            // pass through any requests not handled above
            return next.handle(request);
            
        }))

        // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
        .pipe(materialize())
        .pipe(delay(500))
        .pipe(dematerialize());
    }

    getTaskHistory(taskId: string) {
        console.log("Get History for task: " + taskId);
        var oldHistory = localStorage.getItem(taskId);
        var history = MapArrayConverter.toMap(JSON.parse(oldHistory));

        console.log("Task History: " + history);
        return history;
    }
}

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};