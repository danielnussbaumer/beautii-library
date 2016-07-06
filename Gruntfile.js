module.exports = function(grunt) {
    grunt.initConfig({
        watch: {
            styles: {
                files: ['css/**/*', 'index.html'],
                tasks: ['postcss'],
                options: {
                    spawn: false,
                    //livereload: true, -> not helpful when it's a submodule
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
                            'js/vendor/grunticon.loadermodernir .js',
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
            }
        },
        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'img/svg/raw',
                    src: ['*.svg'],
                    dest: 'img/svg/optimised'
                }]
            },
            options: {
                plugins: [
                    { removeViewBox: false },               // don't remove the viewbox attribute from the SVG
                    { removeEmptyAttrs: false }             // don't remove Empty Attributes from the SVG
                ]
            }
        },
        grunticon: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'img/svg/optimised',
                    src: ['*.svg'],
                    dest: 'css/svg'
                }],
                options: {
                    cssprefix: '.icon--',
                    pngpath: 'img/svg/fallbacks',
                    pngfolder: '../../img/svg/fallbacks',
                    datasvgcss: '_svg.css',
                    datapngcss: '_svg-png.css',
                    urlpngcss: '_svg-fallback.css',
                    loadersnippet: '../../js/vendor/grunticon.loader.js'
                }
            }
        },
        // grunticon doesn't give us the control over which files are created and where that I want
        copy: {
            dist: {
                src: 'css/svg/grunticon.loader.js',
                dest: 'js/vendor/grunticon.loader.js'
            }
        },
        clean: ['css/svg/preview.html', 'css/svg/grunticon.loader.js', 'css/svg/_svg-png.css']
    });

    require('load-grunt-tasks')(grunt);
    grunt.registerTask('default', [ 'modernizr', 'uglify', 'watch', 'postcss' ]);
    grunt.registerTask('svg', [ 'svgmin', 'grunticon', 'copy', 'clean' ]);
};
