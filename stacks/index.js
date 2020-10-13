const k8s = require("@pulumi/kubernetes")
const knative = require("../resources/knative.js")

const apolloStack = require("./apollo.js")
const apolloWSStack = require("./apollo-ws.js")

const mongo = require("../charts/mongodb.js")
const redisChart = require("../charts/redis.js")

const DOMAIN = 'cloudleash.org'

const NAMESPACE_LABEL = process.env.PULUMI_NODEJS_STACK

const ns = new k8s.core.v1.Namespace(NAMESPACE_LABEL, {
  metadata: {
    name: NAMESPACE_LABEL
  }
})

const mongodb = mongo.db({
  namespace: NAMESPACE_LABEL
})

const redis = redisChart.redis({
  namespace: NAMESPACE_LABEL
})

const apolloWS = apolloWSStack.stack({
  domain: DOMAIN,
  namespace: NAMESPACE_LABEL
})


const accountsKn = knative.service({
  name: 'react-client',
  namespace: NAMESPACE_LABEL,
  image: 'docker.io/abarnash/react-client:latest',
  port: 80,
  scale: {
    min: 1
  },
  env: {
    KN_PORT: '80'
  }
})

const apollo = apolloStack.stack({
  domain: DOMAIN,
  namespace: NAMESPACE_LABEL
})

exports.namespace = NAMESPACE_LABEL
