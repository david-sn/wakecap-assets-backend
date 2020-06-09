/** This is most commmon use of HTTP status Code */

/** Informational Codes*/
const Continue = { name: 'Continue', code: 100 };

/** Success Codes*/
const OK = { name: 'OK', code: 200 };
const Created = { name: 'Created', code: 201 };
const Accepted = { name: 'Accepted', code: 202 };

/** Client Error Codes*/
const BadRequest = { name: 'Bad Request', code: 400 };
const Unauthorized = { name: 'Unauthorized', code: 401 };
const NotFound = { name: 'Not Found', code: 404 };
const MethodNotAllowed = { name: 'Method Not Allowed', code: 405 };
const ProxyAuthenticationRequired = { name: 'Proxy Authentication Required', code: 407 };
const RequestTimeout = { name: 'Request Timeout', code: 408 };
const Conflict = { name: 'Conflict', code: 409 };

/** Server Error Codes*/
const InternalServerError = { name: 'Internal Server Error', code: 500 };
const NotImplemented = { name: 'Not Implemented', code: 501 };
const BadGateway = { name: 'Bad Gateway', code: 502 };
const ServiceUnavailable = { name: 'Service Unavailable', code: 503 };
const GatewayTimeout = { name: 'Gateway Timeout', code: 504 };

module.exports = {
    Continue,
    OK,
    Created,
    Accepted,
    BadRequest,
    Unauthorized,
    NotFound,
    MethodNotAllowed,
    ProxyAuthenticationRequired,
    RequestTimeout,
    Conflict,
    InternalServerError,
    NotImplemented,
    BadGateway,
    ServiceUnavailable,
    GatewayTimeout,
};
