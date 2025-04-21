import { RequestAdapter } from "../framework/adapters/request.adapter";
import { RequestUseCase } from "../application/use-cases/request.useCase";

const requestAdapter = new RequestAdapter();
export const requestUseCase = new RequestUseCase(requestAdapter);
