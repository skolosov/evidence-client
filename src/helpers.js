import Auth from "./Auth";
import router from "./routes";

export const getError = ({stack, request: {status, statusText}}) => {
    if (status === 401) {
        Auth.logout(() => router.push({name: 'login'}));
    }
    return !statusText || !statusText.length
        ? {message: stack, status: null}
        : {message: statusText, status};
}