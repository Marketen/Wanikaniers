pipeline {
  agent any
  stages {
    stage('Build') {
      agent any
      steps {
        sh '''apt-get install npm
npm --version'''
        sh 'npm install truffle'
      }
    }

  }
}