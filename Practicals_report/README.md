# Docker Lab Report

## Task 1. Hello World

Run a hello-world container to verify Docker is working:

```bash
docker run hello-world
```

This pulls the `hello-world` image from Docker Hub (if not found locally), creates a container, and runs it, printing a confirmation message. To view the pulled image and all containers (including stopped ones):

```bash
docker images
docker ps -a
```

Container names are randomly generated unless specified with `--name`.

---

## Task 2. Build

Create a `test` directory and add a `Dockerfile` defining a Node.js (LTS) base image, set the working directory, copy app files, expose port 80, and start the app. Also create `app.js` as a simple HTTP server returning "Hello World" on port 80.

Build the image:

```bash
docker build -t node-app:0.1 .
```

The `-t` flag sets the name and tag. Always tagging images (e.g., `0.1`) is recommended over relying on `latest`.

---

## Task 3. Run

Run the container with port mapping:

```bash
docker run -p 4000:80 --name my-app node-app:0.1
```

Test it with `curl http://localhost:4000`. To run in the background, add `-d`. Stop and remove with:

```bash
docker stop my-app && docker rm my-app
```

Modify `app.js`, then build a new version and run it on a different host port:

```bash
docker build -t node-app:0.2 .
docker run -p 8080:80 --name my-app-2 -d node-app:0.2
```

Both containers (`0.1` on port 4000 and `0.2` on port 8080) can run simultaneously.

---

## Task 4. Debug

Follow container logs in real time:

```bash
docker logs -f [container_id]
```

Open an interactive shell inside a running container:

```bash
docker exec -it [container_id] bash
```

Inspect container metadata:

```bash
docker inspect [container_id]
docker inspect --format='{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' [container_id]
```

---

## Task 5. Publish

Tag and push the image to Google Artifact Registry:

```bash
docker build -t us-east4-docker.pkg.dev/qwiklabs-gcp-02-2075fd19fc7b/my-repository/node-app:0.2 .
docker push us-east4-docker.pkg.dev/qwiklabs-gcp-02-2075fd19fc7b/my-repository/node-app:0.2
```

The image then appears in the `my-repository` registry on Google Cloud.

---

## Removing Containers & Images

Stop and remove all containers:

```bash
docker stop $(docker ps -q)
docker rm $(docker ps -aq)
```

Remove images (child images must be removed before the parent):

```bash
docker rmi us-east4-docker.pkg.dev/qwiklabs-gcp-02-2075fd19fc7b/my-repository/node-app:0.2
docker rmi node:lts
docker rmi -f $(docker images -aq)
```

Pull and re-run the published image to verify it works from the registry:

```bash
docker run -p 4000:80 -d us-east4-docker.pkg.dev/qwiklabs-gcp-02-2075fd19fc7b/my-repository/node-app:0.2
curl http://localhost:4000
```

