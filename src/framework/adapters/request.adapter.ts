import { RequestAdapterInterface } from "../../core/interfaces/request.adapter.interface";

export class RequestAdapter implements RequestAdapterInterface {
  Request(): string {
    return "get request!";
  }
}
