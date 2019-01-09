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
    stage('Build') {
      steps {
        sh 'npm run build -- --prod'
      }
    }
    stage('Publish') {
      steps {
        sshPublisher(failOnError: true)
      }
    }
  }
}