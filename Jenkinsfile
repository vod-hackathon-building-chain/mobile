pipeline {
  agent any
    
  tools {nodejs "node"}
     
    environment {
        EXPO_DEBUG = true
        DB_ENGINE    = 'sqlite'
    }

  stages {


    stage('Install dependencies') {
      steps {
        sh 'npm install'
        sh 'npm install -g expo-cli'
      }
    }
     
    stage('Test') {
      steps {
         sh 'npm test'
      }
    }      

    stage('build') {
        steps {
            sh "npm run doctor"
        }
    }
  }
}
