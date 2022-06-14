pipeline {
  agent any
  stages {
    stage('Build') {
      agent any
      steps {
        sh '''echo "hola"
cd "./CAPClient"'''
        sh 'npm install'
      }
    }

  }
}