import { RequestAdapterInterface } from "../../core/interfaces/request.adapter.interface";

export class RequestUseCase {
  constructor(private requestAdapter: RequestAdapterInterface) {}

  async execute(): Promise<string> {
    return this.requestAdapter.Request();
  }
}