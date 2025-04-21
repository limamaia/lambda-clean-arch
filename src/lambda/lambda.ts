import { APIGatewayProxyHandler } from "aws-lambda";
import { requestUseCase } from "../config/container";

export const handler: APIGatewayProxyHandler = async (event) => {
  const message = await requestUseCase.execute();

  return {
    statusCode: 200,
    body: JSON.stringify({ message }),
  };
};
