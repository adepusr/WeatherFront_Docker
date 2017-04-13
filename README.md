#Docker IMAGE of my WebServices

This Project will allow you to migrate that WebService into a docker container instance, that acts as a more portable and modular framework for hosting services.<br>

##STEPS TO RUN THE IMAGE: 
DOWNLOAD THE IMAGE FROM THE URL  
###https://drive.google.com/open?id=0B_ekJ5IfVKtXZl9NNG5kWW8zSHc  :->>IMAGE LOCATION

1.	Install the docker in aws environment.
Install (as root): 
$sudo yum update -y </br>
$sudo yum install -y docker </br>
$ sudo service docker start </br>
$ sudo usermod -a -G docker ec2-user </br>
Start the docker service (as root): service docker start </br>

2.	Docker load -i webserver.tar </br>
//new image will be created and displays the container id.</br>

3.	Copy the newly created IMAGEid (visible below the docker load command).</br>

4.	Docker run -d -p 8081:80 <<//copied IMAGEid>> </br>

5.	Check in the browser with your instance ip.</br>

##PROCESS FOLLOWED FOR BUILDING DOCKER IMAGE
</br>
1. AMAZON Linux Instance is launched
</br>
2. Install Docker 
</br>
3. Followed steps present in here http://codeomitted.com/deploy-war-file-to-docker-image/
	</br>
4. Entered the Bash for the base container created using
</br> 
	$ docker exec -it /createdcontainerId/ bash
</br>
	$ apt-get update   //updates packages
</br>
	$ apt-get install vim //installs Vim editor
</br>
5. Changing portfrom 8080 to 80 in /confi/server.xml
</br>
6. exit from bash
</br>
7. Checking in URL at port 80.
</br>
###DONE

