'use strict';

module.exports = function(grunt) {

	grunt.initConfig({

		pkg: grunt.file.readJSON( 'package.json' ),

		jshint: {
			all: [
				'*.js',
				'test/**/*-test.js',
				'Gruntfile.js'
			],
			options: {
				jshintrc: '.jshintrc'
			}
		},

		simplemocha: {
			all: { src: [
				'test/**/*-test.js'
			] },
			options: {
				ui: 'bdd',
				reporter: 'spec'
			}
		}

	});

	// task loading
	grunt.loadNpmTasks( 'grunt-contrib-jshint' );
	grunt.loadNpmTasks( 'grunt-simple-mocha' );

	// ci task
	grunt.registerTask( 'h', [ 'jshint:all' ] );
	grunt.registerTask( 'default', [ 'simplemocha:all', 'jshint:all' ] );
};