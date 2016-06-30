module.exports = function(grunt) {
    grunt.initConfig({
        watch: {
            styles: {
                files: ['css/**/*', 'index.html'],
                tasks: ['postcss'],
                options: {
                    spawn: false,
                    interrupt: true,
                    livereload: true
                }
            }
        },
        postcss: {
            options: {
                map: {
                    inline: false,
                    annotation: 'css'
                },
                processors: [
                    require('precss')(), // processes sass
                    require('postcss-cssnext')({browsers: '> 1%, last 2 versions, Firefox ESR, Opera 12.1, IE 9'}), // processes future-proof css
                    require('postcss-normalize'), // automatically applies latest normalize.css
                    require('postcss-discard-comments'), // remove comments
                    require('cssnano') // minimise css
                ]
            },
            dist: {
                src: 'css/style.css',
                dest: 'css/style.min.css'
            }
        }
    });

    require('load-grunt-tasks')(grunt);
    grunt.registerTask('default', [ 'watch', 'postcss' ]);
};