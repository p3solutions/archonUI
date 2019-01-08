pipeline {
  agent {
    docker {
      image 'node:alpine'
      args '-p 3000:3000'
    }

  }
  stages {
    stage('Install NPM') {
      steps {
        sh 'npm install'
      }
    }
  }
}