"use client";
type ErrorPageProps = {
    error: Error;
    reset: () => void;
};

export default function ErrorPage({error,reset }: ErrorPageProps) {
    return (
        <main>
            <section>
                <h2> Something went wrong</h2>
                <p>{error.message}</p>
                <button type="button" onClick={reset}>
                    Try Again
                </button>
            </section>
        </main>
    );
}