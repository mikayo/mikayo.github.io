module.exports = function(grunt) {
    var pushState = require('grunt-connect-pushstate/lib/utils').pushState;
    var serveStatic = require('serve-static');
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        //connect
        connect: {
            options: {
                port: 8080,
                hostname: "localhost",
                livereload: 35729
            },

            server: {
                options: {
                    middleware: function (connect, options) {
                        return [
                            // Rewrite requests to root so they may be handled by router
                            pushState(),
                            // Serve static files
                            serveStatic(options.base[0])
                        ];
                    },
                    open: true,
                    base: ['.']
                }
            }
        },

        watch: {
            options: {
                livereload: 35729
            },
            scripts: {
                options: {
                    livereload: true
                },
                files:[
                    '**.html',
                    'css/*.css',
                    'js/*.js'
                ]
            }
        }
    });

    // Creates the `server` task
    grunt.registerTask('server',["connect","watch"]);
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');

};
