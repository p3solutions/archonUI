pipeline {
  agent {
    dockerfile {
      filename 'Dockerfile'
    }

  }
  stages {
    stage('Installations') {
      steps {
        sh 'npm install'
        sh 'npm install -g @angular/cli'
      }
    }
    stage('Test') {
      steps {
        sh 'npm run test -- --no-watch --no-progress --browsers=ChromeHeadlessCI'
      }
    }
  }
}