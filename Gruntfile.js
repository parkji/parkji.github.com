/**
 * Uses grunt-shell to build and serve website using jekyll
 * The watch task then runs these on file change
 */
module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        shell: {
            jekyllBuild: {
                command: 'jekyll build'
            },
            jekyllServe: {
                command: 'jekyll serve'
            }
        },
        watch: {
            files: [
                '_includes/*.html',
                '_layouts/*.html',
                '_posts/*.markdown',
                '_posts/*.md',
                'css/*.css',
                '_config.yml',
                'index.html'
            ],
            tasks: ['shell:jekyllBuild', 'shell:jekyllServe'],
            options: {
                interrupt: true,
                atBegin: true,
                livereload: true
            }
        }
    });

    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['shell']);
};
