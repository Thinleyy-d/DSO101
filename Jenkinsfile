pipeline {
    agent any

    environment {
        DOCKER_HUB_USERNAME = 'yourdockerhubusername'
        STUDENT_ID = 'YOURSTUDENTID'
    }

    stages {

        stage('Checkout') {
            steps {
                echo 'Checking out code from GitHub...'
                checkout scm
            }
        }

        stage('Install Backend') {
            steps {
                echo 'Installing backend dependencies...'
                dir('Assignment_2/backend') {
                    bat 'npm install'
                }
            }
        }

        stage('Install Frontend') {
            steps {
                echo 'Installing frontend dependencies...'
                dir('Assignment_2/frontend') {
                    bat 'npm install'
                }
            }
        }

        stage('Build Backend') {
            steps {
                echo 'Building backend...'
                dir('Assignment_2/backend') {
                    bat 'npm run build'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                echo 'Building frontend...'
                dir('Assignment_2/frontend') {
                    bat 'npm run build'
                }
            }
        }

        stage('Test Backend') {
            steps {
                echo 'Running backend tests...'
                dir('Assignment_2/backend') {
                    bat 'npm test'
                }
            }
            post {
                always {
                    junit allowEmptyResults: true,
                          testResults: 'Assignment_2/backend/junit.xml'
                }
            }
        }

        stage('Test Frontend') {
            steps {
                echo 'Running frontend tests...'
                dir('Assignment_2/frontend') {
                    bat 'npm test -- --passWithNoTests'
                }
            }
        }

        stage('Deploy - Backend Image') {
            steps {
                echo 'Building and pushing backend Docker image...'
                dir('Assignment_2/backend') {
                    script {
                        withCredentials([usernamePassword(credentialsId: 'docker-hub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PWD')]) {
                            docker.withRegistry('https://registry.hub.docker.com', 'docker-hub-creds') {
                                def backendImage = docker.build("${DOCKER_USER}/be-todo:${STUDENT_ID}")
                                backendImage.push()
                                backendImage.push('latest')
                            }
                        }
                    }
                }
            }
        }

        stage('Deploy - Frontend Image') {
            steps {
                echo 'Building and pushing frontend Docker image...'
                dir('Assignment_2/frontend') {
                    script {
                        withCredentials([usernamePassword(credentialsId: 'docker-hub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PWD')]) {
                            docker.withRegistry('https://registry.hub.docker.com', 'docker-hub-creds') {
                                def frontendImage = docker.build("${DOCKER_USER}/fe-todo:${STUDENT_ID}")
                                frontendImage.push()
                                frontendImage.push('latest')
                            }
                        }
                    }
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed. Check the logs.'
        }
    }
}
