import { useRouteError } from "react-router-dom";

type errorProps = {
    message: string;
}

function ErrorPage({message}:errorProps) {
    const error = useRouteError();
    console.log(error);

    return (
        <div className="h-screen flex flex-col justify-center items-center">
            <h1>An unexpected error has occurred.</h1>
            <p>{message}</p>
        </div>
    );
}

export default ErrorPage;
