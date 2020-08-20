import { Application as ApplicationInterface } from "./application";
import { Service as ServiceInterface } from "./service";

export type Application = ApplicationInterface;
export type Service<T> = ServiceInterface<T>;
