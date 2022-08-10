/* globals module, require */

module.exports = function(grunt) {

  "use strict";

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    uglify: {
      global: {
        files: {
          "static/js/site.min.js": ["assets/js/site.js"]
        }
      }
    },

    sass: {
      
      dist: {
        options: {
          style: "compressed"
        },
        files: {
          "assets/css/unprefixed/main-unprefixed-min.css": "assets/css/main.scss"
        }
      },
      global: {
        options: {
          style: "expanded"
        },
        files: {
          "assets/css/unprefixed/main-unprefixed.css": "assets/css/main.scss"
        }
      }
    },

    autoprefixer: {
      dist: {
        files: [
        {src: ['assets/css/unprefixed/main-unprefixed-min.css'], dest: 'static/css/main-min.css'},
        ],
      },
      global: {
        src: "assets/css/unprefixed/main-unprefixed.css",
        dest: "static/css/main.css"
      }
    },

    shell: {
      hugoServe: {
        command: "hugo server"
      },
      hugoBuild: {
        command: "hugo"
      }
    },

    watch: {
      options: {
        livereload: true
      },
      js: {
        files: ["assets/js/*.js"],
        tasks: ["uglify"]
      },
      css: {
        files: ["assets/css/*.scss"],
        tasks: ["sass", "autoprefixer", "shell:hugoBuild"]
      },
      svgIcons: {
        files: ["assets/svg/*.svg"],
        tasks: ["svgstore"]
      }
    },

    svgstore: {
      options: {
        prefix : "svg-",
        formatting: true,
        cleanup: false,
        includeTitleElement: false,
        svg: {
          style: "display: none;"
        }
      },
      default: {
        files: {
          "layouts/partials/svg-defs.svg": ["assets/svg/*.svg"]
        }
      }
    },

    imagemin: {                           
      dynamic: {
        options: {
          optimizationLevel: 3
        },                         
        files: [{
          expand: true,                  
          cwd: 'assets/img/',                   
          src: ['**/*.{png,jpg,gif}'],   
          dest: 'static/img/'
        }]
      }
    }
    


  });

  require("load-grunt-tasks")(grunt);

  //grunt.registerTask("imagemin", ["imagemin"]);
  grunt.registerTask("serve", ["shell:hugoServe"]);
  grunt.registerTask("build-assets", ["uglify", "sass", "autoprefixer", "svgstore", "watch"]);
  grunt.registerTask("build", ["uglify", "sass", "autoprefixer", "svgstore", "shell:hugoBuild", "watch"]);
  grunt.registerTask("default", ["uglify", "sass", "autoprefixer", "svgstore", "shell:hugoBuild", "shell:hugoServe", "watch"]);

};
