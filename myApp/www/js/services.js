angular.module('starter.services', [])

    .factory('Chats', function () {

        console.log('service::Chats');

        // Might use a resource here that returns a JSON array

        // Some fake testing data
        var chats = [{
            id: 0,
            name: 'Ben Sparrow',
            lastText: 'You on your way?',
            face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
        }, {
            id: 1,
            name: 'Max Lynx',
            lastText: 'Hey, it\'s me',
            face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
        }, {
            id: 2,
            name: 'Adam Bradleyson',
            lastText: 'I should buy a boat',
            face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
        }, {
            id: 3,
            name: 'Perry Governor',
            lastText: 'Look at my mukluks!',
            face: 'https://pbs.twimg.com/profile_images/598205061232103424/3j5HUXMY.png'
        }, {
            id: 4,
            name: 'Mike Harrington',
            lastText: 'This is wicked good ice cream.',
            face: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png'
        }];

        return {
            all: function () {
                return chats;
            },
            remove: function (chat) {
                chats.splice(chats.indexOf(chat), 1);
            },
            get: function (chatId) {
                for (var i = 0; i < chats.length; i++) {
                    if (chats[i].id === parseInt(chatId)) {
                        return chats[i];
                    }
                }
                return null;
            }
        };
    })

    .factory('Projects', function () {

        console.log('service::Projects');

        return {
            all: function () {
                var projectString = window.localStorage["projects"];
                if (projectString) {
                    return angular.fromJson(projectString);
                }
                return [];
            },
            save: function (projects) {
                window.localStorage['projects'] = angular.toJson(projects);
            },
            newProject: function (projectTitle) {
                return {
                    title: projectTitle,
                    tasks: []
                };
            },
            getLastActiveIndex: function () {
                return parseInt(window.localStorage['lastActiveProject']) || 0;
            },
            setLastActiveIndex: function (index) {
                window.localStorage['lastActiveProject'] = index;
            }
        };

    });


