pipeline {
  agent any
  stages {
    stage('Build') {
      agent any
      steps {
        sh '''npm --version'''
        sh 'truffle version'
        sh 'pwd'
        sh 'ls -la'
      }
    }

  }
}
