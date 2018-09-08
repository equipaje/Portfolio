module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-markdown') //turn markdown into html
  grunt.loadNpmTasks('grunt-contrib-less') //turn less into css
  grunt.loadNpmTasks('grunt-contrib-cssmin') //minify css files so it's faster
  grunt.loadNpmTasks('grunt-contrib-copy') //copies things like libraries and images to the site
  grunt.loadNpmTasks('grunt-devserver') //local dev
  grunt.loadNpmTasks('grunt-contrib-watch') //run this file on save

  grunt.initConfig({
    markdown: {
      all: {
        files: [
          {
            cwd: 'src',
            expand: true,
            src: '**/*.md',
            dest: 'dist/.',
            ext: '.html'
          },
          {
            cwd: 'src',
            expand: true,
            src: '**/*.html',
            dest: 'dist/.',
            ext: '.html'
          }
        ],
        options: {
          template: 'src/layout.jst'
        }
      }
    },
    less: {
      all: {
        files: {
          'dist/css/site.css': 'src/css/site.less'
        }
      }
    },
    cssmin: {
      target: {
        files: {
          'dist/css/site.min.css': 'dist/css/site.css'
        }
      }
    },
    copy: {
      all: {
        files: [
          {
            expand: true,
            cwd: 'src',
            src: ['favicon.ico', 'images/**'],
            dest: 'dist'
          },
          {
            expand: true,
            cwd: 'node_modules',
            src: ['bootstrap/dist/**', 'jquery/dist/**'],
            dest: 'dist/lib/'
          }
        ]
      }
    },
    watch: {
      scripts: {
        files: ['src/**/*.*'],
        tasks: ['gen'],
        options: {
          spawn: false
        }
      }
    },
    devserver: {
      dist: {
        options: {
          base: 'dist'
        }
      }
    }
  })

  grunt.registerTask('gen', ['markdown:all', 'less:all', 'cssmin', 'copy'])
}
