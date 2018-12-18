pipeline {
  agent any
    
  tools {nodejs "node"}
    
  stages {
     
    environment {
        EXPO_DEBUG = true
        DB_ENGINE    = 'sqlite'
    }

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
            sh "npm run exp-build"
        }
    }
  }
}
