node {
    stage("Checkout") {
        checkout scm
    }

    stage('Publish package') {
      def nodeHome = tool 'NodeJS 0.12.4'
      withEnv(["PATH+NODE=${nodeHome}/bin"]) {
          withCredentials([string(credentialsId: 'npm-token', variable: 'NPM_TOKEN')]) {
              try {
                  sh "echo //registry.npmjs.org/:_authToken=${env.NPM_TOKEN} > .npmrc"
                  sh "npm install"
                  sh "npm run build"
                  sh "npm publish dist"
              } finally {
                  sh 'rm .npmrc'
              }
          }
      }
    }
}
