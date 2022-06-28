pipeline {
  agent any
  stages {
    stage('Build') {
      agent any
      steps {
        sh 'docker ps'
        sh 'cd CAPClient'
        sh 'truffle compile'
      }
    }

  }
}
