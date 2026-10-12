pipeline {
  agent any
  options { timeout(time: 30, unit: 'MINUTES') }
  environment { CI = 'true' }

  stages {
    stage('Checkout') {
      steps { checkout scm }
    }
    stage('Install') {
      steps {
        bat 'npm ci'
        bat 'npx playwright install'
      }
    }
    stage('Test') {
      steps { bat 'npx playwright test tests/api' }
    }
  }

  post {
    always {
      publishHTML(target: [
        reportDir: 'playwright-report',
        reportFiles: 'index.html',
        reportName: 'Playwright Report',
        keepAll: true,
        alwaysLinkToLastBuild: true,
        allowMissing: true
      ])
    }
  }
}