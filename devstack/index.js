"use strict";
const pulumi = require("@pulumi/pulumi");

const docker = require("@pulumi/docker")

const network = new docker.Network("net");

// Also before creating a container, we must first obtain a "RemoteImage", which is a reference to an external image
// that is downloaded to the local machine. In this case, we're referring to an image on Docker Hub.
const redisImage = new docker.RemoteImage("redis-image", {
    name: "redis:latest",
    keepLocally: true, // don't delete the image from the local machine when deleting this resource.
});

const redisContainer = new docker.Container("redis", {
    image: redisImage.name,
    networksAdvanced: [{ name: network.name }],
    restart: "on-failure",
    ports: [{
        internal: 6379,
        external: 6379,
    }]
})

const mongoImage = new docker.RemoteImage("mongo-image", {
  name: "mongo:latest",
  keepLocally: true
});

const mongoContainer = new docker.Container("mongo", {
    image: mongoImage.name,
    networksAdvanced: [{ name: network.name }],
    restart: "on-failure",
    ports: [{
        internal: 27017,
        external: 27017,
    }]
})
