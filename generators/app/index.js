var generators = require('yeoman-generator');
var fs = require('fs');

function trimEndingSlash(url) {
    while (url.length > 0 && url[url.length - 1] === "/") {
        url = url.substr(0, url.length - 1);
    }
    return url;
}

module.exports = generators.Base.extend({
    prompting: function () {
        var done = this.async();

        var allVariables = {};

        var nonTemplateFilesRelativePathsToCopy = [
            'build/tasks/build.js',
            'build/tasks/bundle.js',
            'build/tasks/clean.js',
            'build/tasks/dev.js',
            'build/tasks/doc.js',
            'build/tasks/e2e.js',
            'build/tasks/lint.js',
            'build/tasks/prepare-release.js',
            'build/tasks/serve.js',
            'build/tasks/test.js',
            'build/tasks/watch.js',
            'build/args.js',
            'build/babel-options.js',
            'build/paths.js',
        ];

        var templateFileRelativePathsToCopy = [
            '.editorconfig',
            '.jshintrc',
            '.npmignore',
            'aurelia.protractor.js',
            'config.js',
            'favicon.ico',
            'gulpfile.js',
            'index.html',
            'index.js',
            'jsconfig.json',
            'karma.conf.js',
            'LICENSE',
            'package.json',
            'protractor.conf.js',
            'README.md',
            
            'src/_config/auth-config.js',
            'src/_config/backend-config.js',
            'src/auth/login.html',
            'src/auth/login.js',
            'src/auth/logout.html',
            'src/auth/logout.js',
            'src/auth/register.html',
            'src/auth/register.js',
            'src/nav/nav-bar.html',
            'src/nav/nav-bar.js',
            'src/router/router-config.js',
            'src/user/details/userDetailsService.js',
            'src/user/profile.html',
            'src/user/profile.js',
            'src/utils/urls/url-helper.js',
            'src/welcome/welcome.html',
            'src/welcome/welcome.js',
            'src/app.html',
            'src/app.js',
            'src/main.js',

            'styles/styles.css',

            'test/e2e/src/demo.spec.js',
            'test/e2e/src/skeleton.po.js',
            'test/e2e/src/welcome.po.js',

            'test/unit/app.spec.js',
            'test/unit/child-router.spec.js',
            'test/unit/users.spec.js'
        ];

        var questions = [
            {
                type    : 'input',
                name    : 'pkgname',
                message : 'Your URL-safe package name (https://docs.npmjs.com/files/package.json)',
                default : this.appname.replace(/ /g, "-")
            },
            {
                type    : 'input',
                name    : 'displayname',
                message : 'Display name (will be seen by user on Web UI)',
                default : this.appname
            },
            {
                type    : 'input',
                name    : 'basejwturl',
                message : 'Base JWT authentication url',
                default : 'http://localhost:12301/api/v1'
            },
            {
                type    : 'input',
                name    : 'backendUrl',
                message : 'Backend url',
                default : 'http://localhost:12301'
            }
        ];

        this.prompt( questions, function( answers ) {
            allVariables.PACKAGE_NAME = answers.pkgname;
            allVariables.PROJ_DISPLAY_NAME = answers.displayname;
            allVariables.BASE_JWT_URL = trimEndingSlash(answers.basejwturl);
            allVariables.BACKEND_URL_NO_SLASH = trimEndingSlash(answers.backendUrl);

            for (var i = 0; i < templateFileRelativePathsToCopy.length; i++) {
                var relPath = templateFileRelativePathsToCopy[i];
                this.fs.copyTpl(this.templatePath(relPath), this.destinationPath(relPath), allVariables);
            }

            for (var i = 0; i < nonTemplateFilesRelativePathsToCopy.length; i++) {
                var relPath = nonTemplateFilesRelativePathsToCopy[i];
                this.fs.copy(this.templatePath(relPath), this.destinationPath(relPath));
            }

            fs.writeFileSync(this.destinationPath('.gitignore'), [
                'src/_config/backend-config.js',
                'node_modules',
                'jspm_packages',
                'bower_components',
                '.idea',
                '.DS_STORE',
                '/dist',
                'build/reports'
            ].join("\n"));

            done();
        }.bind(this));
    },
    install: function () {
        var that = this;

        var npmProcess = this.spawnCommand('npm', ['install']);
        npmProcess.on('close', function(code1) {
            if (code1 !== 0) {
                that.log.error('NPM process exited with code ' + code1);
                return;
            }

            var jspmProcess = that.spawnCommand('jspm', ['install', '-y']);
            jspmProcess.on('close', function(code2) {
                if (code2 !== 0) {
                    that.log.error('JSPM process exited with code ' + code2);
                    return;
                }
            })
        });
    }
});