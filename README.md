![banner](https://raw.githubusercontent.com/airavata-courses/scrapbook/assets/assets/banners/banner_primary.png)
---

Scrapbook is a micro-service architecture based application that enables users to upload and manage images. It empowers the users to securely share images by introducing various roles. The users also have access to an intuitive dashboard to view different metrics and monitor various activities. Scrapbook aims to introduce simplicity in photo management.

### 💻 [Production Demo](https://sb-ui-hrishikeshpaul.cloud.okteto.net/)

![banner](https://raw.githubusercontent.com/airavata-courses/scrapbook/assets/assets/updated-napkin-diagram.png)

<br>

## 📦 Technology Stack

- Angular 11 (TypeScript)
- SpringBoot (Java 15)
- Flask (Python)
- MongoDB Atlas
- Redis Cloud
- Google Cloud Storage
- Apache Kafka
- RESTful Webservices
- Docker
- Jenkins
- Kubernetes
- Terraform
- Ansible
- Jmeter
- Google Kubernetes Engine

## 🏰 System Architecture

![architecture](https://raw.githubusercontent.com/airavata-courses/scrapbook/assets/assets/new-architecture.png)

## 👨‍💻 System Workflow

![workflow](https://raw.githubusercontent.com/airavata-courses/scrapbook/assets/assets/updated-workflow.png)

## 🚀 Application Deployment

To create VMs and configure kubernetes on the VMs follow [zonca's blog](https://github.com/zonca/zonca-blog/blob/master/_posts/2021-01-20-jetstream_kubernetes_kubespray_2.15.0.md). Once you have the VMs set up, follow the steps below to deploy scrapbook on the cloud.

```
# SSH into the master node of the Kubernetes cluster
$ sudo su
$ git clone https://github.com/airavata-courses/scrapbook.git
$ cd scrapbook
$ chmod +x deploy.sh
$ ./deploy.sh
```

- The production version is currently deployed at https://sb-ui-hrishikeshpaul.cloud.okteto.net/
- [deprecated] The staging version is currently deployed at http://staging.scrapbook.rocks/
- [deprecated] Jenkins is currently deployed at http://149.165.171.239:8080/
- [deprecated] Redis instance is deployed at http://149.165.157.223:6379/
- [deprecated] MongoDB instance is deployed at http://149.165.172.158:27017/

#### Trigger a Production build

Make a push to the `main` branch and Jenkins will automatically deploy the whole application

#### Trigger a Staging build

Make a push to the `develop` branch and Jenkins will automatically deploy the whole application

## 🧱 Project Installation (Local)

### Dependencies

Make sure you have these dependencies installed in your machine before installing each service.

- Node/NPM
- Python3.8
- Java 15
- MongoDB
- Redis
- Angular CLI
- Maven
- Docker

### Repository 
```
$ git clone https://github.com/airavata-courses/scrapbook.git
$ cd scrapbook
```

### Local Installation

#### Manual

Follow the guide in our wiki [here](https://github.com/airavata-courses/scrapbook/wiki/Local-Installation) to locally install scrapbook (all services).

#### Docker

```
# in the scrapbook root directory
$ git checkout docker
$ docker-compose up
```

Navigate to http://localhost:4200/

## 🎨 Performance

These are the load testing results for a few features

![results - load test](https://raw.githubusercontent.com/airavata-courses/scrapbook/jmeter/assets/jmeter_tests/load-test.png)

## 🎨 Mockups

Please visit our wiki page [here](https://github.com/airavata-courses/scrapbook/wiki/Mockups) to see our mockup designs.

## 📖 Documentation

- [Wiki](https://github.com/airavata-courses/scrapbook/wiki)

## ✅ Project Milestones

- [Project Milestone 1](https://github.com/airavata-courses/scrapbook/wiki/Project-1)
- [Project Milestone 2](https://github.com/airavata-courses/scrapbook/wiki/Project-2)
- [Project Milestone 3](https://github.com/airavata-courses/scrapbook/wiki/Project-3)
- [Project Milestone 4](https://github.com/airavata-courses/scrapbook/wiki/Project-4)
- [Project Milestone 5](https://github.com/airavata-courses/scrapbook/wiki/Project-5)

## 💪🏽 Team 

- **Chirag Shankar Indi**: Chirag is a first year Master's student studying at Indiana University Bloomington, majoring in Computer Science with a focus on AI/ML. He has full time experience as a Software Engineer working with the High Performance Computing and Technical Infrastructure team at Shell, along with multiple internships in fields of Software Development, Machine Learning, and Networking.    

   [<img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" />](https://www.linkedin.com/in/chirag-indi/)
   [<img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" />](https://github.com/chirag-indi)

- **Hrishikesh Paul**: Hrishikesh is a final year Masters student, studying Computer Science and specializing in Software/Frontend Engineering. His experience includes Full Stack Development using Angular, Vue, Node, Flask and MongoDB. Currently, he is the Lead Software Engineer at [CNS](https://cns.iu.edu/), working with the NIH to build scalable and open source visualization tools for researchers and doctors.

   [<img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" />](https://www.linkedin.com/in/hrishikeshpaul/)
   [<img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" />](https://github.com/hrishikeshpaul)


- **Jyoti Bhushan**: Jyoti is a graduate student pursuing Master from Indiana University Bloomington, majoring in Computer Science. She has worked for multiple global organizations as a Software Developer and, also has an experience working in a startup to build products from scratch. She has expertise in Java, Springboot, RESTful webservices along with Apache Kafka and Elasticsearch.
   
   [<img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" />](https://www.linkedin.com/in/jyoti-bhushan-12122460/)
   [<img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" />](https://github.com/jbhushan791)

- **Vivek Karna**: Vivek is a first year Master's student at Indiana University, majoring in Data Science. He has experience working as a Data Scientist on developing various Machine Learning based solutions and also developing a data platform to deploy these models for inference.

   [<img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" />](https://www.linkedin.com/in/vivekka93)
   [<img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" />](https://github.com/vivekka93)

## 🙋🏽 Contributing

To contribute, please read our [Git Workflow guide](https://github.com/airavata-courses/scrapbook/wiki/Git-Workflow).
