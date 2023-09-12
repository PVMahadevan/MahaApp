export default function clearParams(params) {

    for (const key of Object.keys(params)) {
        if (!params[key]) {
            delete params[key]
        }
    }
    return params;
}