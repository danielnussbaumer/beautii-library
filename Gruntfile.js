module.exports = function(grunt) {
    grunt.initConfig({
        watch: {
            scripts: {
                files: ['coffee/*.coffee'],
                tasks: ['coffee', 'uglify'],
                options: {
                    spawn: false,
                    interrupt: true
                }
            },
            styles: {
                files: ['css/**/*', 'index.html', 'style-guide.css'],
                tasks: ['postcss'],
                options: {
                    spawn: false,
                    interrupt: true
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
                            'js/script.js'
                        ]
                }
            }
        },
        coffee: {
            compile: {
                files: {
                    'assets/js/script.js': 'src/coffeescript/*.coffee'
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
                dest: 'style-guide.min.css',
                options: {
                    map: false,
                    processors: [
                        require('precss')(), // processes sass
                        require('postcss-cssnext')({browsers: '> 1%, last 2 versions, Firefox ESR, Opera 12.1, IE 9'}), // processes future-proof css
                        require('postcss-discard-comments'), // remove comments
                        require('cssnano') // minimise css
                    ]
                }
            }
        },
        svg_sprite: {
            dist: {
                expand: true,
                cwd: 'img/svg/raw',
                src: ['**/*.svg'],
                dest: ''
            },
            options: {
                mode: {
                    symbol: {
                        dest: 'img/svg',
                        sprite: 'sprite.svg'
                    }
                },
                svg: {
                    rootAttributes: {
                        xmlns: 'http://www.w3.org/2000/svg'
                    }
                },
                shape: {
                    dest: 'img/svg/optimised'
                }
            }
        },
        clean: {
            preSvgOps: ['img/svg/fallbacks/*.png']
        }
    });

    require('load-grunt-tasks')(grunt);
    grunt.registerTask('default', [ 'coffee', 'uglify', 'postcss', 'watch' ]);
    grunt.registerTask('svg', [ 'clean:preSvgOps', 'svg_sprite']);
};
