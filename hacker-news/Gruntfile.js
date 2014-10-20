'use strict';

module.exports = function(grunt) {

	grunt.initConfig({

		pkg: grunt.file.readJSON( 'package.json' ),

		jshint: {
			all: [
				'*.js',
				'src/**/*.js',
				'test/**/*.js',
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
			utils: { src: [
				'test/**/*utils-test.js'
			] },
			pageLoop: { src: [
				'test/**/*loop-test.js'
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
	grunt.registerTask( 'u', [ 'simplemocha:utils' ] );
	grunt.registerTask( 'p', [ 'simplemocha:pageLoop' ] );
	grunt.registerTask( 'default', [ 'simplemocha:all', 'jshint:all' ] );
};