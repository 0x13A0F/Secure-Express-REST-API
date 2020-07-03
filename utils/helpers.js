error_json = function (success, statusCode, message) {
    return {
        success: success,
        statusCode: statusCode,
        error: message
    };
}

success_json = function (success, statusCode, message) {
    return {
        success: success,
        statusCode: statusCode,
        result: message
    };
}

module.exports.error_json = error_json;
module.exports.success_json = success_json;