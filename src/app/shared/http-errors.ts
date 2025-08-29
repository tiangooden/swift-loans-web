export class HttpError extends Error {
  statusCode: number;
  statusMessage: string;
  errors: any;

  constructor(statusCode: number, message?: string, errors?: any) {
    super(message);
    this.name = "HttpError";
    this.statusCode = statusCode;
    this.statusMessage = this.getStatusMessage(statusCode);
    this.errors = errors;
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
  constructor(message?: string, errors?: any) {
    super(400, message || "Bad Request");
    this.name = "BadRequestError";
    this.errors = errors;
  }
}

export class UnauthorizedError extends HttpError {
  constructor(message?: string, errors?: any) {
    super(401, message || "Unauthorized");
    this.name = "UnauthorizedError";
    this.errors = errors;
  }
}

export class ForbiddenError extends HttpError {
  constructor(message?: string, errors?: any) {
    super(403, message || "Forbidden");
    this.name = "ForbiddenError";
    this.errors = errors;
  }
}

export class NotFoundError extends HttpError {
  constructor(message?: string, errors?: any) {
    super(404, message || "Not Found");
    this.name = "NotFoundError";
    this.errors = errors;
  }
}

export class ConflictError extends HttpError {
  constructor(message?: string, errors?: any) {
    super(409, message || "Conflict");
    this.name = "ConflictError";
    this.errors = errors;
  }
}

export class UnprocessableEntityError extends HttpError {
  constructor(message?: string, errors?: any) {
    super(422, message || "Unprocessable Entity");
    this.name = "UnprocessableEntityError";
    this.errors = errors;
  }
}

export class TooManyRequestsError extends HttpError {
  constructor(message?: string, errors?: any) {
    super(429, message || "Too Many Requests");
    this.name = "TooManyRequestsError";
    this.errors = errors;
  }
}

// 5xx Server Error Classes
export class InternalServerError extends HttpError {
  constructor(message?: string, errors?: any) {
    super(500, message || "Internal Server Error");
    this.name = "InternalServerError";
    this.errors = errors;
  }
}

export class NotImplementedError extends HttpError {
  constructor(message?: string, errors?: any) {
    super(501, message || "Not Implemented");
    this.name = "NotImplementedError";
    this.errors = errors;
  }
}

export class ServiceUnavailableError extends HttpError {
  constructor(message?: string, errors?: any) {
    super(503, message || "Service Unavailable");
    this.name = "ServiceUnavailableError";
    this.errors = errors;
  }
}

export class GatewayTimeoutError extends HttpError {
  constructor(message?: string, errors?: any) {
    super(504, message || "Gateway Timeout");
    this.name = "GatewayTimeoutError";
    this.errors = errors;
  }
}

// Helper function to create appropriate error based on status code
export function createHttpError(statusCode: number, message?: string, errors?: any): HttpError {
  switch (statusCode) {
    case 400:
      return new BadRequestError(message, errors);
    case 401:
      return new UnauthorizedError(message, errors);
    case 403:
      return new ForbiddenError(message, errors);
    case 404:
      return new NotFoundError(message, errors);
    case 409:
      return new ConflictError(message, errors);
    case 422:
      return new UnprocessableEntityError(message, errors);
    case 429:
      return new TooManyRequestsError(message, errors);
    case 500:
      return new InternalServerError(message, errors);
    case 501:
      return new NotImplementedError(message, errors);
    case 503:
      return new ServiceUnavailableError(message, errors);
    case 504:
      return new GatewayTimeoutError(message, errors);
    default:
      return new HttpError(statusCode, message, errors);
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
