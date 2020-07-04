error_json = function (statusCode, message) {
    return {
        success: false,
        statusCode: statusCode,
        error: message
    };
}

success_json = function (statusCode, message) {
    return {
        success: true,
        statusCode: statusCode,
        result: message
    };
}

module.exports.error_json = error_json;
module.exports.success_json = success_json;