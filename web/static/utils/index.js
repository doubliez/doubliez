export function defer() {
    let resolve, reject;

    const promise = new Promise((...args) => {
        resolve = args[0];
        reject = args[1];
    });

    return {
        resolve,
        reject,
        promise
    };
}
