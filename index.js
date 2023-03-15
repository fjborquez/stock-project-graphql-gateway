import { ApolloServer } from "@apollo/server";
import { ApolloGateway, IntrospectAndCompose } from "@apollo/gateway";
import { startServerAndCreateLambdaHandler, handlers } from '@as-integrations/aws-lambda';

const gateway = new ApolloGateway({
  supergraphSdl: new IntrospectAndCompose({
    subgraphs: [
       { name: "news", url: "https://n5etgb7mr5.execute-api.us-east-1.amazonaws.com/graphql" },
       { name: "companies", url: "https://ifaycwwhtj.execute-api.us-east-1.amazonaws.com/graphql" },
    ],
  }),
});

const server = new ApolloServer({ gateway });

export const graphqlHandler = startServerAndCreateLambdaHandler(
  server,
  handlers.createAPIGatewayProxyEventV2RequestHandler(),
);