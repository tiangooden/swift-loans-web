export class HttpError extends Error {
  statusCode: number;
  statusMessage: string;
  errors: string[];

  constructor(statusCode: number, message?: string | string[]) {
    const errorList = typeof message === "string" ? [message] : message || [];
    super(errorList.join(", "));
    this.name = "HttpError";
    this.statusCode = statusCode;
    this.statusMessage = this.getStatusMessage(statusCode);
    this.errors = errorList;
  }

  private getStatusMessage(code: number): string {
    const messages: { [key: number]: string } = {
      400: "Bad Request",
      401: "Unauthorized",
      402: "Payment Required",
      403: "Forbidden",
      404: "Not Found",
      405: "Method Not Allowed",
      406: "Not Acceptable",
      407: "Proxy Authentication Required",
      408: "Request Timeout",
      409: "Conflict",
      410: "Gone",
      411: "Length Required",
      412: "Precondition Failed",
      413: "Payload Too Large",
      414: "URI Too Long",
      415: "Unsupported Media Type",
      416: "Range Not Satisfiable",
      417: "Expectation Failed",
      418: "I'm a teapot",
      421: "Misdirected Request",
      422: "Unprocessable Entity",
      423: "Locked",
      424: "Failed Dependency",
      425: "Too Early",
      426: "Upgrade Required",
      428: "Precondition Required",
      429: "Too Many Requests",
      431: "Request Header Fields Too Large",
      451: "Unavailable For Legal Reasons",
      500: "Internal Server Error",
      501: "Not Implemented",
      502: "Bad Gateway",
      503: "Service Unavailable",
      504: "Gateway Timeout",
      505: "HTTP Version Not Supported",
      506: "Variant Also Negotiates",
      507: "Insufficient Storage",
      508: "Loop Detected",
      510: "Not Extended",
      511: "Network Authentication Required",
    };
    return messages[code] || "Unknown Status";
  }

  toJSON() {
    return {
      status_code: this.statusCode,
      status_message: this.statusMessage,
      errors: this.errors,
    };
  }
}

// 4xx Client Error Classes
export class BadRequestError extends HttpError {
  constructor(message?: string | string[]) {
    super(400, message || "Bad Request");
    this.name = "BadRequestError";
  }
}

export class UnauthorizedError extends HttpError {
  constructor(message?: string | string[]) {
    super(401, message || "Unauthorized");
    this.name = "UnauthorizedError";
  }
}

export class ForbiddenError extends HttpError {
  constructor(message?: string | string[]) {
    super(403, message || "Forbidden");
    this.name = "ForbiddenError";
  }
}

export class NotFoundError extends HttpError {
  constructor(message?: string | string[]) {
    super(404, message || "Not Found");
    this.name = "NotFoundError";
  }
}

export class ConflictError extends HttpError {
  constructor(message?: string | string[]) {
    super(409, message || "Conflict");
    this.name = "ConflictError";
  }
}

export class UnprocessableEntityError extends HttpError {
  constructor(message?: string | string[]) {
    super(422, message || "Unprocessable Entity");
    this.name = "UnprocessableEntityError";
  }
}

export class TooManyRequestsError extends HttpError {
  constructor(message?: string | string[]) {
    super(429, message || "Too Many Requests");
    this.name = "TooManyRequestsError";
  }
}

// 5xx Server Error Classes
export class InternalServerError extends HttpError {
  constructor(message?: string | string[]) {
    super(500, message || "Internal Server Error");
    this.name = "InternalServerError";
  }
}

export class NotImplementedError extends HttpError {
  constructor(message?: string | string[]) {
    super(501, message || "Not Implemented");
    this.name = "NotImplementedError";
  }
}

export class ServiceUnavailableError extends HttpError {
  constructor(message?: string | string[]) {
    super(503, message || "Service Unavailable");
    this.name = "ServiceUnavailableError";
  }
}

export class GatewayTimeoutError extends HttpError {
  constructor(message?: string | string[]) {
    super(504, message || "Gateway Timeout");
    this.name = "GatewayTimeoutError";
  }
}

// Helper function to create appropriate error based on status code
export function createHttpError(statusCode: number, message?: string | string[]): HttpError {
  switch (statusCode) {
    case 400:
      return new BadRequestError(message);
    case 401:
      return new UnauthorizedError(message);
    case 403:
      return new ForbiddenError(message);
    case 404:
      return new NotFoundError(message);
    case 409:
      return new ConflictError(message);
    case 422:
      return new UnprocessableEntityError(message);
    case 429:
      return new TooManyRequestsError(message);
    case 500:
      return new InternalServerError(message);
    case 501:
      return new NotImplementedError(message);
    case 503:
      return new ServiceUnavailableError(message);
    case 504:
      return new GatewayTimeoutError(message);
    default:
      return new HttpError(statusCode, message);
  }
}

// Export all for easy import
export const HttpErrors = {
  HttpError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
  UnprocessableEntityError,
  TooManyRequestsError,
  InternalServerError,
  NotImplementedError,
  ServiceUnavailableError,
  GatewayTimeoutError,
  createHttpError,
};

export default HttpErrors;
