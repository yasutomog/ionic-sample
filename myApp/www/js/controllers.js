angular.module('starter.controllers', [])

    .controller('DashCtrl', function () {

        console.log('controller::DashCtrl');

        console.log(this);


    })

    .controller('ChatsCtrl', function ($scope, Chats) {
        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //
        //$scope.$on('$ionicView.enter', function(e) {
        //});

        console.log('controller::ChatsCtrl');

        console.log($scope);
        console.log(this);

        this.hoge = 'fugafuga';

        $scope.chats = Chats.all();
        $scope.remove = function (chat) {
            Chats.remove(chat);
        };
    })

    .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {

        console.log('controller::ChatDetailCtrl');

        $scope.chat = Chats.get($stateParams.chatId);
    })

    .controller('AccountCtrl', function ($scope) {

        console.log('controller::AccountCtrl');

        $scope.settings = {
            enableFriends: true
        };
    })

    .controller('TodoCtrl', ['$scope', '$timeout', '$ionicModal', 'Projects', '$ionicSideMenuDelegate', function ($scope, $timeout, $ionicModal, Projects, $ionicSideMenuDelegate) {

        console.log('controller::TodoCtrl');

        var createProject = function (projectTitle) {
            var newProject = Projects.newProject(projectTitle);
            $scope.projects.push(newProject);
            Projects.save($scope.projects);
            $scope.selectProject(newProject, $scope.projects.length - 1);
        };

        $scope.projects = Projects.all();

        $scope.activeProject = $scope.projects[Projects.getLastActiveIndex()];

        $scope.newProject = function () {
            var projectTitle = prompt('Project name');
            if (projectTitle) {
                createProject(projectTitle);
            }
        };

        $scope.selectProject = function (project, index) {
            $scope.activeProject = project;
            Projects.setLastActiveIndex(index);
            $ionicSideMenuDelegate.toggleLeft(false);
        };

        $ionicModal.fromTemplateUrl('new-task.html', function (modal) {
            $scope.taskModal = modal;
        }, {
            scope: $scope
        });

        $scope.createTask = function (task) {

            if (!$scope.activeProject || !task) {
                return;
            }
            $scope.activeProject.tasks.push({
                title: task.title
            });
            $scope.taskModal.hide();

            Projects.save($scope.projects);

            task.title = "";

        };

        $scope.newTask = function () {
            $scope.taskModal.show();
        };

        $scope.closeNewTask = function () {
            $scope.taskModal.hide();
        };

        $scope.toggleProjects = function () {
            $ionicSideMenuDelegate.toggleLeft();
        };

        $timeout(function () {

            if ($scope.projects.length === 0) {

                while (true) {

                    var projectTitle = prompt('Your first project title:');
                    if (projectTitle) {
                        createProject(projectTitle);
                        break;
                    }

                }

            }
        });

    }]);


