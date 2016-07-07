module.exports = function(grunt) {
    grunt.initConfig({
        watch: {
            styles: {
                files: ['css/**/*', 'index.html', 'style-guide.css'],
                tasks: ['postcss'],
                options: {
                    spawn: false,
                    interrupt: true
                }
            }
        },
        modernizr: {
            dist: {
                "parseFiles": true,
                "dest": "js/vendor/modernizr.js",
                "uglify": false,
                "options": [
                    "setClasses"
                ],
                "files": {
                    "src": [
                        "js/**/*.js",
                        "css/**/*.css"
                    ]
                }
            }
        },
        uglify: {
            dist: {
                options:{
                    sourceMap: true,
                    compress: true,
                    mangle: true
                },
                files: {
                    'script.min.js':
                        [
                            'js/vendor/svg4everybody.js',
                            'js/vendor/modernizr.js',
                            'js/script.js'
                        ]
                }
            }
        },
        postcss: {
            options: {
            map: {
                    inline: false
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
                dest: 'style.min.css'
            },
            styleGuide: {
                src: 'style-guide.css',
                dest: 'style-guide.min.css'
            }
        },
        svg_sprite: {
            dist: {
                expand: true,
                cwd: 'img/svg/raw',
                src: ['**/*.svg'],
                dest: 'img/svg'
            },
            options: {
                mode: {
                    symbol: {
                        dest: '',
                        sprite: 'sprite.svg'
                    }
                },
                svg: {
                    rootAttributes: {
                        xmlns: 'http://www.w3.org/2000/svg'
                    }
                }
            }
        },
        clean: {
            preSvgOps: ['img/svg/fallbacks/*.png']
        }
    });

    require('load-grunt-tasks')(grunt);
    grunt.registerTask('default', [ 'modernizr', 'uglify', 'watch', 'postcss' ]);
    grunt.registerTask('svg', [ 'clean:preSvgOps', 'svg_sprite']);
};
