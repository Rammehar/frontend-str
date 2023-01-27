import { APIErrorMessage } from "./api-error-message";
import { Either } from "../../core/either";
import { Result } from "../../core/result";

export type APIResponse<T> = Either<APIErrorMessage, Result<T>>;
