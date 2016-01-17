import superagent from "superagent";

export function sendRPC(method, params) {
    const data = {
        id: 1,
        jsonrpc: "2.0",
        method,
        params
    };

    return new Promise((resolve, reject) => {
        superagent
            .post(`/jsonrpc?${method}`, data)
            .end((err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res.body.result);
                }
            });
    });
}
